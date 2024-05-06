export default class StatementPrinter {
    static #totalBalance;
    static #creditWidth;
    static #debitWidth;

    // Make the credit and debit section e.g.:
    // "100.00 ||        || "
    // or
    // "       || 100.00 || "
    static #constructCreditAndDebit(amount) {
        let amountString = Math.abs(amount).toFixed(2);

        let creditString = amount > 0 ? amountString : "";
        let debitString = amount > 0 ? "" : amountString;

        return (
            "\x1b[32m" + //Make following text green
            creditString.padEnd(this.#creditWidth, " ") +
            "\x1b[0m || \x1b[31m" + //Reset color, then make following text red
            debitString.padEnd(this.#debitWidth, " ") +
            "\x1b[0m || " //Reset color
        );
    }

    static #constructEachLine(transaction) {
        let line = transaction.date + " || ";
        line += this.#constructCreditAndDebit(transaction.amount);

        this.#totalBalance += transaction.amount;
        let colorCode = this.#totalBalance >= 0 ? "\x1b[32m" : "\x1b[31m";
        line += colorCode + this.#totalBalance.toFixed(2) + "\x1b[0m";

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

    static #setColumnWidths(transactions) {
        this.#creditWidth = "credit".length;
        this.#debitWidth = "debit".length;

        for (const transaction of transactions) {
            let amountString = Math.abs(transaction.amount).toFixed(2);

            if (transaction.amount > 0) this.#creditWidth = Math.max(amountString.length, this.#creditWidth);
            else this.#debitWidth = Math.max(amountString.length, this.#debitWidth);
        }
    }

    static printStatement(transactions) {
        if (transactions.length === 0) return console.log("No previous transactions found for this account");

        this.#totalBalance = 0;
        this.#setColumnWidths(transactions);

        let toPrint = this.#constructTransactionLines(transactions);
        toPrint =
            "\ndate       || " + "credit".padEnd(this.#creditWidth, " ") + " || " + "debit".padEnd(this.#debitWidth, " ") + " || balance\n" + toPrint;

        console.log(toPrint);
    }
}
