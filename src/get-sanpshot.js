'use strict';

function getSnapshot(historyData, id) {
    const arrayData = splitHistoryData(historyData);
    const verifyResult = verifyData(arrayData);

    if (typeof verifyResult === 'string') {
        console.log(verifyResult);
        return;
    }

    const processedData = convertDataLayout(verifyResult);

    if (typeof processedData === 'string') {
        console.log(processedData);
        return;
    }

    if (typeof checkConflict(processedData) === 'string') {
        console.log(checkConflict(processedData));
        return;
    }

    const snapshot = convertSnapshot(processedData, id);
    console.log(getSnapText(snapshot));
}

function getSnapText(snapshot) {
    let text = ''
    snapshot.forEach((item) => {
        text += `${item.name} ${item.x} ${item.y}
`;
    });

    return text;
}

function convertSnapshot(processedData, id) {
    let snapshot = [];

    processedData.find((data) => data.id === id).animals
        .forEach((animal)=> {
            snapshot.push({name: animal.name, x: animal.x, y: animal.y});
        });
    snapshot.sort(compareAnimalsName);


    return snapshot;
}

function compareAnimalsName(a, b) {
    if (a.name < b.name) {
        return -1;
    } else if (a.name > b.name) {
        return 1;
    } else {
        return 0;
    }
}

function checkConflict(processedData) {
    let checkResult = processedData;

    processedData.forEach((dataItem, index) => {
        if (index != 0) {

            if (isExistedConflict(dataItem, index, processedData)) {
                checkResult = `Conflict found at ${dataItem.id}`;
            }
        }
    });

    return checkResult;
}

function isExistedConflict(dataItem, index, processedData) {
    let conflictState = false;

    dataItem.animals.forEach((animal) => {
        const preAnimal = processedData[index - 1].animals.find((a) => a.name === animal.name);

        if (preAnimal != undefined && (preAnimal.x != animal.preX || preAnimal.y != animal.preY)) {
            conflictState = true;
        }
    });

    return conflictState;
}

function convertDataLayout(data) {
    let processedData = [];

    data.forEach((item, index) => {
        const animals = getAnimals(data, index);

        if (typeof animals === 'string') {
            processedData = animals;
        } else {
            processedData.push({
                id: item[0],
                time: item[1],
                animals
            });
        }
    });

    return processedData;
}

function getAnimals(data, index) {
    let animals = [];

    data[index].slice(2).forEach((item) => {
        let animalMessages = item.split(' ');
        const length = animalMessages.length;

        if (length !== 3 && length !== 5) {

            animals = 'Invalid format.';
        } else {

            if (length === 3) {
                animalMessages = animalMessages.concat(0, 0);
            }
            const preX = parseInt(animalMessages[1]);
            const preY = parseInt(animalMessages[2]);
            const moveX = parseInt(animalMessages[3]);
            const moveY = parseInt(animalMessages[4]);

            animals.push({
                name: animalMessages[0],
                preX,
                preY,
                x: preX + moveX,
                y: preY + moveY,
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
    getSnapText: getSnapText
};
