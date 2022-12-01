import { useEffect, useMemo, useState } from "react";
// "/users",
// "/users/:id",
// "/users",
// "/users/:id",
// "/users/:id",
// "/preferences",
// "/preferences/:id",
// "/preferences/:id",
// "/chats",
// "/chats/:id",
// "/chats",
// "/chats/:id",
// /user-chats/999
// "/messages",
// "/messages/:id",
// "/user-messages/:userId",
// "/chat-messages/:chatId",
// "/messages/:senderId",
// "/messages/:id",
// "/messages/:id";

const store = {
	user: {},
	preferences: {},
	chats: {},
};

function App() {
	const [userId, setUserId] = useState("999");
	const [chatId, setChatId] = useState(null);
	const [user, setUser] = useState(null);
	const [chats, setChats] = useState([]);
	// const [user, preferences, chats] = [
	// 	fetch("http://localhost:8000/messages"),
	// 	fetch("http://localhost:8000/messages"),
	// 	fetch("http://localhost:8000/messages"),
	// ];
	const currChat = useMemo(() => {
		return chats.find(c => c.id === chatId);
	}, [chats, chatId]);

	useEffect(() => {
		const fetchUser = async () => {
			if (!userId) return;

			try {
				const data = await fetch(`http://localhost:8000/users/${userId}`).then(
					res => res.json()
				);
				setUser(data);
			} catch (err) {
				// console.log(err);
			}
		};

		const fetchUserChats = async () => {
			if (!userId) return;

			try {
				const data = await fetch(
					`http://localhost:8000/user-chats/${userId}`
				).then(res => res.json());
				setChatId(data[0].id);
				setChats(data);
			} catch (err) {
				// console.log(err);
			}
		};

		fetchUser();
		fetchUserChats();
	}, [userId]);

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
						setUserId(e.target.value);
					}}
				/>
				<pre>{JSON.stringify(user, null, 2)}</pre>
			</div>

			<div className="grid grid-cols-6 h-[calc(100vh-200px)]">
				<ul className="border col-start-1 col-end-3">
					{chats.map(c => (
						<li
							key={c.id}
							className="border overflow-clip"
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
					HELLO
					<div>{chatId}</div>
					<pre>{JSON.stringify(currChat, null, 2)}</pre>
				</div>
			</div>
		</div>
	);
}

export default App;
