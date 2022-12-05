import { createSlice } from '@reduxjs/toolkit';

const appStateSlice = createSlice({
	name: 'appState',
	initialState: { userId: 999, chatId: 0 },
	reducers: {
		setUserId: (state, { payload }) => {
			state.userId = payload;
		},
		setChatId: (state, { payload }) => {
			state.chatId = payload;
		},
	},
});

export const { setUserId, setChatId } = appStateSlice.actions;

export default appStateSlice.reducer;
