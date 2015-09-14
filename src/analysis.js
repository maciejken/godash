import {curry, compose, map, fill, zip, range, identity, flatten} from 'lodash';
import {List, Set} from 'immutable';


export const BLACK = 'black';
export const WHITE = 'white';
export const EMPTY = null;
export const SIZE_KEY = 'size';


export function allPossibleMoves(board) {
    const size = board.get(SIZE_KEY);

    return Set(flatten(map(
        range(size),
        i => map(
            zip(range(size), fill(Array(size), i)),
            List
        )
    )));
}


export function adjacentPositions(board, position) {
    const inc = i => i + 1;
    const dec = i => i - 1;
    const size = board.get(SIZE_KEY);
    const [x, y] = [position.first(), position.last()];
    const check = compose(
        curry(Math.min, 2)(size - 1),
        curry(Math.max, 2)(0)
    );

    return Set([
        [identity, inc],
        [identity, dec],
        [inc, identity],
        [dec, identity],
    ].map(
        ([first, last]) => List.of(check(first(x)), check(last(y)))
    )).subtract(Set.of(position));
}


export function matchingAdjacentPositions(board, position, state) {
    if (state === undefined) {
        state = board.get(position, EMPTY);
    }

    return adjacentPositions(board, position)
        .filter(pos => board.get(pos, EMPTY) === state);
}


export function group(board, position) {
    let found = Set();
    let queue = Set.of(position);

    while (!queue.isEmpty()) {
        const current = queue.first();
        const more_matching = matchingAdjacentPositions(board, position);

        queue = queue.rest().union(more_matching.subtract(found));
        found = found.add(current);
    }

    return found;
}


export function equivalentBoards(board, positions) {
    // TODO
}


export function adjacent(board, position) {
    // TODO
}


export function illegalMoves(board) {
    // TODO
}


export function isValidPosition(size, position) {
    // TODO
}


export default {};
