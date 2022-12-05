import { useEffect, useMemo, useRef, useState } from "react";
import Messages from "./Messages";
import Roster from "./Roster";
import UserSection from "./UserSection";

function Chat() {
	const [userId, setUserId] = useState(999);
	const [chatId, setChatId] = useState(0);

	return (
		<div className="grid grid-cols-6 h-screen">
			<div className="border col-start-1 col-end-3">
				<div className="">
					<UserSection
						userId={userId}
						setUserId={v => setUserId(v)}
						setChatId={v => setChatId(v)}
					/>
				</div>
				<Roster userId={userId} chatId={chatId} setChatId={v => setChatId(v)} />
			</div>
			<div className="border col-start-3 col-end-7 grow h-screen">
				<Messages userId={userId} chatId={chatId} />
			</div>
		</div>
	);
}

export default Chat;
