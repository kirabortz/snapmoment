import { baseQueryWithReauth } from '@/shared/api/common/snapmomentBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

export const snapmomentAPI = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Me', 'UserProfile', 'MainPhotoProfile', 'PersonalInformation', 'publicPost', 'publicPostLikes']
});

export const { getRunningQueriesThunk } = snapmomentAPI.util;
