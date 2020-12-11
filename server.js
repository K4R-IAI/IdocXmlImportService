const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const { request, response } = require('express');
const fs =  require('fs');
const app = express();
const port = 3000;
var fext = 0;
let obj = [];
var read1 = 0;
var read2 = 0;
app.use(cors());



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.post('/xmlIDOC', (req, res) => 
  {

    if(read1==0)
    {
      let jsonData = require('./filenames.json');
      read1=1; 
      console.log(jsonData);
      fext = jsonData.lastfileint;
    }
    fext +=1;
    const xmlIDOC = req.body.xmlIDOC;
    var name = "idocdata" + fext+".xml";
    fs.writeFileSync(name, xmlIDOC);
    fs.writeFileSync('filenames.json', "{ \"lastfileint\" : "+fext+"}" );
    console.log(fext);
    res.send('New xml IDOC content inserted to the platform k4r');
});


app.get('/getLastXMLEntry', (req, res) => {
  if(read2==0)
  {
    let filecounter = require('./filenames.json');
    read2=1;
    console.log(filecounter);
    fext = filecounter.lastfileint;
  }
  else
  {
    fext +=1;
  }

while(fext>0)
{
  var xmlIDOC = "idocdata" + fext+".xml"
  if(fs.existsSync('./'+xmlIDOC))
  {
    var data = fs.readFileSync('./'+xmlIDOC, 'utf8');
    res.send(data);
    break;
  }
else
  fext -=1;
  
}

});

app.listen(port, () => console.log(`xml IDOC endpoint listening on port ${port}!`));

