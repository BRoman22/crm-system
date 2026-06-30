import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

const { VITE_API_URL } = import.meta.env;

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_API_URL,
  prepareHeaders: (headers) => {
    headers.set('Accept', 'application/json');
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  const response = await baseQuery(args, api, extraOptions);
  return response;
};

export default customBaseQuery;
