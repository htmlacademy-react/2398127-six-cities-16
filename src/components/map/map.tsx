import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { City, Offer } from '../../types/offer';
import useMap from '../../hooks/use-map';
import { UrlMapMarkers } from '../../const';
import {Marker, layerGroup, Icon, LatLng} from 'leaflet';

type MapProps = {
  city: City;
  points: Offer[];
  selectedCard: Offer | undefined;
}

function Map({city, points, selectedCard}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const markers: Marker[] = [];
  const defaultCustomIcon = new Icon({
    iconUrl: UrlMapMarkers.URL_MARKER_DEFAULT,
  });

  const currentCustomIcon = new Icon({
    iconUrl: UrlMapMarkers.URL_MARKER_CURRENT,
  });

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom);

      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedCard !== undefined && point.id === selectedCard.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(map);

        markers.push(marker);
      });


      return () => {
        map.removeLayer(markerLayer);
        markers.forEach((marker) => {
          marker.remove();
        });
        map.setView(new LatLng(city.location.latitude, city.location.longitude), city.location.zoom);
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city, points, selectedCard, map]);

  return (
    <div
      style={{
        height: '100%'
      }}
      ref={mapRef}
    >
    </div>
  );
}

export default Map;
