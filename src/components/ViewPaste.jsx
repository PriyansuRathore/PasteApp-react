import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { incrementViews } from "../redux/pasteSlice";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-java";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";

const ViewPaste = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((paste) => paste._id === id);
  
  // Track view when component mounts
  useEffect(() => {
    if (paste) {
      dispatch(incrementViews(id));
    }
  }, [id, paste, dispatch]);

  // Highlight syntax when component mounts
  useEffect(() => {
    Prism.highlightAll();
  }, [paste]);

  const detectLanguage = (content) => {
    if (content.includes('function') || content.includes('const') || content.includes('let')) return 'javascript';
    if (content.includes('def ') || content.includes('import ')) return 'python';
    if (content.includes('public class') || content.includes('System.out')) return 'java';
    if (content.includes('{') && content.includes(':')) return 'json';
    if (content.includes('body') || content.includes('div')) return 'css';
    return 'javascript';
  };

  console.log("Paste->", paste);
  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0 bg-[#0F172A] text-white pt-16">
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

          {/* Code Block with Syntax Highlighting */}
          <pre className="w-full p-3 bg-transparent border-none resize-none focus:ring-0 overflow-auto">
            <code className={`language-${detectLanguage(paste.content)} text-sm`}>
              {paste.content}
            </code>
          </pre>
        </div>


      </div>
    </div>
  );
};

export default ViewPaste;
