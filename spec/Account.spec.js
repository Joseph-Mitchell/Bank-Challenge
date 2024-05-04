import Account from "../src/Account.js";

describe("Account: ", () => {
    let testAccount, testCredit, expected;

    beforeEach(() => {
        testAccount = new Account();
    });

    afterEach(() => {
        testAccount = undefined;
        testCredit = undefined;
        expected = undefined;
    });

    describe("addCredit(): ", () => {
        describe("Valid Inputs: ", () => {
            describe("Credit: ", () => {
                it("Should increase credit by correct amount when amount passed is positive number", () => {
                    //Arrange
                    testCredit = 100;

                    //Act
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit);
                });

                it("Should increase credit by correct amount when decimal passed", () => {
                    //Arrange
                    testCredit = 100.55;

                    //Act
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit);
                });
            });

            it("Should add Transaction with correct values to transactions[] when positive number passed", () => {
                //Arrange
                testCredit = 100;

                //Act
                testAccount.addCredit(testCredit);

                //Assert
                let expectedDate = new Date().toLocaleDateString("en-UK");
                expect(testAccount.getTransactions()[0].date).toBe(expectedDate);
                expect(testAccount.getTransactions()[0].amount).toBe(testCredit);
            });
        });

        describe("Invalid Inputs: ", () => {
            describe("Credit: ", () => {
                it("Should not change credit when negative number passed", () => {
                    //Arrange
                    testCredit = -100;

                    //Act
                    expected = testAccount.getCredit();
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(expected);
                });

                it("Should not change credit when 0 passed", () => {
                    //Arrange
                    testCredit = 0;

                    //Act
                    expected = testAccount.getCredit();
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(expected);
                });

                it("Should not change credit when non-number passed", () => {
                    //Arrange
                    testCredit = "";

                    //Act
                    expected = testAccount.getCredit();
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(expected);
                });

                it("Should not change credit when NaN passed", () => {
                    //Arrange
                    testCredit = NaN;

                    //Act
                    expected = testAccount.getCredit();
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(expected);
                });

                it("Should not change credit when undefined passed", () => {
                    //Arrange
                    testCredit = undefined;

                    //Act
                    expected = testAccount.getCredit();
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(expected);
                });

                it("Should not change credit when more than 2 decimal places passed", () => {
                    //Arrange
                    testCredit = 100.555;

                    //Act
                    expected = testAccount.getCredit();
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(expected);
                });
            });

            describe("Transactions: ", () => {
                it("Should not add Transaction when negative number passed", () => {
                    //Arrange
                    testCredit = -100;

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });

                it("Should not add Transaction when 0 passed", () => {
                    //Arrange
                    testCredit = 0;

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });

                it("Should not add Transaction when non-number passed", () => {
                    //Arrange
                    testCredit = "100";

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });

                it("Should not add Transaction when non-number passed", () => {
                    //Arrange
                    testCredit = "100";

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });

                it("Should not add Transaction when non-number passed", () => {
                    //Arrange
                    testCredit = NaN;

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });

                it("Should not add Transaction when non-number passed", () => {
                    //Arrange
                    testCredit = undefined;

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.addCredit(testCredit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });
            });
        });
    });

    describe("removeCredit(): ", () => {
        let testDebit;

        afterEach(() => {
            testDebit = undefined;
        });

        describe("Valid Inputs: ", () => {
            describe("Credit: ", () => {
                it("Should decrease credit by correct amount when positive number less than credit passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = 100;

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit - testDebit);
                });

                it("Should decrease credit by correct amount when  number equal to credit passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = 200;

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit - testDebit);
                });

                it("Should decrease credit by correct amount when decimal passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = 150.55;

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit - testDebit);
                });
            });

            describe("Transactions: ", () => {
                it("Should add Transaction with correct values when positive number less than credit passed", () => {
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

                it("Should add Transaction when positive number equal to credit passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = 200;

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    let expectedDate = new Date().toLocaleDateString("en-UK");
                    expect(testAccount.getTransactions()[1].date).toBe(expectedDate);
                    expect(testAccount.getTransactions()[1].amount).toBe(-testDebit);
                });
            });
        });

        describe("Invalid Inputs: ", () => {
            describe("Credit: ", () => {
                it("Should not change credit when positive number more than credit passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = 300;

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit);
                });

                it("Should not change credit when negative number passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = -100;

                    //Act
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getCredit()).toBe(testCredit);
                });

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
            });

            describe("Transactions: ", () => {
                it("Should not add Transaction when number more than credit passed", () => {
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

                it("Should not add Transaction when negative number passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = -100;

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });

                it("Should not add Transaction when 0 passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = 0;

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });

                it("Should not add Transaction when credit 0 and 0 passed", () => {
                    //Arrange
                    testDebit = 0;

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });

                it("Should not add Transaction when non-number passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = "100";

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });

                it("Should not add Transaction when NaN passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = NaN;

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });

                it("Should not add Transaction when undefined passed", () => {
                    //Arrange
                    testCredit = 200;
                    testAccount.addCredit(testCredit);
                    testDebit = undefined;

                    //Act
                    expected = testAccount.getTransactions().length;
                    testAccount.removeCredit(testDebit);

                    //Assert
                    expect(testAccount.getTransactions().length).toBe(expected);
                });
            });
        });
    });
});
