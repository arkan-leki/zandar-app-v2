const serverVars = {
    authUrl: 'local_auth_url',
    apiUrl: 'http://127.0.0.1:8000/api/',
};

const localVars = {
    authUrl: 'local_auth_url',
    apiUrl: 'http://127.0.0.1:8000/api/',

};

export function getConfiguration() {
    if (process.env.NODE_ENV === 'production') {
        return serverVars;
    }

    return localVars;
}