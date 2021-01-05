const axios = require("axios");

axios.post("http://47.106.113.142:81/test", {a:"fdsa", b: "fdsa"}).then(res => {
    console.warn(res.data);
})

const arr = []

for (let i = 0; i < 1000; i++){
    arr.push(axios.post("http://47.106.113.142:81/test", {a:"fdsa", b: "fdsa"}))
}

console.time();
Promise.all(arr).then(res => {
    console.warn(res);
    console.timeEnd();
})