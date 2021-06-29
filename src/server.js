import express from "express"
import dotenv from "dotenv";
import router from "@routes/router.js";

dotenv.config();
const PORT = process.env.PORT || 80;

const app = express();

app.set('view engine', 'pug')
app.set('views', './dist/templates')

app.use(router);
app.use(express.static('dist/public'))

app.listen(PORT, () =>{
    console.log(`Server started on port: ${PORT}`)
})