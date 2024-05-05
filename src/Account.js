export default class Account {
    #credit = 0;
    #transactions = [];

    getCredit = () => this.#credit;

    getTransactions = () => this.#transactions;

    #decimalPlacesValid(number) {
        if (Number.isInteger(number)) return true;
        return number.toString().split(".")[1].length <= 2;
    }

    #inputValid(number) {
        if (typeof number !== "number" || isNaN(number)) return false;
        if (!this.#decimalPlacesValid(number) || number <= 0) return false;
        return true;
    }

    addCredit(amount) {
        if (!this.#inputValid(amount)) return;

        this.#credit += amount;

        this.#transactions.push({
            date: new Date().toLocaleDateString("en-UK"),
            amount: amount,
        });

        return true;
    }

    removeCredit(amount) {
        if (!this.#inputValid(amount)) return;
        if (amount > this.#credit) return;

        this.#credit -= amount;

        this.#transactions.push({
            date: new Date().toLocaleDateString("en-UK"),
            amount: -amount,
        });
    }
}
