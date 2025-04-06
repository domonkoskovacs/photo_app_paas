import {
    Configuration,
    GetAllMetadataSortByEnum,
    PhotoControllerApi,
    PhotoControllerApiUploadRequest,
    PhotoMetadataResponse
} from "../shared/api";

class PhotoService {
    private photoApi: PhotoControllerApi

    constructor() {
        this.photoApi = new PhotoControllerApi(new Configuration({
            basePath: process.env.REACT_APP_BACKEND_URL || "http://localhost:8080",
        }));
    }

    async upload(request: PhotoControllerApiUploadRequest): Promise<void> {
        await this.photoApi.upload(request);
    }

    async getAllMetadata(
        sortBy?: GetAllMetadataSortByEnum
    ): Promise<PhotoMetadataResponse[]> {
        return this.photoApi.getAllMetadata({ sortBy }).then((res) => res.data);
    }

    async deletePhoto(id: number): Promise<void> {
        await this.photoApi._delete({ id });
    }
}

export const photoService = new PhotoService();