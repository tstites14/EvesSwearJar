class Dictionary {
    #dict;

    constructor() {
        this.#dict = [["motherfucker", "fuck"], ["bullshit", "shit"], ["asshole", "ass"], ["damn", "dammit"], ["bitch"], ["tits"], ["dick"]];
    }

    getDictionary() {
        return this.#dict;
    }

    getMatchingArray(phraseArray) {
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

        return this.#getCondensedArray(wordArray);
    }

    #getCondensedArray(input) {
        var finalArray = new Array();

        var unique = this.#getUniqueArray(input);

        unique.forEach ((word) => {
          	var occurrences = this.#getOccurrenceCount(input, word);
        		finalArray.push([word, occurrences]);
        });

        return finalArray;
    }

    #getUniqueArray(input) {
        var j = {};

        input.forEach(function(v) {
          j[v+ '::' + typeof v] = v;
        });
      
        return Object.keys(j).map(function(v) {
          return j[v];
        });
    }

    #getOccurrenceCount(input, value) {
        return input.filter((v) => (v === value)).length;
    }
}

module.exports = Dictionary;