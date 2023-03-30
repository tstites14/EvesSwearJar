const ArrayParser = require('../arrayparser');

describe('getCondensedArray function', () => {
    var arrayParser = new ArrayParser();

    test('Array returns in the correct format', () => {
        expect(arrayParser.getCondensedArray(["test", "test", "test value"])).toStrictEqual([["test", 2], ["test value", 1]]);
    });
});

describe('getUniqueArray function', () => {
    var arrayParser = new ArrayParser();

    test('Only one instance of each array item is returned', () => {
        expect(arrayParser.getUniqueArray(["test", "test", "test value"])).toStrictEqual(["test", "test value"]);
    });
});

describe('getOccurrenceCount function', () => {
    var arrayParser = new ArrayParser();

    test('Repeated array values in array return the correct number of occurrences', () => {
        expect(arrayParser.getOccurrenceCount(["test", "test", "test", "test value"], "test")).toBe(3);
    });
});