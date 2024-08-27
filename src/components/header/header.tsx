import { Link } from 'react-router-dom';
import { store } from '../../store';
import { logoutAction } from '../../store/api-actions';
import Logo from '../logo/logo';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../components/hooks';


function Header(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();
  const favoriteOffers = useAppSelector((state) => state.favoriteOffers);
  const userData = store.getState().user;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {
                authorizationStatus === AuthorizationStatus.Auth
                  ? (
                    <>
                      <li className="header__nav-item user">
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                          <div className="header__avatar-wrapper user__avatar-wrapper">
                          </div>
                          <span className="header__user-name user__name">{userData?.email}</span>
                          <span className="header__favorite-count">{favoriteOffers.length}</span>
                        </Link>
                      </li>
                      <li className="header__nav-item">
                        <Link
                          className="header__nav-link"
                          to={AppRoute.Login}
                          onClick={(evt) => {
                            evt.preventDefault();
                            dispatch(logoutAction());
                          }}
                        >
                          <span className="header__signout">Sign out</span>
                        </Link>
                      </li>
                    </>
                  )
                  : (
                    <li className="header__nav-item">
                      <Link
                        className="header__nav-link"
                        to={AppRoute.Login}
                      >
                        <span className="header__signout">Sign in</span>
                      </Link>
                    </li>
                  )
              }
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
