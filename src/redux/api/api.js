//REDUX TOOLKIT QUERY TO HANDLE DATA FETCHING AND API INTEGRATION IN APPLICATION.. IT SIMPLIFIES ASYNCHRONOUS DATA FETCHING AND STATE MANAGEMENT ...

//QUERY IS USED WHEN FETCHING DATA FROM THE SERVER  WHEN YOU WANT TO RETRIVE DATA FROM THE SERVER ..
//MUTATION IS USED FOR MODIFYING DATA ON THE SERVER .. WHEN YOU WANT TO CREATE UPDATE OR DELETE DATA ON SERVER

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; //import necessary function from redux..
import { server } from "../../constants/config";

//api configurations .. it creates API using createApi function this function takes an object with configuration options
const api = createApi({
  reducerPath: "api", //it specifies where the reducer for this api will be mounted in the redux store ..
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }), // its a function provided by fetchBaseQuery that performs HTTP requests you pass to the base URL for your api
  tagTypes: ["Chat", "User", "Message"], //an optional parameter to enable caching and invalidation of query data..

  //in context of redux toolkit query builder refers to an object that provides methods for defining endpoints for your API when you call builder.query...builder.mutation or builder.query
  endpoints: (builder) => ({
    //inside the endpoints object there are endpoints defined for different API operations
    myChats: builder.query({
      //fetched the data related to chat
      query: () => ({
        url: "chat/my",
        credentials: "include", //specifies that browser cookies should be sent with the request...
      }),
      providesTags: ["Chat"], // specifies that this query provides data of type CHAT
    }),

    //to search for the user
    searchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    //sending friend request making
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/sendrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    //api to get notifications
    getNotifications: builder.query({
      query: () => ({
        url: "user/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    //api to accept friend request
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "user/acceptrequest",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    //get chat id
    chatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) url += "?populate=true";

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    //retrieve messages from backend
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "chat/message",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),

    myGroups: builder.query({
      query: () => ({
        url: "chat/my/groups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    //get my friend
    availableFriends: builder.query({
      query: (chatId) => {
        let url = `user/friends`;
        if (chatId) url += `?chatId=${chatId}`;

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    //create new group
    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: "chat/new",
        method: "POST",
        credentials: "include",
        body: { name, members },
      }),
      invalidatesTags: ["Chat"],
    }),
    //rename the group
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `chat/${chatId}`,
        method: "PUT",
        credentials: "include",
        body: { name },
      }),
      invalidatesTags: ["Chat"],
    }),
    //remove or delete group members
    removeGroupMember: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: `chat/removemember`,
        method: "PUT",
        credentials: "include",
        body: { chatId, userId },
      }),
      invalidatesTags: ["Chat"],
    }),
    //add group members
    addGroupMembers: builder.mutation({
      query: ({ members, chatId }) => ({
        url: `chat/addmembers`,
        method: "PUT",
        credentials: "include",
        body: { members, chatId },
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export default api;
//the use prefix is a common convention used in react and other libraries like redux toolkit query to indicate that a function or hook is intended to be used within a component or another hook...
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
  useMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
} = api;

//  invalidateTags: ["Chat"], // specifies that if any data of type CHAT changes it should invalidate this query cache..
