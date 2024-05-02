export default class Account {
    #credit = 0;

    getCredit = () => this.#credit;

    validateNumber = (number) => typeof number === "number" && !isNaN(number);

    addCredit = (credit) => {
        if (!this.validateNumber(credit)) return;
        if (credit < 0) return;

        this.#credit += credit;
    };
}
