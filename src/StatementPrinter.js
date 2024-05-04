export default class StatementPrinter {
    static #totalBalance;
    static #widestCredit;
    static #widestDebit;

    // Make the credit and debit section e.g.:
    // "100.00 ||        || "
    // or
    // "       || 100.00 || "
    static #constructCreditAndDebit(amount) {
        let amountString = Math.abs(amount).toFixed(2);

        let creditString = amount > 0 ? amountString : "";
        let debitString = amount > 0 ? "" : amountString;
        this.#widestCredit = Math.max(creditString.length, this.#widestCredit);
        this.#widestDebit = Math.max(debitString.length, this.#widestDebit);

        return creditString.padEnd(this.#widestCredit, " ") + " || " + debitString.padEnd(this.#widestDebit, " ") + " || ";
    }

    static #constructEachLine(transaction) {
        let line = transaction.date + " || ";
        line += this.#constructCreditAndDebit(transaction.amount);
        line += (this.#totalBalance += transaction.amount).toFixed(2);

        return line;
    }

    static #constructTransactionLines(transactions) {
        let transactionLines = "";

        for (const transaction of transactions) {
            let line = this.#constructEachLine(transaction);
            transactionLines = line + "\n" + transactionLines;
        }

        return transactionLines;
    }

    static printStatement(transactions) {
        this.#totalBalance = 0;
        this.#widestCredit = 6;
        this.#widestDebit = 5;

        let toPrint = this.#constructTransactionLines(transactions);
        toPrint =
            "\ndate       || " +
            "credit".padEnd(this.#widestCredit, " ") +
            " || " +
            "debit".padEnd(this.#widestDebit, " ") +
            " || balance\n" +
            toPrint;

        console.log(toPrint);
    }
}
