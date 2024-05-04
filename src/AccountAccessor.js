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
        this.#accessedAccount.addCredit(amount);
        console.log("Transaction successful, new balance is £" + this.#accessedAccount.getCredit().toFixed(2));
    }
}
