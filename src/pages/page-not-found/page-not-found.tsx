import { Link } from 'react-router-dom';
import {AppRoute} from '../../const';
import { Helmet } from 'react-helmet-async';

function PageNotFound() :JSX.Element {
  return (
    <div>
      <Helmet>
        <title>6 cities — 404 Not Found</title>
      </Helmet>
      <h1>Страница не найдена</h1>
      <Link to={AppRoute.Root}>Вернуться на главную страницу</Link>
    </div>
  );
}

export default PageNotFound;
