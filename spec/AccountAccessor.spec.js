import AccountAccessor from "../src/AccountAccessor.js";

describe("AccountAccessor:", () => {
    describe("setAccessedAccount():", () => {
        let testAccounts, testAccountNumber;

        beforeEach(() => {
            testAccounts = [];

            for (let i = 0; i < 9; i++)
                testAccounts.push(
                    jasmine.createSpyObj("testAccount" + i, {
                        getAccountNumber: i,
                    })
                );
        });

        afterEach(() => {
            testAccounts = undefined;
            testAccountNumber = undefined;
        });

        it("Should set accessedAccount to the correct Account from accounts when existing accountNumber passed", () => {
            //Arrange
            testAccounts.push(
                jasmine.createSpyObj("testAccount9", {
                    getAccountNumber: 12345678,
                })
            );
            AccountAccessor.setAccounts(testAccounts);

            testAccountNumber = 12345678;

            //Act
            AccountAccessor.setAccessedAccount(testAccountNumber);

            //Assert
            expect(AccountAccessor.getAccessedAccount().getAccountNumber()).toBe(testAccountNumber);
        });

        it("Should not change accessedAccount when non-existing accountNumber passed", () => {
            //Arrange
            AccountAccessor.setAccounts(testAccounts);

            testAccountNumber = 12345678;

            //Act
            AccountAccessor.setAccessedAccount(testAccountNumber);

            //Assert
            expect(AccountAccessor.getAccessedAccount()).toBeUndefined();
        });

        it("Should not change accessedAccount when non-number type passed", () => {
            //Arrange
            AccountAccessor.setAccounts(testAccounts);

            testAccountNumber = "12345678";

            //Act
            AccountAccessor.setAccessedAccount(testAccountNumber);

            //Assert
            expect(AccountAccessor.getAccessedAccount()).toBeUndefined();
        });

        it("Should not change accessedAccount when NaN passed", () => {
            //Arrange
            AccountAccessor.setAccounts(testAccounts);

            testAccountNumber = NaN;

            //Act
            AccountAccessor.setAccessedAccount(testAccountNumber);

            //Assert
            expect(AccountAccessor.getAccessedAccount()).toBeUndefined();
        });

        it("Should not change accessedAccount when undefined passed", () => {
            //Arrange
            AccountAccessor.setAccounts(testAccounts);

            testAccountNumber = undefined;

            //Act
            AccountAccessor.setAccessedAccount(testAccountNumber);

            //Assert
            expect(AccountAccessor.getAccessedAccount()).toBeUndefined();
        });
    });

    describe("addCredit(): ", () => {
        let testAccount;

        beforeEach(() => {
            testAccount = {
                getAccountNumber: () => 12345678,
                getCredit: () => 100,
                addCredit: undefined,
            };

            AccountAccessor.setAccounts([testAccount]);
            AccountAccessor.setAccessedAccount(12345678);

            spyOn(console, "log");
        });

        afterEach(() => {
            testAccount = undefined;
            AccountAccessor.setAccounts(undefined);
        });

        it("Should call addCredit on the accessed account with the given input", () => {
            //Arrange
            let testCredit = 100;
            testAccount.addCredit = () => true;
            spyOn(testAccount, "addCredit");

            //Act
            AccountAccessor.addCredit(testCredit);

            //Assert
            expect(testAccount.addCredit).toHaveBeenCalledWith(100);
        });

        it("Should print message showing credit when accessedAccount.addCredit returns true", () => {
            //Arrange
            testAccount.addCredit = () => true;

            //Act
            AccountAccessor.addCredit();

            //Assert
            expect(console.log).toHaveBeenCalledWith("Transaction successful, new balance is £100.00");
        });

        it("Should print message stating invalid amount when accessedAccount.addCredit returns false", () => {
            //Arrange
            testAccount.addCredit = () => false;

            //Act
            AccountAccessor.addCredit();

            //Assert
            expect(console.log).toHaveBeenCalledWith("Please enter a positive number with no more than two decimal places");
        });
    });

    describe("removeCredit(): ", () => {
        let testAccount;

        beforeEach(() => {
            testAccount = {
                getOverdraft: () => 0,
                getAccountNumber: () => 12345678,
                getCredit: () => 100,
                removeCredit: undefined,
            };

            AccountAccessor.setAccounts([testAccount]);
            AccountAccessor.setAccessedAccount(12345678);

            spyOn(console, "log");
        });

        afterEach(() => {
            testAccount = undefined;
            AccountAccessor.setAccounts(undefined);
        });

        it("Should call removeCredit on the accessed account with the given input", () => {
            //Arrange
            let testCredit = 100;
            testAccount.removeCredit = () => true;
            spyOn(testAccount, "removeCredit");

            //Act
            AccountAccessor.removeCredit(testCredit);

            //Assert
            expect(testAccount.removeCredit).toHaveBeenCalledWith(100);
        });

        it("Should print message showing credit when accessedAccount.removeCredit returns true", () => {
            //Arrange
            testAccount.removeCredit = () => true;

            //Act
            AccountAccessor.removeCredit();

            //Assert
            expect(console.log).toHaveBeenCalledWith("Transaction successful, new balance is £100.00");
        });

        it("Should print message stating invalid amount when accessedAccount.removeCredit returns false", () => {
            //Arrange
            testAccount.removeCredit = () => false;

            //Act
            AccountAccessor.removeCredit();

            //Assert
            expect(console.log).toHaveBeenCalledWith(
                "Please enter a positive number with no more than two decimal places less than current balance: £100.00"
            );
        });
    });
});
