import Account from "../src/Account.js";

describe("Account: ", () => {
    describe("Inputs to addCredit(): ", () => {
        let testAccount, testInput;

        beforeEach(() => {
            testAccount = new Account();
        });

        afterEach(() => {
            testAccount = undefined;
            testInput = undefined;
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
            testAccount.addCredit(testInput);

            //Assert
            expect(testAccount.getCredit()).toBe(0);
        });
    });
});
