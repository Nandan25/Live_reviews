export const api_server = "http://localhost:5000";

export const routes = {
    register: `${api_server}/user/register`,
    login: `${api_server}/user/login`,
    listReview: `${api_server}/review/`,
    addReview: `${api_server}/review/add`,
    editReview: `${api_server}/review/edit`,
    deleteReview: `${api_server}/review/`,
    fetchReview: `${api_server}/review/`,
};