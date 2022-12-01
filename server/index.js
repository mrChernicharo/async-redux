import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());
app.use(logger);

function toArray(obj) {
	return Object.entries(obj).map(v => v);
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

const DB = {
	users: {
		9876: {
			id: 9876,
			name: 'Felipe',
			active: true,
			skills: [
				{ name: 'JS', pro: true },
				{ name: 'redux', pro: false },
				{ name: 'guitar', pro: true },
			],
		},
		121: {
			id: 121,
			name: 'Rafael',
			active: true,
			skills: [
				{ name: 'Cavaco', pro: false },
				{ name: 'Python', pro: true },
				{ name: 'R', pro: true },
			],
		},
		122: {
			id: 122,
			name: 'Fernando',
			active: true,
			skills: [
				{ name: 'Python', pro: true },
				{ name: 'markdown', pro: false },
				{ name: 'PowerBI', pro: true },
				{ name: 'volei', pro: false },
			],
		},
		1234: {
			id: 1234,
			name: 'Mari',
			active: true,
			skills: [
				{ name: 'Excel', pro: true },
				{ name: 'Powerpoint', pro: true },
				{ name: 'volei', pro: false },
			],
		},
		555: {
			id: 1234,
			name: 'Rebeca',
			active: true,
			skills: [
				{ name: 'Python', pro: true },
				{ name: 'Excel', pro: true },
			],
		},
	},
	preferences: {
		order: 'aToZ',
		displayDensity: 'comfortable',
	},
	chats: {
		1: {
			id: 1,
			name: 'only me',
			participants: [{ id: 9876, name: 'Felipe' }],
		},
		2: {
			id: 2,
			name: 'Mari',
			participants: [
				{ id: 9876, name: 'Felipe' },
				{ id: 1234, name: 'Mari' },
			],
		},
		3: {
			id: 3,
			name: 'Samba',
			participants: [
				{ id: 9876, name: 'Felipe' },
				{ id: 121, name: 'Rafael' },
				{ id: 1234, name: 'Mari' },
				{ id: 122, name: 'Fernando' },
				{ id: 555, name: 'Rebeca' },
			],
		},
	},
	messages: {
		0: {
			id: 0,
			chatId: 1,
			body: 'Some Code',
			timestamp: 1_669_866_573_422,
			sender: { id: 9876, name: 'Felipe' },
		},
		1: {
			id: 1,
			chatId: 2,
			body: 'Oi Amor!',
			timestamp: 1669866583422,
			sender: { id: 9876, name: 'Felipe' },
		},
		2: {
			id: 2,
			chatId: 3,
			body: 'Bora agitar um samba essa sexta?',
			timestamp: 1669866593422,
			sender: { id: 121, name: 'Rafael' },
		},
		3: {
			id: 3,
			chatId: 2,
			body: 'Pilho!',
			timestamp: 1669866603422,
			sender: { id: 9876, name: 'Felipe' },
		},
		4: {
			id: 4,
			chatId: 2,
			body: 'Vou levar o pandeiro!',
			timestamp: 1669866613422,
			sender: { id: 122, name: 'Fernando' },
		},
		5: {
			id: 5,
			chatId: 2,
			body: 'Oi Bichinho! ❤️',
			timestamp: 1669866623422,
			sender: { id: 1234, name: 'Mari' },
		},
	},
};

let currMsgId = 6;
let currUserId = 9877;

// ******* USERS ********
app.get('/users', (req, res) => {
	res.status(200).send(DB.users);
});

app.get('/users/:id', (req, res) => {
	res.status(200).send(DB.users[req.params.id]);
});

app.post('/users', (req, res) => {
	const id = currUserId++;

	const newUser = {
		id,
		name: req.body.name,
		active: true,
		skills: [],
	};
	DB.users[id] = newUser;
	res.status(200).send(newUser);
});

app.patch('/users/:id', (req, res) => {
	const { id } = req.params;
	const updatedUser = { ...DB.users[id], ...req.body };
	DB.users[id] = { ...updatedUser };

	res.status(200).send({
		user: DB.users[id],
	});
});

app.delete('/users/:id', (req, res) => {
	const deletedUser = DB.users[req.params.id];
	delete DB.users[req.params.id];

	res.status(200).send({ deletedUser });
});

// ******* CHATS ********
app.get('/chats', (req, res) => {
	res.status(200).send(DB.chats);
});

// ******* MESSAGES ********
app.get('/messages', (req, res) => {
	// res.status(200).send(DB.messages);
	const messages = toArray(DB.messages);

	res.status(200).send({ messages });
});

app.post('/message', (req, res) => {
	console.log(req.body);
});

app.listen(8000, () => {
	console.log('listening on port 8000');
});
