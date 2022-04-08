
const express = require('express')
const app = express()

var HTTP_PORT = 5000;

const server = app.listen(HTTP_PORT, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});



app.get('/app', (req, res) => {
    res.status(200).send('200 OK')
    res.type("text/plain")
})


app.get('/app/flip', (req, res) => {
    res.status(200).json({ 'flip' : coinFlip()})
})


 app.get('/app/flips/:number', (req, res) => {
     var flips = coinFlips(req.params.number)
    res.status(200).json({ 'raw' : flips, 'summary' : countFlips(flips) })
 })

 app.get('/app/flip/call/:guess', (req, res) => {
     res.status(200).json(flipACoin(req.params.guess))
 })


 app.use(function(req, res) {
    res.status(404).send("404 NOT FOUND")
    // res.type("text/plain")
})


function coinFlip() {
    var num = Math.random();
    if (num > .5) {
      return "heads";
    } else {
      return "tails";
    }
  }

  function coinFlips(flips) {
    let arr = [];
    for (let i = 0; i<flips; i++) {
      var num = Math.random();
      if (num > .5) {
        arr[i]="heads";
      } else {
        arr[i]="tails";
      }
    }
    return arr;
  }

  function countFlips(array) {
  
    var numHeads = 0;
    var numTails = 0;
    for (let j = 0; j < array.length; j++) {
        if(array[j]=="heads"){
            numHeads++;
        } else if(array[j]=="tails"){
            numTails++;
        }
    }
    var obj = {tails: numTails, heads: numHeads}
    return obj;
  }

  function flipACoin(call) {
    let result = coinFlip();  
    if(call=="heads" && result=="heads") {
      return {call: call, flip: result, result: "win"}
    } else if(call=="tails" && result=="heads") {
      return {call: call, flip: result, result: "lose"}
    } else if (call=="heads"&&result=="tails") {
      return {call: call, flip: result, result: "lose"}
    } else if (call=="tails" && result=="tails") {
      return {call: call, flip: result, result: "win"}
    } else{
      return "Error: no input. \nUsage: node guess-flip --call=[heads|tails]"
    }
  }