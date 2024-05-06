import StatementPrinter from "../src/StatementPrinter.js";

describe("Statement Printer: ", () => {
    describe("printStatement(): ", () => {
        it("Should print transaction history when at least one Transaction in Account", () => {
            //Arrange
            let testAccount = jasmine.createSpyObj("testAccount", {
                getTransactions: [
                    { date: "10/01/2012", amount: 100 },
                    { date: "13/01/2012", amount: 200 },
                    { date: "14/01/2012", amount: -50 },
                ],
            });
            spyOn(console, "log");

            //Act
            StatementPrinter.printStatement(testAccount.getTransactions());

            //Assert
            expect(console.log).toHaveBeenCalledWith(
                "\ndate       || credit || debit || balance\n" +
                    "14/01/2012 || \x1b[32m      \x1b[0m || \x1b[31m50.00\x1b[0m || \x1b[32m250.00\x1b[0m\n" +
                    "13/01/2012 || \x1b[32m200.00\x1b[0m || \x1b[31m     \x1b[0m || \x1b[32m300.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m100.00\x1b[0m || \x1b[31m     \x1b[0m || \x1b[32m100.00\x1b[0m\n"
            );
        });

        it("Should print correctly when credit length longer than 6 characters", () => {
            //Arrange
            let testAccount = jasmine.createSpyObj("testAccount", {
                getTransactions: [
                    { date: "10/01/2012", amount: 1000 },
                    { date: "13/01/2012", amount: 2000 },
                    { date: "14/01/2012", amount: -500 },
                ],
            });
            spyOn(console, "log");

            //Act
            StatementPrinter.printStatement(testAccount.getTransactions());

            //Assert
            expect(console.log).toHaveBeenCalledWith(
                "\ndate       || credit  || debit  || balance\n" +
                    "14/01/2012 || \x1b[32m       \x1b[0m || \x1b[31m500.00\x1b[0m || \x1b[32m2500.00\x1b[0m\n" +
                    "13/01/2012 || \x1b[32m2000.00\x1b[0m || \x1b[31m      \x1b[0m || \x1b[32m3000.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m1000.00\x1b[0m || \x1b[31m      \x1b[0m || \x1b[32m1000.00\x1b[0m\n"
            );
        });

        it("Should print correctly with amounts of differing length", () => {
            //Arrange
            let testAccount = jasmine.createSpyObj("testAccount", {
                getTransactions: [
                    { date: "10/01/2012", amount: 1 },
                    { date: "10/01/2012", amount: 10 },
                    { date: "10/01/2012", amount: 100 },
                    { date: "10/01/2012", amount: 1000 },
                    { date: "10/01/2012", amount: 10000 },
                    { date: "10/01/2012", amount: 100000 },
                    { date: "10/01/2012", amount: 10000 },
                    { date: "10/01/2012", amount: 1000 },
                    { date: "10/01/2012", amount: 100 },
                    { date: "10/01/2012", amount: 10 },
                    { date: "10/01/2012", amount: 1 },
                    { date: "10/01/2012", amount: -1 },
                    { date: "10/01/2012", amount: -10 },
                    { date: "10/01/2012", amount: -100 },
                    { date: "10/01/2012", amount: -1000 },
                    { date: "10/01/2012", amount: -10000 },
                    { date: "10/01/2012", amount: -100000 },
                    { date: "10/01/2012", amount: -10000 },
                    { date: "10/01/2012", amount: -1000 },
                    { date: "10/01/2012", amount: -100 },
                    { date: "10/01/2012", amount: -10 },
                    { date: "10/01/2012", amount: -1 },
                ],
            });
            spyOn(console, "log");

            //Act
            StatementPrinter.printStatement(testAccount.getTransactions());

            //Assert
            expect(console.log).toHaveBeenCalledWith(
                "\ndate       || credit    || debit     || balance\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m1.00     \x1b[0m || \x1b[32m0.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m10.00    \x1b[0m || \x1b[32m1.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m100.00   \x1b[0m || \x1b[32m11.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m1000.00  \x1b[0m || \x1b[32m111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m10000.00 \x1b[0m || \x1b[32m1111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m100000.00\x1b[0m || \x1b[32m11111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m10000.00 \x1b[0m || \x1b[32m111111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m1000.00  \x1b[0m || \x1b[32m121111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m100.00   \x1b[0m || \x1b[32m122111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m10.00    \x1b[0m || \x1b[32m122211.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m         \x1b[0m || \x1b[31m1.00     \x1b[0m || \x1b[32m122221.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m1.00     \x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m122222.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m10.00    \x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m122221.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m100.00   \x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m122211.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m1000.00  \x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m122111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m10000.00 \x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m121111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m100000.00\x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m111111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m10000.00 \x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m11111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m1000.00  \x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m1111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m100.00   \x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m111.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m10.00    \x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m11.00\x1b[0m\n" +
                    "10/01/2012 || \x1b[32m1.00     \x1b[0m || \x1b[31m         \x1b[0m || \x1b[32m1.00\x1b[0m\n"
            );
        });

        it("Should print message when no Transactions in Account", () => {
            //Arrange
            let testAccount = jasmine.createSpyObj("testAccount", {
                getTransactions: [],
            });
            spyOn(console, "log");

            //Act
            StatementPrinter.printStatement(testAccount.getTransactions());

            //Assert
            expect(console.log).toHaveBeenCalledWith("No previous transactions found for this account");
        });
    });
});
