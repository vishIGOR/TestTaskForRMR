import {
    BadRequestException,
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Inject,
    Post,
    Res
} from "@nestjs/common";
import { LoginUserDto, RefreshTokenDto, RegisterUserDto, TokenPairDto } from "./users.dtos";
import { Connection } from "mongoose";
import { InjectConnection } from "@nestjs/mongoose";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { IUsersService } from "./users.service.interface";
import { AST } from "eslint";
import Token = AST.Token;

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
    constructor(@InjectConnection() private readonly _mongoConnection: Connection, @Inject(IUsersService) private readonly _usersService: IUsersService) {
    }

    @Post("/register")
    async register(@Body() userDto: RegisterUserDto, @Res() res: Response) {
        const session = await this._mongoConnection.startSession();
        // session.startTransaction();
        try {
            let tokenPair: TokenPairDto = await this._usersService.registerUser(userDto, session);
            // await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(tokenPair);
        } catch (error) {
            // await session.abortTransaction();
            if (error instanceof HttpException)
                throw error;
            throw new HttpException("Unexpected server error", HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            await session.endSession();
        }
    }

    @Post("/login")
    async login(@Body() userDto: LoginUserDto, @Res() res: Response) {
        const session = await this._mongoConnection.startSession();
        // session.startTransaction();
        try {
            let tokenPair: TokenPairDto = await this._usersService.loginUser(userDto, session);
            // await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(tokenPair);
        } catch (error) {
            console.log(error);
            // await session.abortTransaction();
            if (error instanceof HttpException)
                throw error;
            throw new HttpException("Unexpected server error", HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            await session.endSession();
        }
    }

    @Post("/refresh")
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Res() res: Response) {
        const session = await this._mongoConnection.startSession();
        // session.startTransaction();
        try {
            let tokenPair: TokenPairDto = await this._usersService.refreshToken(refreshTokenDto, session);
            // await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(tokenPair);
        } catch (error) {
            console.log(error);
            // await session.abortTransaction();
            if (error instanceof HttpException)
                throw error;
            throw new HttpException("Unexpected server error", HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            await session.endSession();
        }
    }


}
