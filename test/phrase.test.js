const Phrase = require('../phrase');

describe('getPhraseArray function', () => {
    var phrase = new Phrase("This is a test");

    test('Function returns a properly split array', () => {
        expect(phrase.getPhraseArray()).toStrictEqual(["This", "is", "a", "test"]);
    });
});