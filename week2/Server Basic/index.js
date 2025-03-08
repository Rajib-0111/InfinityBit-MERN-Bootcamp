const express = require("express");

const myApp = express();
const PORT = 5000;

myApp.use(express.urlencoded({extended: false}));


myApp.get("/", (req, res)=>{
  console.log("Home Page Request Received...");
  const output = `
    <h2>This Is Home Page</h2>
  `
  return res.send(output);
})

myApp.get("/about", (req, res) => {
  console.log("About Page Request Received...");
  const output = `
    <h2>This Is About Page</h2>
  `
  return res.send(output);
})

myApp.post("/", (req, res) => {
  const input = req.body;
  console.log("Received Input : ", input);
  return res.send("Input Received");
})




myApp.listen(PORT, () => {
  console.log(`Server started at port : ${PORT}`);
})