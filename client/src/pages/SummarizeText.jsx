import { FileUp, FileDown, Sparkles, FileText } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const SummarizeText = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // if text > 1200 words
      const wordCount = input.trim().split(/\s+/).length;
      if (wordCount > 1000) {
        toast.error("Text must not exceed 1000 words");
        return;
      }
      setLoading(true);
      // const preferLength = Math.round(wordCount * 0.7);
      const prompt = `Summarize this text: ${input} `;
      const { data } = await axios.post(
        "/api/ai/summarize-text",
        {
          prompt,
        },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full px-4 mt-10">
      <div className="bg-[#ffffffd8] flex flex-col rounded-lg shadow-md p-6 w-full max-w-screen-md min-h-[45vh] max-h-[50vh] overflow-y-auto">
        <div className="flex items-center gap-3">
          <FileText className="w-5 h-5 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Summary</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <FileText className="w-9 h-9" />
              <p>Enter text and click "Generate Summary"</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-lg shadow-md p-6 mt-4 w-full max-w-screen-md"
        action=""
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#00DA83]" />
          <h1 className="text-xl font-semibold">Summarize Text</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Information</p>

        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Enter your text here..."
          rows={5}
          required
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
        />

        <p className="mt-1 text-xs text-gray-500 font-light">
          Maximum 1000 words
        </p>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <FileText className="w-5" />
          )}
          Generate Summary
        </button>
      </form>
    </div>
  );
};

export default SummarizeText;
