import { BadRequestException, Body, Controller, Get, HttpStatus, Inject, Post, Res } from "@nestjs/common";
import { LoginUserDto, RefreshTokenDto, RegisterUserDto, TokenPairDto } from "./users.dtos";
import { Connection } from "mongoose";
import { InjectConnection } from "@nestjs/mongoose";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";
import { IUsersService } from "./users.service.interface";

@ApiTags("Пользователи")
@Controller("users")
export class UsersController {
    constructor(@InjectConnection() private readonly mongoConnection: Connection, @Inject(IUsersService) private readonly usersService: IUsersService) {
    }

    @Post("/register")
    async register(@Body() userDto: RegisterUserDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        // session.startTransaction();
        try {
            let tokenPair: any = await this.usersService.registerUser(userDto, session);
            // await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(tokenPair);
        } catch (error) {
            // await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            await session.endSession();
        }
    }

    @Post("/login")
    async login(@Body() userDto: LoginUserDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        // session.startTransaction();
        try {
            let tokenPair: any = await this.usersService.loginUser(userDto, session);
            // await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(tokenPair);
        } catch (error) {
            console.log(error);
            // await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            await session.endSession();
        }
    }

    @Post("/refresh")
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto, @Res() res: Response) {
        const session = await this.mongoConnection.startSession();
        // session.startTransaction();
        try {
            let tokenPair: any = await this.usersService.refreshToken(refreshTokenDto, session);
            // await session.commitTransaction();
            return res.status(HttpStatus.CREATED).send(tokenPair);
        } catch (error) {
            console.log(error);
            // await session.abortTransaction();
            throw new BadRequestException(error);
        } finally {
            await session.endSession();
        }
    }
}