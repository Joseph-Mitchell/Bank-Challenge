import Account from "../src/Account.js";

describe("Account: ", () => {
    describe("Inputs to addCredit(): ", () => {
        let testAccount;

        beforeEach(() => {
            testAccount = new Account();
        });

        afterEach(() => {
            testAccount = undefined;
        });

        it("Should increase credit by correct amount when amount passed is positive number", () => {
            //Arrange
            let testInput = 100;

            //Act
            testAccount.addCredit(testInput);

            //Assert
            let expected = 100;
            let actual = testAccount.getCredit();
            expect(actual).toBe(expected);
        });
    });
});
