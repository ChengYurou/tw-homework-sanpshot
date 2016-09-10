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

    it('should convert data layout', ()=> {
        const data = [
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

        const expectData = [
            {
                id: 'e4e87cb2-8e9a-4749-abb6-26c59344dfee',
                time: '2016/09/02 22:30:46',
                animals: [{
                    name: 'cat1',
                    preX: 10,
                    preY: 9,
                    moveX: 0,
                    moveY: 0,
                    x: 10,
                    y: 9,
                }]

            },
            {
                id: '351055db-33e6-4f9b-bfe1-16f1ac446ac1',
                time: '2016/09/02 22:30:52',
                animals: [
                    {
                        name: 'cat1',
                        preX: 10,
                        preY: 9,
                        moveX: 2,
                        moveY: -1,
                        x: 12,
                        y: 8,
                    },
                    {
                        name: 'cat2',
                        preX: 2,
                        preY: 3,
                        moveX: 0,
                        moveY: 0,
                        x: 2,
                        y: 3,
                    }
                ]

            },
            {
                id: 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155',
                time: '2016/09/02 22:31:02',
                animals: [
                    {
                        name: 'cat1',
                        preX: 12,
                        preY: 8,
                        moveX: 3,
                        moveY: 4,
                        x: 15,
                        y: 12,
                    },
                    {
                        name: 'cat2',
                        preX: 2,
                        preY: 3,
                        moveX: 0,
                        moveY: 0,
                        x: 2,
                        y: 3,
                    }
                ]

            }
        ]

        expect(sanpshot.convertDataLayout(data)).toEqual(expectData);
    });

    it('should convert sanpshot', ()=> {

        const newData = [
            {
                id: 'e4e87cb2-8e9a-4749-abb6-26c59344dfee',
                time: '2016/09/02 22:30:46',
                animals: [{
                    name: 'cat1',
                    preX: 10,
                    preY: 9,
                    moveX: 0,
                    moveY: 0,
                    x: 10,
                    y: 9,
                }]

            },
            {
                id: '351055db-33e6-4f9b-bfe1-16f1ac446ac1',
                time: '2016/09/02 22:30:52',
                animals: [
                    {
                        name: 'cat1',
                        preX: 10,
                        preY: 9,
                        moveX: 2,
                        moveY: -1,
                        x: 12,
                        y: 8,
                    },
                    {
                        name: 'cat2',
                        preX: 2,
                        preY: 3,
                        moveX: 0,
                        moveY: 0,
                        x: 2,
                        y: 3,
                    }
                ]

            },
            {
                id: 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155',
                time: '2016/09/02 22:31:02',
                animals: [
                    {
                        name: 'cat1',
                        preX: 12,
                        preY: 8,
                        moveX: 3,
                        moveY: 4,
                        x: 15,
                        y: 12,
                    },
                    {
                        name: 'cat2',
                        preX: 2,
                        preY: 3,
                        moveX: 0,
                        moveY: 0,
                        x: 2,
                        y: 3,
                    }
                ]

            }
        ];
        const id = 'dcfa0c7a-5855-4ed2-bc8c-4accae8bd155';

        const expectData = [
            {
                x: 15,
                y: 12
            },
            {
                x: 2,
                y: 3
            }
        ];

        expect(sanpshot.convertSnapshot(newData,id)).toEqual(expectData);
    });


});


