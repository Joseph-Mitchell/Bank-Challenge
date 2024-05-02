import AccountAccessor from "../src/AccountAccessor.js";

describe("AccountAccessor:", () => {
    describe("setAccessedAccount():", () => {
        let testAccounts = [];

        beforeEach(() => {
            for (let i = 0; i < 9; i++)
                testAccounts.push(
                    jasmine.createSpyObj("testAccount" + i, {
                        getAccountNumber: i,
                    })
                );
        });

        afterEach(() => {
            testAccounts = [];
        });

        it("Should set accessedAccount to the correct Account from accounts when existing accountNumber passed", () => {
            //Arrange
            testAccounts.push(
                jasmine.createSpyObj("testAccount9", {
                    getAccountNumber: 12345678,
                })
            );
            AccountAccessor.setAccounts(testAccounts);

            let testAccountNumber = 12345678;

            //Act
            AccountAccessor.setAccessedAccount(testAccountNumber);

            //Assert
            let expected = 12345678;
            let actual = AccountAccessor.getAccessedAccount().getAccountNumber();
            expect(actual).toBe(expected);
        });

        it("Should not change accessedAccount when non-existing accountNumber passed", () => {
            //Arrange
            AccountAccessor.setAccounts(testAccounts);

            let testAccountNumber = 12345678;

            //Act
            AccountAccessor.setAccessedAccount(testAccountNumber);

            //Assert
            let actual = AccountAccessor.getAccessedAccount();
            expect(actual).toBeUndefined();
        });

        it("Should not change accessedAccount when non-number type passed", () => {
            //Arrange
            AccountAccessor.setAccounts(testAccounts);

            let testAccountNumber = "12345678";

            //Act
            AccountAccessor.setAccessedAccount(testAccountNumber);

            //Assert
            let actual = AccountAccessor.getAccessedAccount();
            expect(actual).toBeUndefined();
        });

        it("Should not change accessedAccount when NaN passed", () => {
            //Arrange
            AccountAccessor.setAccounts(testAccounts);

            let testAccountNumber = NaN;

            //Act
            AccountAccessor.setAccessedAccount(testAccountNumber);

            //Assert
            let actual = AccountAccessor.getAccessedAccount();
            expect(actual).toBeUndefined();
        });
    });
});
