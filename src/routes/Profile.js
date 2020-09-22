import React from "react";
import { useHistory } from "react-router-dom";
import { authService } from "../fbase";


export default () => {
    const histoty = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        histoty.push("/");
    };
    return (
        <>
        <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
};