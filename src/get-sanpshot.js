'use strict';

function getSnapshot(historyData,id) {

    const arrayData = splitHistoryData(historyData);

    return 'hello world';
}

function verifyData(arrayData) {
    return 'hello'
}

function splitHistoryData(historyData) {

    return historyData.split(/\n{2}/).map((item) => {
        return item.split(/\n{1}/);
    });
}

module.exports = {
    getSnapshot:getSnapshot,
    splitHistoryData:splitHistoryData,
    verifyData:verifyData
};
