import {ConfigModule} from "@nestjs/config";


export const EnvConfig = ConfigModule.forRoot(
    {
        envFilePath : ['.dev.env','.staging.env','.prod.env']
    }
)

export const LogConfigProd = {
    logger : false
}

export const LogConfigDev = {
    logger : console
}