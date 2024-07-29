import {Body, Controller, Get, Inject, Post, Query, Res} from "@nestjs/common";
import { EnrollmentForm } from "users-management/src/domain/entities/EnrollmentForm";
import { EnrollmentResult } from "users-management/src/domain/entities/EnrollmentResult";
import { UserEnrollmentUseCase } from "users-management/src/domain/usecases/UserEnrollmentUseCase";
import {DomainError} from "../../domain/exceptions/DomainError";
import {Response} from "express";
import {EnrollmentFormDTO} from "../requestsPayloads/EnrollmentFormDTO";
import {EnrollmentFormMapper} from "../../infrastructure/ports/EnrollmentFormMapper";
import {EmailVerificationRequest} from "../../../../core/src/application/http/response/EmailVerificationRequest";
import {EmailVerificationService} from "../../../../core/src/infrastructure/services/EmailVerificationService";



@Controller('registration')
export class UsersRegistrationController {
    constructor(
        private readonly enrollmentUseCase: UserEnrollmentUseCase,
        private readonly mapper : EnrollmentFormMapper,
      @Inject("EmailVerificationService")  private readonly emailVerificationService : EmailVerificationService
    ) {}


    @Post('candidacy/enroll')
    async enrollCandidateUser(@Body() enrollmentFormDTO : EnrollmentFormDTO,@Res() response: Response): Promise<EnrollmentResult | void> {
            try {
                let enrollmentForm : EnrollmentForm = this.mapper.toDomainEntity(enrollmentFormDTO);
                let result : EnrollmentResult = await this.enrollmentUseCase.execute(enrollmentForm)
                response.status(200).send(result);
            } catch (error){
                if (error instanceof  DomainError) {
                    response.status(400).send({
                        "error_code" : error.type.toString(),
                        "error_message" : error.message,
                        "details" : enrollmentFormDTO
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
    ): Promise<EnrollmentFormDTO> {
      return undefined;
    }

    @Post('candidacy/verify-email')
    async verifyEmailOwnership(
        @Body() emailVerificationRequest : EmailVerificationRequest,
        @Res() response: Response
    ): Promise<void> {
        let isSent : boolean = await this.emailVerificationService.sendVerificationEmail(
             emailVerificationRequest.email,
             emailVerificationRequest.code
         )
        if (isSent) {
            response.status(200).send({
                "status" : "Email sent successfully !"
            })
        } else {
            response.status(400).send({
                "status" : "Could not send email ! try again"
            })
        }
    }

}