import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { authenticateThunk } from "../slices/AppSlice";
// import PrivateRoute from "../Layouts/ProtectedRoute";
import App from './App';
import CreateMeeting from "./CreateMeeting";
import Login from "./Login";
import Register from "./Register";
export default function Root() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(authenticateThunk())
    }, [])

    return (
        <BrowserRouter>
            <Routes>

                {/* <Route path="/" element={<PrivateRoute outlet={<App />} />} /> */}
                <Route path="/" element={<App />} />
                <Route path="/CreateMeeting" element={<CreateMeeting />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path='*' element={<h1 >404</h1>} />
            </Routes>
        </BrowserRouter>
    )
}
