const express = require("express");
const messages = require("./messages.json");
const file = require("fs");

const myApp = express();
const PORT = 3000;

myApp.use(express.urlencoded({ extended: false }));


myApp.get("/messages", (req, res) => {
  const output = `
    <table border=1>
       <tr>
            <th>Id</th>
            <th>Sender</th>
            <th>Message</th>
        </tr>
    ${messages.map((item) =>
    `
         <tr>
            <td>${item.id}</td>
            <td>${item.sender}</td>
            <td>${item.message}</td>
        </tr>
      `
  ).join('')}
    </table>
  `;
  return res.send(output);
});

myApp.post("/messages", (req, res) => {
  console.log("Req Received....");
  const newMessage = req.body;
  messages.push({ ...newMessage, id: messages.length + 1 });
  file.writeFile("./messages.json", JSON.stringify(messages), (err) => {
    if (err) {
      return res.end("Error saving message");
    }
    else {
      console.log("Message Entered...");
      return res.end("Message Entered...");
    }
  });
});



myApp.listen(PORT, () => {
  console.log(`Server Started on port : ${PORT}`);
});