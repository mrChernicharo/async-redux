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
	const messagePaneRef = useRef(null);

	if (messagePaneRef.current && messages) {
		console.log({ el: messagePaneRef.current?.scrollHeight || 0 });

		setTimeout(() => {
			messagePaneRef.current.scrollTo({
				top: 999_999,
			});
		}, 10);
	}

	return (
		<div className="relative border h-[calc(100vh-200px)] ">
			<div
				ref={messagePaneRef}
				className="absolute bottom-0 w-full border max-h-[calc(100vh-200px)] overflow-y-auto">
				{messages.map(message => (
					<Message key={message.id} message={message} userId={userId} />
				))}
			</div>
		</div>
	);
}

function MessageInput({ userId, chatId }) {
	const textRef = useRef(null);

	const [
		postMessage, // This is the mutation trigger
		{ isLoading: isSending, isSuccess, data: sentMessage }, // This is the destructured mutation result
	] = usePostMessageMutation();

	return (
		<div className="">
			<div className="h-[150px]">
				<textarea
					ref={textRef}
					className="w-full h-full p-2 bg-slate-600 resize-none"
					onKeyUp={e => {
						e.preventDefault();
						if (
							e.key === "Enter" &&
							textRef.current.value.replace(/\n/g, "")
						) {
							postMessage({ userId, chatId, body: textRef.current.value });
							textRef.current.value = "";
						}
					}}
				/>
			</div>
			<div className="flex justify-end border">
				<button
					className="w-20 mt-2 mb-1.5 mr-2 rounded-full bg-cyan-700 p-1"
					onClick={() => {
						if (textRef.current.value) {
							postMessage({ userId, chatId, body: textRef.current.value });
							textRef.current.value = "";
						}
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

	return (
		<div>
			<MessagesDisplay userId={userId} messages={messages} />

			<MessageInput userId={userId} chatId={chatId} />
		</div>
	);
}

export default Messages;
