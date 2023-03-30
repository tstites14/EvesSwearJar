class Phrase {
    #phrase;
    #phraseSplit;

    constructor(phrase) {
        this.#phrase = phrase;
    }

    getPhrase() {
        return this.#phrase;
    }

    getPhraseArray() {
        return this.#phrase.split(' ');
    }
}

module.exports = Phrase;