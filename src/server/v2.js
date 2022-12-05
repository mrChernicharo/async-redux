// ************ JSON File DB ************ //
import fs from "node:fs/promises";
import { app } from "./index";

async function DBRead() {
	const StringDB = await fs.readFile("../assets/db.json", { encoding: "utf-8" });
	return JSON.parse(StringDB);
}

async function DBWrite(data) {
	await fs.writeFile("../assets/db.json", JSON.stringify(data));
}

app.get("/test", async (req, res) => {
	const db = await DBRead();
	// res.status(200).send(db);
	res.status(200).send(db);
});

app.post("/test", async (req, res) => {
	// const { senderId } = req.params;
	const { chatId, body } = req.body;
	// const sender = DB.users[senderId];
	const db = await DBRead();

	const newMessage = {
		id: db.messages.length,
		chatId,
		body,
		timestamp: Date.now(),
		sender: {
			// id: senderId,
			id: 999,
			name: "Felipe",
		},
	};

	db.messages[newMessage.id] = newMessage;

	DBWrite(db);

	res.status(200).send(newMessage);
});
