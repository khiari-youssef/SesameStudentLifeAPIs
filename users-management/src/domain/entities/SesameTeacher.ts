import {SesameUser, UserSex} from "./SesameUser";
import {SesameRole} from "./SesameRole";


export class SesameTeacher extends SesameUser{
    portfolioId : string
    profBackground : String
    assignedClasses : []

    constructor(
    registrationID : string,
    candidatureID : string,
    firstName : string,
    lastName : string,
    email : string,
    sex : UserSex,
    birthdate : string,
    profilePictureUrl : string,
    registrationDate : string,
    portfolioId : string,
    profBackground : String,
    assignedClasses : [],
    role : SesameRole,
    badge : SesameBadge
    ) {
        super(registrationID,candidatureID,firstName,lastName,email,sex,birthdate,profilePictureUrl,registrationDate,role,badge);
        this.assignedClasses = assignedClasses
        this.portfolioId = portfolioId
        this.profBackground = profBackground

    }
}