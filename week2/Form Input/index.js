const express = require("express");
const path = require("path");
const fs = require("fs");
const myApp = express();


const loadfile =  () => {
  try{
    return JSON.parse(fs.readFileSync("./data.json", "utf-8"));
  }
  catch(err){
    console.error("Error Loading Data", err);
    return [];
  }
};

const PORT = 3000;

myApp.use(express.urlencoded({ extended: true }));

myApp.get("/", (req, res) => {
  console.log("Request Received....");
  res.sendFile(path.join(__dirname, '/index.html'));
})

myApp.post("/", (req, res) => {
  const received = req.body;
  const data = loadfile();
  data.push({ ...received, id: data.length + 1 });
  fs.writeFile("./data.json", JSON.stringify(data), (err) => {
    if (err) {
      return res.send("Unable To Input Data....");
    }
    else {
      const output = `
    <div>
      <span>Received Name : </span>
      <span>${received.name}</span><br>
      <span>Received Email : </span>
      <span>${received.email}</span><br>
    </div>
  `
      return res.send(output);
    }
  })
})

myApp.get("/userlist", (req, res) => {
  const data = loadfile();
  const output = `
    <table border=1>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
      ${data.map((item) => `
        <tr>
          <td>${item.id}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
        </tr>
        `).join("")}
    </table>
  `
  res.end(output);
});


myApp.listen(PORT, () => {
  console.log("Server Started At Port No : ", PORT);
})