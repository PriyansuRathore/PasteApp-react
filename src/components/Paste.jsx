import { Calendar, Copy, Eye, PencilLine, Trash2, Share2, Star, Download, Upload, Filter } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { removeFromPastes, incrementShares, toggleFavorite, importPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";
import QRCode from "react-qr-code";
import Statistics from "./Statistics";
import { exportPastes, importPastes as importPastesUtil } from "../utlis/exportImport";

const Paste = ({ darkMode }) => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [qrCodeId, setQrCodeId] = useState(null);
  const [filterType, setFilterType] = useState("all"); // all, favorites, recent
  const fileInputRef = useRef(null);

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
      dispatch(removeFromPastes(id));
      toast.success("Paste deleted successfully!");
    }
  };

  const handleShare = (pasteId) => {
    const pasteUrl = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(pasteUrl);
    setQrCodeId(pasteId); // ✅ Set QR Code for this paste
    dispatch(incrementShares(pasteId)); // ✅ Track real shares
    toast.success("Link copied to clipboard!");
  };

  const handleExport = () => {
    exportPastes(pastes);
    toast.success("Pastes exported successfully!");
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const importedPastes = await importPastesUtil(file);
        dispatch(importPastes(importedPastes));
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  const handleToggleFavorite = (pasteId) => {
    dispatch(toggleFavorite(pasteId));
  };

  // Enhanced filtering
  const filteredPastes = pastes.filter((paste) => {
    const matchesSearch = paste.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         paste.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterType === "favorites") {
      return matchesSearch && paste.isFavorite;
    }
    if (filterType === "recent") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return matchesSearch && new Date(paste.createdAt) > weekAgo;
    }
    if (["code", "notes", "config", "snippet", "other"].includes(filterType)) {
      return matchesSearch && paste.category === filterType;
    }
    return matchesSearch;
  });

  return (
    <div className={`w-full min-h-screen ${darkMode ? 'bg-[#0F172A] text-white' : 'bg-white text-black'} flex justify-center`}>
      <div className="w-full max-w-[1200px] py-10 px-5 lg:px-0 pt-16">
        <div className="flex flex-col gap-y-5">
          {/* Statistics Section */}
          <Statistics darkMode={darkMode} />
          {/* Search & Controls Bar */}
          <div className={`w-full ${darkMode ? 'bg-[#1E293B] border-[#334155]' : 'bg-gray-100 border-gray-300'} shadow-md rounded-lg border mt-6`}>
            <div className="flex flex-col sm:flex-row gap-3 p-4">
              {/* Search Input */}
              <div className="flex-1 flex gap-3">
                <input
                  type="search"
                  placeholder="🔍 Search in titles and content..."
                  className={`focus:outline-none w-full bg-transparent text-lg ${darkMode ? 'placeholder-gray-400 text-white' : 'placeholder-gray-500 text-black'}`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex gap-2">
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className={`px-3 py-2 rounded-lg border ${darkMode ? 'bg-[#334155] border-[#475569] text-white' : 'bg-white border-gray-300 text-black'}`}
                >
                  <option value="all">All Pastes</option>
                  <option value="favorites">⭐ Favorites</option>
                  <option value="recent">📅 Recent</option>
                  <option value="code">💻 Code</option>
                  <option value="notes">📝 Notes</option>
                  <option value="config">⚙️ Config</option>
                  <option value="snippet">✂️ Snippet</option>
                  <option value="other">📄 Other</option>
                </select>
                
                {/* Export Button */}
                <button
                  onClick={handleExport}
                  className={`p-2 rounded-lg ${darkMode ? 'bg-[#334155] border-[#475569] hover:bg-[#475569]' : 'bg-white border-gray-300 hover:bg-gray-50'} border transition`}
                  title="Export all pastes"
                >
                  <Download size={20} className="text-green-500" />
                </button>
                
                {/* Import Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-2 rounded-lg ${darkMode ? 'bg-[#334155] border-[#475569] hover:bg-[#475569]' : 'bg-white border-gray-300 hover:bg-gray-50'} border transition`}
                  title="Import pastes"
                >
                  <Upload size={20} className="text-blue-500" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Pastes Section */}
          <div className={`flex flex-col ${darkMode ? 'bg-[#1E293B] border-[#334155] text-white' : 'bg-gray-50 border-gray-300 text-black'} shadow-lg border py-6 rounded-xl`}>
            <h2 className={`px-6 text-3xl font-bold text-[#38BDF8] ${darkMode ? 'border-[#334155]' : 'border-gray-300'} border-b pb-4`}>
              📜 All Pastes
            </h2>
            <div className="w-full px-6 pt-4 flex flex-col gap-y-6">
              {filteredPastes.length > 0 ? (
                filteredPastes.map((paste) => (
                  <div
                    key={paste._id}
                    className={`relative border ${darkMode ? 'border-[#475569] bg-[#1E293B]' : 'border-gray-300 bg-white'} w-full flex flex-col sm:flex-row p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow`}
                  >
                    {/* ✅ QR Code (Top-Right Corner) */}
                    {qrCodeId === paste._id && (
                      <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-lg">
                        <QRCode value={`${window.location.origin}/pastes/${paste._id}`} size={80} />
                      </div>
                    )}

                    {/* Title & Description */}
                    <div className="w-full sm:w-[60%] flex flex-col space-y-3">
                      <div className="flex items-center gap-2">
                        <p className="text-xl font-semibold text-[#38BDF8]">
                          {paste.title}
                        </p>
                        {paste.category && (
                          <span className={`px-2 py-1 text-xs rounded-full ${darkMode ? 'bg-[#334155] text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                            {paste.category === 'code' && '💻'}
                            {paste.category === 'notes' && '📝'}
                            {paste.category === 'config' && '⚙️'}
                            {paste.category === 'snippet' && '✂️'}
                            {paste.category === 'other' && '📄'}
                            {paste.category}
                          </span>
                        )}
                        {paste.isFavorite && (
                          <Star className="text-yellow-400 fill-current" size={16} />
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-400 line-clamp-3">
                        {paste.content}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:items-end gap-y-4">
                      <div className="flex gap-3">
                        <button 
                          className={`p-2 rounded-lg ${darkMode ? 'bg-[#334155] border-[#475569]' : 'bg-gray-200 border-gray-400'} border hover:border-[#60a5fa] transition`}
                          onClick={() => navigate(`/?pasteId=${paste._id}`)}
                        >
                          <PencilLine className="text-[#60a5fa] hover:text-white" size={20} />
                        </button>
                        <button
                          className={`p-2 rounded-lg ${darkMode ? 'bg-[#334155] border-[#475569]' : 'bg-gray-200 border-gray-400'} border hover:border-[#f87171] transition`}
                          onClick={() => handleDelete(paste._id, paste.title)}
                        >
                          <Trash2 className="text-[#f87171] hover:text-white" size={20} />
                        </button>
                        <button 
                          className={`p-2 rounded-lg ${darkMode ? 'bg-[#334155] border-[#475569]' : 'bg-gray-200 border-gray-400'} border hover:border-[#fb923c] transition`}
                          onClick={() => navigate(`/pastes/${paste._id}`)}
                        >
                          <Eye className="text-[#fb923c] hover:text-white" size={20} />
                        </button>
                        <button
                          className={`p-2 rounded-lg ${darkMode ? 'bg-[#334155] border-[#475569]' : 'bg-gray-200 border-gray-400'} border hover:border-[#34d399] transition`}
                          onClick={() => {
                            navigator.clipboard.writeText(paste.content);
                            toast.success("Copied to Clipboard!");
                          }}
                        >
                          <Copy className="text-[#34d399] hover:text-white" size={20} />
                        </button>
                        <button
                          className={`p-2 rounded-lg ${darkMode ? 'bg-[#334155] border-[#475569]' : 'bg-gray-200 border-gray-400'} border hover:border-[#facc15] transition`}
                          onClick={() => handleShare(paste._id)}
                        >
                          <Share2 className="text-[#facc15] hover:text-white" size={20} />
                        </button>
                        <button
                          className={`p-2 rounded-lg ${darkMode ? 'bg-[#334155] border-[#475569]' : 'bg-gray-200 border-gray-400'} border hover:border-[#fbbf24] transition`}
                          onClick={() => handleToggleFavorite(paste._id)}
                        >
                          <Star className={`${paste.isFavorite ? 'text-yellow-400 fill-current' : 'text-gray-400'} hover:text-yellow-400`} size={20} />
                        </button>
                      </div>
                      <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Calendar size={20} className="mr-2 text-[#38BDF8]" />
                        {FormatDate(paste.createdAt)}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-2xl text-center w-full text-[#f87171] font-semibold">
                  🚫 No Pastes Found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paste;
