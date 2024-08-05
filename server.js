const express =require("express");
const errorHandler = require("./Middleware/ErrorHandler");

const connectDb = require("./config/dbConnection");
const dotenv=require("dotenv").config();

connectDb();
const app = express();

const PORT =process.env.PORT || 5000;


app.use(express.json());
app.use("/api/contacts" , require("./routes/contactRoute"));
app.use("/api/users" ,require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT,() =>{
    console.log(`Am up baby on !!! port ${PORT}`);
})