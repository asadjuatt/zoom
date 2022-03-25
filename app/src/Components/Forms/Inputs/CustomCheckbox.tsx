import { Field, FieldProps } from "formik"
import { Col, Form, Row } from "react-bootstrap";

interface myProps extends FieldProps {
  readonly lable: string;
  readonly type: string;
  readonly options?: Array<{ label: string, value: string | number }> | null;
}
const CustomCheckbox = (props: myProps) => {
  const {
    lable,
    type,
    options,
    field: { name, onBlur, onChange, value },
    form: { errors, touched, handleChange, handleBlur, setFieldTouched },
    ...inputProps
  } = props
  return <Form.Group className="mb-3" controlId={`formBasic${name}`}>
    <Form.Label>{lable}</Form.Label>

    <Row key={`inline-${type}`} className="mb-3">
      {
        options?.map((item, index) => {
          return <Col key={index} >
            <Row className="justify-content-md-center align-item-md-center">
              <Col>
                <Field label={item.label} type="checkbox" name={name} value={item.value} />
              </Col>
              <Col>
                <p>{item.label}</p>
              </Col>
            </Row>
          </Col>
        })
      }
    </Row>
    {touched[name] && errors[name] &&

      <Form.Text style={{ color: "red", fontSize: 12 }}>{errors[name]}</Form.Text>
    }
  </Form.Group>
}
export default CustomCheckbox;