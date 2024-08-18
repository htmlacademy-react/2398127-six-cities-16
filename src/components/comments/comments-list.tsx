import { Offer } from '../../types/offer.ts';
import { Comment } from '../../types/comment.tsx';
import { comments } from '../../mocks/comments.ts';
import CommentItem from './comments-item.tsx';
import CommentForm from '../comment-form/comment-form.tsx';
type CommentListProps = {
  offer: Offer;
}

function CommentList({offer}: CommentListProps): JSX.Element {
  const relatedComments: Comment[] = comments.filter((comment) => comment.id === offer.id);
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
      Reviews &middot;
        <span className="reviews__amount">
          {relatedComments.length}
        </span>
      </h2>
      {relatedComments.length ? <CommentItem comments={relatedComments}/> : ''}
      <CommentForm />
    </section>
  );
}

export default CommentList;
