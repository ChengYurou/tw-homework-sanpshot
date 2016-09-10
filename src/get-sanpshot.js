'use strict';

function getSnapshot(historyData,id) {

    splitHistoryData(historyData);

    return 'hello world';
}

function splitHistoryData(historyData) {

    return historyData.split(/\n{2}/).map((item) => {
        return item.split(/\n{1}/);
    })
}

module.exports = {
    getSnapshot:getSnapshot,
    splitHistoryData:splitHistoryData
};
