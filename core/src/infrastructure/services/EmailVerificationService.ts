

export  interface  EmailVerificationService {
    sendVerificationEmail(email : string,code : string) : Promise<boolean>
}