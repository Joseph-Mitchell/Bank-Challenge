import Account from "../src/Account.js";

describe("Account: ", () => {
    let testAccount, testCredit, testDebit, testOverdraft, expected, actual;

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

    describe("setOverdraft(): ", () => {
        describe("Input Validation: ", () => {
            it("Should return true when positive number passed", () => {
                //Arrange
                testOverdraft = 100;

                //Act
                actual = testAccount.setOverdraft(testOverdraft);

                //Assert
                expect(actual).toBeTrue();
            });

            it("Should return true when 0 passed", () => {
                //Arrange
                testOverdraft = 0;

                //Act
                actual = testAccount.setOverdraft(testOverdraft);

                //Assert
                expect(actual).toBeTrue();
            });

            it("Should return true when decimal passed", () => {
                //Arrange
                testOverdraft = 100.55;

                //Act
                actual = testAccount.setOverdraft(testOverdraft);

                //Assert
                expect(actual).toBeTrue();
            });

            it("Should return false when negative number passed", () => {
                //Arrange
                testOverdraft = -100;

                //Act
                actual = testAccount.setOverdraft(testOverdraft);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when non-number passed", () => {
                //Arrange
                testOverdraft = "100";

                //Act
                actual = testAccount.setOverdraft(testOverdraft);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when NaN passed", () => {
                //Arrange
                testOverdraft = NaN;

                //Act
                actual = testAccount.setOverdraft(testOverdraft);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when undefined passed", () => {
                //Arrange
                testOverdraft = undefined;

                //Act
                actual = testAccount.setOverdraft(testOverdraft);

                //Assert
                expect(actual).toBeFalse();
            });
        });

        describe("Overdraft", () => {
            it("Should set overdraft to correct amount when valid input passed", () => {
                //Arrange
                testOverdraft = 100;

                //Act
                testAccount.setOverdraft(testOverdraft);

                //Assert
                expect(testAccount.getOverdraft()).toBe(100);
            });

            it("Should not change overdraft when invalid input passed", () => {
                //Arrange
                testOverdraft = -100;

                //Act
                expected = testAccount.getOverdraft();
                testAccount.setOverdraft(testOverdraft);

                //Assert
                expect(testAccount.getOverdraft()).toBe(expected);
            });
        });
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

        describe("Credit: ", () => {
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

            it("Should return true when positive number less than credit plus overdraft passed", () => {
                //Arrange
                testOverdraft = 100;
                testAccount.setOverdraft(testOverdraft);

                testCredit = 200;
                testAccount.addCredit(testCredit);

                testDebit = 250;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeTrue();
            });

            it("Should return true when number equal to credit passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 200;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeTrue();
            });

            it("Should return true when number equal to credit plus overdraft passed", () => {
                //Arrange
                testOverdraft = 100;
                testAccount.setOverdraft(testOverdraft);

                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 300;

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

            xit("Should return false when positive number more than credit passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 300;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when negative number passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = -100;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when more than 2 decimal places passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 150.555;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when 0 passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 0;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when credit 0 and 0 passed", () => {
                //Arrange
                testDebit = 0;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when non-number passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = "100";

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should return false when NaN passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = NaN;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeFalse();
            });

            it("Should not change credit when undefined passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = undefined;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(actual).toBeFalse();
            });
        });

        describe("Credit: ", () => {
            it("Should change credit by correct amount when valid input passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 100;

                //Act
                testAccount.removeCredit(testDebit);

                //Assert
                expect(testAccount.getCredit()).toBe(testCredit - testDebit);
            });

            it("Should not change credit when invalid input passed", () => {
                //Arrange
                testCredit = 200;
                testAccount.addCredit(testCredit);
                testDebit = 300;

                //Act
                actual = testAccount.removeCredit(testDebit);

                //Assert
                expect(testAccount.getCredit()).toBe(testCredit);
            });
        });

        describe("Transactions: ", () => {
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
