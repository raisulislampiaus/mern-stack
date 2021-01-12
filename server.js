 require('dotenv').config()
 const express = require('express')
 const mongoose = require('mongoose')
 const cors = require('cors')
 const fileUpload = require('express-fileupload')
 const cookieParser = require('cookie-parser')
 const path = require('path')


 const app = express()
 app.use(express.json())
 app.use(cookieParser())
 app.use(cors())
 app.use(fileUpload({
     useTempFiles: true
 }))


  app.use('/user', require('./routes/userRouter'))
  app.use('/api', require('./routes/cetegoryRouter1'))
  app.use('/api', require('./routes/uploadRouter'))
  app.use('/api', require('./routes/productRouter'))
  








  
 const URI = process.env.MONGODB_URL
 mongoose.connect(URI, {
     useCreateIndex: true,
     useFindAndModify: false,
     useNewUrlParser: true,
     useUnifiedTopology: true
 }, err =>{
     if(err) throw err;
     console.log('mongodb connect')
 })



 

 const PORT = process.env.PORT || 6000
 app.listen(PORT, ()=>{
     console.log('port is running', PORT)
 })
