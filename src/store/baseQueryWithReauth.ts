import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from '.';
import { logout, setCredentials } from './slices/user';
import type { Token } from '../types';
import { ENDPOINTS } from '../constans';

const { VITE_API_URL } = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    headers.set('Accept', 'application/json');

    const token = (getState() as RootState).user.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   const response = await baseQuery(args, api, extraOptions);
//   return response;
// };

// export default customBaseQuery;

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);

  const error = result.error as FetchBaseQueryError;

  if (error && error.status === 'PARSING_ERROR' && error.originalStatus === 401) {
    const state = api.getState() as RootState;
    const refreshToken = state.user.refreshToken;

    if (refreshToken) {
      try {
        const refreshResult = await baseQuery(
          {
            url: ENDPOINTS.REFRESH,
            method: 'POST',
            body: { refreshToken },
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          api.dispatch(setCredentials(refreshResult.data as Token));

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } catch (error) {
        console.error(error);
        api.dispatch(logout());
      }
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export default baseQueryWithReauth;
