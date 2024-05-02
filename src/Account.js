export default class Account {
    #credit = 0;

    getCredit = () => this.#credit;

    validateNumber = (number) => typeof number === "number" && !isNaN(number);

    addCredit(amount) {
        if (!this.validateNumber(amount)) return;
        if (amount < 0) return;

        this.#credit += amount;
    }

    removeCredit(amount) {
        if (amount > this.#credit || amount < 0) return;

        this.#credit -= amount;
    }
}
