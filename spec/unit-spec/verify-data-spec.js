'use strict';

const sanpshot = require('../../src/get-sanpshot.js');

describe('sanpshot', ()=> {

    it('should verfity data return Invalid format.', ()=> {

        const InvalidDatas = [
            [['',
                '2016/09/02 22:30:46',
                'cat1 10 9'
            ]],
            [['cheng yu',
                '2016/09/02 22:30:46',
                'cat1 10 9'
            ]],
            [['e4e87cb2-8e9a-4749-abb6-26c59344dfee',
                '2016-09-02 22:30:46',
                'cat1 10 9'
            ]],
            [['e4e87cb2-8e9a-4749-abb6-26c59344dfee',
                '2016-32-02 22:30:46',
                'cat1 10 9'
            ]],
            [['e4e87cb2-8e9a-4749-abb6-26c59344dfee',
                '2016-32-0222:30:4656',
                'cat1 10 9'
            ]]
        ];

        InvalidDatas.forEach((arrayData) => {

            expect(sanpshot.verifyData(arrayData)).toEqual('Invalid format.');
        });
    });

    it('should verfity data return dataArray', ()=> {

        const arrayData = [
            ['e4e87cb2-8e9a-4749-abb6-26c59344dfee',
                '2016/09/02 22:30:46',
                'cat1 10 9'],
            ['351055db-33e6-4f9b-bfe1-16f1ac446ac1',
                '2016/09/02 22:30:52',
                'cat1 10 9 2 -1',
                'cat2 2 3']
        ];

        expect(sanpshot.verifyData(arrayData)).toEqual(arrayData);
    });

});
