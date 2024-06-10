class InvalidBoardValuesError extends Error {
    constructor() {
        super();
        this.message = 'Invalid board values';
        this.name = 'InvalidBoardValuesError';
    }
}

export default InvalidBoardValuesError;