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
import { useAppDispatch, useAppSelector } from '../../hooks/index.ts';
import { getAuthorizationStatus } from '../../store/user-process/selectors.ts';
import { closeSorting } from '../../store/sorting-process/sorting-process.ts';

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const [activeCard, setActiveCard] = useState<Offer>({} as Offer);
  const [selectedCard, setSelectedCard] = useState<Offer | undefined>(undefined);
  const cardClickHandler = (offer: Offer) => {
    dispatch(closeSorting());
    setActiveCard({
      ...activeCard,
      id: offer.id
    });
  };
  const cardHoverHandler = (offerElement: Offer) => {
    const currentPoint = offerElement;
    setSelectedCard(currentPoint);
  };

  return (
    <HelmetProvider>
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
          path={AppRoute.Favorites}
          element={
            <PrivateRoute
              authorizationStatus={authorizationStatus}
            >
              <Favorites
                cardClickHandler={cardClickHandler}
                cardHoverHandler={cardHoverHandler}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Offer}
        >
          <Route
            path={AppRoute.OfferId}
            element={
              <OfferPage
                cardClickHandler={cardClickHandler}
                cardHoverHandler={cardHoverHandler}
                selectedCard={selectedCard}
              />
            }
          />
        </Route>
        <Route
          path="*"
          element={<PageNotFound />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
