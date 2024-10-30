import React from "react";
import { Outlet } from 'react-router-dom';
import Header from "../../components/Header/index.tsx";
import Footer from "../../components/Footer/index.tsx";

const Layout = () => {
    return (
    <>
        <Header/>
        <Outlet/>
        <Footer/>
    </>
);
}
 
export default Layout;