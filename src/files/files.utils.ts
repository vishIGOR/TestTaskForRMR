import { parse } from "path";
import { randomBytes } from "crypto";
import { HttpException, HttpStatus } from "@nestjs/common";

export const fileFilter = function(req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|mov)$/)) {
        throw new HttpException("Filetype is invalid. Allowed filetypes: jpg, jpeg, png, gif, mp4, mov", HttpStatus.UNSUPPORTED_MEDIA_TYPE);
    }
    callback(null, true);
};

export const editFileName = function(req, file, callback) {
    const name = parse(file.originalname).name;
    const randomName = randomBytes(16).toString();
    const timestamp = (new Date()).getTime();
    const fileExtName = parse(file.originalname).ext;

    callback(null, `${name}-${randomName}-${timestamp}${fileExtName}`);
};