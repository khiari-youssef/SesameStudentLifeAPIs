import {SesameRole} from "./SesameRole";

export enum UserSex {
    Male,Female
}

export class SesameUser{
    registrationID : string
    candidatureID : string
    firstName : string
    lastName : string
    email : string
    sex : UserSex
    birthdate: string
    profilePictureUrl : string
    registrationDate : string
    role : SesameRole
    badge : SesameBadge

    constructor(
    registrationID : string,
    candidatureID : string,
    firstName : string,
    lastName : string,
    email : string,
    sex : UserSex,
    birthdate: string,
    profile_picture_id : string,
    registrationDate : string,
    role : SesameRole,
    badge : SesameBadge
    ) {
     this.registrationID = registrationID
     this.candidatureID = candidatureID
     this.firstName = firstName
     this.lastName = lastName
     this.email = email
     this.sex = sex
     this.birthdate = birthdate
     this.badge = badge
     this.profilePictureUrl = profile_picture_id
     this.registrationDate = registrationDate
     this.role = role
    }

}