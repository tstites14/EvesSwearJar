class ArrayParser {
    getCondensedArray(input) {
        var finalArray = new Array();

        var unique = this.getUniqueArray(input);

        unique.forEach ((word) => {
          	var occurrences = this.getOccurrenceCount(input, word);
        		finalArray.push([word, occurrences]);
        });

        return finalArray;
    }

    getUniqueArray(input) {
        var j = {};

        input.forEach(function(v) {
          j[v+ '::' + typeof v] = v;
        });
      
        return Object.keys(j).map(function(v) {
          return j[v];
        });
    }

    getOccurrenceCount(input, value) {
        return input.filter((v) => (v === value)).length;
    }
}

module.exports = ArrayParser;