export interface JwtSchema {
    iss: string;
    sub: string;
    roles: ["ROLE_MENTOR" | "ROLE_MENTEE"];
    iat: number;
    exp: number;
}
