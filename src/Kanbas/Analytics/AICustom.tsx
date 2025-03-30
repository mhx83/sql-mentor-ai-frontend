import {useState} from "react";
import * as analyticsClient from "./client"
import {useSelector} from "react-redux";

export function AICustom() {
  const [inputText, setInputText] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setAiResponse(""); // Clear previous response

    try {
      const responseData = await analyticsClient.fetchAIResponse(String(currentUser._id), inputText);
      setAiResponse(JSON.stringify(responseData.response, null, 2));
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Failed to get AI response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>AI Custom Analytics</h2>
      <textarea
        rows={4}
        placeholder="Enter text for AI processing..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        style={{ width: "100%", padding: "10px", fontSize: "16px" }}
      />
      <br />
      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "10px",
          padding: "10px 15px",
          fontSize: "16px",
          cursor: "pointer",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
        }}
      >
        {loading ? "Processing..." : "Submit"}
      </button>
      <div style={{ marginTop: "20px", textAlign: "left" }}>
        <h3>AI Response:</h3>
        <textarea
          rows={10}
          value={aiResponse}
          readOnly
          style={{ width: "100%", padding: "10px", fontSize: "16px", background: "#f5f5f5" }}
        />
      </div>
    </div>
  );
}
