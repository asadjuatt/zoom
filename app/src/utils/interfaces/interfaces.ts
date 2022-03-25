import { string } from "yup/lib/locale";

export interface appReducerInterface {
    user: object | null;
    isLogin: boolean;
    loading: boolean;
    token: string | null;
}

export interface meeting {
    readonly created_at: string;
    readonly duration: number;
    readonly host_id: string;
    readonly id: number;
    readonly join_url: string;
    readonly start_time: string;
    readonly timezone: string;
    readonly topic: string;
    readonly type: number;
    readonly uuid: string;
}
export interface meetinsSlice {
readonly meetings:Array<meeting>;
readonly loading:boolean;
readonly next_page_token: string;
readonly page_size: number;
readonly total_records: number;
}
export interface loginInterface {
    email: string;
    password: string;
}
export interface registerInterface extends loginInterface {
    full_Name: string;
}
export interface CreateMeetingInterface {
    topic: string;
    end_date_time: string;
    start_time: string;
    password: string;
    weekly_days:Array<string|number>;
}