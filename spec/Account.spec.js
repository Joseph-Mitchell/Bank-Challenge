import Account from "../src/Account.js";

describe("Account: ", () => {
    let testAccount, testCredit, testDebit, expected, actual;

    beforeEach(() => {
        testAccount = new Account();
    });

    afterEach(() => {
        testAccount = undefined;
        testCredit = undefined;
        testDebit = undefined;
        expected = undefined;
        actual = undefined;
    });

    describe("addCredit(): ", () => {
        describe("Input Validation: ", () => {
            it("Should return true when positive number passed", () => {
                //Arrange
                testCredit = 100;

                //Act
                actual = testAccount.addCredit(testCredit);

                //Assert
                expect(actual).toBeTrue();
            });

            it("Should return true when decimal passed", () => {
                //Arrange
                testCredit = 100.55;

                //Act
                actual = testAccount.addCredit(testCredit);

                //Assert
                expect(actual).toBeTrue();
            });

            it("Should return false when negative number passed", () => {
                //Arrange
                testCredit = -100;

                //Act
                actual = testAccount.addCredit(testCredit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when 0 passed", () => {
                //Arrange
                testCredit = 0;

                //Act
                actual = testAccount.addCredit(testCredit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when more than 2 decimal places passed", () => {
                //Arrange
                testCredit = 100.555;

                //Act
                actual = testAccount.addCredit(testCredit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when non-number passed", () => {
                //Arrange
                testCredit = "";

                //Act
                actual = testAccount.addCredit(testCredit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when NaN passed", () => {
                //Arrange
                testCredit = NaN;

                //Act
                actual = testAccount.addCredit(testCredit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when undefined passed", () => {
                //Arrange
                testCredit = undefined;

                //Act
                actual = testAccount.addCredit(testCredit);

                //Assert
                expect(actual).toBeFalse();
            });
        });

        describe("Account Credit: ", () => {
            it("Should change credit by correct amount when valid input passed", () => {
                //Arrange
                testCredit = 100;

                //Act
                testAccount.addCredit(testCredit);

                //Assert
                expect(testAccount.getCredit()).toBe(testCredit);
            });

            it("Should not change credit when invalid input passed", () => {
                //Arrange
                testCredit = -100;

                //Act
                expected = testAccount.getCredit();
                testAccount.addCredit(testCredit);

                //Assert
                expect(testAccount.getCredit()).toBe(expected);
            });
        });

        describe("Transactions: ", () => {
            it("Should add Transaction with correct values when valid number passed", () => {
                //Arrange
                testCredit = 100;

                //Act
                testAccount.addCredit(testCredit);

                //Assert
                let expectedDate = new Date().toLocaleDateString("en-UK");
                expect(testAccount.getTransactions()[0].date).toBe(expectedDate);
                expect(testAccount.getTransactions()[0].amount).toBe(testCredit);
            });

            it("Should not add Transaction when invalid number passed", () => {
                //Arrange
                testCredit = -100;

                //Act
                expected = testAccount.getTransactions().length;
                testAccount.addCredit(testCredit);

                //Assert
                expect(testAccount.getTransactions().length).toBe(expected);
            });
        });
    });

    describe("removeCredit(): ", () => {
        describe("Input Validation: ", () => {
            it("Should return true when positive number less than credit passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 100;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeTrue();
            });

            it("Should return true when  number equal to credit passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 200;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeTrue();
            });

            it("Should return true when decimal passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 150.55;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeTrue();
            });

            it("Should return false when positive number more than credit passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 300;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should not change credit when negative number passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = -100;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeFalse();
            });
        });

        it("Should add Transaction with correct values when valid number passed", () => {
            //Arrange
            testCredit = 200;
            testAccount.addCredit(testCredit);
            testDebit = 100;

            //Act
            testAccount.removeCredit(testDebit);

            //Assert
            let expectedDate = new Date().toLocaleDateString("en-UK");
            expect(testAccount.getTransactions()[1].date).toBe(expectedDate);
            expect(testAccount.getTransactions()[1].amount).toBe(-testDebit);
        });

        describe("Invalid Inputs: ", () => {
            describe("Credit: ", () => {
                it("Should not change credit when 0 passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = 0;

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit);
                });

                it("Should not change credit when credit 0 and 0 passed", () => {
                    //Arrange
                    testDebit = 0;

                    //Act
                    expected = testAccount.getCredit();
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(expected);
                });

                it("Should not change credit when non-number passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = "100";

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit);
                });

                it("Should not change credit when NaN passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = NaN;

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit);
                });

                it("Should not change credit when undefined passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = undefined;

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit);
                });

                it("Should not change credit when more than 2 decimal places passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = 150.555;

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit);
                });
            });

            it("Should not add Transaction when invalid number passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 300;

                //Act
                expected = testAccount.getTransactions().length;
                testAccount.removeCredit(testDebit);

                //Assert
                expect(testAccount.getTransactions().length).toBe(expected);
            });
        });
    });
});
