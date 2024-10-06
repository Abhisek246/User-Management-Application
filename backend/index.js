const express = require('express');
const mongoose = require('mongoose');
const app = express();
const routes = require('./routes/routes.js')
const cors = require('cors')

const connectDB = async()=>{
    await mongoose.connect(MONGO_URL)
    console.log('DB connected')
}

app.use(express.json())
app.use(cors())

app.use('/', routes);

connectDB()

app.listen(3000, ()=>{
    console.log('App is listening')
})