import { useEffect, useMemo, useRef, useState } from "react";
import Layout from "./Layout";
import Main from "./Main";
import Messages from "./Messages";
import Roster from "./Roster";
import UserSection from "./UserSection";

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

export default Chat;
