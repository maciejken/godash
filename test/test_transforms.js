import assert from 'assert';

import {emptyBoard} from '../src/transforms';
import {SIZE_KEY} from '../src/analysis';


describe('empty board', function() {
    it('has the size that is passed in and nothing else', function() {
        const size = 19;
        const board = emptyBoard(19);

        assert.ok(board.has(SIZE_KEY));
        assert.equal(board.get(SIZE_KEY), size);
        assert.ok(board.delete(SIZE_KEY).isEmpty());
    });

    it('only takes positive integers as size', function() {
        assert.throws(function() {
            emptyBoard('hi');
        });

        assert.throws(function() {
            emptyBoard(-5);
        });

        assert.throws(function() {
            emptyBoard(5.5);
        });
    });
});