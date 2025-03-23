import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  console.log(id);

  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((paste) => paste._id === id);

  console.log("Paste->", paste);
  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 bg-[#0F172A] text-white">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={paste.title}
          disabled
          className="w-full text-white bg-[#1E293B] border border-gray-600 rounded-md p-3 focus:outline-none"
        />
        <div className="w-full flex flex-col items-start relative rounded bg-[#1E293B] bg-opacity-80 border border-gray-600 backdrop-blur-lg shadow-lg">
          <div className="w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-3 border-b border-gray-600 bg-[#334155]">
            <div className="w-full flex gap-x-[6px] items-center select-none">
              <div className="w-[13px] h-[13px] rounded-full bg-red-500" />
              <div className="w-[13px] h-[13px] rounded-full bg-yellow-500" />
              <div className="w-[13px] h-[13px] rounded-full bg-green-500" />
            </div>

            {/* Copy button */}
            <button
              className="flex justify-center items-center p-2 bg-gray-700 hover:bg-gray-600 transition-all duration-300 rounded"
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to Clipboard");
              }}
            >
              <Copy className="text-white" size={20} />
            </button>
          </div>

          {/* TextArea */}
          <textarea
            value={paste.content}
            disabled
            placeholder="Write Your Content Here..."
            className="w-full p-3 bg-transparent text-white border-none resize-none focus:ring-0"
            style={{ caretColor: "#FFFFFF" }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
