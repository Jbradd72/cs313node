const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const d3 = require('d3-dsv');
const execSync = require('child_process').execSync;
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg')

const pool = new Pool({
    user: 'oauioygfesuijs',
    host: 'ec2-54-235-193-0.compute-1.amazonaws.com',
    database: 'd325338gdhf4to',
    password: '6b6ee4e947aa25b4f4e2adec304c9f81fc26b4836f23d4455795f8801c97eef3',
    port: 5432,
  }) 
/* const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'nflproject',
  password: 'admin',
  port: 5432,
}) */

express()
  .use(express.static(path.join(__dirname, 'public')))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/getSchedule', (req, res) => {
    var week = req.query.week;
    if (req.query.week === undefined || !(week <= 17 && week >= 1)) week = 17;
    var games = loadWeek(week);
    res.write(JSON.stringify(games))
    res.end();
  })
  .get('/getPicks', (req,response)=>{
    var week = req.query.week;
    var username = req.query.username;
    pool.query("select * from users join picks on users.id = picks.userid and week = $1 where username = $2;", 
      [week, username], (err,data)=>{
        
      if (err) throw err;
      if(data.rowCount == 0){
        response.write(JSON.stringify({success:false, message: "You haven't made any picks yet"}));
        response.end();
      }
      else{
        response.write(JSON.stringify({success:true, message:data.rows[0].picks}));
        response.end();
      }
    })
  })
  .post('/savePicks', (req,response)=>{
    var games = req.body.games;
    var username = req.body.username;
    var week = req.body.week;

    savePicks(games,username, week).then((res)=>{
      console.log(res);
      response.write(JSON.stringify(res));
      response.end();
    }).catch((err)=>{throw err});
  })
  .post('/getUser', (req, response) => {
    var auth = [req.body.username, req.body.password];
    pool.query("SELECT username FROM users WHERE username = $1 AND password = $2;", auth, (err, res) => {
      if (err) {
        throw err
      }

      console.log('person:', res.rows.length);
      if (res.rows.length === 1) {
        var resObj = { username: res.rows[0].username, success: true };
        response.write(JSON.stringify(resObj));
        response.end();
      }
      else {
        response.write(JSON.stringify({ success: false }))
        response.end();
      }

    })
  })
  .post('/addUser', (req, response) => {
    var auth = [req.body.name, req.body.username, req.body.email, req.body.password];
    addUser(auth).then((res)=>{
      console.log(res);
      response.write(JSON.stringify(res));
      response.end();
    })
    
  })
  .get('/findWinner', (req, res) => {
    var home = req.query.home;
    var away = req.query.away;

    console.log(home + away);
    var result = execSync(`java -jar Web_Scraping.jar ${home} ${away}`);

    res.write(result.toString());
    res.end();
  })

  .listen(PORT, () => console.log("Listening!"));

function loadWeek(week) {
  var table = fs.readFileSync("./db/schedule.csv").toString();
  var rows = d3.csvParse(table);
  var thisWeek = rows.filter((row) => row.Week == week);
  var formattedWeek = thisWeek.map((game) => { return { Home: game.Home, Away: game.Away } });

  return formattedWeek;
}

function savePicks(games, username, week){
  return new Promise((resolve, reject)=>{
    pool.query("select id from users where username=$1", [username], (err,res)=>{
      if (err) reject(err);
      if(res.rowCount == 0) resolve({success:false});
      else{
        var id = res.rows[0].id;
        pool.query("insert into picks (userid, week, picks) VALUES($1, $2, $3);", [id,week,JSON.stringify(games)], (err,res)=>{
          if(err) reject(err);
          console.log("successfully added picks");
          resolve({success: true});
        } )
      }
    })
  })
}

function addUser(auth) {
    return new Promise((resolve, reject)=>{
      console.log(auth[1]);
      pool.query("select username from users where username=$1;", [auth[1]], (err, res) => {
        
      console.log(res.rowCount);
        if (err) reject(err)
      if (res.rowCount > 0) resolve(true);
      else resolve(false);
    })})
    .then((val)=>{
      console.log("val = " + val);
      if (val === false) {
       return new Promise((resolve, reject)=>{
          pool.query("INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4);", auth, (err, res) => {
          if (err) reject(err);
          console.log(`Successfully created ${auth[1]}`);
          resolve({ success: true });
          
        })})
      }
      else {
        console.log(`Error in creating ${auth[1]}`)
        return { success: false, error: "Username already taken" };
      }
    })
    .catch((err)=> {throw error;})
  }


