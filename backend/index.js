
const bodyParser = require('body-parser');
const express= require('express')
const app=express()
const mongoose= require('mongoose')
const dotenv= require('dotenv')
const cors= require('cors')
dotenv.config()

const routersUrls = require('./routes/users.js')
const routersBookmarks = require('./routes/bookmarks.js')
const routersRecipes = require('./routes/recipes.js')

app.use(bodyParser.json({limit : '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit : '30mb', extended: true}));
app.use(cors())
app.use(express.json())
app.use('/app',routersUrls)
app.use('/book',routersBookmarks)
app.use('/rec',routersRecipes)
app.use(express.json())

mongoose
    .connect(
        process.env.BD_connect,() =>
        console.log("database connected "));


app.listen(process.env.PORT || 3000 ,() => 
 console.log("server is running"));