import {ConfigModule} from "@nestjs/config";
import * as fs from "fs";
import {NestApplicationOptions} from "@nestjs/common/interfaces/nest-application-options.interface";
import {join} from "path";


export const EnvConfig = ConfigModule.forRoot(
    {
        envFilePath : process.env.NODE_ENV == "production" ?  [] : (process.env.NODE_ENV == "staging" ? ['.staging.env'] : ['.dev.env'] )
    }
)


const HttpsOptions= {
    key: process.env.SSL_PRIVATE_KEY_PATH == undefined ? null : fs.readFileSync(join(process.cwd(),process.env.SSL_PRIVATE_KEY_PATH)),
    cert: process.env.SSL_CERT_PATH == undefined ? null : fs.readFileSync(join(process.cwd(),process.env.SSL_CERT_PATH))
}

export const LogConfigProd : NestApplicationOptions ={
    logger : false,
    httpsOptions: HttpsOptions
}

export const LogConfigDev : NestApplicationOptions = {
    logger : console
}

export const LogConfigStaging : NestApplicationOptions = {
    logger : console,
    httpsOptions: HttpsOptions
}