const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const authenticateToken = require("../middleware");

const pool = require("../database/connectDB");

router.put("/:id", authenticateToken, async (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Task details are missing in the request body' });
    }

    const taskId = req.params.id;
    
    const taskDetails = req.body;
    const {
        title, 
        description,
        status, 
        assignee_id, 
        created_at, 
        updated_at
    } = taskDetails;
    const addTaskQuery = `
        UPDATE 
            Tasks 
        SET
            title='${title}', 
            description='${description}',
            status='${status}', 
            assignee_id=${assignee_id}, 
            created_at=${created_at}, 
            updated_at=${updated_at}
        WHERE
            id=${taskId}
    `;
    pool.query(addTaskQuery, (err, result)=>{
        if (err){
            console.log('Error: ' + err);
            res.status(500).send('Error while inserting data into database');
        }else{
            res.send({'response': "Updated Successfully"});
        }
    })    
});

module.exports = router;