import { message as Toast } from "antd";

export const showError = (error: any) => {
    try {
        Toast.error(error?.response?.data?.message || error?.message || error || 'Error');
    } catch (error) {
    }
}

export const showSuccess = (message: string) => {
    try {
        Toast.success(message);
    } catch (error) {
    }
}

export const showInfo = (message: string) => {
    try {
        Toast.info(message);
    } catch (error) {
    }
}