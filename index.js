import express from 'express'
import fs from 'fs'
import path from 'path'

const app = express();
const PORT = 8000;
const outputFolder = "./dataTime";

if (!fs.existsSync(outputFolder)) {
  fs.mkdirSync(outputFolder);
}

app.get("/createFile", (req, res) => {
  const currentTime = new Date();

  const year = currentTime.getFullYear().toString();
  const month = (currentTime.getMonth() + 1).toString();
  const date = currentTime.getDate().toString();
  const hours = currentTime.getHours().toString();
  const mins = currentTime.getMinutes().toString();
  const secs = currentTime.getSeconds().toString();

  const dateTimeForFileName = `${year}-${month}-${date}_${hours}-${mins}-${secs}.txt`;
  const filePath = path.join(outputFolder, dateTimeForFileName);

  console.log("filePath:", filePath);

  fs.writeFile(filePath, currentTime.toISOString(), (err) => {
    if (err) {
      res.status(500).send(`Error creating file: ${err}`);
      return;
    }

    res.send(`File created successfully at: ${filePath}`);
  });
});

app.get("/getFiles", (req, res) => {
  fs.readdir(outputFolder, (err, files) => {
    if (err) {
      res.status(500).send(`Error reading directory: ${err}`);
      return;
    }
    console.log("files", files);
    const textFiles = files.filter((file) => path.extname(file) === ".txt");

    res.json(textFiles);
  });
});

app.listen(PORT, () => {
  console.log("Server is running on PORT", PORT);
});