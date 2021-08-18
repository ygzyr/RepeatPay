const express = require('express')
const app = express()
const { base64encode, base64decode } = require('nodejs-base64');
const config = require('./config.json')
const port = 3000

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
      res.render('profile', {numara: numara, isim: isim, desc: desc, pfp: pfp, img: img});
  }
})

app.get('/earlyuser/', function (req, res) {
  res.json({ "status":"✔", "quick-docs":"docs.repeatpay.ga" })
})

app.get('/earlyuser/:numaraa/:isimm/:descc/:pfpp/:imgg/', function (req, res){
  let numara = base64encode(req.params.numaraa);
  let isim = base64encode(req.params.isimm);
  let desc = base64encode(req.params.descc);
  let pfp = base64encode(req.params.pfpp);
  let img = base64encode(req.params.imgg);
  if(req.params.numaraa === '' || req.params.numaraa.length>10 || req.params.numaraa.length<10){
    res.json({ "message":"Yanlis_Numara_Girisi" })
  }
  res.json({ "status":"success", "url":`${numara}/${isim}/${desc}/${pfp}/${img}/`})
})

app.get('/', function (req, res){
  res.render('index')
})

app.get('/res/:number/:miktar/:name/', function (req, res){
  res.render('redirecting', {numara: req.params.number, miktar: req.params.miktar, isim: req.params.name})
})

// Custom Profiles
app.get('/:usersearch', function (req, res){
  if(req.params.usersearch == 'rexulec'){
    res.render('profile', {numara: config.rexulec.id, isim: config.rexulec.name, desc: config.rexulec.desc, pfp: config.rexulec.topphoto, img: config.rexulec.bottomphoto});
  } else if(req.params.usersearch == 'ygz'){
    res.render('profile', {numara: config.ygz.id, isim: config.ygz.name, desc: config.ygz.desc, pfp: config.ygz.topphoto, img: config.ygz.bottomphoto});
  } else {
    res.json({ "message":"hatali kullanici adi", "ozel url icin":"docs.repeatpay.ga/#bitiris" })
  }
})

app.listen(process.env.PORT || port)
console.log(`App listening at http://localhost:${port}`)
// rexulec <33