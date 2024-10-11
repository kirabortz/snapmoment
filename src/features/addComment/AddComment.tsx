import { useRef } from 'react';

import { Input, Typography } from '@/shared/ui';

import s from './AddComment.module.scss';

type Props = {
  createPostComment: (content: string) => Promise<void>;
};

export const AddComment = ({ createPostComment }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const addCommentHandler = () => {
    if (inputRef && inputRef.current) {
      createPostComment(inputRef.current?.value?.trim());
      // как-то надо чистить значение инпута (((
    }
  };

  return (
    <div className={s.createComment}>
      <Input className={s.text} placeholder={'Add a Comment...'} ref={inputRef} type={'text'} />

      <Typography as={'button'} className={s.publishBtn} onClick={addCommentHandler} variant={'h3'}>
        Publish
      </Typography>
    </div>
  );
};
