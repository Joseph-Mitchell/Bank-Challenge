export default class Account {
    #credit = 0;
    #transactions = [];

    getCredit = () => this.#credit;

    getTransactions = () => this.#transactions;

    #validateNumber = (number) => typeof number === "number" && !isNaN(number);

    addCredit(amount) {
        if (!this.#validateNumber(amount)) return;
        if (amount <= 0) return;

        this.#credit += amount;

        this.#transactions.push({
            date: new Date().toLocaleDateString("en-UK"),
            amount: amount,
        });
    }

    removeCredit(amount) {
        if (!this.#validateNumber(amount)) return;
        if (amount > this.#credit || amount < 0) return;

        this.#credit -= amount;
    }
}
