export default class Account {
    #credit = 0;

    getCredit = () => this.#credit;

    addCredit = (credit) => (this.#credit += credit);
}
