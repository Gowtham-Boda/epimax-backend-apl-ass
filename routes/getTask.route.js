const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware");

const pool = require("../database/connectDB");

router.get("/:id", authenticateToken,(req, res) => {
    const taskId  = req.params.id;   
    const getTaskQuery = `
        SELECT
            *
        FROM
            Tasks
        WHERE
            id = ${taskId}`;

    pool.query(getTaskQuery, (err, results) => {
        if (err){
            console.log('Error: ' + err);
            res.status(500).send('Error fetching data from database');
        }else{
            res.json(results)
        }
    })
    
});

module.exports = router;