import { Field, Formik } from 'formik'
import { Form, Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { RootStateReducer } from '../../store'
import CustomButton from '../UIComponents/CustomButton'
import CustomCheckbox from './Inputs/CustomCheckbox'
import CustomInput from './Inputs/CustomInput'
interface TableFieldInterface {
    readonly label: string;
    readonly field: string;
    readonly type: string;
    readonly comonent: string;
    readonly width: number;
    readonly placeholder: string;
    readonly options?: Array<{ label: string, value: string | number }>;
}
interface HandleFormsInterface {
    readonly fields: Array<TableFieldInterface>;
    readonly handleSubmitForm: (prpos: object) => void;
    readonly schema: object;
    readonly initialValue: object;
}
export default function HandleForms({ fields, handleSubmitForm, schema, initialValue }: HandleFormsInterface) {
    const { ErrorSlice: { errorMessage } } = useSelector((state: RootStateReducer) => state);
    const dispatch = useDispatch()
    return (
        <Formik
            enableReinitialize={true}
            validationSchema={schema}
            initialValues={initialValue}
            onSubmit={values => { handleSubmitForm(values) }}>
            {
                ({ handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    touched,
                    values,
                    errors,
                    isValid, }) => (
                    <>
                        <Form>
                            {fields.map((item, index) => {
                                return item.comonent === 'input' ? <Field
                                    key={index}
                                    component={CustomInput}
                                    name={item.field}
                                    lable={item.label}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                />
                                    :
                                    <Field
                                        key={index}
                                        component={CustomCheckbox}
                                        name={item.field}
                                        lable={item.label}
                                        type={item.type}
                                        placeholder={item.placeholder}
                                        options={item?.options}
                                    />
                            }
                            )}
                            {
                                errorMessage !== "" &&
                            <Toast>
                                <Toast.Header onClick={()=>dispatch({ type:"clearError"})}>
                                    <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                                    <strong className="me-auto">Validation Error</strong>
                                    <small >11 mins ago</small>
                                </Toast.Header>
                                <Toast.Body>{errorMessage}</Toast.Body>
                            </Toast>
                            }
                            <CustomButton title="Submit" onClick={handleSubmit} />
                        </Form>
                    </>
                )}
        </Formik>
    )
}
