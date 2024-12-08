import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {

    const [credentials, setCredentials] = useState<any>({});
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const signin = async () => {
        try{
            const user = await client.signin(credentials);
            if (!user) return;
            dispatch(setCurrentUser(user));
            navigate("/Kanbas/Dashboard");
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
        }
    };

    return(
        <div id="wd-signin-screen">
            <h2>Sign in</h2>
            {errorMessage && (<div id="wd-todo-error-message" className="alert alert-danger mb-2 mt-2">{errorMessage}</div>)}
            <input id="wd-username" defaultValue={credentials.username} placeholder="username"
             onChange={(e) => setCredentials({ ...credentials, username: e.target.value })} className="form-control mb-2"/>
            <input id="wd-password" defaultValue={credentials.password} placeholder="password"
             onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} type="password" className="form-control mb-2"/>
            <button onClick={signin} id="wd-signin-btn" className="wd-signin-btn btn btn-primary mb-2 w-100">
            Sign in </button><br />
            <Link id="wd-signup-link" to="/Kanbas/Account/Signup">Sign up</Link>
        </div>
    );
}