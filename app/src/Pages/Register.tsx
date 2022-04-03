import { Button } from "react-bootstrap";
import { registerThunk } from "../slices/AppSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { registerInterface } from "../utils/interfaces/interfaces";
import { RootStateReducer } from "../store";
import { Link, useNavigate } from "react-router-dom";
import HandleForms from "../Components/Forms/HandleForms";
import { RegisterSchema } from "../Components/Validations/Formik/FormikSchema";
export default function Register() {
  const fields = [
    {
      label: "Full Name",
      field: "full_Name",
      type: "text",
      comonent: "input",
      width: 1,
      placeholder: "Enter Your First Name"
    },
    {
      label: "Email",
      field: "email",
      type: "text",
      comonent: "input",
      width: 1,
      placeholder: "Enter Your email"
    },
    {
      label: "Password",
      field: "password",
      type: "text",
      comonent: "input",
      width: 1,
      placeholder: "Enter Your Password"
    },
  ]
  let navigate = useNavigate();

  const [formData, setFormData] = useState<registerInterface>({ email: "eve.holt@reqres.in", password: "cityslicka", full_Name: "asad", })
  const dispatch = useDispatch();
  const { user: { isLogin }, ErrorSlice } = useSelector((state: RootStateReducer) => state)
  return (<div style={{ backgroundColor: "orange", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
    <h1>Register</h1>
    <HandleForms
      fields={fields}
      handleSubmitForm={(value) => dispatch(registerThunk({ ...formData, ...value, navigate }))}
      schema={RegisterSchema}
      initialValue={formData}
    />
    <Link to={"/login"}>
      <Button variant="text">Login</Button>
    </Link>
  </div>
  )
}