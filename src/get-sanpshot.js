'use strict';

function getSnapshot(historyData, id) {
    const arrayData = splitHistoryData(historyData);
    const verifyResult = verifyData(arrayData);

    if(typeof verifyResult ==='string'){
        console.log(verifyResult);
    }else {
        console.log('shuzu');
    }

    return 'hello world';
}

function verifyData(arrayData) {
    const regId = /\s/g;
    const regTime = /^\d{4}\/(0\d|1[0-2])\/([0-2]\d|3[01])\s(([01]\d|2[0-3])\:[0-5]\d\:[0-5]\d)$/;
    let result = arrayData;

    arrayData.forEach((item) => {

        const isExistSpace = regId.test(item[0]);
        const isValidTime = regTime.test(item[1]);

        if (item[0] === '' || isExistSpace === true || isValidTime === false) {
            result = 'Invalid format.';
        }
    });

    return result;

}

function splitHistoryData(historyData) {

    return historyData.split(/\n{2}/).map((item) => {
        return item.split(/\n{1}/);
    });
}

module.exports = {
    getSnapshot: getSnapshot,
    splitHistoryData: splitHistoryData,
    verifyData: verifyData
};
