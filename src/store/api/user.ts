import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { ENDPOINTS } from '../../constans';
import type { AuthData, Token, UserRegistration, Profile } from '../../types';
import { logout, setCredentials } from '../slices/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseQueryWithReauth,
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
        } catch (error) {
          console.error('Login error:', error);
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
  }),
});

export const { useSignUpMutation, useSignInMutation, useLogoutMutation } = userApi;
