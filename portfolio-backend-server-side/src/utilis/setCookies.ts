import { Response } from 'express';

interface IAuthCookies {
    accessToken?: string;
    refreshToken?: string;
}

export const setAuthCookies = (res: Response, tokenInfo: IAuthCookies) => {
    if (tokenInfo.accessToken) {
        res.cookie('accessToken', tokenInfo.accessToken, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'none',
        });
    }

    if (tokenInfo.refreshToken) {
        res.cookie('refreshToken', tokenInfo.refreshToken, {
            httpOnly: true,
            secure: true, // Set to true if using HTTPS
            sameSite: 'none',
        });
    }
};
