const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const pool = require("../database/connectDB");
let encPassword;
router.post("/", async (req, res) => {
    const { username, password } = req.body;
    //console.log("username: " + username);    

    bcrypt.hash(password, 10, function(err, hash) {
        if(err){
            throw err;
        }else{
            encPassword = hash;
            //console.log("password: " + encPassword);
            const selectUserQuery = `SELECT * FROM Users WHERE username = '${username}'`;
            pool.query(selectUserQuery, (err,result) =>{
                if(err){
                    res.send("Error: " + err);
                }else{
                    if (result.username === username){
                        res.status(400).send("User already exists");
                    }else{
                        const registerUserQuery = `
                        INSERT INTO 
                        Users (username, password_hash) 
                        VALUES 
                        (
                            '${username}', 
                            '${encPassword}'
                        )`;
                        pool.query(registerUserQuery,(err,results) => {
                            if (err){
                                res.send("Error while registering User! " + err);
                            }else{
                                res.send({"userId" : results.insertId});
                            }
                        })
                    }
                }
            }) 
        }
    });
});

module.exports = router;