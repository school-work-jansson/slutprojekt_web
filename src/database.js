import mysql from "mysql";
// https://www.w3schools.com/js/js_class_inheritance.asp

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

    // open() {
    // }

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
        
        this.profile = {
            profile_picture = "",
            username = "",
            firstname = "",
            lastname = "",
            email = "",
            phone = [],
            reports = 0, // Hidden, only visible to Admins
            two_step_auth = null, // unncesesary if user logs in using discord
            refresh_token = null
        }
    }

    // loads existings user when user logs in
    loadUser() {
        // user_content = this.query("", "SELECT profile_picture, username, firstname, lastname, email, phone, reporst FROM user") eller något
    }

    createUser() {
        try {
        // this.query("", )    
        } catch (error) {
            
        }
    }

    signIn() {}

    signOut() {}

    // updateUser() {} Vet ej om man ska ha en updateUser funktion eller om man ska ha mass olika funktioner

    updatePhone() {}

    updateEmail() {}

    updateNick() {}

    addReview(item_id, content) {}

    getReviews() {}

    removeUser() {} // Ta bort all reviews (Alla förekomster av en användare i databasen)

}

class Product extends Database {
    constructor() {
        this.product = {
            name: "",
    
        }
    }

    getReviews() {

    }
}

module.exports = User
export { User }