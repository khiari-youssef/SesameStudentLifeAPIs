import {Inject, Injectable} from '@nestjs/common';
import {EnrollmentForm,} from "../entities/EnrollmentForm";
import {EnrollmentResult} from "../entities/EnrollmentResult";
import{EnrollmentRepositoryContract} from "../../infrastructure/data/repositories/EnrollmentRepository"
import {DomainError, DomainErrorType} from "../exceptions/DomainError";


@Injectable()
export class UserEnrollmentUseCase {

    constructor(
        @Inject('EnrollmentRepositoryContract') private readonly  repositoryContract: EnrollmentRepositoryContract,
     ){
 
     }

    async execute(enrollmentForm : EnrollmentForm) : Promise<EnrollmentResult|DomainError>{
          if (enrollmentForm.isFormValid()){
                 return new DomainError(DomainErrorType.InvalidForm,"Invalid EnrollmentForm !")
          } else {
            let existingApplication : EnrollmentResult = await this.repositoryContract.findExistingEnrollmentByEmail(enrollmentForm.personalEmail)
            if (!existingApplication){
                return new DomainError(DomainErrorType.AlreadyInUse,`someone using this email: ${enrollmentForm.personalEmail} is already registered !`) 

            } else {
                await this.repositoryContract.saveEnrollment(enrollmentForm,"");
            }
          }
    }
}