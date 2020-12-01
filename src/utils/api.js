const axios = require('axios');

class API {
    constructor({ url, tocken }) {
        this.url = url;
        this.tocken = tocken;
        this.APP = axios.create({
            timeout: 3000
        });
    }

    setToken(token) {
        this.APP.defaults.headers.common.authorization = `Bearer ${token}`;
    }
}

export default API;