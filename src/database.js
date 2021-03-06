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
            multipleStatements: true
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
                get_user_reviews: "SELECT u.profile_picture, u.nickname, r.rating, r.title, r.content, r.created_at, p.name, p.hash FROM product_reviews pr INNER JOIN users u ON ( pr.user_id = u.id  )  INNER JOIN reviews r ON ( pr.review_id = r.id  )  INNER JOIN products p ON ( pr.product_id = p.id  )  WHERE (SELECT id FROM users WHERE discord_id = ?) LIMIT ? OFFSET ?"
            },
            product: {
                search: "SELECT p.hash, p.name, p.description, AVG(r.rating) as AverageRating FROM products p INNER JOIN product_reviews pr ON pr.product_id = p.id INNER JOIN reviews r ON pr.review_id = r.id WHERE (p.name = ? OR p.description = ?) GROUP BY p.id LIMIT ? OFFSET ?;",
                get_product: "SELECT u.profile_picture, u.nickname, r.rating, r.title, r.content, r.created_at, p.product_picture, p.name, p.description FROM product_reviews pr INNER JOIN users u ON ( pr.user_id = u.id  ) INNER JOIN reviews r ON ( pr.review_id = r.id  ) INNER JOIN products p ON ( pr.product_id = p.id  ) WHERE (p.id = ?)",
                post_product: "INSERT INTO products (`hash`, `name`, `description`) VALUES (?, ?, ?)",
                product_pictures: "SELECT url FROM product_pictures WHERE product_id = (SELECT id FROM products WHERE hash = ?)",
                remove_product: ""
            },
            review: {
                get_reviews: "SELECT * FROM reviews WHERE product_hash = ? ",
                post_review: "START TRANSACTION; INSERT INTO `reviews` (`rating`, `title`, `content`) VALUES (?, ?, ?); INSERT INTO `product_reviews` (`user_id`, `review_id`, `product_id`) values ((SELECT id FROM users WHERE discord_id = ?), (SELECT LAST_INSERT_ID() ), (SELECT id FROM products WHERE hash = ?)); COMMIT;",
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

    // Vet inte om man beh??ver k??ra denna manuellt http://sidorares.github.io/node-mysql2/#documentation
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
                    // om element(result) fr??n databasen ??r 0 s?? finna inte anv??ndaren
                    // om result ??r 1 (element == true) s?? finns anv??ndaren
                    return (element == 1)
                }
            }

        } catch (error) {
            // Vad ska den returna om det blir n??got fel?
            // true betyder att anv??ndern existerar
            // false = anv??ndaren finns inte och klienten blir redirectad till /signup
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

    // H??mtar b??de refresh_token och valid_unil av ett discord_id
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


    async get_user_reviews(low_lim = 0, high_lim = 10) {
        let fetched_reviews = await this.query(this.queries.user.get_user_reviews, [this.discord_Id, parseInt(high_lim, 10), parseInt(low_lim, 10)])

        return fetched_reviews;
    }

    remove_user_review(review_id) {

    }

    // Ta bort all reviews (Alla f??rekomster av en anv??ndare i databasen)
    delete_user() {

    }

}

class Product extends Database {
    constructor() {
        super()
    }

    async generateHash() {
        let hash = (Math.random() + 1).toString(36).substring(2);

        let response = await this.query("SELECT hash from products where hash = ?", hash)

        // recurssion :D Vet dock inte om det funkar D:
        if (response[0].length > 0)
            hash = await this.generateHash();

        return hash
    }

    async search(search_query, low_lim = 0, high_lim = 1) {
        try {
            // console.log(this.queries.product.search, [search_query, search_query,  parseInt(high_lim, 10), parseInt(low_lim, 10)])
            let result = await this.query(this.queries.product.search, [search_query, search_query,  parseInt(high_lim, 10), parseInt(low_lim, 10)])
        
            // Avrunda upp "ALLA" resultat d?? inte stj??rnorna visas i halva
            for (let index = 0; index < result.length; index++) {
                // console.log(result[index].AverageRating)
                result[index].AverageRating = Math.round(result[index].AverageRating);

                // L??gg till produktens pictures i "search resulten"
                result[index].pictures = await this.query(this.queries.product.product_pictures, result[index].hash)
            }
            console.log(result) 

            return result    
        } catch (error) {
            console.log(error)
            return -1
        }
        
        
    }

