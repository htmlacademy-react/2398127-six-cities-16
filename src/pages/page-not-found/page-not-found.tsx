import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Logo from '../../components/logo/logo.tsx';

function PageNotFound() :JSX.Element {
  return (
    <section>
      <Helmet>
        <title>6 cities — 404 Not Found</title>
      </Helmet>
      <header>
        <Logo />
      </header>
      <section>
        <h1>Ошибка 404. Страница не найдена</h1>
        <Link to="/">Вернуться на главную страницу</Link>
      </section>
    </section>
  );
}

export default PageNotFound;
