// export default function MessageList({ messages, type }: {
//     messages: any[];
//     type: "sent" | "received";
// }) {
//     return (
//         <div className="space-y-3">
//             {messages.map((msg) => (
//                 <div className="border p-3 rounded shadow-sm" key={msg._id}>
//                     <div className="text-sm text-gray-600">
//                         {type === "received" ? `From: ${msg.senderName}` : `To: ${msg.receiverName}`}
//                     </div>
//                     <div className="font-semibold">{msg.subject}</div>
//                     <div>{msg.content}</div>
//                     <div className="text-xs text-gray-500">{new Date(msg.sendTime).toLocaleString()}</div>
//                 </div>
//             ))}
//         </div>
//     );
// }  

// src/Kanbas/Communication/MessageList.tsx
export default function MessageList({
    messages,
    selected,
    setSelected,
    type,
  }: {
    messages: any[];
    selected: any;
    setSelected: (msg: any) => void;
    type: "sent" | "received";
  }) {
    return (
      <div className="list-group">
        {messages.map((msg) => (
          <button
            key={msg._id}
            className={`list-group-item list-group-item-action ${
              selected?._id === msg._id ? "active" : ""
            }`}
            onClick={() => setSelected(msg)}
          >
            <div className="fw-bold">{msg.subject}</div>
            <div className="text-muted small">
              {type === "received" ? `From: ${msg.senderName}` : `To: ${msg.receiverName}`}
              {" • "}
              {new Date(msg.sendTime).toLocaleString()}
            </div>
          </button>
        ))}
      </div>
    );
  }
  