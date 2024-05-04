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
                    "14/01/2012 ||        || 50.00 || 250.00\n" +
                    "13/01/2012 || 200.00 ||       || 300.00\n" +
                    "10/01/2012 || 100.00 ||       || 100.00\n"
            );
        });

        it("Should print correctly when credit length longer than 6 characters", () => {
            //Arrange
            let testAccount = jasmine.createSpyObj("testAccount", {
                getTransactions: [
                    { date: "10/01/2012", amount: 1000 },
                    { date: "13/01/2012", amount: 2000 },
                    { date: "14/01/2012", amount: -50 },
                ],
            });
            spyOn(console, "log");

            //Act
            StatementPrinter.printStatement(testAccount.getTransactions());

            //Assert
            expect(console.log).toHaveBeenCalledWith(
                "\ndate       || credit  || debit || balance\n" +
                    "14/01/2012 ||         || 50.00 || 2950.00\n" +
                    "13/01/2012 || 2000.00 ||       || 3000.00\n" +
                    "10/01/2012 || 1000.00 ||       || 1000.00\n"
            );
        });

        it("Should print correctly when debit length longer than 5 characters", () => {
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
                    "14/01/2012 ||         || 500.00 || 2500.00\n" +
                    "13/01/2012 || 2000.00 ||        || 3000.00\n" +
                    "10/01/2012 || 1000.00 ||        || 1000.00\n"
            );
        });
    });
});
