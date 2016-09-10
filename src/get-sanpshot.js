'use strict';

function getSnapshot(historyData, id) {
    const arrayData = splitHistoryData(historyData);
    const verifyResult = verifyData(arrayData);

    if (typeof verifyResult === 'string') {
        console.log(verifyResult);
    } else {
        convertDataLayout(verifyResult);
    }

    return 'hello world';
}

function convertDataLayout(data) {
    let newData = [];

    data.forEach((item, index) => {
        const animals = getAnimals(data, index);

        newData.push({
            id: item[0],
            time: item[1],
            animals: animals
        })
    });

    return newData;
}

function getAnimals(data, index) {
    let animals = [];

    const itemArray = data[index].slice(2);
    const length = itemArray.length;

    if (length !== 3 && length !== 5) {
        console.log('Invalid format.');

    } else {
        if (length === 3) {
            itemArray.concat(0, 0);
        }
        animals.push({
            name: itemArray[0],
            x: parseInt(itemArray[1])+parseInt(itemArray[3]),
            y: parseInt(itemArray[2])+parseInt(itemArray[4]),
        });

        if (index != 0) {

            getAnimals(data, index - 1).forEach((preItem) => {
                const isExistAnimal = animals.find((item) => item.name === preItem.name);

                if (!isExistAnimal) {
                    animals.push(preItem);
                }
            })
        }
    }

    return animals;
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
    verifyData: verifyData,
    convertDataLayout: convertDataLayout
};
