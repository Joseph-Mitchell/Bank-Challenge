export default class Account {
    #accountNumber;
    #credit = 0;
    #overdraft = 0;
    #transactions = [];

    constructor(accountNumber) {
        this.#accountNumber = accountNumber;
    }

    #decimalPlacesValid(number) {
        if (Number.isInteger(number)) return true;
        return number.toString().split(".")[1].length <= 2;
    }

    #inputValid(number) {
        if (typeof number !== "number" || isNaN(number)) return false;
        if (!this.#decimalPlacesValid(number)) return false;
        return true;
    }

    getAccountNumber = () => this.#accountNumber;

    getCredit = () => this.#credit;

    setOverdraft(amount) {
        if (!this.#inputValid(amount) || amount < 0) return false;

        this.#overdraft = amount;
        return true;
    }

    getTransactions = () => this.#transactions;

    addCredit(amount) {
        if (!this.#inputValid(amount) || amount <= 0) return false;

        this.#credit += amount;

        this.#transactions.push({
            date: new Date().toLocaleDateString("en-UK"),
            amount: amount,
        });

        return true;
    }

    removeCredit(amount) {
        if (!this.#inputValid(amount) || amount <= 0) return false;
        if (amount > this.#credit) return false;

        this.#credit -= amount;

        this.#transactions.push({
            date: new Date().toLocaleDateString("en-UK"),
            amount: -amount,
        });

        return true;
    }
}
