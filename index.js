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
  if (numara.length > 10 || numara.length < 10) {
    res.json({ "status": 404, "desc": "gecersiz-num" })
  } else {
    console.log(`--- Searched | ${isim} ---`)
    res.render('profile', { numara: numara, isim: isim, desc: desc, pfp: pfp, img: img });
  }
})

app.get('/earlyuser/', function (req, res) {
  res.json({ "status": "✔", "quick-docs": "docs.repeatpay.ga" })
})

app.get('/earlyuser/:numaraa/:isimm/:descc/:pfpp/:imgg/', function (req, res) {
  let numara = base64encode(req.params.numaraa);
  let isim = base64encode(req.params.isimm);
  let desc = base64encode(req.params.descc);
  let pfp = base64encode(req.params.pfpp);
  let img = base64encode(req.params.imgg);
  if (req.params.numaraa === '' || req.params.numaraa.length > 10 || req.params.numaraa.length < 10) {
    res.json({ "message": "Yanlis_Numara_Girisi" })
  }
  res.json({ "status": "success", "url": `${numara}/${isim}/${desc}/${pfp}/${img}/` })
})

app.get('/', function (req, res) {
  res.render('index')
})

// Custom Profiles
app.get('/:usersearch', function (req, res) {
  console.log(`--- Searched [Vanith url] | ${req.params.usersearch} ---`)
  if (req.params.usersearch === 'rexulec') {
    res.render('profile', { numara: config.rexulec.id, isim: config.rexulec.name, desc: config.rexulec.desc, pfp: config.rexulec.topphoto, img: config.rexulec.bottomphoto, pre: config.rexulec.premium, paparadesc: config.rexulec.paparadesc });
  }
  else if (req.params.usersearch === 'ygz') {
    res.render('profile', { numara: config.ygz.id, isim: config.ygz.name, desc: config.ygz.desc, pfp: config.ygz.topphoto, img: config.ygz.bottomphoto, pre: config.ygz.premium, paparadesc: config.ygz.paparadesc });
  }
  else if (req.params.usersearch === 'klontar') {
    res.render('profile', { numara: config.klontar.id, isim: config.klontar.name, desc: config.klontar.desc, pfp: config.klontar.topphoto, img: config.klontar.bottomphoto, pre: config.klontar.premium, paparadesc: config.klontar.paparadesc });
  }
  else if (req.params.usersearch === 'lyessa') {
    res.render('profile', { numara: config.lyessa.id, isim: config.lyessa.name, desc: config.lyessa.desc, pfp: config.lyessa.topphoto, img: config.lyessa.bottomphoto, pre: config.lyessa.premium, paparadesc: config.lyessa.paparadesc });
  }
  else if (req.params.usersearch === 'reponse' || req.params.usersearch === 'reponseapp') {
    res.render('profile', { numara: config.reponseapp.id, isim: config.reponseapp.name, desc: config.reponseapp.desc, pfp: config.reponseapp.topphoto, img: config.reponseapp.bottomphoto, pre: config.reponseapp.premium, paparadesc: config.reponseapp.paparadesc });
  }
  else {
    res.json({ "message": "hatali kullanici adi", "ozel url icin": "docs.repeatpay.ga/#bitiris" })
  }
})

app.listen(process.env.PORT || port)
console.log(`App listening at http://localhost:${port}`)
// rexulec <33