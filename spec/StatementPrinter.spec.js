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
                "\ndate       || credit || debit || balance\n" + "14/01/2012 ||        || 50.00 || 250.00\n" + "13/01/2012 || 200.00 ||       || 300.00\n" + "10/01/2012 || 100.00 ||       || 100.00\n"
            );
        });
    });
});
