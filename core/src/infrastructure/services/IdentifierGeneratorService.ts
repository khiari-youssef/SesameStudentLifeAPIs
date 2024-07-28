import  * as crypto from 'crypto';
import {Injectable} from "@nestjs/common";



export  interface IdentifierGeneratorService {

     generate(data : any) : Promise<string>
}

@Injectable()
export  class IdentifierGeneratorServiceCryptoImpl implements IdentifierGeneratorService {

    private hash = crypto.createHash('sha256')

    async generate(data : any) : Promise<string> {
        await this.hash.update(data)
        return  this.hash.digest('hex')
     }
}