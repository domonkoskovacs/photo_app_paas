import {
    AuthControllerApi, AuthControllerApiLoginRequest, AuthControllerApiRegisterRequest,
    Configuration,
    GetAllMetadataSortByEnum,
    PhotoControllerApi,
    PhotoControllerApiUploadRequest,
    PhotoMetadataResponse
} from "../shared/api";

class AuthService {
    private authApi: AuthControllerApi;

    constructor() {
        this.authApi = new AuthControllerApi(
            new Configuration({
                basePath: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080",
            }));
    }

    async login(request: AuthControllerApiLoginRequest): Promise<string | undefined> {
        const response = await this.authApi.login(request);
        return response.data.token;
    }

    async register(request: AuthControllerApiRegisterRequest): Promise<void> {
        await this.authApi.register(request);
    }
}

export const authService = new AuthService();