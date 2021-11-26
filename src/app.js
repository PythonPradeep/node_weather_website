const path = require("path")
const express = require("express");
const hbs = require("hbs");
 const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// const { title } = require("process");
const app = express();

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'))

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to server
app.use(express.static(publicDirectoryPath))

// write a function to what will show on the browser
// app.get("", (req, res) => {
//   res.send("<h1>Weather!</h1>");
// });

// app.get("/help", (req, res) => {
//   res.send({
//     name:"pradeep",
//     age: 20
//   });
// });

app.get('', (req, res) => {
  res.render('index',{
    title: "Weather !",
    name:"pradeep"
  })
})

app.get('/about', (req, res) => {

  res.render("about", {
    title: "About me",
    name: "Pradeep"
  })
})

app.get("/help",(req, res) => {
  res.render("help", {
    HelpText:"This page is a help page!",
    title:"Help",
    name:"Pradeep"
  })
})

app.get("/weather", (req, res) => {
  if(!req.query.address){
    return res.send("You must provide an address")
  }

geocode(req.query.address, (error, address) => {
  if(error){
    res.send({ error})
  }

  forecast(req.query.address, (error, forecastData) => {
    if(error){
      res.send({error})
    }

    res.send({
      forecast:forecastData,
      location:address,
      address:req.query.address
    })

  })

})

//   res.send({
//     forecast : "mist",
//     location : "Chennai",
//     address : req.query.address
//   });
   })



app.get("/products", (req, res)=>{
  if(!req.query.search){
    return res.send({
      error:"You must provide a search term!"
    })
  }

  console.log(req.query.search)
  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  // res.send("Help page not found!")
  res.render("404", {
    title:"404",
    name:"Pradeep",
    errorMessage:"Help page not found!"
  })
})

app.get('*', (req, res)=> {
  // res.send("My 404 Page")
  res.render("404", {
    title:"404",
    name: 'Pradeep',
    errorMessage:"Page not found!"
  })
})

// app.get("/about", (req, res) => {
//   res.send("<h1>About</h2>");
// });

// app.com
// app.com/help
// app.com/about

app.listen(3000, () => {
  console.log("The server is up on port 3000");
});