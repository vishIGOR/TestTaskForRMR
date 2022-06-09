import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";
import { diskStorage } from "multer";

export function ApiPostFiles() {
    return applyDecorators(
        UseInterceptors(
            FilesInterceptor("files", 10)
        ),
        ApiConsumes("multipart/form-data")
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

