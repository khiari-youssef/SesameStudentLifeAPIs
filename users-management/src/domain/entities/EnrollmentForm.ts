import {ValidationService} from "../../../../core/src/utilities/validation_service";
import {UserSex} from "./SesameUser";


export enum EnrollmentStatus {
    Rejected,Pending,Approved
}

export class EnrollmentForm{
    personalEmail : string
    phone : string
    sex : UserSex
    birthDate : Date
    firstName : string
    lastName : string
    programId : string
    status : EnrollmentStatus

    constructor(
     personalEmail : string,
    phone : string,
    sex : UserSex,
    birthDate : Date,
    firstName : string,
    lastName : string,
    programId : string,
    status : EnrollmentStatus = EnrollmentStatus.Pending
    ){
      this.personalEmail = personalEmail
      this.phone = phone;
      this.sex = sex;
      this.birthDate = birthDate;
      this.firstName = firstName;
      this.lastName = lastName;
      this.programId = programId;
      this.status = status;
    }

}