import {HttpException, HttpStatus} from "@nestjs/common";



export class InvalidLoginException extends HttpException{

    content: string

    constructor(content: string) {
        super(content,HttpStatus.FORBIDDEN);
    }
}