import { useEffect } from "react";
import { useGetUserChatsQuery } from "../redux/chats";
import { useGetUserByIdQuery } from "../redux/users";

function UserSection({ userId, setUserId, setChatId }) {
	const { isLoading: userLoading, data: user } = useGetUserByIdQuery(userId);
	const { isLoading: chatsLoading, data: chats } = useGetUserChatsQuery(userId);

	useEffect(() => {
		if (!user) {
			console.log("oops");
		}
		if (user && chats[0]) {
			setChatId(chats[0].id);
		}
	}, [chats]);

	if (userLoading || chatsLoading) return <div>...Loading</div>;

	return (
		<div className="border p-2">
			<h1 className="text-center text-xl font-bold mb-4">Cherni Chat</h1>

			<div className="flex justify-between">
				<div>{user?.name}</div>
				<label htmlFor="user-id">
					user id:{" "}
					<input
						id="user-id"
						className="w-20 bg-slate-600"
						defaultValue={userId}
						onChange={e => {
							setChatId(null);
							setUserId(e.target.value || 0);
						}}
					/>
				</label>
			</div>
		</div>
	);
}

export default UserSection;
