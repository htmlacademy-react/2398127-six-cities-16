import { useEffect, useState } from 'react';
import { AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../../hooks/index.ts';
import CommentForm from '../comment-form/comment-form.tsx';
import CommentsList from './comments-list.tsx';
import { Comment, NewComment } from '../../types/comment.ts';
import { store } from '../../store/index.ts';
import { postCommentAction } from '../../store/api-actions.ts';
import { convertToComment } from '../../utils.ts';
import { getComments } from '../../store/comments-data/selectors.ts';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';

function Comments(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const [comments, setComments] = useState<Comment[]>([]);
  const currentComments = useAppSelector(getComments);

  useEffect(() => {
    setComments(currentComments);
  }, [currentComments]);

  const addCommentHandler = async (commentData: NewComment) => {
    const {payload} = await store.dispatch(postCommentAction(commentData));
    if (payload) {
      const newComment = convertToComment(payload);
      if (newComment) {
        setComments((prevComments) => [...prevComments, newComment]);
      }
    }
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;
        <span className="reviews__amount">
          { comments?.length }
        </span>
      </h2>
      {comments?.length ? <CommentsList comments={comments}/> : ''}
      {authorizationStatus === AuthorizationStatus.Auth ? <CommentForm formSubmitHandler={addCommentHandler}/> : ''}
    </section>
  );
}

export default Comments;
