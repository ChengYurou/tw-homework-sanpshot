'use strict';

const sanpshot = require('../../src/get-sanpshot.js');

describe('check conflict', function () {

    it('should verfity conflict return error message', ()=> {

        const newData = [
            {
                id: 'e4e87cb2-8e9a-4749-abb6-26c59344dfee',
                time: '2016/09/02 22:30:46',
                animals: [{
                    name:'cat1',
                    preX:10,
                    preY:9,
                    moveX:0,
                    moveY:0,
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
                        preX:10,
                        preY:9,
                        moveX:2,
                        moveY:-1,
                        x: 12,
                        y: 8,
                    },
                    {
                        name: 'cat2',
                        preX:2,
                        preY:3,
                        moveX:0,
                        moveY:0,
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
                        preX:11,
                        preY:8,
                        moveX:3,
                        moveY:4,
                        x: 14,
                        y: 12,
                    },
                    {
                        name: 'cat2',
                        preX:2,
                        preY:3,
                        moveX:0,
                        moveY:0,
                        x: 2,
                        y: 3,
                    }
                ]

            }
        ];

        const expectText = 'Conflict found at dcfa0c7a-5855-4ed2-bc8c-4accae8bd155';

        expect(sanpshot.checkConflict(newData)).toEqual(expectText);
    });

});
