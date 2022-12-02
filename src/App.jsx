import { useEffect, useMemo, useRef, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useGetUserByIdQuery } from "./redux/users";
import { useGetUserChatsQuery } from "./redux/chats";
import { useGetChatMessagesQuery } from "./redux/messages";

function Chat() {
	const textRef = useRef(null);
	const [userId, setUserId] = useState(999);
	const [chatId, setChatId] = useState(0);

	const { isLoading: userLoading, data: user, isError } = useGetUserByIdQuery(userId);

	const { isLoading: chatsLoading, data: chats } = useGetUserChatsQuery(userId);

	const { isLoading: messagesLoading, data: messages } =
		useGetChatMessagesQuery(chatId);

	useEffect(() => {
		if (chats && chats[0]) {
			console.log({ user, chats, id: chats[0].id });
			setChatId(chats[0].id);
		}
	}, [chats, user]);

	if (userLoading || chatsLoading || messagesLoading) return <div>Loading...</div>;

	return (
		<div className="">
			<div className="h-[200px]">
				<h1>Chat</h1>

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
			<div className="grid grid-cols-6 h-[calc(100vh-200px)]">
				<ul className="col-start-1 col-end-3">
					<li>{chats[chatId] && `Current chat: ${chats[chatId].name}`}</li>
					{user &&
						chats.map(c => (
							<li
								key={c.id}
								className="overflow-clip hover:cursor-pointer hover:opacity-70"
								style={{ background: c.id === chatId ? "#777" : "" }}
								onClick={() => setChatId(c.id)}>
								<div>{c.name}</div>
								<ul>
									{c.participants.map(p => (
										<li
											key={`${c.id}-${p.id}`}
											className="flex items-center">
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
				<div className="border col-start-3 col-end-7 grow">
					<div className="h-[calc(100%-200px)]">
						{/* <pre>{JSON.stringify(messages, null, 2)}</pre> */}
						{user &&
							messages.map(m => (
								<div
									className="bg-green-700 my-2 py-1 px-2 rounded w-2/3"
									key={m.id}
									style={{
										background:
											m.sender.id === +userId
												? "rgb(21, 128, 61)"
												: "#444",
										marginInline:
											m.sender.id === +userId
												? "auto 1rem"
												: "1rem auto",
									}}>
									<div>{m.sender.name}</div>
									<div>{m.body}</div>
									<small>
										{new Date(m.timestamp).toLocaleString()}
									</small>
								</div>
							))}
					</div>
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
									console.log(textRef.current.value);
								}}>
								Send
							</button>
						</div>
					</div>

					{/* */}
					{/* <pre>{JSON.stringify(currChat, null, 2)}</pre> */}
				</div>
			</div>
		</div>
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
