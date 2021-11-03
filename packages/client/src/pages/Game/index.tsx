import ChatContainer from '../../containers/ChatContainer';
import useChat from '../../hooks/useChat';

const Game = () => {
  const { chatList, sendChat } = useChat('hi');

  return <ChatContainer chatList={chatList} sendChat={sendChat} />;
};

export default Game;
