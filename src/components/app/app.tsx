import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import OfferPage from '../../pages/offer-page/offer-page';
import Favorites from '../../pages/favorites/favorites';
import PageNotFound from '../../pages/page-not-found/page-not-found';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { Offer } from '../../types/offer';
import { useState } from 'react';

type AppProps = {
  offers: Offer[];
}

function App({offers}: AppProps): JSX.Element {
  const [activeCard, setActiveCard] = useState({id: '0'});
  const [selectedCard, setSelectedCard] = useState<Offer | undefined>(undefined);
  const cardClickHandler = (id: string) => {
    setActiveCard({
      ...activeCard,
      id: id
    });
  };
  const cardHoverHandler = (offerElement: Offer) => {
    const currentPoint = offers.find((offer) =>
      offer.title === offerElement.title,
    );
    setSelectedCard(currentPoint);
  };

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Root}
            element={
              <Main
                offers={offers}
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
                />
              }
            />
          </Route>
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                authorizationStatus={AuthorizationStatus.Auth}
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
      </BrowserRouter>
    </HelmetProvider>

  );
}

export default App;
