import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    notificationCount: 0,
    NewMessageAlert: [
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
      const { chatId } = action.payload;
      const index = state.NewMessageAlert.findIndex(
        (item) => item.chatId === chatId
      );

      if (index !== -1) {
        state.NewMessageAlert[index].count += 1;
      } else {
        state.NewMessageAlert.push({
          chatId,
          count: 1,
        });
      }
    },
  },
});

export default chatSlice;
export const {
  incrementNotificationCount,
  decrementNotificationCount,
  resetNotificationCount,
  setNewMessageAlert,
} = chatSlice.actions;
