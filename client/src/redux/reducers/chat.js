import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    notificationCount: 0,
  },
  reducers: {
    incrementNotificationCount: (state) => {
      state.notificationCount += 1;
    },

    decrementNotificationCount: (state) => {
      state.notificationCount -= 1;
    },

    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
  },
});

export default chatSlice;
export const {
  incrementNotificationCount,
  decrementNotificationCount,
  resetNotificationCount,
} = chatSlice.actions;
