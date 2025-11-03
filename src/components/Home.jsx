import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("code");
  
  const categories = [
    { value: "code", label: "💻 Code", color: "text-blue-500" },
    { value: "notes", label: "📝 Notes", color: "text-green-500" },
    { value: "config", label: "⚙️ Config", color: "text-purple-500" },
    { value: "snippet", label: "✂️ Snippet", color: "text-orange-500" },
    { value: "other", label: "📄 Other", color: "text-gray-500" }
  ];
  const [searchParams, setSearchParams] = useSearchParams(); 
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      category: category,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
      isFavorite: false,
      views: 0,
      shares: 0
    };

    if (pasteId) {
      dispatch(updatePastes(paste));
      toast.success("Paste updated successfully!");
    } else {
      dispatch(addToPastes(paste));
      toast.success("Paste created successfully!");
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 's':
            e.preventDefault();
            createPaste();
            break;
          case 'n':
            e.preventDefault();
            resetPaste();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [title, value, category]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="max-w-3xl w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        
        {/* Title Input & Category */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Enter title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md shadow-md transition"
              onClick={createPaste}
              title={`${pasteId ? 'Update' : 'Create'} Paste (Ctrl+S)`}
            >
              {pasteId ? "Update Paste" : "Create Paste"}
            </button>

            {pasteId && (
              <button 
                className="bg-gray-600 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-md shadow-md transition"
                onClick={resetPaste}
                title="New Paste (Ctrl+N)"
              >
                <PlusCircle size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Paste Content Area */}
        <div className="relative bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-300 dark:border-gray-600">
          
          {/* Copy Button */}
          <button
            className="absolute top-2 right-2 p-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 rounded-md"
            onClick={() => {
              navigator.clipboard.writeText(value);
              toast.success("Copied to Clipboard!");
            }}
          >
            <Copy className="text-gray-700 dark:text-white" size={20} />
          </button>

          {/* TextArea */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your content here..."
            className="w-full h-64 p-3 border-none focus:outline-none bg-transparent dark:text-white"
            style={{ caretColor: "#000" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
