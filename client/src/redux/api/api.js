import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../components/constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
  }),

  tagTypes: ["User", "Chat", "Message"],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: `chats/getmychat`,
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (name) => ({
        url: `users/searchuser?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    getNotifications: builder.query({
      query: () => ({
        url: `users/notification`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: `users/sendrequest`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: `users/acceptrequest`,
        method: "PUT",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
      keepUnusedDataFor: 0,
    }),

    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chats/chat/${chatId}`;

        if (populate) {
          url += "?populate=true";
        }

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chats/messages/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: `chats/message`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export default api;

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
} = api;
