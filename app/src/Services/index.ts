import axios from 'axios'
import { basePath, appSecretKey } from '../utils/constants';
const apiService = axios.create();
apiService.defaults.baseURL = basePath
apiService.defaults.timeout =35000;
apiService.interceptors.request.use(
    async config => {
        const token = await localStorage.getItem(appSecretKey)
            config.headers = {
                Authorization: 'Bearer ' + token ?? '',
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "access-control-allow-headers": "*",
                "access-control-allow-methods": "*",
                "access-control-allow-origin": "*",
            }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
apiService.interceptors.response.use(
    response => response,
    error => {
      const {status} = error.response;
      if (status === 200) {
        // dispatch({type:"logout"});
      }
     return Promise.reject(error);
   }
  );

export default apiService;