import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from '../baseQueryWithReauth';
import { ENDPOINTS } from '../../constans';
import type { AdminMetaResponse, Profile, ProfileRequest, Role, UserFilters } from '../../types';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUsers: builder.query<AdminMetaResponse<Profile>, UserFilters>({
      query: (query) => ({
        url: ENDPOINTS.USERS,
        params: {
          ...query,
          // рассинхрон фронта с бэком, то что на фронте страница 1, на бэке 0
          page: query.page !== undefined ? query.page - 1 : undefined,
        },
      }),
      providesTags: (result) => {
        if (result && Array.isArray(result.data) && result.data.length > 0) {
          return [
            ...result.data.map(({ id }) => ({ type: 'User' as const, id })),
            { type: 'User' as const, id: 'LIST' },
          ];
        }
        return [{ type: 'User' as const, id: 'LIST' }];
      },
    }),
    getUserById: builder.query<Profile, number>({
      query: (id) => ({
        url: `${ENDPOINTS.USERS}/${id}`,
      }),
      providesTags: (_result, _error, id) => [{ type: 'User' as const, id }],
    }),
    updateUser: builder.mutation<Profile, { id: number; body: ProfileRequest }>({
      query: ({ id, body }) => ({
        url: `${ENDPOINTS.USERS}/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User' as const, id }],
    }),
    deleteUser: builder.mutation<void, number>({
      query: (id) => ({
        url: `${ENDPOINTS.USERS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: 'User' as const, id },
        { type: 'User' as const, id: 'LIST' },
      ],
    }),
    blockUser: builder.mutation<Profile, { id: number }>({
      query: ({ id }) => ({
        url: `${ENDPOINTS.USERS}/${id}/block`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User' as const, id },
        { type: 'User' as const, id: 'LIST' },
      ],
    }),
    unblockUser: builder.mutation<Profile, { id: number }>({
      query: ({ id }) => ({
        url: `${ENDPOINTS.USERS}/${id}/unblock`,
        method: 'POST',
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'User' as const, id },
        { type: 'User' as const, id: 'LIST' },
      ],
    }),
    changeRole: builder.mutation<Profile, { id: number; roles: Role[] }>({
      query: ({ id, roles }) => ({
        url: `${ENDPOINTS.USERS}/${id}/rights`,
        method: 'POST',
        body: { roles },
      }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'User' as const, id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
  useChangeRoleMutation,
} = adminApi;
