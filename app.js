const express = require('express');
const app = express()
    //var unirest = require("unirest");
var axios = require("axios").default;
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path');

//Config
//Template Engine
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
    //Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));



//Rota
app.get("/", (req, res, next) => {

    res.render('form')
});



app.post("/", function(req, res) {

    /*********************************************************************  API em Axios  *********************************************************************/


    var options = {
        method: 'GET',
        url: 'https://community-open-weather-map.p.rapidapi.com/weather',
        params: {
            q: req.body.city,
            units: 'metric'
        },
        headers: {
            'x-rapidapi-key': '733f49e96dmsh69ee05389121cfep136ffbjsn8df7c63fdc22',
            'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
        }
    };

    axios.request(options).then(function(response) {
        console.log(response.data);
        return res.json(response.data);

        // console.log(response.body);
    }).catch(function(error) {
        console.error(error);
        return res.send("Cidade não existe!" + "<br>" + '<input type="button" value="Go Back From Whence You Came!" onclick="history.back(-1)" />');

    });


    /*********************************************************************  API em Unirest  *********************************************************************/
    /*
    var requ = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");
    requ.query({
        "q": req.body.city,
        "lat": "0",
        "lon": "0",
        "callback": null,
        "id": "2172797",
        "lang": "null",
        "units": "metric",
        "mode": "html"
    });
    requ.headers({
        "x-rapidapi-key": "733f49e96dmsh69ee05389121cfep136ffbjsn8df7c63fdc22",
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "useQueryString": true
    });
    requ.end(function(response, err) {

        if (response.error) {

            return res.send("Cidade não existe!" + "<br>" + '<input type="button" value="Go Back From Whence You Came!" onclick="history.back(-1)" />')


        } else {

            return res.send(response.body + '<input type="button" value="Go Back From Whence You Came!" onclick="history.back(-1)" />');

        }
        // console.log(response.body);

    });*/


    /*  process.on("uncaughtException", function(error) {
         res.status(404);
         console.log("The exception was caught!")
         return res.send("Cidade não existe!" + "<br>" + '<input type="button" value="Go Back From Whence You Came!" onclick="history.back(-1)" />')
     }) */

});



app.listen(8081, function() {
    console.log("Servidor a funcionar na porta 8081!")
});