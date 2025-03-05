"use client";

import { useState } from "react";
import axios from "axios";


export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("/api/generateimage", { prompt });
      setImageUrl(response.data.imageUrl || "No image generated");
    } catch (error) {
      console.error("error", error);
      setImageUrl("Error generating image: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4">
      <span className="font-bold">AI Response Generator</span>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a description"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {loading ? "Generating..." : "Generate response"}
        </button>
      </form>
      {imageUrl && (
        <div className="w-full rounded bg-gray-100 p-4 overflow-auto">
          <img src={imageUrl}></img>
        </div>
      )}
    </div>
  );
}
