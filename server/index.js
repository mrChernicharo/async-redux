import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(json());
app.use(logger);

function toArray(obj) {
	return Object.values(obj).map(v => v);
}

function logger(req, res, next) {
	const { method, url, headers, body } = req;
	const { origin, referer, accept, host } = headers;
	const log = {
		method,
		url,
		origin,
		referer,
		accept,
		host,
		body,
	};

	console.log({ log });

	next();
}

function patchObject(obj, patch) {
	for (let k in patch) {
		if (typeof patch[k] !== "object") obj[k] = patch[k];
		else patchObject(obj[k], patch[k]);
	}
}

const DB = {
	users: {
		999: {
			id: 999,
			name: "Felipe",
			active: true,
		},
		121: {
			id: 121,
			name: "Rafael",
			active: true,
		},
		122: {
			id: 122,
			name: "Fernando",
			active: true,
		},
		432: {
			id: 432,
			name: "Mari",
			active: true,
		},
		555: {
			id: 432,
			name: "Rebeca",
			active: true,
		},
		444: {
			id: 432,
			name: "Ni",
			active: true,
		},
	},
	preferences: {
		0: {
			userId: 999,
			order: "aToZ",
			displayDensity: "compact",
			notifications: {
				volume: 127,
				mute: false,
			},
		},
		1: {
			userId: 121,
			order: "recent",
			displayDensity: "comfortable",
			notifications: {
				volume: 110,
				mute: false,
			},
		},
		2: {
			userId: 122,
			order: "aToZ",
			displayDensity: "comfortable",
			notifications: {
				volume: 127,
				mute: true,
			},
		},
		3: {
			userId: 432,
			order: "recent",
			displayDensity: "compact",
			notifications: {
				volume: 90,
				mute: false,
			},
		},
		4: {
			userId: 555,
			order: "recent",
			displayDensity: "minimal",
			notifications: {
				volume: 120,
				mute: true,
			},
		},
		5: {
			userId: 444,
			order: "aToZ",
			displayDensity: "comfortable",
			notifications: {
				volume: 83,
				mute: false,
			},
		},
	},
	chats: {
		0: {
			id: 0,
			name: "only me",
			participants: [{ id: 999, name: "Felipe" }],
		},
		1: {
			id: 1,
			name: "Mari and I",
			participants: [
				{ id: 999, name: "Felipe" },
				{ id: 432, name: "Mari" },
			],
		},
		2: {
			id: 2,
			name: "Samba group",
			participants: [
				{ id: 999, name: "Felipe" },
				{ id: 121, name: "Rafael" },
				{ id: 432, name: "Mari" },
				{ id: 122, name: "Fernando" },
				{ id: 555, name: "Rebeca" },
			],
		},
		3: {
			id: 3,
			name: "Girls group",
			participants: [
				{ id: 432, name: "Mari" },
				{ id: 555, name: "Rebeca" },
				{ id: 444, name: "Ni" },
			],
		},
	},
	messages: {
		0: {
			id: 0,
			chatId: 0,
			body: "Some Code",
			timestamp: 1_669_866_573_422,
			sender: { id: 999, name: "Felipe" },
		},
		1: {
			id: 1,
			chatId: 1,
			body: "Oi Amor!",
			timestamp: 1669866583422,
			sender: { id: 999, name: "Felipe" },
		},
		2: {
			id: 2,
			chatId: 2,
			body: "Bora agitar um samba essa sexta?",
			timestamp: 1669866593422,
			sender: { id: 121, name: "Rafael" },
		},
		3: {
			id: 3,
			chatId: 2,
			body: "Pilho!",
			timestamp: 1669866603422,
			sender: { id: 999, name: "Felipe" },
		},
		4: {
			id: 4,
			chatId: 2,
			body: "Vou levar o pandeiro!",
			timestamp: 1669866613422,
			sender: { id: 122, name: "Fernando" },
		},
		5: {
			id: 5,
			chatId: 1,
			body: "Oi Bichinho! ❤️",
			timestamp: 1669866623422,
			sender: { id: 432, name: "Mari" },
		},
		6: {
			id: 6,
			chatId: 3,
			body: "Quem vai no samba essa esxta?",
			timestamp: 1_669_866_633_422,
			sender: { id: 432, name: "Mari" },
		},
		7: {
			id: 7,
			chatId: 3,
			body: "Eu vou!",
			timestamp: 1_669_866_643_422,
			sender: { id: 444, name: "Ni" },
		},
	},
};

let currPreferencesId = 6;
let currUserId = 1000;
let currChatId = 4;
let currMsgId = 8;

// *********************************** USERS ************************************
// {
// 	id: 999,
// 	name: "Felipe",
// 	active: true,
// 	skills: [
// 		{ name: "JS", pro: true },
// 		{ name: "redux", pro: false },
// 		{ name: "guitar", pro: true },
// 	],
// }
app.get("/users", (req, res) => {
	res.status(200).send(DB.users);
});

app.get("/users/:id", (req, res) => {
	res.status(200).send(DB.users[req.params.id]);
});

