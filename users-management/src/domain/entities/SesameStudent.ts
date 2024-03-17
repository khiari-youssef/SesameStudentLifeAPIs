import {SesameUser, UserSex} from "./SesameUser";
import {SesameClass} from "./SesameClass";
import {SesameRole} from "./SesameRole";


export class SesameStudent extends SesameUser {
    portfolioId: string
    job: string
    sesameClass: SesameClass


    constructor(
        registrationID : string,
        firstName : string,
        lastName : string,
        email : string,
        sex : UserSex,
        profile_picture_id : string,
        registrationDate : string,
        portfolioId: string,
        job: string,
        sesameClass: SesameClass,
        role : SesameRole
    ) {
        super(registrationID,firstName,lastName,email,sex,profile_picture_id,registrationDate,role);
        this.portfolioId = portfolioId
        this.job = job
        this.sesameClass = sesameClass

    }


}