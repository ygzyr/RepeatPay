const express = require('express')
const app = express()
const { base64encode, base64decode } = require('nodejs-base64');
var ping = require('ping');

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

app.get('/earlyuser/', function (req, res) {
  var hosts = ['papara.com', 'imgur.com'];
  hosts.forEach(function(host){
      ping.sys.probe(host, function(isAlive){
          if(isAlive){
            res.json({ "status":"✔", "message":"all systems are working", "quick-docs":"sayfa açmak için şu sayfaya gidin -> /earlyuser/<papara numarası>/<ismin>/<açıklama>/<profil fotoğrafı>/<alttaki fotoğraf>", "not":"profil fotoğrafı ve alttaki fotoğraf için imgur kullanın ama i.imgur.com/<fotoğraf adres>.png yerine lütfen <fotoğraf adresi>.png kullanın!" })
          } else {
            res.json({ "status":"🧨", "message":"sistemler çalışmıyor, lütfen başka zaman deneyin" })
          }
      });
  });
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

process.on('uncaughtException', function (exception) {
  console.log('- Error! Bilinmeyen bir hata var, hatalar atlandı. -')
 });

app.listen(80)
console.log(`Your app is listening on http://localhost`)