//  repository.js 
'use strict';

var mysql = require('mysql');

class Repository {
    constructor(connection) {
        this.connection = connection;
    }

    getUsers() {
        return new Promise((resolve, reject) => {

            this.connection.query('SELECT email, phoneNumber FROM users', (err, results) => {
                if (err) {
                    return reject(new Error('An error occured getting the users: ' + err));
                }

                resolve((results || []).map((user) => {
                    return {
                        email: user.email,
                        phone_number: user.phone_number
                    };
                }));
            });

        });
    }

    getUserByEmail(email) {

        return new Promise((resolve, reject) => {

            //  Fetch the users.
            this.connection.query('SELECT email, phoneNumber FROM users WHERE email = ?', [email], (err, results) => {

                if (err) {
                    return reject(new Error('An error occured getting the user: ' + err));
                }

                if (results.length === 0) {
                    resolve(undefined);
                } else {
                    resolve({
                        email: results[0].email,
                        phone_number: results[0].phone_number
                    });
                }

            });

        });
    }

    disconnect() {
        this.connection.end();
    }
}

//  One and only exported function, returns a connected repo.
module.exports.connect = (connectionSettings) => {
    return new Promise((resolve, reject) => {
        if (!connectionSettings.host) throw new Error("A host must be specified.");
        if (!connectionSettings.user) throw new Error("A user must be specified.");
        //if (!connectionSettings.password) throw new Error("A password must be specified.");
        if (!connectionSettings.port) throw new Error("A port must be specified.");

        resolve(new Repository(mysql.createConnection(connectionSettings)));
    });
};