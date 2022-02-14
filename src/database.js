import mysql from "mysql2";
// https://www.w3schools.com/js/js_class_inheritance.asp

// https://stackoverflow.com/questions/15778572/preventing-sql-injection-in-node-js
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
        // Queryn för att hämta en product från databasen bör returnera producterna och även reviewsen

        // SELECT * FROM products
        // LEFT JOIN reviews ON products.id = reviews.product_id
        // UNION ALL
        // SELECT * FROM products
        // RIGHT JOIN reviews ON products.id = reviews.product_id
        // WHERE products.id IS NULL AND MATCH(products.name, products.description) AGAINST ('hello' IN NATURAL LANGUAGE MODE);

        // SELECT * FROM products
        // LEFT JOIN reviews ON products.id = reviews.product_id
        // UNION ALL
        // SELECT * FROM products
        // RIGHT JOIN reviews ON products.id = reviews.product_id
        // WHERE products.id IS NULL AND products.name = ?;

        // https://stackoverflow.com/questions/4796872/how-can-i-do-a-full-outer-join-in-mysql#4796911
        this.queries = {
            user: {
                user_exists: "SELECT EXISTS(SELECT id FROM users WHERE discord_ID = ?)",
                get_user: "SELECT * FROM users WHERE discord_id = ?",
                create_user: "INSERT INTO users (discord_id, profile_picture, nickname, email, created_at, refresh_token, refresh_valid_until) VALUES (?, ?, ?, ?, ?, ?, ?)",
                remove_user: "DELETE FROM users WHERE discord_id = ?",
                update_user: "UPDATE users SET nickname = ?, email = ? WHERE discord_id = ?",
                update_refresh_token: "UPDATE users SET refresh_token = ?, refresh_valid_until = ? WHERE discord_id = ?",
                get_refresh_token: "SELECT refresh_token, refresh_valid_until FROM users WHERE discord_id = ?"
            },
            product: {
                get_product: "SELECT * FROM products p WHERE MATCH(name, description) AGAINST (? IN NATURAL LANGUAGE MODE) FULL OUTER JOIN reviews r ON p.id, = r.product_id",
                post_product: "INSERT INTO products (name, description) VALUES (?, ?)",
                remove_product: ""
            },
            review: {
                get_reviews: "SELECT * FROM reviews WHERE product_hash = ? ",
                post_review: "",
                remove_review: "",
                edit_review: ""
            },
            admin: {}
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
    constructor() {
        super()
    }

    generate_username() {
        let username = "anonymous"
        return username;
    }

    // loads existings user when user logs in
    async load_user(discord_id) {
        try {
            let result = await this.query(
                this.queries.user.get_user,
                [discord_id]
            )

            console.log("user data from database\n", result)
            return result[0]

        } catch (error) {
            console.log(error)
            return error
        }
    }

    async exists(discord_id) {
        try {
            let result = await this.query(
                this.queries.user.user_exists,
                [discord_id]
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

    update(new_values, discord_Id) {

        if (new_values.username == '') new_values.username = this.generate_username();
        let update_values = [
            new_values.username,
            new_values.email,
            discord_Id
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

    get_user_reviews() {

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

    async post_product(form_body) {
        try {
            // post_product: "INSERT INTO products (discord_id, title, content, timestamp) VALUES (?, ?, ?, ?)",
            let product_options = [
                // 1,
                form_body.product_name,
                form_body.product_description,
                // new Date()
            ]

            let result = await this.query(this.queries.product.post_product, product_options)            
        } catch (error) {
            console.log(error)
        }

    }

    async get_product(hash){
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