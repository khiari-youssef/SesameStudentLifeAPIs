import {Module} from "@nestjs/common";
import {IdentifierGeneratorServiceCryptoImpl} from "../infrastructure/services/IdentifierGeneratorService";


@Module({
    imports:[],
    providers: [
        {
            provide: "IdentifierGeneratorService",
            useValue: new IdentifierGeneratorServiceCryptoImpl()
        }
    ],
    exports:[
        {
            provide: "IdentifierGeneratorService",
            useValue: new IdentifierGeneratorServiceCryptoImpl()
        }
    ]
})
export class CoreModule{}