const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware");

const pool = require("../database/connectDB");

router.delete("/:id", authenticateToken, (req, res) => {
    const taskId  = req.params.id;   
    const getTaskQuery = `
        DELETE FROM
            Tasks
        WHERE
            id = ${taskId}`;

    pool.query(getTaskQuery, (err, results) => {
        if (err){
            console.log('Error: ' + err);
            res.status(500).send('Error While deleting data from database');
        }else{
            // res.json(results);
            if (!results.affectedRows){
                res.json({"response":"Id not found!"})
            }
            else{
                res.json({'response': "Deleted Successfully"})
            }
        }
    })
    
});

module.exports = router;