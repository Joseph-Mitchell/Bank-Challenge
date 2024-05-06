export default class Account {
    #accountNumber;
    #credit = 0;
    #overdraft = 0;
    #transactions = [];

    constructor(accountNumber) {
        this.#accountNumber = accountNumber;
    }

    getAccountNumber = () => this.#accountNumber;

    getCredit = () => this.#credit;

    setOverdraft(overdraft) {
        if (overdraft < 0) return false;

        this.#overdraft = overdraft;
        return true;
    }

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
        if (!this.#inputValid(amount)) return false;

        this.#credit += amount;

        this.#transactions.push({
            date: new Date().toLocaleDateString("en-UK"),
            amount: amount,
        });

        return true;
    }

    removeCredit(amount) {
        if (!this.#inputValid(amount)) return false;
        if (amount > this.#credit) return false;

        this.#credit -= amount;

        this.#transactions.push({
            date: new Date().toLocaleDateString("en-UK"),
            amount: -amount,
        });

        return true;
    }
}
