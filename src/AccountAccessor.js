export default class AccountAccessor {
    static #accounts;
    static #accessedAccount;

    static setAccounts(accounts) {
        AccountAccessor.#accounts = accounts;
    }

    static getAccessedAccount() {
        return AccountAccessor.#accessedAccount;
    }

    static setAccessedAccount(accountNumber) {
        AccountAccessor.#accessedAccount = AccountAccessor.#accounts.find((a) => a.getAccountNumber() === accountNumber);
    }

    static setOverdraft(amount) {
        this.#accessedAccount.setOverdraft(amount);
    }

    static addCredit(amount) {
        if (this.#accessedAccount.addCredit(amount))
            console.log("Transaction successful, new balance is £" + this.#accessedAccount.getCredit().toFixed(2));
        else console.log("Please enter a positive number with no more than two decimal places");
    }

    static removeCredit(amount) {
        if (this.#accessedAccount.removeCredit(amount))
            return console.log("Transaction successful, new balance is £" + this.#accessedAccount.getCredit().toFixed(2));

        if (this.#accessedAccount.getOverdraft() === 0)
            return console.log(
                "Please enter a positive number with no more than two decimal places less than current balance: £" +
                    this.#accessedAccount.getCredit().toFixed(2)
            );

        console.log("Please enter a positive number with no more than two decimal places between balance and overdraft limit:");
        console.group();
        console.log("Balance: £" + this.#accessedAccount.getCredit().toFixed(2));
        console.log("Overdraft Limit: £" + -this.#accessedAccount.getOverdraft().toFixed(2));
        console.groupEnd();
    }
}
