import * as httpRequest from '~/utils/httpRequest';

export const searchUsers = async (query) => {
    try {
        let result = await httpRequest.get('users/search', { params: query });
        return result.data;
    } catch (error) {
        throw error;
    }
}