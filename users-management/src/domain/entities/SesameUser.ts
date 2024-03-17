import {SesameRole} from "./SesameRole";

export enum UserSex {
    Male,Female
}

export class SesameUser{
    registrationID : string
    firstName : string
    lastName : string
    email : string
    sex : UserSex
    profile_picture_id : string
    registrationDate : string
    role : SesameRole

    constructor(
    registrationID : string,
    firstName : string,
    lastName : string,
    email : string,
    sex : UserSex,
    profile_picture_id : string,
    registrationDate : string,
    role : SesameRole
    ) {
     this.registrationID = registrationID
     this.firstName = firstName
     this.lastName = lastName
     this.email = email
     this.sex = sex
     this.profile_picture_id = profile_picture_id
     this.registrationDate = registrationDate
     this.role = role
    }

}