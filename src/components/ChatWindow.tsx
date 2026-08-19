import { CheckCheck } from "lucide-react";

type Message = {
  id: number;
  text: string;
  time: string;
  mine?: boolean;
  read?: boolean;
};

type Props = {
  message: Message;
};

export default function MessageBubble({ message }: Props) {
  return (
    <div className={`message-row ${message.mine ? "mine" : "theirs"}`}>
      <div className="message-bubble">
        <div className="message-text">{message.text}</div>

        <div className="message-meta">
          <span>{message.time}</span>

          {message.mine && (
            <CheckCheck
              size={15}
              className={message.read ? "read" : ""}
            />
          )}
        </div>
      </div>
    </div>
  );
}
