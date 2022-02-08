import mysql from "mysql";
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
        this.connection_type = "";
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err) return reject(err);
                else return resolve();
            })
        })
    }

    close() {
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
        this.id = 0

    }

    // loads existings user when user logs in
    load_user() {
        // user_content = this.query("", "SELECT profile_picture, username, firstname, lastname, email, phone, reporst FROM user") eller något
    }
    
    user_exists() {
        try {
            let result = await Con.query(
                `SELECT EXISTS(SELECT id FROM users WHERE discord_ID = ?)`,
                [discord_id]
            );
    
            Con.close();
    
            // Om resultatet är null och längden inte är större än 0 så finns inte användaren 
            if (!result[0] && !result.length > 0) return false;
            
            return true; // Antar annnars att användaren finns
                
        } catch (error) {
            return error
        }
    }

    create_user() {
        this.profile = {
            profile_picture: "",
            username: "",
            firstname: "",
            lastname: "",
            email: "",
            phone: [],
            created_at: new Date(),
            reports: 0, // Hidden, only visible to Admins
            refresh_token: null
        }

        try {
            this.query("INSERT INTO users VALUES (?,?,?,?,?,?,?)", {})    
        } catch (error) {
            return error
        }
    }

    // Behövs dessa?
    login() {

    }

    logout() {

    }
    //

    update_user() {

    }

    create_user_review(product_hash, content) {
        fetched_product = await this.query(`UPDATE products FROM products WHERE hash = ?`, [hash])
    }

    get_user_reviews() {

    }

    edit_user_review() {

    }

    remove_user_review() {

    }

    // Ta bort all reviews (Alla förekomster av en användare i databasen)
    delete_user() {

    } 

}

class Product extends Database {
    constructor() {
        super()
        this.product = {
            name: "",
    
        }
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

module.exports = User
export { User }