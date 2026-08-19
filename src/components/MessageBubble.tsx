import { useState } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Phone,
  Video,
  Smile,
  Paperclip,
  Mic,
  Send,
  Search,
} from "lucide-react";
import MessageBubble from "./MessageBubble";

type Message = {
  id: number;
  text: string;
  time: string;
  mine?: boolean;
  read?: boolean;
};

const initialMessages: Message[] = [
  {
    id: 1,
    text: "أهلاً يا صاحبي 👋",
    time: "7:30 م",
    mine: false,
  },
  {
    id: 2,
    text: "أهلاً! عامل إيه؟",
    time: "7:31 م",
    mine: true,
    read: true,
  },
  {
    id: 3,
    text: "تمام الحمد لله، التطبيق شكله حلو 🔥",
    time: "7:32 م",
    mine: false,
  },
  {
    id: 4,
    text: "لسه بنبنيه، استنى اللي جاي 😎",
    time: "7:33 م",
    mine: true,
    read: true,
  },
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [text, setText] = useState("");

  function sendMessage() {
    const value = text.trim();

    if (!value) return;

    const newMessage: Message = {
      id: Date.now(),
      text: value,
      time: new Date().toLocaleTimeString("ar-EG", {
        hour: "numeric",
        minute: "2-digit",
      }),
      mine: true,
      read: false,
    };

    setMessages((current) => [...current, newMessage]);
    setText("");
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (event.key === "Enter") {
      sendMessage();
    }
  }

  return (
    <section className="chat-window">
      <header className="chat-header">
        <button className="mobile-back">
          <ArrowLeft size={22} />
        </button>

        <div className="chat-avatar">م</div>

        <div className="chat-header-info">
          <strong>محمد</strong>
          <span>متصل الآن</span>
        </div>

        <div className="chat-header-actions">
          <button title="بحث">
            <Search size={21} />
          </button>

          <button title="مكالمة فيديو">
            <Video size={21} />
          </button>

          <button title="مكالمة صوتية">
            <Phone size={21} />
          </button>

          <button title="المزيد">
            <MoreVertical size={21} />
          </button>
        </div>
      </header>

      <div className="messages-area">
        <div className="messages-content">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
            />
          ))}
        </div>
      </div>

      <footer className="message-composer">
        <button title="إيموجي">
          <Smile size={24} />
        </button>

        <button title="إرفاق ملف">
          <Paperclip size={22} />
        </button>

        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب رسالة"
        />

        {text.trim() ? (
          <button
            className="send-button"
            onClick={sendMessage}
            title="إرسال"
          >
            <Send size={22} />
          </button>
        ) : (
          <button title="تسجيل صوتي">
            <Mic size={23} />
          </button>
        )}
      </footer>
    </section>
  );
}
