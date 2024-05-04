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
- [x] Should increase credit by correct amount when amount passed is positive number
- [x] Should not change credit when negative number passed
- [x] Should not change credit when 0 passed
- [x] Should not change credit when non-number passed
- [x] Should not change credit when NaN passed
- [x] Should not change credit when undefined passed
- [x] Should increase credit by correct amount when decimal passed
- [ ] Should not change credit when more than 2 decimal places passed

### User Story 3
#### Testing Account.removeCredit()
- [x] Should decrease credit by correct amount when positive number less than credit passed
- [x] Should not change credit when positive number more than credit passed
- [x] Should decrease credit by correct amount when  number equal to credit passed
- [x] Should not change credit when negative number passed
- [x] Should not change credit when 0 passed
- [x] Should not change credit when credit 0 and 0 passed
- [x] Should not change credit when non-number passed
- [x] Should not change credit when NaN passed
- [x] Should not change credit when undefined passed
- [ ] Should change credit when decimal passed
- [ ] Should not change credit when more than 2 decimal places passed

### User Story 4
#### Testing Account.addCredit()
- [x] Should add Transaction with correct values when positive number passed
- [x] Should not add Transaction when negative number passed
- [x] Should not add Transaction when 0 passed
- [x] Should not add Transaction when non-number passed
- [x] Should not add Transaction when NaN passed
- [x] Should not add Transaction when undefined passed
- [ ] Should add Transaction with correct values when decimal passed
- [ ] Should not add Transaction when more than 2 decimal places passed

### User Story 5
#### Testing Account.removeCredit()
- [x] Should add Transaction with correct values when positive number less than credit passed
- [x] Should not add Transaction positive number equal to credit passed
- [x] Should not add Transaction when negative number passed
- [x] Should not add Transaction when 0 passed
- [x] Should not add Transaction when credit 0 and 0 passed
- [x] Should not add Transaction when non-number passed
- [x] Should not add Transaction when NaN passed
- [x] Should not add Transaction when undefined passed
- [ ] Should add Transaction with correct values when decimal passed
- [ ] Should not add Transaction when more than 2 decimal places passed

### User Story 6
#### Testing StatementPrinter.printStatement()
- [x] Should print transaction history to acceptance criteria standards with basic input
- [x] Should print correctly when amount length longer than column title
- [x] Should print correctly with amounts of differing length
- [x] Should print message when no Transactions in Account

### User Story 7
#### Testing AccountAccessor.addCredit()
- [ ] Should print message showing credit when valid number passed
- [ ] Should print message stating invalid amount when negative number passed
- [ ] Should print message stating invalid amount when 0 passed
- [ ] Should print message stating invalid amount when non-number passed
- [ ] Should print message stating invalid amount when NaN passed
- [ ] Should print message stating invalid amount when undefined passed
- [ ] Should print message stating invalid amount when more than 2 decimal places passed

### User Story 8
#### Testing AccountAccessor.removeCredit()
- [ ] Should print message showing credit when positive number less than credit passed
- [ ] Should print message stating invalid amount when positive number more than credit passed
- [ ] Should print message showing credit when positive number equal to credit passed
- [ ] Should print message stating invalid amount when negative number passed
- [ ] Should print message stating invalid amount when 0 passed
- [ ] Should print message stating invalid amount when non-number passed
- [ ] Should print message stating invalid amount when NaN passed
- [ ] Should print message stating invalid amount when undefined passed
- [ ] Should print message stating invalid amount when more than 2 decimal places passed

## Kanban Board
![image](../img/kanban.jpg)