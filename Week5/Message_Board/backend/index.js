const express = require("express");
const message = require("./messages.json"); 
const fs = require("fs");
const { error } = require("console");
const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server Started At Port : ${PORT}`);
})

app.get("/api/messages", (req, res) => {
  res.send(message);
})

app.post("/api/messages", (req, res) => {
  console.log(req.body);
  message.push({...req.body, "id" : 1000 + message.length});
  fs.writeFile("messages.json", JSON.stringify(message), (error) => {
    if(error){
      res.send(`Error Occured : ${error}`);
    }
    else{
      res.send("Message Entered Successfully...");
    }
  })
})