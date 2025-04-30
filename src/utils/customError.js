export class CustomError extends Error {
    constructor(messageKey) {
        super(messageKey);
        this.name = this.constructor.name;
    }
}

