import { useEffect, useRef, useState } from 'react';
import { Center } from '@/types';
import { Card } from '@/components/ui/card';
import 'leaflet/dist/leaflet.css';

interface WorldMapProps {
  centers: Center[];
  onCenterSelect: (centerId: string) => void;
}

const WorldMap = ({ centers, onCenterSelect }: WorldMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const leafletMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  
  useEffect(() => {
    // Only import and initialize Leaflet on the client-side
    if (typeof window !== 'undefined' && mapRef.current && !mapLoaded) {
      import('leaflet').then((L) => {
        if (!mapRef.current) return;
        
        // Clean up existing map if it exists
        if (leafletMapRef.current) {
          leafletMapRef.current.remove();
        }

        // Fix Leaflet's default icon path issues
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        // Initialize the map
        const map = L.map(mapRef.current, {
          center: [20, 0],
          zoom: 2,
          minZoom: 2,
          maxBounds: [[-90, -180], [90, 180]]
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Store the map instance for cleanup
        leafletMapRef.current = map;
        setMapLoaded(true);
      });
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (!mapLoaded || !leafletMapRef.current) return;

    const addMarkers = async () => {
      const L = await import('leaflet');
      
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      
      // Create a custom icon for the markers
      const customIcon = L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
      
      centers.forEach(center => {
        const { lat, lng } = center.coordinates;
        
        // Create marker with custom icon
        const marker = L.marker([lat, lng], { icon: customIcon }).addTo(leafletMapRef.current);
        
        // Add popup with center info
        marker.bindPopup(`
          <strong>${center.name}</strong><br>
          ${center.location}<br>
          ${center.director ? `Director: ${center.director}<br>` : ''}
          <a href="#${center.id}" class="text-blue-500">View details</a>
        `);
        
        // Add click event to navigate to center card
        marker.on('click', () => {
          onCenterSelect(center.id);
        });
        
        markersRef.current.push(marker);
      });
    };
    
    addMarkers();
    
    return () => {
      // Clean up markers when component unmounts or centers change
      markersRef.current.forEach(marker => marker.remove());
    };
  }, [centers, mapLoaded, onCenterSelect]);

  return (
    <Card className="w-full mb-8 overflow-hidden">
      <div 
        ref={mapRef} 
        className="h-[400px] w-full"
        aria-label="Interactive map of Brånemark Centers worldwide"
      />
    </Card>
  );
};

export default WorldMap;
