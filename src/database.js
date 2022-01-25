const Connection = require("mysql/lib/Connection");

// https://www.w3schools.com/js/js_class_inheritance.asp

class Database {
    constructor() {
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

    open() {

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
    }

    signIn() {

    }

    signOut() {

    }

    updateProfile() {

    }

}

module.exports = User