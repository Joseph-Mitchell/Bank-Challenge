import Account from "../src/Account.js";

describe("Account: ", () => {
    describe("Inputs to addCredit(): ", () => {
        let testAccount, testInput, expected;

        beforeEach(() => {
            testAccount = new Account();
        });

        afterEach(() => {
            testAccount = undefined;
            testInput = undefined;
            expected = undefined;
        });

        it("Should increase credit by correct amount when amount passed is positive number", () => {
            //Arrange
            testInput = 100;

            //Act
            testAccount.addCredit(testInput);

            //Assert
            expect(testAccount.getCredit()).toBe(testInput);
        });

        it("Should not change credit when negative number passed", () => {
            //Arrange
            testInput = -100;

            //Act
            expected = testAccount.getCredit();
            testAccount.addCredit(testInput);

            //Assert
            expect(testAccount.getCredit()).toBe(expected);
        });

        it("Should not change credit when 0 passed", () => {
            //Arrange
            testInput = 0;

            //Act
            expected = testAccount.getCredit();
            testAccount.addCredit(testInput);

            //Assert
            expect(testAccount.getCredit()).toBe(expected);
        });
    });
});
