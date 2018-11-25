const fs = require('fs');
const d3 = require('d3-dsv');

function loadWeek(week){
  var table = new Promise((resolve, reject)=>
            fs.readFile("./db/schedule.csv", (err, data)=>{
                if (err)  reject(err)
                resolve(data.toString());
            }))
   table.then((table)=>{
        var rows = d3.csvParse(table);
        var thisWeek = rows.filter((row)=> row.Week == week);
        var formattedWeek = thisWeek.map((game)=> {return {"Home" : game.Home,"Away" : game.Away}});
        return formattedWeek;
   })
}

loadWeek(11);