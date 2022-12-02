import { useGetUserByIdQuery } from "../redux/users";

function UserSection({ userId, setUserId, setChatId }) {
	const { isLoading: userLoading, data: user } = useGetUserByIdQuery(userId);

	if (userLoading) return <div>...Loading</div>;

	return (
		<div className="border h-[200px]">
			<h1 className="text-right">Cherni Chat</h1>

			<label htmlFor="user-id">User id</label>
			<input
				id="user-id"
				className="w-20 bg-slate-600"
				defaultValue={userId}
				onChange={e => {
					setChatId(null);
					setUserId(e.target.value || 0);
				}}
			/>
			<pre>{userId && JSON.stringify(user, null, 2)}</pre>
		</div>
	);
}

export default UserSection;
