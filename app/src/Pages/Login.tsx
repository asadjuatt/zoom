import { Button } from "react-bootstrap";
import { loginThunk } from "../slices/AppSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { loginInterface } from "../utils/interfaces/interfaces";
import { RootStateReducer } from "../store";
import { useNavigate } from "react-router-dom";
import HandleForms from "../Components/Forms/HandleForms";
import { LoginSchema } from "../Components/Validations/Formik/FormikSchema";
export default function Login() {
  let navigate = useNavigate();
  const fields = [
    {
      label: "Email",
      field: "email",
      type: "email",
      comonent:"input",
      width: 1,
      placeholder: "Enter Your email"
    },
    {
      label: "Password",
      field: "password",
      type: "password",
      comonent:"input",
      width: 1,
      placeholder: "Enter Your Password"
    },
  ]
  const [formData, setFormData] = useState<loginInterface>({ email: "eve.holt@reqres.in", password: "cityslicka" })
  const dispatch = useDispatch();
  const { user: { isLogin }, ErrorSlice } = useSelector((state: RootStateReducer) => state)
  useEffect(() => {
    if (isLogin) navigate('/')
  }, [isLogin])

  return (<div style={{ backgroundColor: "orange", height: "100vh", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
    <h1>Login</h1>
    <HandleForms
      fields={fields}
      handleSubmitForm={(value) => {
        setFormData({ ...formData, ...value });
        dispatch(loginThunk({ ...formData, ...value }));
      }}
      schema={LoginSchema}
      initialValue={formData}
    />
  </div>
  )
}
