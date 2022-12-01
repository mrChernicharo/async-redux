import { useEffect } from "react";
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
// "/chats/:id",
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
	useEffect(async () => {
		const [user, preferences, chats] = [
			fetch("http://localhost:8000/messages"),
			fetch("http://localhost:8000/messages"),
			fetch("http://localhost:8000/messages"),
		];
	}, []);
	return (
		<div className="h-screen bg-gray-700">
			<div></div>
		</div>
	);
}

export default App;
