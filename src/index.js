import Account from "./Account.js";
import AccountAccessor from "./AccountAccessor.js";
import StatementPrinter from "./StatementPrinter.js";

let accountNumber = 12345678;
let accounts = [new Account(12345678), new Account(23456789), new Account(34567890)];
AccountAccessor.setAccounts(accounts);

console.log("Setting bank account from initial details");
console.log(`Accounts in database: ${accounts[0].getAccountNumber()}, ${accounts[1].getAccountNumber()}, ${accounts[2].getAccountNumber()}`);
console.log("Given bank account number: " + accountNumber);
AccountAccessor.setAccessedAccount(accountNumber);
console.log("Account accessed: " + AccountAccessor.getAccessedAccount().getAccountNumber());

console.log("\nDepositing to account");
let amount = 128.5;
console.log("Account Balance: £" + AccountAccessor.getAccessedAccount().getCredit().toFixed(2));
console.log("Amount to deposit: £" + amount.toFixed(2));
AccountAccessor.addCredit(amount);

console.log("\nWithdrawing from account");
amount = 73.5;
console.log("Account Balance: £" + AccountAccessor.getAccessedAccount().getCredit().toFixed(2));
console.log("Amount to withdraw: £" + amount.toFixed(2));
AccountAccessor.removeCredit(amount);

console.log("\nTransaction logging when withdrawing and depositing");
console.log("Currently logged transactions in the account: ");
console.log(JSON.stringify(AccountAccessor.getAccessedAccount().getTransactions()));

console.log("\nPrinting account transactions as a statement");
StatementPrinter.printStatement(AccountAccessor.getAccessedAccount().getTransactions());

console.log("\nFailed deposit message");
amount = -100;
console.log("Amount to deposit: £" + amount.toFixed(2));
AccountAccessor.addCredit(amount);
amount = 100.555;
console.log("Amount to deposit: £" + amount.toFixed(3));
AccountAccessor.addCredit(amount);
amount = "One Hundred";
console.log("Amount to deposit: £" + amount);
AccountAccessor.addCredit(amount);

console.log("\nFailed withdrawal message");
console.log("Account Balance: £" + AccountAccessor.getAccessedAccount().getCredit().toFixed(2));
amount = -10;
console.log("Amount to withdraw: £" + amount.toFixed(2));
AccountAccessor.removeCredit(amount);
amount = 10.555;
console.log("Amount to withdraw: £" + amount.toFixed(3));
AccountAccessor.removeCredit(amount);
amount = "Ten";
console.log("Amount to withdraw: £" + amount);
AccountAccessor.removeCredit(amount);
amount = 100;
console.log("Amount to withdraw: £" + amount);
AccountAccessor.removeCredit(amount);
