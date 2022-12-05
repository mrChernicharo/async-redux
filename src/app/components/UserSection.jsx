import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatId, setUserId } from "../redux/appState";
import { useGetUserChatsQuery } from "../redux/chats";
import { useGetUserByIdQuery } from "../redux/users";

function UserSection() {
	const dispatch = useDispatch();

	const userId = useSelector(state => state.appState.userId);

	const { isLoading: userLoading, data: user } = useGetUserByIdQuery(userId);
	const { isLoading: chatsLoading, data: chats } = useGetUserChatsQuery(userId);

	useEffect(() => {
		if (user && chats[0]) {
			dispatch(setChatId(chats[0].id));
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
							dispatch(setChatId(null));
							dispatch(setUserId(e.target.value || 0));
						}}
					/>
				</label>
			</div>
		</div>
	);
}

export default UserSection;
