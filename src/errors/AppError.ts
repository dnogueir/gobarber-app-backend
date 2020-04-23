class Error {

    public readonly message: string;

    public readonly statuscode: number;

    constructor(message: string, statuscode = 400) {
        this.message = message;
        this.statuscode = statuscode;
    }

}

export default Error;
