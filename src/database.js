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

        this.queries = {
            user: {
                user_exists: "SELECT EXISTS(SELECT id FROM users WHERE discord_ID = ?)",
                get_user: "SELECT * FROM users WHERE discord_id = ?",
                create_user: "INSERT INTO users (discord_id, profile_picture, nickname, email, create_at, refresh_token) VALUES (?, ?, ?, ?, ?)",
                remove_user: "",
                update_refresh_token: "UPDATE users SET refresh_token = ?, valid_until = ? WHERE discord_id = ?",
            },
            product: {
                get_product: "SELECT * FROM products WHERE product_hash = ?",
                post_product: "INSERT INTO products (,,,) VALUES (?,?,?,)",
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
                if (err) { 
                    return reject(err); 
                }
                else {
                    this.close();
                    return resolve(result);
                }
                
            })
        })
    }

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

    // loads existings user when user logs in
    load_user() {
        // user_content = this.query("", "SELECT profile_picture, username, firstname, lastname, email, phone, reporst FROM user") eller något
    }

    async exists(discord_id) {
        try {
            let result = await this.query(
                this.queries.user.user_exists,
                [discord_id]
            );

            for (const key in result[0]) {
                if (Object.hasOwnProperty.call(result[0], key)) {
                    const element = result[0][key]; 
                    // om element(result) från databasen är 0 så finna inte användaren
                    // om result är 1 (element == true) så finns användaren
                    return (element == true)
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

    create(client_data, refresh_token) {
        // this.profile = {
        //     profile_picture: "",
        //     nickname: client_data.name,
        //     email: client_data.email,
        //     created_at: new Date(),
        //     reports: 0, // Hidden, only visible to Admins
        //     refresh_token: null
        // }

        this.profile = [
            client_data.id,
            null, 
            client_data.nickname,
            client_data.email,
            new Date(),
            refresh_token
        ]


        // INSERT INTO table_name (column1, column2, column3, ...)
        // VALUES (value1, value2, value3, ...); 
        try {
            this.query("INSERT INTO users (discord_id, profile_picture, nickname, email, create_at, refresh_token) VALUES (?, ?, ?, ?, ?)", this.profile)  
        } catch (error) {
            return error
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
            let result = await this.query(`UPDATE users SET refresh_token = ?, valid_until = ? WHERE discord_id = ?`, [refresh_token, valid_until, discord_id])
            this.close(); 


            return result && result.affectedRows >= 1;

        } catch (error) {
            console.log(error)
        }
    }

    update_user() {

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