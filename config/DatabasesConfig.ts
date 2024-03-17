import {Sequelize} from "sequelize-typescript";


export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: process.env.MY_SQL_HOST,
                port: Number(process.env.MY_SQL_PORT),
                username: process.env.MY_SQL_LOGIN,
                password: process.env.MY_SQL_PASSWORD,
                database: process.env.MY_SQL_APP_DB,
            });
            //sequelize.addModels([Cat]);
            await sequelize.sync();
            return sequelize;
        },
    },
];