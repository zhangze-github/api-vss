const express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const cors = require('cors');
const app = new express();
const {companyList} = require('./sql');
var history = require('connect-history-api-fallback');
const { createProxyMiddleware } = require('http-proxy-middleware');


// app.use(jsonParser);
app.use(cors());
app.use(history());


app.use(express.static('./static'))


app.use('/api/getAllList', (request, response) => {
    companyList.findAll({where: {}}).then((res) => {
        response.json(res)
    }).catch(err => {
        response.status(500).send('failed');
    })
})

app.use('/api/delteDetail', jsonParser, (request, response) => {
    let {id} = request.body;
    companyList.destroy({where: {id}}).then((res) => {
        response.send('success')
    }).catch(err => {
        response.status(500).send('failed');
    })
})

app.use('/api/getDetail', jsonParser, ((request, response) => {
    let {id} = request.body;
    console.warn('----');
    console.warn(id);
    companyList.findOne({where: {id}}).then((res) => {
        response.json(res)
    }).catch(err => {
        response.status(500).send('failed');
    })
}))

app.use('/api/setDetail', jsonParser, ((request, response) => {
    let {companyName, proxyPath, ajaxJson, id} = request.body;
    if(id){
        companyList.update({
            companyName,
            proxyPath,
            ajaxJson
        }, {where: {id}}).then((res) => {
            response.send('success')
        }).catch(err => {
            response.status(500).send('failed');
        })
    }else{
        companyList.create({
            companyName,
            proxyPath,
            ajaxJson
        }).then((res) => {
            response.send('success')
        }).catch(err => {
            response.status(500).send('failed');
        })
    }

}))

app.use("*", (req, res, next) => {
    console.count()
    createProxyMiddleware('http://47.106.113.142:81')(req, res, next)
});
app.listen(3000);
