import axios from "axios";

export const api = axios.create({
    baseURL:'https://express.heartrails.com/api/'
});

api.interceptors.response.use(
    response => {
        return response
    },
    function(error) {
        switch(error.response.status) {
            case 400:
                console.log('クライアントエラー')
                break;
            case 401:
                console.log('認証エラーです');
                break
            case 404:
                console.log('URL先がないです');
                break
            default:
                console.log('正体不明のエラーです');


        }
    }
)