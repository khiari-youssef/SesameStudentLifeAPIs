import {SesameUser, UserSex} from "./SesameUser";
import {SesameRole} from "./SesameRole";


export class SesameTeacher extends SesameUser{
    portfolioId : string
    profBackground : String
    assignedClasses : []

    constructor(
    registrationID : string,
    firstName : string,
    lastName : string,
    email : string,
    sex : UserSex,
    profile_picture_id : string,
    registrationDate : string,
    portfolioId : string,
    profBackground : String,
    assignedClasses : [],
    role : SesameRole
    ) {
        super(registrationID,firstName,lastName,email,sex,profile_picture_id,registrationDate,role);
        this.assignedClasses = assignedClasses
        this.portfolioId = portfolioId
        this.profBackground = profBackground

    }
}