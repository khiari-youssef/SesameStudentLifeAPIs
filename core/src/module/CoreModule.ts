import {Module} from "@nestjs/common";
import {IdentifierGeneratorServiceCryptoImpl} from "../infrastructure/services/IdentifierGeneratorService";
import {EmailVerificationServiceImpl} from "../infrastructure/services/EmailVerificationServiceImpl";


@Module({
    imports:[],
    providers: [
        {
            provide: "IdentifierGeneratorService",
            useValue: new IdentifierGeneratorServiceCryptoImpl()
        },
        {
            provide: "EmailVerificationService",
            useValue: new EmailVerificationServiceImpl()
        }
    ],
    exports:[
        {
            provide: "IdentifierGeneratorService",
            useValue: new IdentifierGeneratorServiceCryptoImpl()
        },
        {
            provide: "EmailVerificationService",
            useValue: new EmailVerificationServiceImpl()
        }
    ]
})
export class CoreModule{}