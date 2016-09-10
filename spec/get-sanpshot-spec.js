'use strict';

const sanpshot = require('../src/get-sanpshot.js');

describe('sanpshot', function () {
    let historyData;
    let id;

    beforeEach(function () {
        historyData = `e4e87cb2-8e9a-4749-abb6-26c59344dfee
2016/09/02 22:30:46
cat1 10 9

351055db-33e6-4f9b-bfe1-16f1ac446ac1
2016/09/02 22:30:52
cat1 10 9 2 -1
cat2 2 3

dcfa0c7a-5855-4ed2-bc8c-4accae8bd155
2016/09/02 22:31:02
cat1 12 8 3 4`;
        id = `dcfa0c7a-5855-4ed2-bc8c-4accae8bd155`;
    });


    it('should return hello world', ()=> {

        expect(sanpshot.getSnapshot(historyData, id)).toEqual('hello world');
    });

    it('should split historyData return dataArray', ()=> {

        const expectArray = [
            ['e4e87cb2-8e9a-4749-abb6-26c59344dfee',
                '2016/09/02 22:30:46',
                'cat1 10 9'],
            ['351055db-33e6-4f9b-bfe1-16f1ac446ac1',
                '2016/09/02 22:30:52',
                'cat1 10 9 2 -1',
                'cat2 2 3'],
            ['dcfa0c7a-5855-4ed2-bc8c-4accae8bd155',
                '2016/09/02 22:31:02',
                'cat1 12 8 3 4']
        ];

        expect(sanpshot.splitHistoryData(historyData)).toEqual(expectArray);
    });

});
