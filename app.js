const express = require('express');
require('dotenv').config();
const app = express();
app.use(express.json());
const connectDB = require('./db/mongoose');
connectDB()
const userRoute = require('./routes/user');
const rolesRoute = require('./routes/roles');
app.use('/api/user',userRoute);
app.use('/api/role',rolesRoute);
const PORT = parseInt(process.env.PORT) || 3000;
app.listen(PORT,()=>{
    console.log("app is successfully running on port ==>",PORT);
})