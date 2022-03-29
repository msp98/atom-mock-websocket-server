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

console.log('deepCompare({ "messageType": "Sub", "tickers": ["DOW", "NDAQ"] }, { "messageType": "Sub", "tickers": ["DOW", "NDAQ"]}) :>> ', deepCompare({ "messageType": "Sub", "tickers": ["DOW", "NDAQ"] }, { "messageType": "Sub", "tickers": ["DOW", "NDAQ"] }));