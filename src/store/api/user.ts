import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { ENDPOINTS } from '../../constans';
import type { AuthData, Token, UserRegistration, Profile } from '../../types';
import { logout, setCredentials, setUser, setAuthChecking } from '../slices/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['user'],
  endpoints: (build) => ({
    signUp: build.mutation<Profile, UserRegistration>({
      query: (body) => ({
        url: ENDPOINTS.SIGNUP,
        method: 'POST',
        body,
      }),
    }),
    signIn: build.mutation<Token, AuthData>({
      query: (body) => ({
        url: ENDPOINTS.SIGNIN,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            setCredentials({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
            })
          );

          const { data: profile } = await dispatch(
            userApi.endpoints.getProfile.initiate(undefined)
          );

          if (profile) {
            dispatch(setUser(profile));
          }
        } catch {
          dispatch(logout());
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: ENDPOINTS.LOGOUT,
        method: 'POST',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } finally {
          dispatch(logout());
        }
      },
    }),
    refresh: build.mutation<Token, { refreshToken: string }>({
      query: (body) => ({
        url: ENDPOINTS.REFRESH,
        method: 'POST',
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        dispatch(setAuthChecking());
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));

          const { data: profile } = await dispatch(
            userApi.endpoints.getProfile.initiate(undefined)
          );

          if (profile) {
            dispatch(setUser(profile));
          }
        } catch {
          dispatch(logout());
        }
      },
    }),
    getProfile: build.query<Profile, void>({
      query: () => ENDPOINTS.PROFILE,
      providesTags: ['user'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    updateProfile: build.mutation<Profile, Pick<Profile, 'email' | 'phoneNumber' | 'username'>>({
      query: (body) => ({
        url: ENDPOINTS.PROFILE,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['user'],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    changePassword: build.mutation<void, string>({
      query: (body) => ({
        url: ENDPOINTS.RESET_PASSWORD,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useLogoutMutation,
  useRefreshMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} = userApi;
