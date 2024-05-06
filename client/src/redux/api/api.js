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

    getMyGroups: builder.query({
      query: () => ({
        url: `chats/getmygroups`,
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    availableFriends: builder.query({
      query: (chatId) => {
        let url = `users/friends`;
        if (chatId) url += `?chatId=${chatId}`;
        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["User"],
    }),

    createNewGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: `chats/new`,
        method: "POST",
        body: { name, members },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
      keepUnusedDataFor: 0,
    }),

    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `chats/chat/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
      keepUnusedDataFor: 0,
    }),

    renameGroup: builder.mutation({
      query: ({ id, name }) => ({
        url: `chats/chat/${id}`,
        method: "PUT",
        body: { name },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
      keepUnusedDataFor: 0,
    }),

    removeMemberFromGroup: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `chats/delete`,
        method: "DELETE",
        credentials: "include",
        body: { chatId, userId },
      }),
      invalidatesTags: ["Chat"],
      keepUnusedDataFor: 0,
    }),

    addMemberToGroup: builder.mutation({
      query: ({ chatId, members }) => ({
        url: `chats/addmembers`,
        method: "PUT",
        credentials: "include", // Send cookies
        body: { chatId, members },
      }),
      invalidatesTags: ["Chat"],
    }),

    leaveGroup: builder.mutation({
      query: (id) => ({
        url: `chats/leave/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    makeGroupAdmin: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `chats/makeGroupAdmin`,
        method: "PUT",
        credentials: "include",
        body: { userId, chatId },
      }),
      invalidatesTags: ["Chat"],
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
  useGetMyGroupsQuery,
  useAvailableFriendsQuery,
  useCreateNewGroupMutation,
  useDeleteGroupMutation,
  useRenameGroupMutation,
  useRemoveMemberFromGroupMutation,
  useAddMemberToGroupMutation,
  useLeaveGroupMutation,
  useMakeGroupAdminMutation,
} = api;
