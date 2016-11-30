'use strict';

const sanpshot = require('../src/get-sanpshot.js');

describe('integrate test sanpshot', ()=> {
    let id;

    beforeEach(()=> {

        id = `dcfa0c7a-5855-4ed2-bc8c-4accae8bd155`;
    });


    it('should console snapshot text', ()=> {
        const historyData = `e4e87cb2-8e9a-4749-abb6-26c59344dfee
2016/09/02 22:30:46
cat1 10 9

351055db-33e6-4f9b-bfe1-16f1ac446ac1
2016/09/02 22:30:52
cat1 10 9 2 -1
cat2 2 3

dcfa0c7a-5855-4ed2-bc8c-4accae8bd155
2016/09/02 22:31:02
cat1 12 8 3 4`;
        const expectText = `cat1 15 12
cat2 2 3
`;
        spyOn(console, 'log');
        sanpshot.getSnapshot(historyData, id)

        expect(console.log).toHaveBeenCalledWith(expectText);
    });

    it('should console Invalid format.', ()=> {

        const historyDatas = [`
2016/09/02 22:30:46,
cat1 10 9'`, `cheng yu
2016/09/02 22:30:46
cat1 10 9`, `e4e87cb2-8e9a-4749-abb6-26c59344dfee
2016-09-02 22:30:46
cat1 10 9`, `e4e87cb2-8e9a-4749-abb6-26c59344dfee
2016-09-02 22:30:46
cat1 10 9 3`
        ];

        spyOn(console, 'log');

        historyDatas.forEach((historyData) => {
            sanpshot.getSnapshot(historyData, id);
        });

        expect(console.log).toHaveBeenCalledWith(`Invalid format.`);
    });


    it('should console conflict item id', ()=> {
        const historyData = `e4e87cb2-8e9a-4749-abb6-26c59344dfee
2016/09/02 22:30:46
cat1 10 9

351055db-33e6-4f9b-bfe1-16f1ac446ac1
2016/09/02 22:30:52
cat1 10 9 2 -1
cat2 2 3

dcfa0c7a-5855-4ed2-bc8c-4accae8bd155
2016/09/02 22:31:02
cat1 11 8 3 4`;
        const expectText = 'Conflict found at dcfa0c7a-5855-4ed2-bc8c-4accae8bd155';

        spyOn(console, 'log');

        sanpshot.getSnapshot(historyData, id);

        expect(console.log).toHaveBeenCalledWith(expectText);

    });
});


