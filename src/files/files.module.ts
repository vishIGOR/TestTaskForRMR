import { Module } from "@nestjs/common";
import { FilesController } from "./files.controller";
import { IFilesService } from "./files.service.interface";
import { FilesService } from "./files.service";

@Module({
    controllers: [FilesController],
    providers: [{
        provide: IFilesService,
        useClass: FilesService
    }],
    exports: [{
        provide: IFilesService,
        useClass: FilesService
    }],
})
export class FilesModule {
}
