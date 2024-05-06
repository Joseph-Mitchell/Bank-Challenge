import Account from "./Account.js";
import AccountAccessor from "./AccountAccessor.js";
import StatementPrinter from "./StatementPrinter.js";

let accountNumber = 12345678;
let accounts = [new Account(12345678), new Account(23456789), new Account(34567890)];
AccountAccessor.setAccounts(accounts);

console.log("\x1b[4mSetting bank account from initial details\x1b[0m");
console.log(`Accounts in database: ${accounts[0].getAccountNumber()}, ${accounts[1].getAccountNumber()}, ${accounts[2].getAccountNumber()}`);
console.log("Given bank account number: " + accountNumber);
AccountAccessor.setAccessedAccount(accountNumber);
console.log("Account accessed: " + AccountAccessor.getAccessedAccount().getAccountNumber());

console.log("\n\x1b[4mDepositing to account\x1b[0m");
let amount = 128.5;
console.log("Account Balance: £" + AccountAccessor.getAccessedAccount().getCredit().toFixed(2));
console.log("Amount to deposit: £" + amount.toFixed(2));
AccountAccessor.addCredit(amount);

console.log("\n\x1b[4mWithdrawing from account\x1b[0m");
amount = 73.5;
console.log("Account Balance: £" + AccountAccessor.getAccessedAccount().getCredit().toFixed(2));
console.log("Amount to withdraw: £" + amount.toFixed(2));
AccountAccessor.removeCredit(amount);

console.log("\n\x1b[4mSetting account overdraft\x1b[0m");
amount = 500;
console.log("Overdraft before: £" + AccountAccessor.getAccessedAccount().getOverdraft().toFixed(2));
console.log("Overdraft to set: £" + amount.toFixed(2));
AccountAccessor.setOverdraft(amount);
console.log("Overdraft after: £" + AccountAccessor.getAccessedAccount().getOverdraft().toFixed(2));

console.log("\n\x1b[4mWithdrawing from account with overdraft\x1b[0m");
amount = 65;
console.log("Account Balance: £" + AccountAccessor.getAccessedAccount().getCredit().toFixed(2));
console.log("Amount to withdraw: £" + amount.toFixed(2));
AccountAccessor.removeCredit(amount);

console.log("\n\x1b[4mTransaction logging when withdrawing and depositing\x1b[0m");
console.log("Currently logged transactions in the account: ");
console.log(JSON.stringify(AccountAccessor.getAccessedAccount().getTransactions()));

console.log("\n\x1b[4mPrinting account transactions as a statement\x1b[0m");
StatementPrinter.printStatement(AccountAccessor.getAccessedAccount().getTransactions());

console.log("\x1b[4mFailed deposit message\x1b[0m");
amount = -100;
console.log("Amount to deposit: £" + amount.toFixed(2));
AccountAccessor.addCredit(amount);
amount = 100.555;
console.log("Amount to deposit: £" + amount.toFixed(3));
AccountAccessor.addCredit(amount);
amount = "One Hundred";
console.log("Amount to deposit: £" + amount);
AccountAccessor.addCredit(amount);

console.log("\n\x1b[4mFailed withdrawal message\x1b[0m");
AccountAccessor.setOverdraft(0);
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
amount = 1000;
console.log("Amount to withdraw: £" + amount);
AccountAccessor.removeCredit(amount);

console.log("\n\x1b[4mFailed withdrawal message with overdraft\x1b[0m");
AccountAccessor.setOverdraft(500);
amount = 1000;
console.log("Amount to withdraw: £" + amount);
AccountAccessor.removeCredit(amount);
