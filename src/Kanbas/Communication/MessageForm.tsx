// src/Kanbas/Communication/MessageForm.tsx
import { useState, useEffect } from "react";
import { fetchUsersByRole, sendMessage } from "./client";

export default function MessageForm({ senderId, onSend }: {
  senderId: number;
  onSend: () => void;
}) {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchUsersByRole().then(setUsers);
  }, []);

  const handleSend = async () => {
    if (!receiverId || !subject) return;
    await sendMessage({ sender_id: senderId, receiver_id: receiverId, subject, content });
    setSubject("");
    setContent("");
    onSend();
  };

  return (
    <div className="border p-4 rounded shadow space-y-3">
      <div className="flex gap-4">
        <select className="border p-2 rounded" onChange={(e) => setReceiverId(Number(e.target.value))}>
          <option value="">Select Receiver</option>
          {users
            .filter((user: any) => user._id !== senderId)
            .map((user: any) => (
            <option key={user._id} value={user._id}>
              {user.firstName} {user.lastName} ({user.role})
            </option>
          ))}
        </select>
        <input className="flex-1 border p-2 rounded" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <textarea
        className="w-full border p-2 rounded"
        rows={3}
        placeholder="Write your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setSubject(""); setContent(""); }}>Cancel</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}