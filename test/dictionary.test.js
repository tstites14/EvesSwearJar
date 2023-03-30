const Dictionary = require('../dictionary.js');

describe('getMatchingArray function', () => {
    var dictionary = new Dictionary();

    test('Return correctly with valid input', () => {
        expect(dictionary.getMatchingArray(["this", "is", "a", "fucking", "test"])).toStrictEqual([["fuck", 1]]);
    });
});