var express = require('express');
var app = express();
var fs = require("fs");
var url = require("url");
var qs = require("querystring");  //解析参数的库
const bodyParser = require('body-parser');
app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({extended: false}));//解析post请求数据


//设置跨域访问
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");

    res.setHeader('Content-Type', 'text/html; charset=utf8');

    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

app.get('/Handler/SHDQSiteDataHandler.ashx', function (req, res) {
    var age = url.parse(req.url).query;
    var val = qs.parse(age)["methodId"];
    var fileName = "";
    if (val === "getRegionList") {
        fileName = 'a.json';
    }
    if (val === "getTrafficCountTop5") {
        fileName = 'e.json';
    }
    if (val === "getTrafficCountByDate") {
        fileName = '13.json';
    }
    fs.readFile(__dirname + "/" + fileName, 'utf8', function (err, data) {
        res.end(data);
    });
})


app.post('/Handler/SHDQOverviewHandler.ashx', function (req, res) {

    var methodId = req.body.methodId;
    var fileName = "";
    fileName = '10.json';
    if (methodId === "getTrafficRank") {
        fileName = "11.json"
    }
    if (methodId === "getResDistribution") {
        fileName = "12.json"
    }
    if (methodId === "getTrafficSiteCountByArea") {
        fileName = "16.json"
    }
    if (methodId === "getTrafficSiteSumCount") {
        fileName = "17.json"
    }
    fs.readFile(__dirname + "/" + fileName, 'utf8', function (err, data) {
        res.end(data);
    });
})

app.get('/Handler/SHDQSiteDataDetailHandler.ashx', function (req, res) {
    var query = url.parse(req.url).query;
    var MethodID = qs.parse(query)["methodId"];
    var fileName = "";
    if (MethodID === "getSiteAreaVisitorNum") {
        fileName = 'f.json';
    }
    if (MethodID === "getIsnumDetailData") {
        fileName = 'g.json';
    }
    fs.readFile(__dirname + "/" + fileName, 'utf8', function (err, data) {
        res.end(data);
    });
})
///Handler/SHDQSiteDataDetailHandler.ashx?methodId=getSiteAreaVisitorNum&sitekey=P00001
app.get('/Handler/SHDQVideoHandler.ashx', function (req, res) {
    var age = url.parse(req.url).query;
    var MethodID = qs.parse(age)["MethodID"];
    var VideoNum = qs.parse(age)["VideoNum"];
    var fileName = "";
    if (MethodID === 'GetSiteByQYSiteKey') {  //  中心
        fileName = "b.json";
    }
    if (MethodID === 'getAlwaysSearchSiteWithVideoNum' && VideoNum == "9") {  //  经常观看
        fileName = "9.json";
    }
    if (MethodID === 'getAlwaysSearchSiteWithVideoNum' && VideoNum == "16") {  //  经常观看
        fileName = "d.json";
    }
    if (MethodID === 'getHotSiteWithVideoNum' && VideoNum == "9") {  //  热点区域
        fileName = "9.json";
    }
    if (MethodID === 'getHotSiteWithVideoNum' && VideoNum == "16") {  //  热点区域
        fileName = "d.json";
    }
    fs.readFile(__dirname + "/" + fileName, 'utf8', function (err, data) {
        res.end(data);
    });
})


app.get('/Handler/SHDQPassengerHandler.ashx', function (req, res) {
    var query = url.parse(req.url).query;
    var MethodID = qs.parse(query)["MethodID"];
    var fileName = "14.json";
    if (MethodID === "getPassenger_Indicators") {
        fileName = '14.json';
    }
    if (MethodID === "getPassenger_DayContrast") {
        fileName = '15.json';
    }
    if(MethodID === "getPassenger_Weekdis"){
        fileName = "18.json";
    }
    fs.readFile(__dirname + "/" + fileName, 'utf8', function (err, data) {
        res.end(data);
    });
})

var server = app.listen(8081, function () {
    var addr = server.address();
    var host = server.address().address
    var port = server.address().port
    console.log(addr)
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
