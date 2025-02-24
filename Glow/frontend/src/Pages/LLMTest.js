import React, { useState } from 'react';
import axios from 'axios';

export default function LLMTest() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");

    const handleSubmit = async () => {
        const res = await axios.post("http://127.0.0.1:8000/generate/", { prompt });
        setResponse(res.data.response);
    };

    return (
        <div>
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Ask Gemini..." />
            <button onClick={handleSubmit}>Send</button>
            <p>Response: {response}</p>
        </div>
    );
}