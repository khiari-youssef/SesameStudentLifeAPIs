import {UsersRepositoryContract} from "../../../src/infrastructure/data/repositories/UsersRepositoryContract";
import {UsersManagementUsecase} from "../../../src/domain/usecases/UsersManagementUsecase";
import {JwtService} from "@nestjs/jwt";
import {UsersRepositoryMockContract} from "../../infrastructure/security/UsersRepositoryMockContract";
import {AuthServiceImpl} from "../../../src/infrastructure/security/AuthServiceImpl";
import {jest} from "@jest/globals";
import {SesameUser, UserSex} from "../../../src/domain/entities/SesameUser";
import {
    SesamePermissions,
    SesamePermissionState,
    SesameRole,
    SesameRoleType
} from "../../../src/domain/entities/SesameRole";
import {SesameCredentialsLogin} from "../../../src/domain/entities/SesameCredentialsLogin";
import {DomainError, DomainErrorType} from "../../../src/domain/exceptions/DomainError";


describe("UsersManagementUsecaseSpec",()=>{
    let usersRepositoryMockContract : UsersRepositoryContract
    let userManagementUsecase : UsersManagementUsecase

    const validSesameCredentials : SesameCredentialsLogin = new SesameCredentialsLogin(
        "youssef.khiari@sesame.com.tn",
        "0000"
    )

    const sesameUser = new SesameUser(
        "9c057fe2d493527a6f08a405f32387e96f569472",
        "Youssef",
        "Khiari",
        "youssef.khiari@sesame.com.tn",
        UserSex.Male,
        "https://img.freepik.com/free-photo/androgynous-avatar-non-binary-queer-person_23-2151100177.jpg",
        "2020-11-02",
        new SesameRole(
            SesameRoleType.Student,
            "randomid",
            [{
                permission : SesamePermissions.USER_LOGIN,
                description : "controls user's action to login and logout",
                state : SesamePermissionState.GRANTED
            },{
                permission : SesamePermissions.USER_VIEW_PROFILE,
                description : "controls user's action to login and logout",
                state : SesamePermissionState.GRANTED
            },{
                permission : SesamePermissions.USER_UPDATE_PROFILE,
                description : "controls user's action to login and logout",
                state : SesamePermissionState.GRANTED
            }
            ]
        )
    )

    beforeAll(async ()=>{
        usersRepositoryMockContract = new UsersRepositoryMockContract()
        userManagementUsecase = new UsersManagementUsecase(usersRepositoryMockContract)
    })
    describe("when a client authenticates with valid credentials",()=>{
        it('should return a successfull result user profile', async function () {
            await jest.spyOn(usersRepositoryMockContract,'fetchUserByEmailAndPassword').mockImplementation(async ()=> sesameUser)
            await expect(userManagementUsecase.loginUserWithCredentials(validSesameCredentials)).resolves.toStrictEqual(sesameUser)
        });
    })
    describe("when a client authenticates with invalid credentials",()=>{
        it('should fail with an invalid credentials domain error', async function () {
            await jest.spyOn(usersRepositoryMockContract,'fetchUserByEmailAndPassword').mockImplementation(async ()=> undefined)
            await expect(userManagementUsecase.loginUserWithCredentials(new SesameCredentialsLogin(
                "youssef.khiari@sesame.com.tn",
                "0000100"
            ))).resolves.toStrictEqual(
                new DomainError("User with such login not found",DomainErrorType.InvalidLogin)
            )
        });
        it('should fail with an invalid credentials domain error', async function () {
            await jest.spyOn(usersRepositoryMockContract,'fetchUserByEmailAndPassword').mockImplementation(async ()=> undefined)
            await expect(userManagementUsecase.loginUserWithCredentials(new SesameCredentialsLogin(
                "youssef.khiari@sesame.com.tn",
                "0000100"
            ))).resolves.toStrictEqual(
                new DomainError("User with such login not found",DomainErrorType.InvalidLogin)
            )
        });
        it('should fail with an missing email domain error', async function () {
            await jest.spyOn(usersRepositoryMockContract,'fetchUserByEmailAndPassword').mockImplementation(async ()=> undefined)
            await expect(userManagementUsecase.loginUserWithCredentials(new SesameCredentialsLogin(
                "",
                "0000100"
            ))).resolves.toStrictEqual(
                new DomainError("Email is not valid",DomainErrorType.InvalidSesameEmail)
            )
        });
    })
})