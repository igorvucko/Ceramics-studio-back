import {UserFromJWT} from '../../auth/jwt.strategy';

declare global {
    namespace Express {
        interface Request {
            user?: UserFromJWT;
        }
    }
}

export {};