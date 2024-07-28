import {Inject, Injectable} from '@nestjs/common';
import {EnrollmentForm,} from "../entities/EnrollmentForm";
import {EnrollmentResult} from "../entities/EnrollmentResult";
import{EnrollmentRepositoryContract} from "../../infrastructure/data/repositories/EnrollmentRepository"
import {DomainError, DomainErrorType} from "../exceptions/DomainError";
import {ValidationService} from "../../../../core/src/utilities/validation_service";
import {IdentifierGeneratorService} from "../../../../core/src/infrastructure/services/IdentifierGeneratorService";


@Injectable()
export class UserEnrollmentUseCase {

    constructor(
        @Inject('EnrollmentRepositoryContract') private readonly  repositoryContract: EnrollmentRepositoryContract,
        @Inject("IdentifierGeneratorService") private readonly identifierGeneratorService : IdentifierGeneratorService
     ){
 
     }

    async execute(enrollmentForm : EnrollmentForm) : Promise<EnrollmentResult>{
          if (ValidationService.isEmailValid(enrollmentForm.personalEmail) && ValidationService.hasContent(enrollmentForm.firstName) && ValidationService.hasContent(enrollmentForm.lastName)){
              throw new DomainError("Enrollment form is not correctly filled :",DomainErrorType.InvalidForm)
          } else {
            let existingApplication : EnrollmentResult = await this.repositoryContract.findExistingEnrollmentByEmail(enrollmentForm.personalEmail)
            if (!existingApplication){
                throw new DomainError(DomainErrorType.AlreadyInUse,`someone using this email: ${enrollmentForm.personalEmail} is already registered !`)
            } else {
                let enrollmentFormId = await this.identifierGeneratorService.generate(`${new Date().toISOString()}-${enrollmentForm.personalEmail}`);
                console.log(enrollmentFormId);
               return  await this.repositoryContract.saveEnrollment(
                    enrollmentForm,
                   enrollmentFormId
                );
            }
          }
    }
}