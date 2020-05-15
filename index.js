const http = require('http');
const express = require('express');
const app = express();
const Keyv = require('keyv');
const keyv = new Keyv(process.env.db, {'namespace': 'binz-app-count'});
var returntwo = false;
var returnthree = false;

let port = process.env.PORT;

app.use(express.static('public'));

app.post("/", async function(req, res) {
  var stringcount = await keyv.get('count').catch(async function(err) {
    const keyvtwo = new Keyv(process.env.db, {'namespace': 'binz-app-count'});
    var stringcounttwo = await keyvtwo.get('count');
    var numbercounttwo = await Number(stringcounttwo);
    var counttwo = numbercounttwo+1;
    var finalcounttwo = counttwo.toString();
    returntwo = true;
    return;
  });
  if(returntwo !== true){
    var numbercount = await Number(stringcount);
    var count = numbercount+1;
    var finalcount = count.toString();
  } else {
    returntwo = false;
    process.kill(0);
  }
  await keyv.set('count', finalcount);
  await res.header("Access-Control-Allow-Origin", "https://binz.now.sh");
  await res.header("Access-Control-Allow-Headers", "Content-Type: application/xml");
  res.status(200).send('Ok.');
});

app.get("/count", async function(req, res) {
  var count = await keyv.get('count').catch(async function(err) {
    const keyvthree = new Keyv(process.env.db, {'namespace': 'binz-app-count'});
    var countthree = await keyvthree.get('count');
    res.status(200).send(`COUNT: ${countthree}`);
    returnthree = true;
    return;
  });
  if(returnthree !== true){
    res.status(200).send(`COUNT: ${count}`);
  } else {
    returnthree = false;
    process.kill(0);
  }
});

const listener = app.listen(port, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
