const express = require('express')
const app = express()

app.set('view engine', 'ejs');

app.get('/:numara/:isim', function (req, res) {
  if(req.params.numara.length>10 || req.params.numara.length<10){
      res.json({ "status":404, "desc":"gecersiz-num" })
  } else {
      res.render('index', {numara: req.params.numara, isim: req.params.isim});
  }  
})

app.listen(80)
console.log(`Your app is listening on http://localhost`)