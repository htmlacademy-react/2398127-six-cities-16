import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { City, Offer } from '../../types/offer';
import useMap from '../hooks/use-map';
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
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = new Icon({
    iconUrl: UrlMapMarkers.URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      points.forEach((point) => {
        const marker = new Marker({
          lat: point.city.location.latitude,
          lng: point.city.location.longitude
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
  }, [map, points, selectedCard]);

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
