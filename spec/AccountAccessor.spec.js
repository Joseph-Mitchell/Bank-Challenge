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

    describe("addCredit()", () => {
        let testCredit, testAccount;

        beforeEach(() => {
            testAccount = jasmine.createSpyObj("testAccount", {
                getAccountNumber: 12345678,
                getCredit: 100,
                addCredit: undefined,
            });
            AccountAccessor.setAccounts([testAccount]);
            AccountAccessor.setAccessedAccount(12345678);
        });

        afterEach(() => {
            testCredit = undefined;
        });

        it("Should call addCredit on the accessed account with the given input", () => {
            //Arrange
            testCredit = 100;

            //Act
            AccountAccessor.addCredit(testCredit);

            //Assert
            expect(testAccount.addCredit).toHaveBeenCalledWith(100);
        });
    });
});
