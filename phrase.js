class Phrase {
    #phrase;
    #phraseSplit;

    constructor(phrase) {
        this.#phrase = phrase;
        this.#phraseSplit = this.#phrase.split(' ');
    }

    getPhrase() {
        return this.#phrase;
    }

    getPhraseArray() {
        return this.#phraseSplit;
    }
}

module.exports = Phrase;