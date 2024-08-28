import { Comment } from '../../types/comment.ts';
import CommentsItem from './comments-item.tsx';

type CommentsProps = {
  comments: Comment[];
}

function CommentsList({comments}: CommentsProps): JSX.Element {
  return (
    <ul className="reviews__list">
      {
        comments.map((comment) =>
          <CommentsItem comment={comment} key={comment.id + comment.user.name}/>
        )
      }
    </ul>
  );
}

export default CommentsList;
