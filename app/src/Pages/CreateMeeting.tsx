import { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import HandleForms from '../Components/Forms/HandleForms';
import { CreateMeetingSchema } from '../Components/Validations/Formik/FormikSchema';
import MainLayout from '../Layouts/MainLayout'
import { createmeetingThunk } from '../slices/meetings';
import { CreateMeetingInterface } from '../utils/interfaces/interfaces';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function CreateMeeting() {
  let navigate = useNavigate();
// the data for reoccure the meeting if you want to change something there is a form for that
  const data = {
    topic: "re occure",
    type: 8,
    start_time: "2022-04-1T14:30:00Z",
    timezone:"PK",
    duration: 120,
    password: "123abc",
    recurrence: {
      type: "2",
      weekly_days: "1, 2, 3, 4",
      end_date_time: "2022-04-29T14:30:00Z",
      repeat_interval:"4"
    },
    settings: {
      host_video: true,
      participant_video: true,
      cn_meeting: false,
      in_meeting: false,
      join_before_host: false,
      mute_upon_entry: false,
      watermark: false,
      use_pmi: false,
      approval_type: 0,
      registration_type: 1,
      audio: "both",
      auto_recording: "none",
      alternative_hosts: "",
      close_registration: true,
      waiting_room: true,
      contact_name: "asad iqbal",
      contact_email: "asadiqbal791@gmail.com",
      registrants_email_notification: true,
      meeting_authentication: true,
      authentication_option: "",
      authentication_domains: ""
    }
   }
  const dispatch = useDispatch()
  // define the field here if you want to manage dynamic form
  const fields = [
    {
      label: "Topic",
      field: "topic",
      type: "text",
      comonent: "input",
      width: 1,
      placeholder: "Enter Your topic"
    },
    {
      label: "Start Time (For all Meeting and firt date, when start)",
      field: "start_time",
      type: "datetime-local",
      comonent: "input",
      width: 1,
      placeholder: "Enter Your start time"
    },
    {
      label: "End Date Time",
      field: "end_date_time",
      type: "datetime-local",
      comonent: "input",
      width: 1,
      placeholder: "Enter Your End Date Time"
    },
    {
      label: "password",
      field: "password",
      type: "password",
      comonent: "input",
      width: 1,
      placeholder: "Enter Your password"
    },
    {
      label: "Weekly Days",
      field: "weekly_days",
      type: "checkbox",
      comonent: "checkbox",
      width: 1,
      placeholder: "Enter Your password",
      options: [
        { label: "Sunday", value: "1" },
        { label: "Monday", value: "2" },
        { label: "Tuesday", value: "3" },
        { label: "Wednesday", value: "4" },
        { label: "Thursday", value: "5" },
        { label: "Friday", value: "6" },
        { label: "Saturday", value: "7" },
      ]
    },
  ]
  // initial state for this component this will pass to dynamic form to manage it will not update on runtime but on submit
  const [formData, setFormData] = useState<CreateMeetingInterface>({ topic: "my topic", password: "cityslicka", start_time: moment().format('YYYY-MM-DDTkk:mm').toString(),end_date_time:moment().format('YYYY-MM-DDTkk:mm').toString(), weekly_days: []  })
  return (
    <MainLayout>
      <Container>
        <h1>Create Recurring Meetings</h1>
        <HandleForms
          fields={fields}
          handleSubmitForm={(value:any) => {
            setFormData({ ...formData, ...value });
            dispatch(createmeetingThunk({ navigate,meetingData: { ...data,  ...value,start_time:`${moment(value.start_time).format('yyyy-MM-DD')}T${moment(value.start_time).format('HH:mm:ss')}Z`, recurrence:{type:"2", weekly_days: value?.weekly_days.toString(),end_date_time: `${moment(value.end_date_time).format('yyyy-MM-DD')}T${moment(value.end_date_time).format('HH:mm:ss')}Z` }, weekly_days:undefined, end_date_time:undefined} }));
          }}
          schema={CreateMeetingSchema}
          initialValue={formData}
        />
      </Container>
    </MainLayout>
  )
}
