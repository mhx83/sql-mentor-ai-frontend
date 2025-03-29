// src/Kanbas/Communication/ComposeModal.tsx
import { useEffect, useState } from "react";
import { fetchUsersByRole, sendMessage } from "./client";

export default function ComposeModal({
  show,
  onClose,
  senderId,
  onSend,
}: {
  show: boolean;
  onClose: () => void;
  senderId: number;
  onSend: () => void;
}) {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState<number | null>(null);
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (show) {
      fetchUsersByRole().then(setUsers);
    }
  }, [show]);

  const handleSend = async () => {
    if (!receiverId || !subject) return;
    await sendMessage({ sender_id: senderId, receiver_id: receiverId, subject, content });
    onSend();
    onClose();
    setSubject("");
    setContent("");
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content p-3">
          <div className="modal-header">
            <h5 className="modal-title">New Message</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body space-y-3">
            <div className="mb-3">
              <select className="form-select" onChange={(e) => setReceiverId(Number(e.target.value))}>
                <option value="">Select Receiver</option>
                {users
                  .filter((u: any) => u._id !== senderId)
                  .map((u: any) => (
                    <option key={u._id} value={u._id}>
                      {u.firstName} {u.lastName} ({u.role})
                    </option>
                  ))}
              </select>
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows={4}
                placeholder="Message content..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
