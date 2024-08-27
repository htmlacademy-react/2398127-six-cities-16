import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import OfferPage from '../../pages/offer-page/offer-page';
import Favorites from '../../pages/favorites/favorites';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import { useState } from 'react';
import { store } from '../../store/index.ts';
import { useAppSelector } from '../hooks/index.ts';
import HistoryRouter from '../history-route/history-route.tsx';
import browserHistory from '../../browser-history.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const [activeCard, setActiveCard] = useState({id: '0'});
  const [selectedCard, setSelectedCard] = useState<Offer | undefined>(undefined);
  const offers = store.getState().offers;
  const cardClickHandler = (id: string) => {
    setActiveCard({
      ...activeCard,
      id: id
    });
  };
  const cardHoverHandler = (offerElement: Offer) => {
    const currentPoint = offerElement;
    setSelectedCard(currentPoint);
  };

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <Main
                cardClickHandler={cardClickHandler}
                cardHoverHandler={cardHoverHandler}
                selectedCard={selectedCard}
              />
            }
          />
          <Route
            path={AppRoute.Login}
            element={<Login />}
          />
          <Route
            path={AppRoute.Offer}
          >
            <Route
              path={AppRoute.OfferId}
              element={
                <OfferPage
                  offers={offers}
                  cardHoverHandler={cardHoverHandler}
                  cardClickHandler={cardClickHandler}
                  selectedCard={selectedCard}
                />
              }
            />
          </Route>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={authorizationStatus}
              >
                <Favorites
                  offers={offers}
                  cardClickHandler ={cardClickHandler }
                  cardHoverHandler ={cardHoverHandler}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={<PageNotFound />}
          />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>

  );
}

export default App;
