export default class Account {
    #credit = 0;

    getCredit = () => this.#credit;

    addCredit = (credit) => {
        if (typeof credit !== "number") return;
        if (credit < 0) return;

        this.#credit += credit;
    };
}