app.post("/users", (req, res) => {
	const newUser = {
		id,
		name: req.body.name,
		active: true,
		skills: [],
	};
	const newPreferences = {
		userId,
		order: "aToZ",
		displayDensity: "comfortable",
		notifications: {
			volume: 100,
			mute: false,
		},
	};
	DB.users[currUserId++] = newUser;
	DB.preferences[currPreferencesId++] = newPreferences;

	res.status(200).send(newUser);
});

app.patch("/users/:id", (req, res) => {
	const { id } = req.params;
	const updatedUser = { ...DB.users[id], ...req.body };
	DB.users[id] = { ...updatedUser };

	res.status(200).send({
		user: DB.users[id],
	});
});

app.delete("/users/:id", (req, res) => {
	const deletedUser = DB.users[req.params.id];
	delete DB.users[req.params.id];

	res.status(200).send({ deletedUser });
});

// *********************************** PREFERENCES ************************************
// {
// 	userId: 999,
// 	order: "aToZ",
// 	displayDensity: "compact",
// 	notifications: {
// 		volume: 110,
// 		mute: false,
// 	},
// },
app.get("/preferences", (req, res) => {
	res.status(200).send(DB.preferences);
});

app.get("/preferences/:id", (req, res) => {
	res.status(200).send(DB.preferences[req.params.id]);
});

app.patch("/preferences/:id", (req, res) => {
	const { id } = req.params;

	patchObject(DB.preferences[id], req.body);

	res.status(200).send({
		preferences: DB.preferences[id],
	});
});

// *********************************** CHATS ************************************
// {
// 	id: 1,
// 	name: "Mari and I",
// 	participants: [
// 		{ id: 999, name: "Felipe" },
// 		{ id: 432, name: "Mari" },
// 	],
// },
app.get("/chats", (req, res) => {
	res.status(200).send(DB.chats);
});

app.get("/chats/:id", (req, res) => {
	res.status(200).send(DB.chats[req.params.id]);
});

app.get("/user-chats/:userId", (req, res) => {
	const userChats = toArray(DB.chats).filter(c =>
		c.participants.find(p => p.id === +req.params.userId)
	);

	console.log({ userChats, chats: DB.chats, arrayChats: toArray(DB.chats) });

	res.status(200).send(userChats);
});

app.post("/chats", (req, res) => {
	const id = currChatId++;
	const { userId } = req.body;

	const newChat = {
		userId,
		order: "aToZ",
		displayDensity: "comfortable",
		notifications: {
			volume: 100,
			mute: false,
		},
	};

	DB.chats[id] = newChat;
	res.status(200).send(newChat);
});

app.patch("/chats/:id", (req, res) => {
	const { id } = req.params;
	const updatedChat = { ...DB.chats[id], ...req.body };
	DB.chats[id] = { ...updatedChat };

	res.status(200).send({
		user: DB.chats[id],
	});
});

app.delete("/chats/:id", (req, res) => {
	const deletedUser = DB.chats[req.params.id];
	delete DB.chats[req.params.id];

	res.status(200).send({ deletedUser });
});

// *********************************** MESSAGES ************************************
// {
// 	id: 6,
// 	chatId: 3,
// 	body: "Eu vou!",
// 	timestamp: 1_669_866_643_422,
// 	sender: { id: 444, name: "Ni" },
// },
app.get("/messages", (req, res) => {
	// res.status(200).send(DB.messages);
	const messages = toArray(DB.messages);

	res.status(200).send({ messages });
});

app.get("/messages/:id", (req, res) => {
	res.status(200).send(DB.messages[req.params.id]);
});

app.get("/user-messages/:userId", (req, res) => {
	const messages = toArray(DB.messages).filter(m => m.sender.id === +req.params.userId);

	res.status(200).send({ messages });
});

app.get("/chat-messages/:chatId", (req, res) => {
	const messages = toArray(DB.messages).filter(m => m.chatId === +req.params.chatId);

	res.status(200).send(messages);
});

app.post("/messages/:senderId", (req, res) => {
	console.log(req.body);
	const { senderId } = req.params;
	const { chatId, body } = req.body;
	const sender = DB.users[senderId];

	const newMessage = {
		id: currMsgId++,
		chatId,
		body,
		timestamp: Date.now(),
		sender: {
			id: senderId,
			name: sender.name,
		},
	};

	DB.messages[newMessage.id] = newMessage;

	res.status(200).send(newMessage);
});

app.patch("/messages/:id", (req, res) => {
	const { id } = req.params;

	const updatedMessage = { ...DB.messages[id], ...req.body };

	DB.messages[id] = { ...updatedMessage };

	res.status(200).send({
		updatedMessage,
	});
});

app.delete("/messages/:id", (req, res) => {
	const { id } = req.params;

	const deletedMessage = DB.messages[id];

	delete DB.messages[id];

	res.status(203).send({
		deletedMessage,
	});
});

app.listen(8000, () => {
	console.log("listening on port 8000");
});
