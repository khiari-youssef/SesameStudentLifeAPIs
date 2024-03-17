import {ConfigModule} from "@nestjs/config";


export const EnvConfig = ConfigModule.forRoot(
    {
        envFilePath : ['.dev.env','.staging.env','.prod.env']
    }
)