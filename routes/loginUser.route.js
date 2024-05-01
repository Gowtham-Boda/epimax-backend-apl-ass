const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database/connectDB");

router.post('/', async(req,res) => {
    const { username, password } = req.body;
    const selectUserQuery = `SELECT * FROM Users WHERE username = '${username}'`;
    console.log(selectUserQuery);
    pool.query(selectUserQuery, async (err,result)=> {
        if(err){
            console.log("Err: " + err);
        }else{
            if (result[0]['username'] === username){
                // console.log("loginuser_Password: " + password);
                // console.log("db_Password: " + result[0]['password_hash']);

                const isPasswordMatched = await bcrypt.compare(password, result[0]['password_hash']);
                if(isPasswordMatched === true){
                    // ********** without JWT authentication ***********    
                    // res.status(200).send("Login Success");

                    // ********** With JWT authentication **********
                    const payload = { username };
                      const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
                      res.send({ jwtToken });

                    // { "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlamEiLCJpYXQiOjE3MTQ1Mjc2NjJ9.-g2vbPLEsLgB9fbNwg-2_qZ_ByvYxWpj-D4cew2F2ro" }
                }
                else{
                    res.status(400).send("Invalid Password");
                }
            }else{
                res.status(400).send("Invalid User");
            }
        }
    })
})

module.exports = router;