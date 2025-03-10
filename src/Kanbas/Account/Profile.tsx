import { Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import * as client from "./client";

export default function Profile() {

    const [profile, setProfile] = useState<any>({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const roles = ["USER", "ADMIN", "FACULTY", "STUDENT"]
    const fetchProfile = () => {
      if (!currentUser) return navigate("/Kanbas/Account/Signin");
      setProfile(currentUser);
    };

    const updateProfile = async () => {
        const updatedProfile = await client.updateUser(profile);
        dispatch(setCurrentUser(updatedProfile));
    };
    
    const signout = async () => {
      await client.signout();
      dispatch(setCurrentUser(null));
      navigate("/Kanbas/Account/Signin");
    };
    
    useEffect(() => { fetchProfile(); }, []);

    return(
        <div id="wd-profile-screen">
        { profile && (
            <div>
            <h2>Profile</h2>
            <input id="wd-username" value={profile.username} className="form-control mb-2" placeholder="username"
                onChange={(e) => setProfile({ ...profile, username:  e.target.value })}/>
            <input id="wd-password" value={profile.password} type="password" className="form-control mb-2"
                placeholder="password" onChange={(e) => setProfile({ ...profile, password:  e.target.value })}/>
            <input id='wd-firstname' value={profile.firstName} type="First Name" className="form-control mb-2"
                placeholder="first name" onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}/>
            <input id='wd-lastname' value={profile.lastName} type="Last Name" className="form-control mb-2"
                placeholder="last name" onChange={(e) => setProfile({ ...profile, lastName:  e.target.value })}/>
            <input id='wd-dob' value={profile.dob?.split("T")[0]} className="form-control mb-2"
                placeholder="date of birth" onChange={(e) => setProfile({ ...profile, dob: e.target.value })}/>
            <input value={profile.email} id="wd-email" className="form-control mb-2"
                 placeholder="email" onChange={ (e) => setProfile({ ...profile, email: e.target.value })}/>
            <select onChange={(e) => setProfile({ ...profile, role:  e.target.value })}
                 className="form-control mb-2" id="wd-role">
            {roles.map((role) => (profile.role === role ? 
              <option selected value={role}>{role}</option> : <option value={role}>{role}</option>))}
            </select>
            <button onClick={updateProfile} className="btn btn-primary w-100 mb-2"> Update </button>
            <button onClick={signout} className="btn btn-danger w-100 mb-2" id="wd-signout-btn">
            Sign out
            </button>
            </div>
        )}
        </div>
    );
}