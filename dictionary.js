const ArrayParser = require('./arrayparser.js');

class Dictionary {
    #dict;

    constructor() {
        this.#dict = [["motherfucker", "fuck"], ["bullshit", "shit"], ["asshole", "ass"], ["damn", "dammit"], ["bitch"], ["tits"], ["dick"]];
    }

    getDictionary() {
        return this.#dict;
    }

    getMatchingArray(phraseArray) {
        var parser = new ArrayParser();
        var wordArray = new Array();

        phraseArray.forEach((phraseWord) => {
            this.#dict.forEach((category) => {
                for (var i = 0; i < category.length; i++) {
                    var word = category[i];

                    if (phraseWord.match("^.*" + word)) {
                        wordArray.push(word);

                        //Once a word in a category has been found, skip the rest of the category
                        break;
                    }
                }
            });
        });

        return parser.getCondensedArray(wordArray);
    }
}

module.exports = Dictionary;