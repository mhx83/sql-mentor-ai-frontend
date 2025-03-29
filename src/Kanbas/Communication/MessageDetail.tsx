// src/Kanbas/Communication/MessageDetail.tsx

export default function MessageDetail({
    message,
    type,
}: {
    message: any;
    type: "sent" | "received";
}) {
    return (
        <div>
            <h5 className="fw-bold mb-2">{message.subject}</h5>
            <div className="mb-2 text-muted">
                {type === "received"
                    ? `From: ${message.senderName}`
                    : `To: ${message.receiverName}`}{" "}
                | {new Date(message.sendTime).toLocaleString()}
            </div>
            {/* <p>{message.content}</p> */}
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
                {message.content}
            </pre>
        </div>
    );
}
