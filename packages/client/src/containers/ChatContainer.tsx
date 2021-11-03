import { FC, useState } from 'react';
import { ChatMsg } from '../components/Message';
import { ChatMsgType } from '../types/ChatTypes';

const ChatContainer: FC = () => {
  const myName = 'a';
  const [chatMsgs] = useState<ChatMsgType[]>([
    { userName: 'a', msg: 'amfke' },
    { userName: 'b', msg: 'amfkefasfe' },
    { userName: 'c', msg: 'amfkeqlq;q;' },
  ]);

  return (
    <div>
      {chatMsgs.map((chat) => (
        <ChatMsg key={chat.userName + chat.msg} chat={chat} isMyMsg={myName === chat.userName} />
      ))}
    </div>
  );
};

export default ChatContainer;
