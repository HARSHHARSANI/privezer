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
  }),
});

export default api;

export const { useMyChatsQuery, useLazySearchUserQuery } = api;