    async post_product(form_body, discord_id) {
        try {
            // post_product: "INSERT INTO products (discord_id, title, content, timestamp) VALUES (?, ?, ?, ?)",

            let product_options = [
                this.generateHash(),
                form_body.product_name,
                form_body.product_description,
                // new Date()
            ]

            let result = await this.query(this.queries.product.post_product, product_options)            
        } catch (error) {
            console.log(error)
        }

    }

    async post_review(review_object, discord_id) {
        // START TRANSACTION; 
        //     INSERT INTO `reviews` (`rating`, `title`, `content`) 
        //         VALUES ('5', "B??sta n??gonsin", ''); 
        //     INSERT INTO `product_reviews` (`user_id`, `review_id`, `product_id`) 
        //         VALUES ((SELECT id FROM users WHERE discord_id = '322015089529978880'), (SELECT LAST_INSERT_ID() ), (SELECT id FROM products WHERE hash = 'pckXI3A')); 
        // COMMIT;
        console.log(review_object)
        console.log([parseInt(review_object.rating, 10), review_object.title, review_object.content, review_object.date, discord_id, review_object.hash ])

        let result;
        try {
            // START TRANSACTION; INSERT INTO `reviews` (`rating`, `title`, `content`) VALUES (?, ?, ?); INSERT INTO `product_reviews` (`user_id`, `review_id`, `product_id`) values ((SELECT id FROM users WHERE discord_id = ?), (SELECT LAST_INSERT_ID() ), (SELECT id FROM products WHERE hash = ?)); COMMIT;
            // let result1 = await this.query("INSERT INTO `reviews` (`rating`, `title`, `content`) VALUES (?, ?, ?)", [review_object.rating, review_object.title, review_object.content,])
            // let result2 = await this.query("INSERT INTO `product_reviews` (`user_id`, `review_id`, `product_id`) values ((SELECT id FROM users WHERE discord_id = ?), (SELECT LAST_INSERT_ID() ), (SELECT id FROM products WHERE hash = ?))", [discord_id, review_object.hash])
            result = await this.query(this.queries.review.post_review, [review_object.rating, review_object.title, review_object.content, discord_id, review_object.hash ])
            
            return result;    
        } catch (error) {
            console.log(error)
            return null 
        }
        

        
    }

    async fetch_product(hash) {
        let fetched_product, return_error;
        // fetched_product = await this.query(`SELECT pr.product_id, p.name, p.description FROM product_reviews pr INNER JOIN products p ON ( pr.product_id = p.id  ) WHERE p.hash = ? LIMIT 1`, [hash])
        
        fetched_product = await this.query(`SELECT p.hash, p.name, p.description, AVG(r.rating) as AverageRating FROM products p INNER JOIN product_reviews pr ON pr.product_id = p.id INNER JOIN reviews r ON pr.review_id = r.id WHERE p.hash = ? LIMIT 1`, [hash])
        

        if (fetched_product.length < 1)
        {
            return_error = "Product does not exist"
            return [fetched_product, return_error]
        }

        fetched_product[0].AverageRating = Math.round(fetched_product[0].AverageRating);
        fetched_product[0].pictures = await this.query(this.queries.product.product_pictures, hash)

        console.log(fetched_product)
        return [fetched_product, return_error]

    }

    async fetch_product_reviews(hash, low_lim=0, high_lim=10) {
        try {
            let fetched_reviews, return_error;
            // SELECT r.rating, r.title, r.content, r.created_at, 
            //           u.profile_picture, u.is_moderator, u.nickname
            // FROM product_reviews pr 
            //     INNER JOIN reviews r ON ( pr.review_id = r.id  )  
            //      INNER JOIN users u ON ( pr.user_id = u.id)
            //      INNER JOIN products p ON (pr.product_id = p.id)
            // WHERE p.hash = "03jk55b";
            
            fetched_reviews = await this.query(`SELECT r.rating, r.title, r.content, r.created_at, u.profile_picture, u.is_moderator, u.nickname FROM product_reviews pr INNER JOIN reviews r ON ( pr.review_id = r.id  )  INNER JOIN users u ON ( pr.user_id = u.id) INNER JOIN products p ON (pr.product_id = p.id) WHERE p.hash = ?  GROUP BY pr.id LIMIT ? OFFSET ?`, [hash,  parseInt(high_lim, 10), parseInt(low_lim, 10)])
            
            if(fetched_reviews.length < 1)
            {
                return_error = "No reviews on this product"
            }

            return [fetched_reviews, return_error]
            
        } catch (error) {
            
        }
    }


}

// module.exports = User
export { User, Product }