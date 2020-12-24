const express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const cors = require('cors');
const app = new express();
const {companyList} = require('./sql');
var history = require('connect-history-api-fallback');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');
// app.use(jsonParser);
// app.use(cors());
// app.use(history());


app.use(express.static('./static'))

app.use("*", (req, res, next) => {
    console.warn(req.baseUrl);
    next();
})

app.use("*", (req, res, next) => {
    if(req.baseUrl.split('/').length === 2){
        res.sendFile(path.resolve('./static/index.html'))
    }else{
        next();
    }
})


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

app.use("*", async (req, res, next) => {
    let id = req.baseUrl.split('/')[1];
    let result = null;
    try{
        result = await companyList.findOne({where: {id}})
    }catch (err){
        res.status(500).send('failed');
        return;
    }
    let {proxyPath} = result;
    if(!proxyPath){
        res.status(500).send('failed');
        return;
    }
    console.warn(req.baseUrl);
    createProxyMiddleware({
        target: proxyPath,
        pathRewrite: async function (path, req) {
            let targetPath = path.split('?')[0];
            targetPath = targetPath.replace(`/${id}`, '');
            return targetPath;
        }
    })(req, res, next)
});
app.listen(3000);
