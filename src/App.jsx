import { useEffect, useMemo, useRef, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useGetUserByIdQuery } from "./redux/users";
import { useGetUserChatsQuery } from "./redux/chats";
import { useGetChatMessagesQuery, usePostMessageMutation } from "./redux/messages";

function Roster({ userId, chatId, setChatId }) {
	const { isLoading: chatsLoading, data: chats } = useGetUserChatsQuery(userId);

	const currChat = useMemo(() => {
		return (chats && chats.find(c => c.id === chatId)) || [];
	}, [chatId]);

	if (chatsLoading) return <div>...Loading Chats</div>;

	console.log({ chats, chatId });

	return (
		<ul className="border col-start-1 col-end-3">
			<li className="text-right">{`${currChat.name ?? ""}`}</li>
			{chats.map(c => (
				<li
					key={c.id}
					className="overflow-clip hover:cursor-pointer hover:opacity-70"
					style={{ background: c.id == chatId ? "#777" : "" }}
					onClick={() => setChatId(c.id)}>
					<div>{c.name}</div>
					<ul>
						{c.participants.map(p => (
							<li key={`${c.id}-${p.id}`} className="flex items-center">
								<div className="w-8 h-8 bg-cyan-600 rounded-full flex-none">
									<div className="h-8 text-xs flex items-center justify-center">
										{p.id}
									</div>
								</div>
								<div className="ml-2">{p.name}</div>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
}

function UserSection({ userId, setUserId, setChatId }) {
	const { isLoading: userLoading, data: user } = useGetUserByIdQuery(userId);

	if (userLoading) return <div>...Loading</div>;

	return (
		<div className="border h-[200px]">
			<h1 className="text-right">Cherni Chat</h1>

			<label htmlFor="user-id">User id</label>
			<input
				id="user-id"
				className="w-20 bg-slate-600"
				defaultValue={userId}
				onChange={e => {
					setChatId(null);
					setUserId(e.target.value || 0);
				}}
			/>
			<pre>{userId && JSON.stringify(user, null, 2)}</pre>
		</div>
	);
}

function Messages({ userId, chatId }) {
	const { isLoading: messagesLoading, data: messages } =
		useGetChatMessagesQuery(chatId);

	if (messagesLoading) return <div>Loading...</div>;

	return (
		<div className="border col-start-3 col-end-7 grow">
			<MessagesDisplay userId={userId} messages={messages} />

			<MessageInput userId={userId} chatId={chatId} />
		</div>
	);
}

function MessagesDisplay({ userId, messages }) {
	return (
		<div className="h-[calc(100%-200px)]">
			{messages.map(message => (
				<Message key={message.id} message={message} userId={userId} />
			))}
		</div>
	);
}

function Message({ message, userId }) {
	return (
		<div
			className="bg-green-700 my-2 py-1 px-2 rounded w-2/3"
			style={{
				background: message.sender.id === +userId ? "rgb(21, 128, 61)" : "#444",
				marginInline: message.sender.id === +userId ? "auto 1rem" : "1rem auto",
			}}>
			<div>{message.sender.name}</div>
			<div>{message.body}</div>
			<small>{new Date(message.timestamp).toLocaleString()}</small>
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
		<div className="h-[200px]">
			<div className="h-[135px]">
				<textarea
					ref={textRef}
					className="w-full h-full bg-slate-600 resize-none"
				/>
			</div>
			<div className="flex justify-end">
				<button
					className="w-16 mt-2 mr-2 rounded-full bg-cyan-700 p-1"
					onClick={() => {
						postMessage({ userId, chatId, body: textRef.current.value });
					}}>
					{isSending ? "Sending..." : "Send"}
				</button>
			</div>
		</div>
	);
}

function Layout({ children }) {
	return <div>{children}</div>;
}

function Main({ children }) {
	return <div className="grid grid-cols-6 h-[calc(100vh-200px)]">{children}</div>;
}

function Chat() {
	const [userId, setUserId] = useState(999);
	const [chatId, setChatId] = useState(0);

	return (
		<Layout>
			<UserSection
				userId={userId}
				setUserId={v => setUserId(v)}
				setChatId={v => setChatId(v)}
			/>
			<Main>
				<Roster userId={userId} chatId={chatId} setChatId={v => setChatId(v)} />

				<Messages userId={userId} chatId={chatId} />
			</Main>
		</Layout>
	);
}

function App() {
	return (
		<Provider store={store}>
			<Chat />
		</Provider>
	);
}

export default App;
