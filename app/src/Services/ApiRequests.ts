import { loginInterface, registerInterface } from "../utils/interfaces/interfaces";
import apiService from "./index";
import { APIurls } from "../utils/constants";
export const ApiRequests = {
    login : async (data: loginInterface) => await apiService.post(APIurls.login,data),
    authenticate : async () => await apiService.get(APIurls.authenticate),
    register : async (data: registerInterface) => await apiService.post(APIurls.register,data),
    getMeetings : async () => await apiService.get(APIurls.meeting),
    deleteMeetings : async ({ id }: { id: string; }) => await apiService.delete(APIurls.meeting +"/" + id),
    createMeetings : async (data:any) => await apiService.post(APIurls.meeting, data),



}