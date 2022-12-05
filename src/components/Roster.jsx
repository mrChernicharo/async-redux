import { useEffect, useMemo, useRef, useState } from "react";
import { useGetUserChatsQuery } from "../redux/chats";

function Roster({ userId, chatId, setChatId }) {
	const { isLoading: chatsLoading, data: chats } = useGetUserChatsQuery(userId);

	const currChat = useMemo(() => {
		return (chats && chats.find(c => c.id === chatId)) || [];
	}, [chatId]);

	if (chatsLoading) return <div>...Loading Chats</div>;

	return (
		<ul className="col-start-1 col-end-3">
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

export default Roster;
