const express = require('express')
const app = express()
const { base64encode, base64decode } = require('nodejs-base64');

app.set('view engine', 'ejs');

app.get('/:numara/:isim/:desc/:pfp/:img/', function (req, res) {
  let numara = base64decode(req.params.numara);
  let isim = base64decode(req.params.isim);
  let desc = base64decode(req.params.desc);
  let pfp = base64decode(req.params.pfp);
  let img = base64decode(req.params.img);
  if(numara.length>10 || numara.length<10){
      res.json({ "status":404, "desc":"gecersiz-num" })
  } else {
      console.log(`${numara}/${isim}/${desc}/${pfp}/${img}`)
      
      res.render('index', {numara: numara, isim: isim, desc: desc, pfp: pfp, img: img});

  }  
})


app.listen(80)
console.log(`Your app is listening on http://localhost`)