import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { ENDPOINTS } from '../../constans';
import type { AdminMetaResponse, Profile, UserFilters } from '../../types';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['admin'],
  endpoints: (builder) => ({
    getUsers: builder.query<AdminMetaResponse<Profile>, UserFilters>({
      query: (query) => ({
        url: ENDPOINTS.USERS,
        params: query,
      }),
    }),
  }),
});

export const { useGetUsersQuery } = adminApi;
