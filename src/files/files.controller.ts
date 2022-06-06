import { Controller, Get, Inject, Param, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { Response } from "express";
import { IFilesService } from "./files.service.interface";

@ApiTags("Файлы")
@Controller('files')
export class FilesController {
    constructor(@Inject(IFilesService) private readonly _filesService: IFilesService) {
    }
    // @Get("/:filename")
    // async getFile(@Param("filename") filename: string, @Res() res: Response) {
    //     // res.sendFile(filename, { root: './uploads'});
    //     this._filesService.getFile(filename,res);
    // }
}
