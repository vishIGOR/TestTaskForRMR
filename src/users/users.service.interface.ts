import { LoginUserDto, RefreshTokenDto, RegisterUserDto, TokenPairDto } from "./users.dtos";
import { ClientSession } from "mongoose";

export interface IUsersService {
    registerUser(userDto: RegisterUserDto, session: ClientSession): Promise<TokenPairDto>,

    loginUser(userDto: LoginUserDto, session: ClientSession): Promise<TokenPairDto>,

    refreshToken(refreshTokenDto: RefreshTokenDto, session: ClientSession): Promise<TokenPairDto>,
}

export const IUsersService = Symbol("IUsersService");