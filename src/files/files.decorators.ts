import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { diskStorage } from "multer";
import { editFileName, fileFilter } from "./files.utils";

export function ApiPostFiles() {
    return applyDecorators(
        UseInterceptors(
            FilesInterceptor("files", 10, {
                storage: diskStorage({
                    destination: "./uploads",
                    filename: editFileName
                }),
                fileFilter: fileFilter
            })
        ),
        ApiConsumes("multipart/form-data"),
        // ApiBody({
        //     schema: {
        //         type: "object",
        //         properties: {
        //             file: {
        //                 type: "string",
        //                 format: "binary"
        //             }
        //         }
        //     }
        // })
    );
}

