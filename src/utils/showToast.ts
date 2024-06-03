import { message as Toast } from "antd";
import { Button, notification } from 'antd';

export const showError = (error: any) => {
    try {
        notification['error']({
            message: 'Error',
            description: error?.response?.data?.message || error?.message || error || 'Error',
        });
    } catch (error) {
    }
}

export const showSuccess = (message: string) => {
    try {
        notification['success']({
            message: 'Success',
            description: message,
        });
    } catch (error) {
    }
}

export const showInfo = (message: string) => {
    try {
        notification['info']({
            message: '',
            description: message,
        });
    } catch (error) {
    }
}