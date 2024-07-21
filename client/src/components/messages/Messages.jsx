import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  //console.log("messages:", messages);
  return (
    <div className="px-4 flex-1 overflow-auto scrollableDiv">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <Message key={message._id} message={message} />
        ))}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};
export default Messages;
