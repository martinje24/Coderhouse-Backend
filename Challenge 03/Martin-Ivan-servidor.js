const express = require('express');
const Container=require('./contenedor');
let container=new Container('./','productos.txt')
const app=express();
const PORT=8080;

const server=app.listen(PORT,()=>{
    console.log(`HTTP Server listening at port ${server.address().port}`)
});

server.on("error",error=>console.log(`Error at server: ${error}`));

app.get('/',(req,res)=>{
    res.json(container.getAll())
})

app.get('/productos',(req,res)=>{
    res.send(container.getAll())
})

app.get('/productoRandom',(req,res)=>{
    res.send(container.getAll())
})