

export class  ValidationService{

    static  isEmailValid(email : string) : boolean {
      return RegExp('/\\S+@\\S+\\.\\S+/').test(email);
    }

    static  hasContent(text : string) : boolean {
        return text.replaceAll(" ","").length > 0
    }


}