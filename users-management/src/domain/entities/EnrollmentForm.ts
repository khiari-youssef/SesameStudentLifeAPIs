

export enum EnrollmentStatus {
    Rejected,Pending,Approved
}

export class EnrollmentForm{
    personalEmail : string
    phone : string
    sex : string
    birthDate : string
    firstName : string
    lastName : string
    programId : string
    status : EnrollmentStatus

    EnrollmentForm(
     personalEmail : string,
    phone : string,
    sex : string,
    birthDate : string,
    firstName : string,
    lastName : string,
    programId : string,
    status : EnrollmentStatus
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

    isFormValid() : boolean{
        return true;
    }
}