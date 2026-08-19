import { useState } from "react";
import {
  MessageCircle,
  CircleDashed,
  Phone,
  Search,
  MoreVertical,
  Settings,
  User,
  Archive,
} from "lucide-react";
import ChatWindow from "./components/ChatWindow";

type Tab = "chats" | "updates" | "calls";

const chats = [
  {
    id: 1,
    name: "محمد",
    message: "عامل إيه؟",
    time: "7:42 م",
    unread: 2,
    online: true,
  },
  {
    id: 2,
    name: "عيلة الكراكير",
    message: "حمدي: تمام يا جماعة",
    time: "6:31 م",
    unread: 5,
    online: false,
  },
  {
    id: 3,
    name: "أحمد",
    message: "الصورة وصلت 👍",
    time: "5:18 م",
    unread: 0,
    online: false,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const selected = chats.find((chat) => chat.id === selectedChat);

  return (
    <div className="app">
      <aside
        className={`sidebar ${
          selectedChat !== null ? "mobile-hidden" : ""
        }`}
      >
        <header className="topbar">
          <h1>Messenger</h1>

          <div className="top-actions">
            <button aria-label="التحديثات">
              <CircleDashed size={21} />
            </button>

            <button aria-label="محادثة جديدة">
              <MessageCircle size={21} />
            </button>

            <button aria-label="القائمة">
              <MoreVertical size={21} />
            </button>
          </div>
        </header>

        <div className="search-box">
          <Search size={18} />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="بحث"
          />
        </div>

        <nav className="tabs">
          <button
            className={activeTab === "chats" ? "active" : ""}
            onClick={() => setActiveTab("chats")}
          >
            <MessageCircle size={18} />
            <span>الدردشات</span>
          </button>

          <button
            className={activeTab === "updates" ? "active" : ""}
            onClick={() => setActiveTab("updates")}
          >
            <CircleDashed size={18} />
            <span>التحديثات</span>
          </button>

          <button
            className={activeTab === "calls" ? "active" : ""}
            onClick={() => setActiveTab("calls")}
          >
            <Phone size={18} />
            <span>المكالمات</span>
          </button>
        </nav>

        <div className="chat-list">
          {activeTab === "chats" &&
            filteredChats.map((chat) => (
              <button
                className="chat-item"
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="avatar">
                  {chat.name.charAt(0)}

                  {chat.online && (
                    <span className="online-dot" />
                  )}
                </div>

                <div className="chat-info">
                  <div className="chat-row">
                    <strong>{chat.name}</strong>
                    <time>{chat.time}</time>
                  </div>

                  <div className="chat-row">
                    <span>{chat.message}</span>

                    {chat.unread > 0 && (
                      <b className="unread">{chat.unread}</b>
                    )}
                  </div>
                </div>
              </button>
            ))}

          {activeTab === "updates" && (
            <div className="empty-tab">
              <CircleDashed size={42} />
              <h2>التحديثات</h2>
              <p>الحالات والتحديثات ستظهر هنا.</p>
            </div>
          )}

          {activeTab === "calls" && (
            <div className="empty-tab">
              <Phone size={42} />
              <h2>المكالمات</h2>
              <p>سجل المكالمات سيظهر هنا.</p>
            </div>
          )}
        </div>

        <footer className="sidebar-footer">
          <button>
            <Archive size={20} />
            المؤرشفة
          </button>

          <button>
            <Settings size={20} />
            الإعدادات
          </button>

          <button>
            <User size={20} />
            الحساب
          </button>
        </footer>
      </aside>

      {selectedChat !== null && selected ? (
        <ChatWindow />
      ) : (
        <main className="conversation">
          <div className="welcome">
            <div className="welcome-icon">
              <MessageCircle size={52} />
            </div>

            <h2>Messenger</h2>

            <p>اختر محادثة من القائمة لبدء المراسلة.</p>

            <small>
              محادثاتك ومكالماتك وحالاتك كلها في مكان واحد.
            </small>
          </div>
        </main>
      )}
    </div>
  );
}
