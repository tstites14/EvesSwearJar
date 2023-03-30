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

        var categoryFound = false;
        phraseArray.forEach((phraseWord) => {
            this.#dict.forEach((category) => {
                var categoryFound = false;

                for (var i = 0; i < category.length; i++) {
                    var word = category[i];

                    if (phraseWord.match("^.*" + word)) {
                        wordArray.push(word);
                        categoryFound = true;

                        //Once a word in a category has been found, skip the rest of the category
                        break;
                    }
                }

                if (!categoryFound) {
                    wordArray.push("miscellaneous");
                }
            });
        });

        return parser.getCondensedArray(wordArray);
    }
}

module.exports = Dictionary;