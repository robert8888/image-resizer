import express from "express"
import dotenv from "dotenv";
import router from "@routes/router";

dotenv.config();
const PORT = process.env.PORT || 80;

const app = express();


app.set('view engine', 'pug')
app.set('views', './dist/templates')

// app.get('/', (req,res) =>{
//     res.render('upload',  { title: 'Hey', message: 'Hello there!' })
// })

app.use(router);

app.listen(PORT, () =>{
    console.log(`Server started on port: ${PORT}`)
})