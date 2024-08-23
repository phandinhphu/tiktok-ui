import * as httpRequest from '~/utils/httpRequest';

export const getUser = async({ username }) => {
    try {
        let result = await httpRequest.get(`users/@${username}`);
        return result.data;
    } catch (error) {
        throw error;
    }
}

export const getSuggested = async ({ page = 1, perPage = 5 }) => {
    try {
        let result = await httpRequest.get('users/suggested', {
            params: {
                page: page,
                per_page: perPage,
            },
        });
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const getVideos = async ({ type = 'for-you', page = 1 }) => {
    const token = localStorage.getItem('token');

    try {
        let result = await httpRequest.get('videos', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                type: type,
                page: page,
            },
        });
        return result.data;
    } catch (error) {
        throw error;
    }
};

export const getFollowing = async ({ page = 1 }) => {
    const token = localStorage.getItem('token');

    try {
        let result = await httpRequest.get('me/followings', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page: page,
            },
        });
        return result;
    } catch (error) {
        throw error;
    }
};

export const login = async ({ email, password }) => {
    try {
        let result = await httpRequest.post('auth/login', {
            email: email,
            password: password,
        });
        return result;
    } catch (error) {
        throw error;
    }
};
