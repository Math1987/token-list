import express from 'express' ;
import http from 'http' ;
import https from 'https';
import vhost from "vhost" ;
import fs from "fs" ;

const app = express();
import jellyfishApi from './jellyfishcryptoApi/index.js' ;
import jellyfishClient from './jellyfishcryptoClient/index.js' ;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

if ( process.env.MODE === "prod" ){

  app
  .use( vhost("api.mxzon.net", jellyfishApi))
  .use( vhost("mxzon.net", jellyfishClient));

  http.createServer((req, res) => {
      res.writeHead(301, {
        Location: `https://${req.headers.host}${req.url}`,
      });
      res.end();
    })
    .listen(80);
  https.createServer(
      {
        key: fs.readFileSync( "/etc/letsencrypt/live/mxzon.net/privkey.pem" ),
        cert: fs.readFileSync( "/etc/letsencrypt/live/mxzon.net/fullchain.pem" ),
      },
      app
    )
    .listen(443);

}else{

  jellyfishApi.listen('17000');
  jellyfishClient.listen('17001');

}

