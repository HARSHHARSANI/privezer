import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    notificationCount: 0,
    newMessageAlert: [
      {
        chatId: "",
        count: 0,
      },
    ],
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

    setNewMessageAlert: (state, action) => {
      const chatId = action.payload.chatId;

      const index = state.newMessageAlert.findIndex(
        (item) => item.chatId === chatId
      );

      if (index !== -1) {
        state.newMessageAlert[index].count += 1;
      } else {
        state.newMessageAlert.push({
          chatId,
          count: 1,
        });
      }
    },

    removeNewMessageAlert: (state, action) => {
      state.newMessageAlert = state.newMessageAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  incrementNotificationCount,
  decrementNotificationCount,
  resetNotificationCount,
  setNewMessageAlert,
  removeNewMessageAlert,
} = chatSlice.actions;
