import { LoginUserDto, RefreshTokenDto, RegisterUserDto, TokenPairDto } from "./users.dtos";
import { ClientSession } from "mongoose";

export interface IUsersService {
    registerUser(userDto: RegisterUserDto, session: ClientSession): Promise<TokenPairDto | null>,

    loginUser(userDto: LoginUserDto, session: ClientSession): Promise<TokenPairDto | null>,

    refreshToken(refreshTokenDto: RefreshTokenDto, session: ClientSession): Promise<TokenPairDto | null>,
}

export const IUsersService = Symbol("IUsersService");