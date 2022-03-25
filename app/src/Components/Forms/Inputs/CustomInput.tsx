import { FieldProps } from "formik"
import { Form } from "react-bootstrap";

interface myProps extends FieldProps {
  readonly lable: string;
  readonly type: string;

}
const CustomInput = (props: myProps) => {
  const {
    lable,
    type,

    field: { name, onBlur, onChange, value },
    form: { errors, touched, handleChange, handleBlur, setFieldTouched },
    ...inputProps
  } = props
  return <Form.Group className="mb-3" controlId={`formBasic${name}`}>
    <Form.Label>{lable}</Form.Label>
    <Form.Control
      type={type}
      onChange={handleChange(name)}
      onBlur={handleBlur(name)}
      value={value} />
    {touched[name] && errors[name] &&

      <Form.Text style={{ color: "red", fontSize: 12 }}>{errors[name]}</Form.Text>
    }
  </Form.Group>
}
export default CustomInput;