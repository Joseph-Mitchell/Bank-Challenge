# Domain Models and Test Plan

## User Stories

### User Story 1
As a user,
I want to access my own bank account,
So that withdrawals and deposits are made to my own account

### User Story 2
As a user,
I want to deposit funds into my account,
So that my money is kept safe.

### User Story 3
As a user,
I want to withdraw funds from my account,
So that I can have my money to hand.

### User Story 4
As a user,
I want a transaction to be logged after depositing funds,
So that my transaction history can be retained.

### User Story 5
As a user,
I want a transaction to be logged after withdrawing funds,
So that my transaction history can be retained.

### User Story 6
As a user,
I want to see a statement for my account,
So that I can see a history of my account transactions.

### User Story 7
As a user,
I want to be told the outcome of a deposit,
So that I know whether the deposit worked.

### User Story 8
As a user,
I want to be told the outcome of a withdrawal,
So that I know whether the withdrawal worked.

### User Story 9
As a bank operative,
I want to add an overdraft to an account,
So that authorised accounts can withdraw more money than their balance.

### User Story 10
As a user,
I want my printed statement to highlight deposits in green and withdrawals in red,
So that I can more easily digest the information.

## Domain Model

### User Story 1

| Objects         | Properties                                            | Messages                                            | Output            |
| --------------- | ----------------------------------------------------- | --------------------------------------------------- | ----------------- |
| Account         | accountNumber @Number                                 |                                                     |                   |
| AccountAccessor | accounts @Array[@Account]<br>accessedAccount @Account | setAccessedAccount(@Number)<br>getAccessedAccount() | @Void<br>@Account |

### User Story 2

| Objects | Properties     | Messages           | Output |
| ------- | -------------- | ------------------ | ------ |
| Account | credit @Number | addCredit(@Number) | @Void  |

### User Story 3

| Objects | Properties     | Messages              | Output |
| ------- | -------------- | --------------------- | ------ |
| Account | credit @Number | removeCredit(@Number) | @Void  |

### User Story 4

| Objects     | Properties                                          | Messages           | Output |
| ----------- | --------------------------------------------------- | ------------------ | ------ |
| Transaction | date @Date<br>amount @Number                        |                    |        |
| Account     | credit @Number<br>transactions @Array[@Transaction] | addCredit(@Number) | @Void  |

### User Story 5

| Objects     | Properties                                          | Messages              | Output |
| ----------- | --------------------------------------------------- | --------------------- | ------ |
| Transaction | date @Date<br>amount @Number                        |                       |        |
| Account     | credit @Number<br>transactions @Array[@Transaction] | removeCredit(@Number) | @Void  |

### User Story 6

| Objects          | Properties                        | Messages                             | Output               |
| ---------------- | --------------------------------- | ------------------------------------ | -------------------- |
| Transaction      | date @Date<br>amount @Number      |                                      |                      |
| Account          | transactions @Array[@Transaction] | getStatement()                       | @Array[@Transaction] |
| StatementPrinter |                                   | printStatement(@Array[@Transaction]) | @Void                |

### User Story 7

| Objects         | Properties               | Messages           | Output   |
| --------------- | ------------------------ | ------------------ | -------- |
| Account         | credit @Number           | addCredit(@Number) | @Boolean |
| AccountAccessor | accessedAccount @Account | addCredit(@Number) | @Void    |

### User Story 8

| Objects         | Properties               | Messages              | Output   |
| --------------- | ------------------------ | --------------------- | -------- |
| Account         | credit @Number           | removeCredit(@Number) | @Boolean |
| AccountAccessor | accessedAccount @Account | removeCredit(@Number) | @Void    |

### User Story 9

| Objects | Properties     | Messages              | Output   |
| ------- | -------------- | --------------------- | -------- |
| Account | credit @Number | removeCredit(@Number) | @Boolean |

### User Story 10

| Objects          | Properties | Messages                             | Output |
| ---------------- | ---------- | ------------------------------------ | ------ |
| StatementPrinter |            | printStatement(@Array[@Transaction]) | @Void  |

## Test Plan

### User Story 1
#### Testing AccountAccessor.setAccessedAccount()

- [x] Should set accessedAccount to the correct Account when existing accountNumber passed
- [x] Should not change accessedAccount when non-existing accountNumber passed
- [x] Should not change accessedAccount when non-number type passed
- [x] Should not change accessedAccount when NaN passed
- [x] Should not change accessedAccount when undefined passed

### User Story 2
#### Testing Account.addCredit()

- [x] Should return true when positive number passed
- [x] Should return true when decimal passed
- [x] Should return false when negative number passed
- [x] Should return false when 0 passed
- [x] Should return false when more than 2 decimal places passed
- [x] Should return false when non-number passed
- [x] Should return false when NaN passed
- [x] Should return false when undefined passed

- [x] Should change credit by correct amount when valid input passed
- [x] Should not change credit when invalid input passed

### User Story 3
#### Testing Account.removeCredit()

- [x] Should return true when positive number less than credit passed
- [x] Should return true when  number equal to credit passed
- [x] Should return true when decimal passed
- [x] Should return false when positive number more than credit passed
- [x] Should return false when negative number passed
- [x] Should return false when more than 2 decimal places passed
- [x] Should return false when 0 passed
- [x] Should return false when credit 0 and 0 passed
- [x] Should return false when non-number passed
- [x] Should return false when NaN passed
- [x] Should return false when undefined passed

- [x] Should change credit by correct amount when valid input passed
- [x] Should not change credit when invalid input passed

### User Story 4
#### Testing Account.addCredit()

- [x] Should add Transaction with correct values when valid number passed
- [x] Should not add Transaction when invalid number passed

### User Story 5
#### Testing Account.removeCredit()

- [x] Should add Transaction with correct values when valid number passed
- [x] Should not add Transaction when invalid number passed

### User Story 6
#### Testing StatementPrinter.printStatement()

- [x] Should print correctly when amount length longer than column title
- [x] Should print correctly with amounts of differing length
- [x] Should print message when no Transactions in Account

### User Story 7
#### Testing AccountAccessor.addCredit()

- [x] Should call addCredit on the accessed account with the given input
- [x] Should print message showing credit when accessedAccount.addCredit returns true
- [x] Should print message stating invalid amount when accessedAccount.addCredit returns false

### User Story 8
#### Testing AccountAccessor.removeCredit()

- [x] Should call removeCredit on the accessed account with the given input
- [x] Should print message showing credit when accessedAccount.removeCredit returns true
- [x] Should print message stating invalid amount when accessedAccount.removeCredit returns false

### User Story 9
#### Testing Account.setOverdraft()

- [x] Should return true when positive number passed
- [x] Should return true when 0 passed
- [x] Should return true when decimal passed
- [x] Should return false when negative number passed
- [x] Should return false when non-number passed
- [x] Should return false when NaN passed
- [x] Should return false when undefined passed

- [x] Should set overdraft to correct amount when valid input passed
- [x] Should not change overdraft when invalid input passed

#### Testing Account.removeCredit()

- [x] Should return true when positive number less than credit plus overdraft passed
- [x] Should return true when number equal to credit plus overdraft passed
- [x] Should return false when positive number more than credit plus overdraft passed

- [x] Should change credit by correct amount when number between credit and overdraft passed

### User Story 10
#### Testing StatementPrinter.printStatement()

- [x] Should print transaction history to acceptance criteria with coloured highlights with basic input