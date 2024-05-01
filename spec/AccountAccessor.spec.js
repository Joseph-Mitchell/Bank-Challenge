import AccountAccessor from "../src/AccountAccessor.js";

describe("AccountAccessor:", () => {
    describe("setAccessedAccount():", () => {
        it("Should set accessedAccount to the correct Account from accounts when existing accountNumber passed", () => {
            //Arrange
            let testAccounts = [];
            for (let i = 0; i < 9; i++)
                testAccounts.push(
                    jasmine.createSpyObj("testAccount" + i, {
                        getAccountNumber: i,
                    })
                );
            testAccounts.push(
                jasmine.createSpyObj("testAccount" + 9, {
                    getAccountNumber: 12345678,
                })
            );

            AccountAccessor.setAccounts(testAccounts);
            let testAccountNumber = 12345678;

            //Act
            AccountAccessor.setAccessedAccount(testAccountNumber);

            //Assert
            let expected = 12345678;
            let actual =
                AccountAccessor.getAccessedAccount().getAccountNumber();
            expect(expected).toBe(actual);
        });
    });
});
