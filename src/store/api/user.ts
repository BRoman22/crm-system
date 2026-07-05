import { createApi } from '@reduxjs/toolkit/query/react';
import customBaseQuery from '../customBaseQuery';
import { ENDPOINTS } from '../../constans';
import type { AuthData, Token, UserRegistration, Profile } from '../../types';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: customBaseQuery,
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
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = userApi;
