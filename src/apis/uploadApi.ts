import axiosClient from "./axiosClient";

export const UploadApi = {
    uploadImage: async (file: File) => {
        const formData = new FormData()
        formData.append('image', file)
        const res: any = await axiosClient.post('/image/upload/1920', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res?.results?.object
    },
    uploadMultipleImages: async (
        files: FileList | File[],
    ) => {
        const formData = new FormData()
        Array.from(files).forEach((file) => formData.append('images', file,))
        formData.get('images')
        const res: any = await axiosClient.post('/image/upload_multiple/300/1920', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res?.results?.object
    },
}