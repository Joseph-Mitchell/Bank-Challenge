export default class StatementPrinter {
    // Make the credit and debit section e.g.:
    // "100.00 ||        || "
    // or
    // "       || 100.00 || "
    static #constructCreditAndDebit(amount) {
        let amountString = Math.abs(amount).toFixed(2);
        let creditString = amount > 0 ? amountString : "";
        let debitString = amount > 0 ? "" : amountString;

        return creditString.padEnd(6, " ") + " || " + debitString.padEnd(5, " ") + " || ";
    }

    static #constructTransactionLines(transactions) {
        let transactionLines = "";
        let totalBalance = 0;

        for (const transaction of transactions) {
            let line = transaction.date + " || ";
            line += this.#constructCreditAndDebit(transaction.amount);
            line += (totalBalance += transaction.amount).toFixed(2);

            transactionLines = line + "\n" + transactionLines;
        }

        return transactionLines;
    }

    static printStatement(transactions) {
        let toPrint = this.#constructTransactionLines(transactions);
        toPrint = "\ndate       || credit || debit || balance\n" + toPrint;

        console.log(toPrint);
    }
}
