import mysql from "mysql2";
// https://www.w3schools.com/js/js_class_inheritance.asp

// https://stackoverflow.com/questions/15778572/preventing-sql-injection-in-node-js
// http://sidorares.github.io/node-mysql2/#using-prepared-statements
class Database {
    constructor() {

        this.options = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
            database: process.env.DB_NAME,
        }
        this.connection = mysql.createConnection(this.options);

        // https://www.codeproject.com/Articles/33052/Visual-Representation-of-SQL-Joins
        // https://stackoverflow.com/questions/4796872/how-can-i-do-a-full-outer-join-in-mysql#4796911
        this.queries = {
            user: {
                user_exists: "SELECT EXISTS(SELECT id FROM users WHERE discord_ID = ?)",
                get_user: "SELECT * FROM users WHERE discord_id = ?",
                create_user: "INSERT INTO users (discord_id, profile_picture, nickname, email, created_at, refresh_token, refresh_valid_until) VALUES (?, ?, ?, ?, ?, ?, ?)",
                remove_user: "DELETE FROM users WHERE discord_id = ?",
                update_user: "UPDATE users SET nickname = COALESCE(NULLIF(?, ''), nickname), email = COALESCE(NULLIF(?, ''), email) WHERE discord_id = ?",
                update_refresh_token: "UPDATE users SET refresh_token = ?, refresh_valid_until = ? WHERE discord_id = ?",
                get_refresh_token: "SELECT refresh_token, refresh_valid_until FROM users WHERE discord_id = ?",
                get_user_reviews: "SELECT u.profile_picture, u.nickname, r.rating, r.title, r.content, r.created_at, p.name FROM product_reviews pr INNER JOIN users u ON ( pr.user_id = u.id  )  INNER JOIN reviews r ON ( pr.review_id = r.id  )  INNER JOIN products p ON ( pr.product_id = p.id  )  WHERE (SELECT id FROM users WHERE discord_id = ?)"
            },
            product: {
                get_product: "SELECT u.profile_picture, u.nickname, r.rating, r.title, r.content, r.created_at, p.product_picture, p.name, p.description FROM product_reviews pr INNER JOIN users u ON ( pr.user_id = u.id  ) INNER JOIN reviews r ON ( pr.review_id = r.id  ) INNER JOIN products p ON ( pr.product_id = p.id  ) WHERE (p.id = ?)",
                post_product: "INSERT INTO products (discord_id, name, description) VALUES (?, ?, ?)",
                remove_product: ""
            },
            review: {
                get_reviews: "SELECT * FROM reviews WHERE product_hash = ? ",
                post_review: "START TRANSACTION; INSERT INTO `reviews` (`rating`, `title`, `content`, `created_at`) VALUES (?, ?, ?, ?); INSERT INTO `user_reviews` (`user_id`, `review_id`) values ((SELECT id FROM users WHERE discord_id = ?), (SELECT LAST_INSERT_ID() )); COMMIT;",
                remove_review: "",
                edit_review: ""
            },
            moderator: {
                set_moderator: "UPDATE users SET is_moderator = true WHERE discord_id = ?",
                is_moderator: "SELECT is_moderator FROM users WHERE discord_id = ?"
            }
        }
    }

    async query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, result) => {
                if (err) return reject(err);
                else return resolve(result);
            })
        })
    }

    // Vet inte om man behöver köra denna manuellt http://sidorares.github.io/node-mysql2/#documentation
    async close() {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) return reject(err);
                else return resolve();
            });
        });
    }

}

class User extends Database {

    constructor(discord_Id) {
        super()
        this.discord_Id = discord_Id
    }

    generate_username() {
        let username = "anonymous"
        return username;
    }

    // loads existings user when user logs in
    async load_user() {
        try {
            let result = await this.query(
                this.queries.user.get_user,
                [this.discord_Id]
            )

            result[0].id = result[0].id.toString()

            console.log("user data from database\n", result)
            return result[0]

        } catch (error) {
            console.log(error)
            return error
        }
    }
    // returns if the user is a moderator
    async is_moderator() {
        try {
            let result = await this.query()
        } catch (error) {
            console.log(error)
        }
    }

