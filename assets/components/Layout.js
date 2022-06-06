import React from "react";
import Header from "./Header";

const Layout = ({ children, loggedInUser, setLoggedInUser }) => {
    return (
        <>
            <Header
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
            />
            {children}
        </>
    );
};

export default Layout;
