const express = require('express')
const mongoDB=require("./db.js")
const app = express()
const port = 5000
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5000");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())

app.use('/api',require("./Routes/CreateUser.js"))
app.use('/api',require("./Routes/DisplayData.js"))
app.use('/api',require("./Routes/OrderData.js"))
app.use('/api',require("./Routes/Discussions.js"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})