import express from 'express'
// import multer from 'multer'
import bodyparser from 'body-parser'

import config from './config/config.default.js'
import startApp from './start.js'

// express --
let app = express();
let hostname = config.host || 'localhost';
let port = config.port || 8111;
let server = app.listen(port, hostname, () => {
    console.log(`service is on ${hostname}:${port}.`);
});

// multer --
// let storage = multer.diskStorage({
//     destination: __dirname + '/files',
//     filename(req, file, cb) {
//         cb(null, `file-${new Date().getTime()}.png`);
//     }
// });
// let upload = multer({
//     storage
// });

// body-parser --
app.use(bodyparser.urlencoded({
    extended: false
}));
app.use(bodyparser.json());


/** */

// // get --
// app.get('/api/xxx', (req, res) => {
//     res.send('data');
// });

// // post --
// app.post('/api/xxx', (req, res) => {
//     svc.xxx(req.body, rst => res.send(rst));
// });

// // file --
// app.post('/api/xxx', upload.single('imgObj'), (req, res) => {
//     console.log(req.body);
// });

startApp(app); // 业务入口
