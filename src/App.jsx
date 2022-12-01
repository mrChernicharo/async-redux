import { useEffect } from "react";

function App() {
	useEffect(() => {
		fetch("http://localhost:8000").then(r => console.log(r));
	}, []);
	return (
		<div className="h-screen bg-gray-700">
			<h1 className="text-white">React Redux</h1>
		</div>
	);
}

export default App;
