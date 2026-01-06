import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import Globe from 'react-globe.gl';
import { CenterIntelligence } from '../types';

interface Globe3DProps {
  centers: CenterIntelligence[];
  onCenterClick?: (center: CenterIntelligence) => void;
  selectedCenter?: CenterIntelligence | null;
}

export const Globe3D = ({ centers, onCenterClick, selectedCenter }: Globe3DProps) => {
  const globeRef = useRef<any>();
  const [dimensions, setDimensions] = useState({ width: 800, height: 500 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Prepare points data
  const pointsData = useMemo(() => {
    return centers.map(center => ({
      lat: center.coordinates.lat,
      lng: center.coordinates.lng,
      name: center.name,
      location: center.location,
      director: center.director?.name?.value || 'Unknown',
      nobelRelation: center.director?.nobelBiocareRelation || 'unknown',
      id: center.id,
      center: center
    }));
  }, [centers]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({
          width: rect.width,
          height: Math.min(500, window.innerHeight * 0.5)
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-rotate the globe
  useEffect(() => {
    if (globeRef.current) {
      // Set initial position
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 }, 0);

      // Enable controls
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableZoom = true;
        controls.minDistance = 150;
        controls.maxDistance = 500;
      }
    }
  }, []);

  // Fly to selected center
  useEffect(() => {
    if (selectedCenter && globeRef.current) {
      globeRef.current.pointOfView({
        lat: selectedCenter.coordinates.lat,
        lng: selectedCenter.coordinates.lng,
        altitude: 1.5
      }, 1000);

      // Pause auto-rotate when viewing a center
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = false;
      }
    }
  }, [selectedCenter]);

  // Get point color based on Nobel Biocare relationship
  const getPointColor = useCallback((point: any) => {
    switch (point.nobelRelation) {
      case 'LEAD': return '#9333ea'; // Purple - Nobel LEAD
      case 'partner': return '#22c55e'; // Green - Partner
      case 'user': return '#3b82f6'; // Blue - User
      case 'none': return '#ef4444'; // Red - Competitor (e.g., Straumann)
      default: return '#f59e0b'; // Amber - Unknown
    }
  }, []);

  const handlePointClick = useCallback((point: any) => {
    if (onCenterClick && point.center) {
      onCenterClick(point.center);
    }
  }, [onCenterClick]);

  return (
    <div ref={containerRef} className="w-full relative rounded-xl overflow-hidden bg-slate-900/50 border border-slate-700">
      {/* Legend - Responsive */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 bg-slate-900/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-slate-700">
        <div className="text-[10px] sm:text-xs text-slate-400 mb-1.5 sm:mb-2 font-medium">Nobel Relationship</div>
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-purple-500"></div>
            <span className="text-[10px] sm:text-xs text-slate-300">LEAD</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
            <span className="text-[10px] sm:text-xs text-slate-300">Partner</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500"></div>
            <span className="text-[10px] sm:text-xs text-slate-300">User</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
            <span className="text-[10px] sm:text-xs text-slate-300">Competitor</span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500"></div>
            <span className="text-[10px] sm:text-xs text-slate-300">Unknown</span>
          </div>
        </div>
      </div>

      {/* Globe */}
      <Globe
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={pointsData}
        pointLat="lat"
        pointLng="lng"
        pointColor={getPointColor}
        pointAltitude={0.01}
        pointRadius={0.5}
        pointLabel={(point: any) => `
          <div style="background: rgba(15, 23, 42, 0.95); padding: 12px; border-radius: 8px; border: 1px solid rgba(100, 116, 139, 0.5); max-width: 280px;">
            <div style="font-weight: 600; color: #f1f5f9; margin-bottom: 4px;">${point.name}</div>
            <div style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">${point.location}</div>
            <div style="color: #cbd5e1; font-size: 11px;">Director: ${point.director}</div>
          </div>
        `}
        onPointClick={handlePointClick}
        atmosphereColor="#3b82f6"
        atmosphereAltitude={0.2}
      />

      {/* Instructions - Hidden on mobile */}
      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 z-10 text-[10px] sm:text-xs text-slate-500">
        <span className="hidden sm:inline">Drag to rotate | Scroll to zoom | Click point for details</span>
        <span className="sm:hidden">Tap point for details</span>
      </div>
    </div>
  );
};
