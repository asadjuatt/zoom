import * as yup from 'yup'
import { weekly_days, end_date_time, last_name, password, email, topic, time } from './YupVelidation/AllMuduleOfYup'

export const RegisterSchema = yup.object().shape({
    full_Name: last_name,password, email,
})
export const LoginSchema = yup.object().shape({
    password, email,
})
export const CreateMeetingSchema = yup.object().shape({
    topic,
    start_time:time,
    end_date_time,
    password,
    weekly_days: weekly_days

})