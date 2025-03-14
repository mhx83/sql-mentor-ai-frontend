import {Routes, Route, Navigate, useLocation, Link} from "react-router-dom";
import { useSelector } from 'react-redux';
import Grade from "./Grade";
import Activity from "./Activity";
import Communication from "./Communication";
import {AICustom} from "./AICustom";


export default function Analytics({ courses }: { courses: any[]; }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const links = ["Grade", "Activity", "Communication", "AICustom"];

  return (
    <div id="wd-analytics">
      <h1 className="me-3-7 fs-7 mb-1">{"Analytics for " + currentUser.firstName + " " + currentUser.lastName}</h1>
      <hr/>

      <div id="wd-css-navigating-with-tabs" className="mt-5 me-4">
        <ul className="nav nav-tabs">
          {links.map((link) => (
              <li className="nav-item">
                <Link key={link} to={link} className={`nav-link fs-5 
              ${currentPath.includes(link) ? "active" : "text-danger"}`}> {link} </Link>
              </li>
            )
          )}
        </ul>
      </div>
      <br/><br/>

      <div className="flex-fill">
        <Routes>
          <Route path="/" element={<Navigate to="Grade" />}/>
          <Route path="Grade" element={<Grade courses={courses}/>}/>
          <Route path="Activity" element={<Activity/>}/>
          <Route path="Communication" element={<Communication/>}/>
          <Route path="AICustom" element={<AICustom/>}/>
        </Routes>
      </div>


    </div>
  )
}
