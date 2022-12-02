import { useEffect, useMemo, useRef, useState } from "react";
import { useGetChatMessagesQuery, usePostMessageMutation } from "../redux/messages";

function Message({ message, userId }) {
	return (
		<div
			className="bg-green-700 my-2 py-1 px-2 rounded w-2/3"
			style={{
				background: message.sender.id == userId ? "rgb(21, 128, 61)" : "#444",
				marginInline: message.sender.id == userId ? "auto 1rem" : "1rem auto",
			}}>
			<div>{message.sender.name}</div>
			<div>{message.body}</div>
			<small>{new Date(message.timestamp).toLocaleString()}</small>
		</div>
	);
}

function MessagesDisplay({ userId, messages }) {
	return (
		<div className="border h-[calc(100vh-400px)] overflow-y-scroll">
			{messages.map(message => (
				<Message key={message.id} message={message} userId={userId} />
			))}
		</div>
	);
}

function MessageInput({ userId, chatId }) {
	const textRef = useRef(null);

	const [
		postMessage, // This is the mutation trigger
		{ isLoading: isSending, isSuccess, data: sentMessage }, // This is the destructured mutation result
	] = usePostMessageMutation();

	if (isSuccess) {
		console.log({ sentMessage });
	}

	return (
		<div className="h-[100px]">
			<div className="h-[150px]">
				<textarea
					ref={textRef}
					className="w-full h-full bg-slate-600 resize-none"
				/>
			</div>
			<div className="flex justify-end">
				<button
					className="w-20 mt-2 mr-2 rounded-full bg-cyan-700 p-1"
					onClick={() => {
						postMessage({ userId, chatId, body: textRef.current.value });
					}}>
					{isSending ? "Sending..." : "Send"}
				</button>
			</div>
		</div>
	);
}

function Messages({ userId, chatId }) {
	const { isLoading: messagesLoading, data: messages } =
		useGetChatMessagesQuery(chatId);

	if (messagesLoading) return <div>Loading...</div>;

	console.log(JSON.stringify({ messages }, null, 2));

	return (
		<div className="border col-start-3 col-end-7 grow">
			<MessagesDisplay userId={userId} messages={messages} />

			<MessageInput userId={userId} chatId={chatId} />
		</div>
	);
}

export default Messages;
