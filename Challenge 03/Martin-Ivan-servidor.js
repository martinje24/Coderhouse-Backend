const express = require('express');
const Container=require('./contenedor');
const path = require('path');
let container=new Container('./','productos.txt')
const app=express();
const PORT=8080;

const server=app.listen(PORT,()=>{
    console.log(`HTTP Server listening at port ${server.address().port}`)
});

server.on("error",error=>console.log(`Error at server: ${error}`));

app.get('/',async (req,res)=>{
    //res.send("Visit our two web pages")
    res.sendFile(path.join(__dirname, '/index.html'));
})

app.get('/productos',async (req,res)=>{
    let json_file=await container.getAll()
    res.end(JSON.stringify(json_file, null,'\t'))
})

app.get('/productoRandom',async (req,res)=>{
    const json_file=await container.getAll()
    const json_length=json_file.length
    const randomId=pickRandomNumber(json_length)
    const json_by_ID=await container.getById(randomId)
    console.log(`The choosen number is: ${randomId}`)
    res.end(JSON.stringify(json_by_ID, null,'\t'))
})

/*Functions to use in the Express.js App*/
const pickRandomNumber=(max_number)=>{
    return Math.floor(Math.random()*max_number)+1;
}