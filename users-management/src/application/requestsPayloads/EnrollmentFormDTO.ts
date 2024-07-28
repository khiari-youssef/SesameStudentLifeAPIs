import {IsDate, IsEmail, IsNotEmpty, IsNumber} from "class-validator";



export class EnrollmentFormDTO{


    @IsEmail()
    @IsNotEmpty()
    personalEmail : string

    @IsNumber()
    @IsNotEmpty()
    phone : string

    @IsNotEmpty()
    sex : string

    @IsDate()
    birthDate : string

    @IsNotEmpty()
    firstName : string

    @IsNotEmpty()
    lastName : string

    @IsNotEmpty()
    programId : string

    constructor(
        personalEmail : string,
        phone : string,
        sex : string,
        birthDate : string,
        firstName : string,
        lastName : string,
        programId : string,
    ){
        this.personalEmail = personalEmail;
        this.phone = phone;
        this.sex = sex;
        this.birthDate = birthDate;
        this.firstName = firstName;
        this.lastName = lastName;
        this.programId = programId;
    }

}