import {AuthServiceImpl} from "../../../src/infrastructure/security/AuthServiceImpl";
import {UsersManagementUsecase} from "../../../src/domain/usecases/UsersManagementUsecase";
import {JwtService} from "@nestjs/jwt";
import {AuthService} from "../../../src/infrastructure/security/AuthService";
import {UsersRepositoryContract} from "../../../src/infrastructure/data/repositories/UsersRepositoryContract";
import {UsersRepositoryMockContract} from "./UsersRepositoryMockContract";
import {jest} from "@jest/globals";
import {SesameUser, UserSex} from "../../../src/domain/entities/SesameUser";
import {
    SesamePermissions,
    SesamePermissionState,
    SesameRole,
    SesameRoleType
} from "../../../src/domain/entities/SesameRole";
import {LoginResponse} from "../../../src/application/responsePayloads/LoginResponse";
import {DomainError, DomainErrorType} from "../../../src/domain/exceptions/DomainError";
import {SesameCredentialsLogin} from "../../../src/domain/entities/SesameCredentialsLogin";


describe('AuthenticationServiceTest',()=>{

    let usersRepositoryMockContract : UsersRepositoryContract
    let userManagementUsecase : UsersManagementUsecase
    let jwtService : JwtService
    let authService : AuthService
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

    const validSesameCredentialsToken : string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlvdXNzZWYua2hpYXJpQHNlc2FtZS5jb20udG4iLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.TLEpI4DANr5RbVPdBESDT4rHt50Ud-Im7s6r909Uyho"
    const invalidPasswordSesameCredentials : SesameCredentialsLogin = new SesameCredentialsLogin(
        "youssef.khiari@sesame.com.tn",
        "00001"
    )
    const invalidNoEmailSesameCredentials : SesameCredentialsLogin = new SesameCredentialsLogin(
        "",
        "00001"
    )
    const invalidEmailDomainSesameCredentials : SesameCredentialsLogin = new SesameCredentialsLogin(
        "youssef.khiari@gmail.com",
        "00001"
    )



    beforeAll(async ()=>{
        jwtService = JwtService.prototype
        usersRepositoryMockContract = new UsersRepositoryMockContract()
        userManagementUsecase = new UsersManagementUsecase(usersRepositoryMockContract)
        authService = new AuthServiceImpl(userManagementUsecase,jwtService)
    })
    describe('when a client authenticates with valid credentials',  () => {
        it('should return a successfull result with access token and user profile', async () => {
             await jest.spyOn(usersRepositoryMockContract,'loginUserWithCredentials').mockImplementation(async ()=> sesameUser)
             jest.spyOn(jwtService,'signAsync').mockImplementation(async ()=>validSesameCredentialsToken)
            await expect(authService.loginUserWithCredentials(validSesameCredentials)).resolves.toStrictEqual(new LoginResponse(sesameUser,validSesameCredentialsToken))
        });
    });
    describe("when a client authenticates with invalid credentials",()=>{
        it('should return a failure result with invalid credentials error', async () => {
            await jest.spyOn(usersRepositoryMockContract,'loginUserWithCredentials').mockImplementation(async ()=> null)
            jest.spyOn(jwtService,'signAsync').mockImplementation(async ()=>validSesameCredentialsToken)
            await expect(authService.loginUserWithCredentials(invalidPasswordSesameCredentials)).rejects.toThrowError(new DomainError("User with such login not found",DomainErrorType.InvalidLogin))
        });
    })
    describe("when a client authenticates with no email credentials",()=>{
        it('should return a failure result with invalid credentials error', async () => {
            await expect(authService.loginUserWithCredentials(invalidNoEmailSesameCredentials)).rejects.toThrowError(new DomainError("Email is not valid",DomainErrorType.InvalidSesameEmail))
        });
    })
    describe("when a client authenticates with invalid email domain credentials",()=>{
        it('should return a failure result with invalid credentials error', async () => {
            await expect(authService.loginUserWithCredentials(invalidEmailDomainSesameCredentials)).rejects.toThrowError( new DomainError("Invalid email sesame domain !",DomainErrorType.InvalidSesameEmail))
        });
    })
})