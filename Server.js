const express =require('express');

const bodyParser = require('body-parser');

const myBlockchain = require('./simpleChain.js')();

const Block = require('./Block.js')


const app =express();

const port= 8000;


app.use(bodyParser.json());


app.get('/block/:height' , async (req , res) =>{
    let block = await myBlockchain.getBlock(req.params.height);

    if(block){
        res.json(block)
    }else{
        res.send('height does not exists')
    }

});



app.post('/block' , async (req ,res) =>{
    
    let data = req.body.data;
    if(data){
    let newBlock = await myBlockchain.addBlock(new Block(data));

    if(newBlock){
        res.json(newBlock);
    }else {
        res.status(500).end()
    }
}
else {
    res.send('block cannot be null')
}
})



app.listen(port , () => console.log('up & running '));