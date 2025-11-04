import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { incrementViews } from "../redux/pasteSlice";

const ViewPaste = ({ isShared = false }) => {
  const { id, data } = useParams();
  const dispatch = useDispatch();
  
  const pastes = useSelector((state) => state.paste.pastes);
  
  let paste;
  if (isShared && data) {
    try {
      paste = JSON.parse(decodeURIComponent(escape(atob(data)))); // Decode shared data
    } catch (error) {
      paste = null;
    }
  } else {
    paste = pastes.find((paste) => paste._id === id);
  }
  
  // Track view when component mounts (only once)
  useEffect(() => {
    if (id) {
      dispatch(incrementViews(id));
    }
  }, [id]); // Only depend on id



  if (!paste) {
    return (
      <div className="w-full min-h-screen py-16 px-8 pt-20 bg-[#0F172A] flex items-center justify-center">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold text-red-400 mb-4">🔍 Paste Not Available</h2>
          <p className="text-gray-400 mb-6 text-lg">This paste is not accessible from this device.</p>
          <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-6">
            <p className="text-yellow-300 text-sm mb-2">📱 <strong>Mobile Access Limitation:</strong></p>
            <p className="text-yellow-200 text-xs leading-relaxed">
              Pastes are currently stored locally on the device where they were created. 
              To access this paste, please open the link on the same computer where it was created.
            </p>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-gray-500">This could also happen if:</p>
            <ul className="text-sm text-gray-500 space-y-1 text-left">
              <li>• The paste was deleted by the owner</li>
              <li>• The link is incorrect or incomplete</li>
              <li>• The paste is private and not accessible</li>
            </ul>
          </div>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            🏠 Create New Paste
          </button>
        </div>
      </div>
    );
  }

  console.log("Paste->", paste);
  return (
    <div className="w-full min-h-screen py-16 px-8 pt-20 bg-[#0F172A]">
      <div className="flex flex-col gap-y-5 items-start">
        <input
          type="text"
          placeholder="Title"
          value={paste?.title || ''}
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
                navigator.clipboard.writeText(paste?.content || '');
                toast.success("Copied to Clipboard");
              }}
            >
              <Copy className="text-white" size={20} />
            </button>
          </div>

          {/* TextArea */}
          <textarea
            value={paste?.content || ''}
            disabled
            placeholder="Write Your Content Here...."
            className="w-full p-3 bg-transparent text-white focus-visible:ring-0 min-h-[70vh] border-none resize-none"
            style={{
              caretColor: "#fff",
            }}
          />
          
          {/* Privacy indicator */}
          {paste?.isPrivate && (
            <div className="px-4 py-2 bg-red-900/20 border-t border-red-800 text-red-300 text-sm">
              🔒 This is a private paste
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
