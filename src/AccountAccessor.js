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

    static addCredit(amount) {
        if (this.#accessedAccount.addCredit(amount))
            console.log("Transaction successful, new balance is £" + this.#accessedAccount.getCredit().toFixed(2));
        else console.log("Please enter a positive number with no more than two decimal places");
    }

    static removeCredit(amount) {
        if (this.#accessedAccount.removeCredit(amount))
            console.log("Transaction successful, new balance is £" + this.#accessedAccount.getCredit().toFixed(2));
        else
            console.log(
                "Please enter a positive number with no more than two decimal places less than current balance: £" +
                    this.#accessedAccount.getCredit().toFixed(2)
            );
    }
}
