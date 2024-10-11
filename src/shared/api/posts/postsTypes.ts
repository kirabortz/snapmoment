import { AnswerItems, Avatar, Item, UserFollowingFollowersProps } from '@/shared/api/public/publicTypes';

export type GetAnswersWithPaginationArgs = {
  commentId: number;
  pageNumber?: number;
  pageSize?: number;
  postId: number;
  sortBy?: string;
  sortDirection?: string;
};
export type GetAnswersWithPaginationResponse = {
  items?: AnswerItems[];
  pageSize: number;
  totalCount: number;
};

export type GetPostLikesArgs = {
  cursor?: number;
  pageNumber?: number;
  pageSize?: number;
  postId: null | number;
  search?: string;
};

export interface GetPostsByUserNameArgs {
  pageNumber?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: string;
  userName: string;
}

export interface UpdateUserPostArgs {
  description: string;
  postId: number;
}

export interface DeleteUsersImagePostArgs {
  uploadId: string;
}

export interface DeleteUsersPostArgs {
  postId: number;
}

export interface GetPostsByUserNameResponse {
  items?: Item[];
  pageSize: number;
  totalCount: number;
}
export type GetPostLikesResponse = {
  items?: UserFollowingFollowersProps[];
  pageSize: number;
  totalCount: number;
};

export type UpdateLikePostArgs = {
  likeStatus: LikeStatusProps;
  postId: number;
};
export type CreatePostCommentArgs = {
  content: string;
  postId: number;
};
export type CreatePostCommentResponse = {
  answerCount: number;
  content: string;
  createdAt: string;
  from: From;
  id: number;
  isLiked: boolean;
  likeCount: number;
  postId: number;
};

export type From = {
  avatars: Avatar[];
  id: number;
  username: string;
};
export type LikeStatusProps = 'DISLIKE' | 'LIKE' | 'NONE';
