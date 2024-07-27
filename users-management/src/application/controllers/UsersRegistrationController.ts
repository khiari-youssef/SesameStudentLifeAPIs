import {Body, Controller, Get, HttpStatus, Post, Query, Res, ValidationPipe} from "@nestjs/common";
import { EnrollmentForm } from "users-management/src/domain/entities/EnrollmentForm";
import { EnrollmentResult } from "users-management/src/domain/entities/EnrollmentResult";
import { UserEnrollmentUseCase } from "users-management/src/domain/usecases/UserEnrollmentUseCase";
import {DomainError} from "../../domain/exceptions/DomainError";
import {Response} from "express";



@Controller('registration')
export class UsersRegistrationController {
    constructor(
        private readonly enrollmentUseCase: UserEnrollmentUseCase
    ) {}


    @Post('candidacy/enroll')
    async enrollCandidateUser(@Body(new ValidationPipe({
        expectedType: EnrollmentForm,
        errorHttpStatusCode : HttpStatus.BAD_REQUEST,
    })) enrollmentForm : EnrollmentForm,@Res() response: Response): Promise<EnrollmentResult | void> {
            try {
                let result : EnrollmentResult = await this.enrollmentUseCase.execute(enrollmentForm)
                response.status(200).send(result);
            } catch (error){
                if (error instanceof  DomainError) {
                    response.status(400).send({
                        "error_code" : error.type.toString(),
                        "error_message" : error.message,
                        "details" : enrollmentForm
                    });
                }  else {
                    response.status(500).send({
                        "error_message" : error.message
                    });
                }
            }
    }

    @Get('candidacy/search')
    async findCandidateById(
        @Query("email") email : string,
        @Query("candidatureID") candidatureID : string,
        @Query("firstName") firstName : string,
        @Query("lastName") lastName: string
    ): Promise<EnrollmentResult | void> {

    }

}