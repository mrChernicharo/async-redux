import { useEffect, useMemo, useState } from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { useGetUserByIdQuery } from "./redux/users";
import { useGetUserChatsQuery } from "./redux/chats";
import { useGetChatMessagesQuery } from "./redux/messages";

function Chat() {
	const [userId, setUserId] = useState(999);
	const [chatId, setChatId] = useState(0);

	const { isLoading: userLoading, data: user } = useGetUserByIdQuery(userId);

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
					className="w-20 bg-slate-500"
					defaultValue={userId}
					onChange={e => {
						setChatId(null);
						setUserId(e.target.value);
					}}
				/>
				<pre>{userId && JSON.stringify(user, null, 2)}</pre>
			</div>

			<div className="grid grid-cols-6 h-[calc(100vh-200px)]">
				Chat id: {chatId}
				<ul className="col-start-1 col-end-3">
					{/* <pre>{JSON.stringify(chats, null, 2)}</pre> */}
					{user &&
						chats.map(c => (
							<li
								key={c.id}
								className="overflow-clip"
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
				<div className="col-start-3 col-end-7 grow">
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
								<small>{new Date(m.timestamp).toLocaleString()}</small>
							</div>
						))}

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
