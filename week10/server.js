const express = require('express');
const path = require('path');
const PORT = 8888;

const { Pool } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'familyhistory',
    password: 'admin',
    port: 5432,
  })

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('view engine', 'ejs')
  .get('/getPerson', (req,response) => {
        var id = req.query.id;

        pool.query('SELECT * FROM person WHERE id = $1', [id], (err, res) => {
            if (err) {
                throw err
            }
            response.write(JSON.stringify(res.rows[0]))
            response.end()
            console.log('person:', res.rows[0])
        })
        
    })
  .listen(PORT, ()=>console.log(`Listening on port: ${PORT}`));