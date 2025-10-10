export class HTTPException extends Error {
    public readonly code: number;
    constructor(code: number) {
        super(code.toString());
        this.code = code;
        this.name = "HTTPException";
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export class BadRequestException extends HTTPException {
    static readonly CODE = 400;
    constructor() {
        super(BadRequestException.CODE);
        this.name = "BadRequestException";
    }
}

export class UnauthorizedException extends HTTPException {
    static readonly CODE = 401;
    constructor() {
        super(UnauthorizedException.CODE);
        this.name = "UnauthorizedException";
    }
}

export class ForbiddenException extends HTTPException {
    static readonly CODE = 403;
    constructor() {
        super(ForbiddenException.CODE);
        this.name = "ForbiddenException";
    }
}

export class NotFoundException extends HTTPException {
    static readonly CODE = 404;
    constructor() {
        super(NotFoundException.CODE);
        this.name = "NotFoundException";
    }
}

export class InternalServerException extends HTTPException {
    static readonly CODE = 500;
    constructor() {
        super(InternalServerException.CODE);
        this.name = "InternalServerErrorException";
    }
}

export class UnknownHTTPException extends HTTPException {
    static readonly CODE = -1;
    constructor() {
        super(UnknownHTTPException.CODE);
        this.name = "UnknownHTTPException";
    }
}
