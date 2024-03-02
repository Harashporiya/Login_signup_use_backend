const express = require("express") 

const {connectedToMonogDB} = require("./connect")
const PORT = 5000;

const cors = require('cors')
const userRoute = require("./route/user")
const app = express();

app.use(cors());
app.use(express.json());

app.use("/user", userRoute)


connectedToMonogDB('mongodb://127.0.0.1:27017/loginSignup')
.then(()=>console.log("Mongodb Connected"))

// app.get('/api/user', (req,res)=>{
//     return res.json(userRoute)
// })



app.listen(PORT,()=>console.log(`Server Started at PORT: ${PORT}`))