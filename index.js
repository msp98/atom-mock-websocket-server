// Importing the required modules
const WebSocketServer = require('ws');
const port = 80;
// Creating a new websocket server
const wss = new WebSocketServer.Server({ port: port });
const subscribedClients = new Set();
const subscribedTickers = new Set();
setInterval(() => {
    console.log(Date());
    console.log('wss.clients :>> ', wss.clients.size);
    console.log('subscribedClientWSs.length :>> ', subscribedClients.size);
    if (subscribedClients.size < 1) return;
    subscribedClients.forEach((ws) => {
        if (subscribedTickers.size < 1) return;
        const json = makeResponse(Array.from(subscribedTickers));
        console.log('sending data :>> ', json);
        ws.send(json, {
            binary: false, // compress: false, mask: false, fin: false,
        });
    })
}, 1000);
// Creating connection using websocket

wss.on("connection", ws => {
    console.log(`${Date()}: new client connected`);
    // sending message
    let interval = null;
    ws.on("message", data => {
        // ws.send()
        console.log(`${Date()}: data.toString() :>> `, data.toString());
        let parsedJson = JSON.parse(data);
        if (parsedJson.messageType == "Sub") {
            subscribedClients.add(ws);
            parsedJson.tickers.forEach(e => {
                subscribedTickers.add(e);
            })
            console.log('subscribed');
        } else if (parsedJson.messageType == "Unsub") {
            subscribedClients.delete(ws);
            console.log('unsubscribed');
        }
    });
    ws.on("close", () => {
        subscribedClients.delete(ws);
        console.log(`${Date()}: the client has been disconnected`);
    });
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log(`The WebSocket server is running on port ${port}`);

const basePrice = 499;

function randomize(price) {
    return parseFloat(price + Math.random() * 1.01).toFixed(2);
}

function makeResponse(tickers) {
    console.log('tickers :>> ', tickers);
    if (!tickers || tickers == null) return JSON.stringify({
        "messageType": "Trades", "trades": [{ "symbol": "SPY", "previousClose": 432.17, "price": randomize(basePrice), "priceLatestTime": "2022-03-07T21:00:00.103Z", "change": -12.740000000000009, "changePercent": 1 - randomize(0.1), "extendedChange": 0.18000000000000682, "extendedChangePercent": 0.0004291538516558724, "market_status": "open", "volume": 2982603 }, { "symbol": "NDAQ", "previousClose": 174.5, "price": randomize(174), "priceLatestTime": "2022-03-07T21:00:00.103Z", "change": -12.740000000000009, "changePercent": 1 - randomize(0.1), "extendedChange": 0.18000000000000682, "extendedChangePercent": 0.0004291538516558724, "market_status": "open", "volume": 2982603 }]
    });
    let tradeList = tickers.map((ticker) => {
        return { "symbol": ticker, "previousClose": 432.17, "price": getRandomStockPrice(), "priceLatestTime": "2022-03-07T21:00:00.103Z", "change": -12.740000000000009, "changePercent": 1 - randomize(0.1), "extendedChange": 0.18000000000000682, "extendedChangePercent": 0.0004291538516558724, "market_status": "open", "volume": 2982603 };
    });
    return JSON.stringify({ "messageType": "Trades", "trades": tradeList });
}

function getRandomStockPrice() {
    return parseFloat(500 + 100 * Math.random()).toFixed(2);
}

deepCompare = (arg1, arg2) => {
    if (Object.prototype.toString.call(arg1) === Object.prototype.toString.call(arg2)) {
        if (Object.prototype.toString.call(arg1) === '[object Object]' || Object.prototype.toString.call(arg1) === '[object Array]') {
            if (Object.keys(arg1).length !== Object.keys(arg2).length) {
                return false;
            }
            return (Object.keys(arg1).every(function (key) {
                return deepCompare(arg1[key], arg2[key]);
            }));
        }
        return (arg1 === arg2);
    }
    return false;
}