    async exists() {
        try {
            let result = await this.query(
                this.queries.user.user_exists,
                [this.discord_Id]
            );

            // await this.close();

            for (const key in result[0]) {
                if (Object.hasOwnProperty.call(result[0], key)) {
                    const element = result[0][key];
                    // om element(result) från databasen är 0 så finna inte användaren
                    // om result är 1 (element == true) så finns användaren
                    return (element == 1)
                }
            }

        } catch (error) {
            // Vad ska den returna om det blir något fel?
            // true betyder att användern existerar
            // false = användaren finns inte och klienten blir redirectad till /signup
            // BYT UT MED LOG FUNKTIOn
            console.log("error", error)
            return -1
        }
    }

    async create(client_data, refresh_token) {
        console.log("Cration of new user")
        // Refresh_token ska refreshas varje dag
        let expires_time = 1000 * 60 * 24

        this.profile = [
            client_data.id,
            client_data.avatar,
            client_data.username,
            client_data.email,
            new Date(),
            refresh_token,
            new Date(Date.now() + expires_time)
         ]

        try {
            let r = await this.query(
                this.queries.user.create_user,
                this.profile
            ).finally(() => {
                console.log("Done with qurey!")
            });

            if (client_data.id == 322015089529978900)
                await this.query(this.queries.moderator.set_moderator, [client_data.id])

            console.log("result from user creation\n", r)
            // await this.close();
        } catch (error) {
            console.log("Error while creating user\n", error)
            return -1
        }
    }

    // Behövs dessa?
    // async login(discord_id, refresh_token) {


    // }



    // logout() {

    // }
    //

    async update_refresh_token(discord_id, refresh_token, valid_until) {
        try {
            // Uppdatera refresh token
            let result = await this.query(this.queries.user.update_refresh_token, [refresh_token, valid_until, discord_id])

            return result && result.affectedRows >= 1;

        } catch (error) {
            console.log("error while updating user refresh_token\n", error)
            return -1
        }
    }

    // Hämtar både refresh_token och valid_unil av ett discord_id
    async get_refresh_token(discord_id) {
        try {
            let result = await this.query(this.queries.user.get_refresh_token, [discord_id])

            return result[0]
        } catch (error) {
            console.log("error while trying to get refresh tokens\n", error)
        }
    }

    update(new_values) {

        if (new_values.username == '') new_values.username = this.generate_username();
        let update_values = [
            new_values.username,
            new_values.email,
            this.discord_Id
        ]

        try {
            let result = this.query(this.queries.user.update_user, update_values)
        } catch (error) {
            console.log("Error while updating user\n", error)
            return -1
        }
    }

    async create_user_review(product_hash, content) {
        // ?? Vad fan gjorde jag här
        fetched_product = await this.query(`UPDATE products FROM products WHERE hash = ?`, [hash])
    }

    async get_user_reviews() {
        let fetched_reviews = await this.query(this.queries.user.get_user_reviews, [this.discord_Id])

        // DEBUG
        // console.log(fetched_reviews)

        return fetched_reviews;
    }

    edit_user_review() {

    }

    remove_user_review(review_id) {

    }

    // Ta bort all reviews (Alla förekomster av en användare i databasen)
    delete_user() {

    }

}

class Product extends Database {
    constructor() {
        super()
    }

    getReviews() {

    }

    search_for_products() {

    }

    async post_product(form_body, discord_id) {
        try {
            // post_product: "INSERT INTO products (discord_id, title, content, timestamp) VALUES (?, ?, ?, ?)",
            let product_options = [
                discord_id,
                form_body.product_name,
                form_body.product_description,
                // new Date()
            ]

            let result = await this.query(this.queries.product.post_product, product_options)            
        } catch (error) {
            console.log(error)
        }

    }

    async get_product(hash) {
        let fetched_product, fetched_reviews, return_error;
        fetched_product = await this.query(`SELECT * FROM products WHERE hash = ?`, [hash])

        if (!fetched_product && fetched_product.length < 1)
        {
            return_error = "Product does not exist"
            return fetched_product, fetched_reviews, return_error
        }


        fetched_reviews = await this.query(`SELECT * FROM reviews WHERE product_id=${fetched_product[0].id}`, "")

        return fetched_product, fetched_reviews, return_error

    }
}

// module.exports = User
export { User, Product }