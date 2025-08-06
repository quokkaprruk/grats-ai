import { Eraser, Image, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();

      if (!input) {
        toast.error("Please upload an image file.");
        return;
      }

      formData.append("image", input);
      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
          "Content-Type": "multipart/form-data",
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
          <Eraser className="w-5 h-5 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Processed Image </h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Eraser className="w-9 h-9" />
              <p>Upload an image and click "Remove Background"</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full ">
            <img src={content} alt="image" className="w-full h-full" />
          </div>
        )}
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white rounded-lg shadow-md p-6 mt-4 w-full max-w-screen-md"
        action=""
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload Image</p>

        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="image/*"
          required
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
        />

        <p className="mt-1 text-xs text-gray-500 font-light">
          Supports JPG, PNG, and other image formats
        </p>

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Eraser className="w-5" />
          )}
          Remove Background
        </button>
      </form>
    </div>
  );
};

export default RemoveBackground;
