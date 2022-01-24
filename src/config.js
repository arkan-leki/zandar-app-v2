const serverVars = {
    authUrl: 'local_auth_url',
    apiUrl: 'http://127.0.12.1:8000/api/',
};

const localVars = {
    authUrl: 'local_auth_url',
    apiUrl: 'http://127.0.12.1:8000/api/',

};
//https://zender-app.herokuapp.com/api/
export function getConfiguration() {
    if (process.env.NODE_ENV === 'production') {
        return serverVars;
    }

    return localVars;
}