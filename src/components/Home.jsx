import { Copy, PlusCircle, Clock, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  
  // Get recent pastes (last 5)
  const recentPastes = pastes.slice(-5).reverse();
  const totalPastes = pastes.length;
  const favoritePastes = pastes.filter(paste => paste.isFavorite).length;

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
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      {/* Welcome Section */}
      {!pasteId && (
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome to PasteShare 🚀
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Create, manage, and share your code snippets with ease
            </p>
            
            {/* Quick Stats */}
            <div className="flex justify-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalPastes}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Pastes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{favoritePastes}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Favorites</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">{recentPastes.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Recent</div>
              </div>
            </div>
          </div>
          
          {/* Recent Pastes */}
          {recentPastes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Clock size={24} className="text-blue-500" />
                Recent Pastes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentPastes.map((paste) => (
                  <div
                    key={paste._id}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-gray-200 dark:border-gray-700"
                    onClick={() => navigate(`/pastes/${paste._id}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                        {paste.title}
                      </h3>
                      {paste.isFavorite && <Star className="text-yellow-400 fill-current" size={16} />}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {paste.content.substring(0, 100)}...
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                        {paste.category}
                      </span>
                      <span>{new Date(paste.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Paste Editor */}
      <div className="max-w-3xl mx-auto px-6 pb-8">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        
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
    </div>
  );
};

export default Home;
