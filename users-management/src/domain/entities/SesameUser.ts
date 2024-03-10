import {SesameRole} from "./SesameRole";
import {SesameTeacher} from "./SesameTeacher";


export class SesameUser{
    registrationID : string
    firstName : string
    lastName : string
    email : string
    sex : string
    profile_picture_id : string
    registrationDate : string
    role : SesameRole

    constructor(
    registrationID : string,
    firstName : string,
    lastName : string,
    email : string,
    sex : string,
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