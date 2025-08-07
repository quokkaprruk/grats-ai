import React, { useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import {
  DiamondMinus,
  X,
  CircleX,
  ChevronDown,
  Trash2,
  Trash,
} from "lucide-react";
import { useAuth, useUser } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const CreationItem = ({ item, onDelete }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const handleDelete = async () => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;

    try {
      console.log(item);

      const res = await axios.post(
        `/api/ai/delete/${item.id}`,
        {},
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      const data = res.data;

      if (data.success) {
        toast.success("Item deleted successfully");
        onDelete(item.id); // child call parent to update ui
      } else {
        toast.error(data.message || "Failed to delete item");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="pt-4 pl-3 pr-5 pb-3 max-w-5xl  text-sm bg-[#ffffffc6] border border-gray-200 rounded-lg cursor-pointer">
      <div className="flex justify-end items-end text-sm gap-4 text-slate-600">
        <Trash
          onClick={() => {
            handleDelete();
          }}
          className="w-5 h-5 border-2  border-gray-50 rounded text-gray-500 transition-transform transition-colors duration-200 hover:scale-150 hover:text-red-600"
        />
        <ChevronDown
          className="w-5 h-5 border-2 border-gray-50 text-gray-500 rounded transition-transform transition-colors duration-200 hover:scale-175 hover:text-primary hover:bg-blue-100  hover:rounded-full"
          onClick={() => setExpanded(!expanded)}
        />
      </div>
      <div className="flex justify-between items-center gap-4 pl-3 pt-2">
        <div>
          <h2>{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {expanded && (
        <div>
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="image"
                className="mt-8 pl-3 w-full max-w-md"
              />
            </div>
          ) : (
            <div className="mt-8 pl-3 h-full text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
