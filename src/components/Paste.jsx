import { Calendar, Copy, Eye, PencilLine, Trash2, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";
import QRCode from "react-qr-code";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [qrCodeId, setQrCodeId] = useState(null); // ✅ Stores the paste ID for QR code

  const handleDelete = (id) => {
    dispatch(removeFromPastes(id));
    toast.success("Paste deleted successfully!");
  };

  const handleShare = (pasteId) => {
    const pasteUrl = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(pasteUrl);
    setQrCodeId(pasteId); // ✅ Set QR Code for this paste
    toast.success("Link copied to clipboard!");
  };

  const filteredPastes = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full min-h-screen bg-[#0F172A] text-white flex justify-center">
      <div className="w-full max-w-[1200px] py-10 px-5 lg:px-0">
        <div className="flex flex-col gap-y-5">
          {/* Search Bar */}
          <div className="w-full flex gap-3 px-4 py-3 bg-[#1E293B] shadow-md rounded-lg border border-[#334155] mt-6">
            <input
              type="search"
              placeholder="🔍 Search paste here..."
              className="focus:outline-none w-full bg-transparent text-lg placeholder-gray-400 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Pastes Section */}
          <div className="flex flex-col bg-[#1E293B] shadow-lg border border-[#334155] py-6 rounded-xl text-white">
            <h2 className="px-6 text-3xl font-bold text-[#38BDF8] border-b border-[#334155] pb-4">
              📜 All Pastes
            </h2>
            <div className="w-full px-6 pt-4 flex flex-col gap-y-6">
              {filteredPastes.length > 0 ? (
                filteredPastes.map((paste) => (
                  <div
                    key={paste._id}
                    className="relative border border-[#475569] bg-[#1E293B] w-full flex flex-col sm:flex-row p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    {/* ✅ QR Code (Top-Right Corner) */}
                    {qrCodeId === paste._id && (
                      <div className="absolute top-2 right-2 bg-white p-2 rounded-md shadow-lg">
                        <QRCode value={`${window.location.origin}/pastes/${paste._id}`} size={80} />
                      </div>
                    )}

                    {/* Title & Description */}
                    <div className="w-full sm:w-[60%] flex flex-col space-y-3">
                      <p className="text-xl font-semibold text-[#38BDF8]">
                        {paste.title}
                      </p>
                      <p className="text-sm font-medium text-gray-400 line-clamp-3">
                        {paste.content}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:items-end gap-y-4">
                      <div className="flex gap-3">
                        <button className="p-2 rounded-lg bg-[#334155] border border-[#475569] hover:border-[#60a5fa] transition">
                          <a href={`/?pasteId=${paste._id}`}>
                            <PencilLine className="text-[#60a5fa] hover:text-white" size={20} />
                          </a>
                        </button>
                        <button
                          className="p-2 rounded-lg bg-[#334155] border border-[#475569] hover:border-[#f87171] transition"
                          onClick={() => handleDelete(paste._id)}
                        >
                          <Trash2 className="text-[#f87171] hover:text-white" size={20} />
                        </button>
                        <button className="p-2 rounded-lg bg-[#334155] border border-[#475569] hover:border-[#fb923c] transition">
                          <a href={`/pastes/${paste._id}`} target="_blank">
                            <Eye className="text-[#fb923c] hover:text-white" size={20} />
                          </a>
                        </button>
                        <button
                          className="p-2 rounded-lg bg-[#334155] border border-[#475569] hover:border-[#34d399] transition"
                          onClick={() => {
                            navigator.clipboard.writeText(paste.content);
                            toast.success("Copied to Clipboard!");
                          }}
                        >
                          <Copy className="text-[#34d399] hover:text-white" size={20} />
                        </button>
                        <button
                          className="p-2 rounded-lg bg-[#334155] border border-[#475569] hover:border-[#facc15] transition"
                          onClick={() => handleShare(paste._id)}
                        >
                          <Share2 className="text-[#facc15] hover:text-white" size={20} />
                        </button>
                      </div>
                      <div className="flex items-center text-gray-400">
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
