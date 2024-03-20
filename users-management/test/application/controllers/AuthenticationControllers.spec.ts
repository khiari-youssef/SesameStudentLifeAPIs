import {AuthenticationController} from "../../../src/application/controllers/AuthenticationController";
import {AuthServiceMock} from "./AuthServiceMock";
import {AuthService} from "../../../src/infrastructure/security/AuthService";


describe('AuthenticationControllerTest',()=>{

    let authService : AuthService
    let authController : AuthenticationController

    beforeAll(async ()=>{
        authService = new AuthServiceMock()
        authController =  new AuthenticationController(authService)
    })
    describe('loginUser', () => {
        it('should return an array of cats', async () => {

        });
    });
})