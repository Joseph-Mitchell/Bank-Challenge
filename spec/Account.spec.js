import Account from "../src/Account.js";

describe("Account: ", () => {
    let testAccount, testDebit, expected;

    beforeEach(() => {
        testAccount = new Account();
    });

    afterEach(() => {
        testAccount = undefined;
        testDebit = undefined;
        expected = undefined;
    });

    describe("addCredit(): ", () => {
        describe("Valid Inputs: ", () => {
            it("Should increase credit by correct amount when amount passed is positive number", () => {
                //Arrange
                testDebit = 100;

                //Act
                testAccount.addCredit(testDebit);

                //Assert
                expect(testAccount.getCredit()).toBe(testDebit);
            });
        });

        describe("Invalid Inputs: ", () => {
            it("Should not change credit when negative number passed", () => {
                //Arrange
                testDebit = -100;

                //Act
                expected = testAccount.getCredit();
                testAccount.addCredit(testDebit);

                //Assert
                expect(testAccount.getCredit()).toBe(expected);
            });

            it("Should not change credit when 0 passed", () => {
                //Arrange
                testDebit = 0;

                //Act
                expected = testAccount.getCredit();
                testAccount.addCredit(testDebit);

                //Assert
                expect(testAccount.getCredit()).toBe(expected);
            });

            it("Should not change credit when non-number passed", () => {
                //Arrange
                testDebit = "";

                //Act
                expected = testAccount.getCredit();
                testAccount.addCredit(testDebit);

                //Assert
                expect(testAccount.getCredit()).toBe(expected);
            });

            it("Should not change credit when NaN passed", () => {
                //Arrange
                testDebit = NaN;

                //Act
                expected = testAccount.getCredit();
                testAccount.addCredit(testDebit);

                //Assert
                expect(testAccount.getCredit()).toBe(expected);
            });

            it("Should not change credit when undefined passed", () => {
                //Arrange
                testDebit = undefined;

                //Act
                expected = testAccount.getCredit();
                testAccount.addCredit(testDebit);

                //Assert
                expect(testAccount.getCredit()).toBe(expected);
            });
        });
    });

    describe("removeCredit(): ", () => {
        let testCredit;

        afterEach(() => {
            testCredit = undefined;
        });

        describe("Valid Inputs: ", () => {
            it("Should decrease credit by correct amount when positive number less than credit passed", () => {
                //Arrange
                testDebit = 200;
                testAccount.addCredit(testDebit);
                testCredit = 100;

                //Act
                testAccount.removeCredit(testCredit);

                //Assert
                expect(testAccount.getCredit()).toBe(testDebit - testCredit);
            });

            it("Should decrease credit by correct amount when  number equal to credit passed", () => {
                //Arrange
                testDebit = 200;
                testAccount.addCredit(testDebit);
                testCredit = 200;

                //Act
                testAccount.removeCredit(testCredit);

                //Assert
                expect(testAccount.getCredit()).toBe(testDebit - testCredit);
            });
        });

        describe("Invalid Inputs: ", () => {
            it("Should not change credit when positive number more than credit passed", () => {
                //Arrange
                testDebit = 200;
                testAccount.addCredit(testDebit);
                testCredit = 300;

                //Act
                testAccount.removeCredit(testCredit);

                //Assert
                expect(testAccount.getCredit()).toBe(testDebit);
            });

            it("Should not change credit when negative number passed", () => {
                //Arrange
                testDebit = 200;
                testAccount.addCredit(testDebit);
                testCredit = -100;

                //Act
                testAccount.removeCredit(testCredit);

                //Assert
                expect(testAccount.getCredit()).toBe(testDebit);
            });

            it("Should not change credit when 0 passed", () => {
                //Arrange
                testDebit = 200;
                testAccount.addCredit(testDebit);
                testCredit = 0;

                //Act
                testAccount.removeCredit(testCredit);

                //Assert
                expect(testAccount.getCredit()).toBe(testDebit);
            });
        });
    });
});
