import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';

enum Setting {
  OffersCount = 3,
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      offersCount = {Setting.OffersCount}
    />
  </React.StrictMode>
);
