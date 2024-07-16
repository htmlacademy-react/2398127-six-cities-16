import { Link } from 'react-router-dom';
import {AppRoute} from '../../const';

function PageNotFound() :JSX.Element {
  return (
    <div>
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Root}>Вернуться на главную страницу</Link>
    </div>
  );
}

export default PageNotFound;
