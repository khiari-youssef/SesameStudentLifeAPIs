import {EmailVerificationService} from "./EmailVerificationService";


export  class  EmailVerificationServiceImpl implements EmailVerificationService{

    async sendVerificationEmail(email : string,code : string) : Promise<boolean> {
        return  true;
    }
}