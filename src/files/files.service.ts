import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { IFilesService } from "./files.service.interface";
import { resolve, join, parse } from "path";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { randomUUID } from "crypto";

@Injectable()
export class FilesService implements IFilesService {
    async deleteFile(filename: string): Promise<void> {
    }

    async createFiles(files): Promise<string[]> {
        let fileNames: string[] = [];
        for (const file of files) {
            this.validateFile(file);
        }
        for (const file of files) {
            try {
                let filename = this.saveFile(file);
                fileNames.push(await filename);
            } catch {
                throw new HttpException("Error while saving file with name " + file.filename, HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }
        return fileNames;
    }

    async createFile(file): Promise<string> {
        try {
            this.validateFile(file);
            return await this.saveFile(file);
        } catch {
            throw new HttpException("Error while saving file", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async saveFile(file): Promise<string> {
        const fileName = randomUUID() + "-" + (new Date()).getTime() + parse(file.filename).ext;
        const filePath = resolve(__dirname, "..", "static");
        if (!existsSync(filePath)) {
            mkdirSync(filePath, { recursive: true });
        }
        writeFileSync(join(filePath, fileName), file.buffer);
        return fileName;
    }

    private validateFile(file) {
        if (!file.filename.match(/\.(jpg|jpeg|png|gif|mp4|mov)$/)) {
            throw new HttpException("Filetype is invalid. Allowed filetypes: jpg, jpeg, png, gif, mp4, mov", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
        }
    }
}