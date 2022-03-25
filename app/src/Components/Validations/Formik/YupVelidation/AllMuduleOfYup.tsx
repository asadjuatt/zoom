import moment from 'moment';
import * as yup from 'yup'

export const time = yup
    .string().required().min(3, "End Date Time is required");

export const topic = yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
    // .trim('Name cannot include leading and trailing spaces')
    .strict(true)
    .min(3, ({ min }) => `Topic must be at least ${min} letters`)
    .max(32, "Topic length can not be exceed 32 letters")
    .required('Topic is required');
export const email = yup
    .string()
    .email("Please enter valid email")
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Email must contain a valid domain")
    .required('Email Address is required');
export const password = yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required')

export const confirmPassword = yup
    .string()
    .required('Confirm Password is required')
    .when("password", {
        is: (val:string) => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
            [yup.ref("password")],
            "Both password need to be the same"
        )
    })
export const last_name = yup
    .string()
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field")
    // .trim('Last Name cannot include leading and trailing spaces')
    .strict(true)
    .min(3, ({ min }) => `Last Name must be at least ${min} letters`)
    .max(10, "Last Name length can not be exceed 10 letters")
    .required('Last Name is required')
export const weekly_days = yup.array().required()
export const end_date_time = yup.string().required().min(3, "End Date Time is required").test('test-endDate', 'End date should be after', function checkEnd(
    end
  ) {
   const { start_time } = this.parent;
    if (moment(end).isAfter(start_time)) {
      return true;
    }
    return false;
  })

