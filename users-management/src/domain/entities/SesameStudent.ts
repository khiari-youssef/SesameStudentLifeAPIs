import {SesameUser, UserSex} from "./SesameUser";
import {SesameClass} from "./SesameClass";
import {SesameRole} from "./SesameRole";


export class SesameStudent extends SesameUser {
    portfolioId: string
    sesameClass: SesameClass


    constructor(
        registrationID : string,
        candidatureID : string,
        firstName : string,
        lastName : string,
        email : string,
        sex : UserSex,
        birthdate: string,
        profilePictureUrl : string,
        registrationDate : string,
        portfolioId: string,
        sesameClass: SesameClass,
        role : SesameRole,
        badge : SesameBadge
    ) {
        super(registrationID,candidatureID,firstName,lastName,email,sex,birthdate,profilePictureUrl,registrationDate,role,badge);
        this.portfolioId = portfolioId
        this.sesameClass = sesameClass
    }


}

export class SesameProfStudent extends SesameStudent {
    jobPosition: string
    company: string
    contractType : string



    constructor(
        registrationID : string,
        candidatureID : string,
        firstName : string,
        lastName : string,
        email : string,
        sex : UserSex,
        birthdate: string,
        profilePictureUrl : string,
        registrationDate : string,
        portfolioId: string,
        sesameClass: SesameClass,
        role : SesameRole,
        badge : SesameBadge,
        jobPosition: string,
        company: string,
        contractType : string
    ) {
        super(registrationID,candidatureID,firstName,lastName,email,sex,birthdate,profilePictureUrl,registrationDate,portfolioId,sesameClass,role,badge);
        this.jobPosition = jobPosition
        this.company = company
        this.contractType = contractType
    }


}