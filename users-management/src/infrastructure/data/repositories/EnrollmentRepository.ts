import {Inject, Injectable} from '@nestjs/common';
import {EnrollmentForm, EnrollmentStatus,} from "../../../domain/entities/EnrollmentForm";
import {EnrollmentResult} from "../../../domain/entities/EnrollmentResult";
import {DomainError, DomainErrorType} from "../../../domain/exceptions/DomainError";

export interface EnrollmentRepositoryContract{
     findExistingEnrollmentByEmail(email : string) : Promise<EnrollmentResult>
     saveEnrollment(form : EnrollmentForm,enrollmentID : string) : Promise<EnrollmentResult>
}


@Injectable()
export class EnrollmentRepository implements EnrollmentRepositoryContract{

     async findExistingEnrollmentByEmail(email : string) : Promise<EnrollmentResult>{
        return {
            enrollmentID : "randomid",
            status : EnrollmentStatus.Pending
        };
     }

     async saveEnrollment(form : EnrollmentForm,enrollmentID : string) : Promise<EnrollmentResult>{
        return {
            enrollmentID : enrollmentID,
            status : EnrollmentStatus.Pending
        };
     }

}