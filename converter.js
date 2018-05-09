var request = require("request");
var fs = require("fs");
var http = require("http");
var clc = require("cli-color");
var currentDate = new Date();

var converter = request("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5 ", function(err, res, body) {  
	var courses = "";
	var obj = JSON.parse(body);
	var data = fs.readFileSync("courses.html", "utf8");
	for(i = 0; i < obj.length; i++){
      	var rate = obj[i].ccy + " : Buy : " + obj[i].buy + " > Sale : " + obj[i].sale;
      	str = JSON.stringify(rate).replace(/\"/g, "");
      	courses += str + "\n";
    }  

    fs.writeFile("courses.html", courses, function (err) {
		if(err){
	  		throw err;
		}
	});
    console.log(clc.green(data));

    http.createServer( function(req, res) {
    	res.write("Your exchange rates from PB\n");
		fs.readFile("courses.html", function(err, data) {
        	res.write(data);
        	res.end();
    	});
	}).listen(3000, function() {
    	console.log("Server on localhost:3000");
	});
});	

module.exports = converter;
module.exports = currentDate;