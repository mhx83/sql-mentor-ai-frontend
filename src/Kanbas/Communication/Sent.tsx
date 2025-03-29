// // src/Kanbas/Communication/Sent.tsx
// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { fetchSentMessages } from "./client";
// import MessageList from "./MessageList";
// import MessageDetail from "./MessageDetail";
// import ComposeModal from "./ComposeModal";

// export default function Sent() {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const [messages, setMessages] = useState([]);
//   const [selected, setSelected] = useState<any | null>(null);
//   const [showCompose, setShowCompose] = useState(false);

//   const loadMessages = async () => {
//     const data = await fetchSentMessages(currentUser._id);
//     setMessages(data);
//     if (data.length > 0) setSelected(data[0]);
//   };

//   useEffect(() => {
//     loadMessages();
//   }, []);

//   return (
//     <div className="position-relative">
//       <button
//         className="btn btn-danger position-absolute"
//         style={{ top: 0, right: 0 }}
//         onClick={() => setShowCompose(true)}
//       >
//         Compose
//       </button>

//       <div className="d-flex gap-4 mt-5">
//         <div className="flex-grow-0" style={{ width: "350px" }}>
//           <MessageList
//             messages={messages}
//             selected={selected}
//             setSelected={setSelected}
//             type="sent"
//           />
//         </div>

//         <div className="flex-grow-1 border rounded p-3">
//           {selected ? (
//             <MessageDetail message={selected} type="sent" />
//           ) : (
//             <div className="text-muted">No message selected</div>
//           )}
//         </div>
//       </div>

//       <ComposeModal
//         show={showCompose}
//         onClose={() => setShowCompose(false)}
//         senderId={currentUser._id}
//         onSend={loadMessages}
//       />
//     </div>
//   );
// }


// src/Kanbas/Communication/Sent.tsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchSentMessages } from "./client";
import MessageList from "./MessageList";
import MessageDetail from "./MessageDetail";

export default function Sent() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState<any | null>(null);

  const loadMessages = async () => {
    const data = await fetchSentMessages(currentUser._id);
    setMessages(data);
    if (data.length > 0) setSelected(data[0]);
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="d-flex gap-4">
      <div className="flex-grow-0" style={{ width: "350px" }}>
        <MessageList
          messages={messages}
          selected={selected}
          setSelected={setSelected}
          type="sent"
        />
      </div>

      <div className="flex-grow-1 border rounded p-3">
        {selected ? (
          <MessageDetail message={selected} type="sent" />
        ) : (
          <div className="text-muted">No message selected</div>
        )}
      </div>
    </div>
  );
}
