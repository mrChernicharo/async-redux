import { useEffect, useMemo, useRef, useState } from 'react';
import Messages from './Messages';
import Roster from './Roster';
import UserSection from './UserSection';

function Chat() {
	return (
		<div className="grid grid-cols-6 h-screen">
			<div className="border col-start-1 col-end-3">
				<UserSection />
				<Roster />
			</div>
			<div className="border col-start-3 col-end-7 grow h-screen">
				<Messages />
			</div>
		</div>
	);
}

export default Chat;
