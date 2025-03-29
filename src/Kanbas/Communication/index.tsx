// import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { useState } from "react";
// import Inbox from "./Inbox";
// import Sent from "./Sent";
// import ComposeModal from "./ComposeModal";

// export default function CommunicationModule() {
//   const location = useLocation();
//   const currentPath = location.pathname;
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const [showCompose, setShowCompose] = useState(false);

//   const links = ["Inbox", "Sent"];

//   return (
//     <div className="p-4 position-relative">
//       {/* ✅ 页面右上角按钮 */}
//       <button
//         className="btn btn-danger position-absolute"
//         style={{ top: "0.75rem", right: "1rem" }}
//         onClick={() => setShowCompose(true)}
//       >
//         Compose
//       </button>

//       {/* ✅ 页面标题 */}
//       <h1 className="text-2xl font-bold text-red-600 mb-2">
//         Communication for {currentUser.firstName} {currentUser.lastName}
//       </h1>
//       <hr className="mb-4" />

//       {/* ✅ tab 导航 */}
//       <ul className="nav nav-tabs mb-4">
//         {links.map((link) => (
//           <li className="nav-item" key={link}>
//             <Link
//               to={link}
//               className={`nav-link fs-5 ${
//                 currentPath.includes(link) ? "active" : "text-danger"
//               }`}
//             >
//               {link}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       {/* ✅ 页面主体：Inbox / Sent */}
//       <Routes>
//         <Route path="/" element={<Navigate to="Inbox" />} />
//         <Route path="Inbox" element={<Inbox />} />
//         <Route path="Sent" element={<Sent />} />
//       </Routes>

//       {/* ✅ 写消息弹窗 */}
//       <ComposeModal
//         show={showCompose}
//         onClose={() => setShowCompose(false)}
//         senderId={currentUser._id}
//         onSend={() => {}} // ❗️你可以传个刷新函数进来（可选）
//       />
//     </div>
//   );
// }


import { Routes, Route, Navigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import Inbox from "./Inbox";
import Sent from "./Sent";
import ComposeModal from "./ComposeModal";
import {FaPen} from "react-icons/fa";

export default function CommunicationModule() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [showCompose, setShowCompose] = useState(false);

  const links = ["Inbox", "Sent"];

  return (
    <div id="wd-analytics">
      {/* ✅ 顶部标题行（样式一致） */}
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="me-3-7 fs-7 mb-1">
          Inbox for {currentUser.firstName} {currentUser.lastName}
        </h1>
      </div>

      <hr/>

      <button className="btn btn-primary d-flex align-items-center" onClick={() => setShowCompose(true)}>
        <FaPen className="me-2"/>
        New Message
      </button>

      {/* ✅ 标签页导航（与 analytics 一致） */}
      <div id="wd-css-navigating-with-tabs" className="mt-4 me-4">
        <ul className="nav nav-tabs">
        {links.map((link) => (
            <li className="nav-item" key={link}>
              <Link
                to={link}
                className={`nav-link fs-5 ${
                  currentPath.includes(link) ? "active" : "text-danger"
                }`}
              >
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <br/><br/>

      <Routes>
        <Route path="/" element={<Navigate to="Inbox"/>}/>
        <Route path="Inbox" element={<Inbox/>}/>
        <Route path="Sent" element={<Sent/>}/>
      </Routes>

      {/* ✅ Compose 弹窗 */}
      <ComposeModal
        show={showCompose}
        onClose={() => setShowCompose(false)}
        senderId={currentUser._id}
        onSend={() => {
        }}
      />
    </div>
  );
}
