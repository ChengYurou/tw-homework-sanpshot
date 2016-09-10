'use strict';

function getSnapshot(historyData, id) {
    const arrayData = splitHistoryData(historyData);
    const verifyResult = verifyData(arrayData);

    if (typeof verifyResult === 'string') {
        console.log(verifyResult);
    } else {
        const newData = convertDataLayout(verifyResult);
        if (typeof checkConflict(newData) === 'string') {
            console.log(checkConflict(newData));
        } else {
            const snapshot =  convertSnapshot(newData,id);

            console.log(getSnapText(snapshot));
        }
    }
}

function getSnapText(snapshot) {
    let text = ''
    snapshot.forEach((item) => {
        text += `${item.name} ${item.x} ${item.y}
`;
    });

    return text;
}

function convertSnapshot(newData, id) {
    let sanpshot = [];

    newData.find((data) => data.id === id).animals
        .forEach((animal)=> {
            sanpshot.push({name:animal.name,x: animal.x, y: animal.y});
        });

    return sanpshot;
}

function checkConflict(newData) {
    let checkResult = newData;

    newData.forEach((dataItem, index) => {
        if (index != 0) {
            dataItem.animals.forEach((animal) => {
                const preAnimal = newData[index - 1].animals.find((a) => a.name === animal.name);

                if (preAnimal != undefined && (preAnimal.x != animal.preX || preAnimal.y != animal.preY)) {
                    checkResult = `Conflict found at ${dataItem.id}`;
                }
            })
        }
    });

    return checkResult;
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

    data[index].slice(2).forEach((item) => {
        let animalMessages = item.split(' ');
        const length = animalMessages.length;

        if (length !== 3 && length !== 5) {
            console.log('Invalid format.');
        } else {

            if (length === 3) {
                animalMessages = animalMessages.concat(0, 0);
            }
            animals.push({
                name: animalMessages[0],
                preX: parseInt(animalMessages[1]),
                preY: parseInt(animalMessages[2]),
                moveX: parseInt(animalMessages[3]),
                moveY: parseInt(animalMessages[4]),
                x: parseInt(animalMessages[1]) + parseInt(animalMessages[3]),
                y: parseInt(animalMessages[2]) + parseInt(animalMessages[4]),
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
    })


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
    convertDataLayout: convertDataLayout,
    checkConflict: checkConflict,
    convertSnapshot: convertSnapshot,
    getSnapText:getSnapText
};
