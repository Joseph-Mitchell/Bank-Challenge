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
        AccountAccessor.#accessedAccount = AccountAccessor.#accounts.find(
            (a) => a.getAccountNumber() === accountNumber
        );
    }
}
