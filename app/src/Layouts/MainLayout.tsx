import React, { useEffect } from 'react'
import TopNav from '../Components/NavBar/index'
import Footer from '../Components/Footer/index'
import { useSelector } from 'react-redux'
import { RootStateReducer } from '../store';
import { useNavigate, useLocation } from 'react-router-dom'

interface Props {
    readonly children: any;
}
export default function MainLayout(props: Props) {
    let navigate = useNavigate();
    let location = useLocation();

    const { user: { isLogin } } = useSelector((state: RootStateReducer) => state);
    const protectedPath = ['form', "",]
    // useEffect(() => {
    //     const currentPathIs = location.pathname.split('/');
    //     if (!(isLogin) && protectedPath.includes(currentPathIs[1])) {
    //         navigate('/login');
    //     }
    // }, [isLogin]);
    return (
        <>
            <TopNav />
            {props.children}
            <Footer />
        </>
    )
}
