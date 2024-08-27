import CommentItem from './comments-item.tsx';
import CommentForm from '../comment-form/comment-form.tsx';
import { AuthorizationStatus } from '../../const.ts';
import { useAppSelector } from '../hooks/index.ts';
import { useEffect, useState } from 'react';
import { Comment } from '../../types/comment.ts';
import { store } from '../../store/index.ts';
import { postCommentAction } from '../../store/api-actions.ts';


function CommentList(): JSX.Element {
  const [comments, setComments] = useState<Comment[]>([]);
  const currentComments = useAppSelector((state) => state.comments);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const newComment = useAppSelector((state) => state.newComment);

  useEffect(() => {
    setComments(currentComments);
  }, []);

  const addCommentHandler = (commentInfo: Comment) => {
    store.dispatch(postCommentAction(commentInfo));
    if (newComment) {
      setComments((prevComments) => [...prevComments, newComment]);
    }
  };

  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
      Reviews &middot;
        <span className="reviews__amount">
          { comments.length }
        </span>
      </h2>
      {comments.length ? <CommentItem comments={comments}/> : ''}
      {authorizationStatus === AuthorizationStatus.Auth ? <CommentForm formSubmitHandler={addCommentHandler}/> : ''}
    </section>
  );
}

export default CommentList;
