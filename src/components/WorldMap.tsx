import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, MapPin } from 'lucide-react';
import type { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Project {
  id: number;
  name: string;
  location: string;
  coordinates: [number, number];
  image: string;
  coatings: string;
  client: string;
  role: string;
}

const projects: Project[] = [
    {
      id: 1,
      name: "Burj Khalifa",
      location: "Dubai, UAE",
      coordinates: [25.1972, 55.2744],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
      coatings: "High-performance facade protection systems",
      client: "Emaar Properties",
      role: "Complete exterior coating system for the world's tallest building, providing weather resistance and thermal protection"
    },
    {
      id: 2,
      name: "Sydney Opera House",
      location: "Sydney, Australia", 
      coordinates: [-33.8568, 151.2153],
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2000&auto=format&fit=crop",
      coatings: "Marine-grade protective coatings",
      client: "Sydney Opera House Trust",
      role: "Heritage preservation and marine protection coating systems for this iconic architectural landmark"
    },
    {
      id: 3,
      name: "Golden Gate Bridge",
      location: "San Francisco, USA",
      coordinates: [37.8199, -122.4783],
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000&auto=format&fit=crop",
      coatings: "Anti-corrosive bridge coating systems",
      client: "Golden Gate Bridge District",
      role: "Long-term structural protection against marine corrosion and extreme weather conditions"
    },
    {
      id: 4,
      name: "North Sea Platform",
      location: "Norwegian Sea",
      coordinates: [59.5, 2.0],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
      coatings: "Offshore platform protection systems",
      client: "Equinor",
      role: "Complete offshore rig coating system designed for extreme marine conditions and 25-year durability"
    },
    {
      id: 5,
      name: "Singapore Port",
      location: "Singapore",
      coordinates: [1.2966, 103.7764],
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2000&auto=format&fit=crop",
      coatings: "Marine hull and infrastructure coatings",
      client: "Maritime Port Authority of Singapore",
      role: "Port infrastructure and vessel protection systems for one of the world's busiest shipping hubs"
    },
    {
      id: 6,
      name: "Hornsea Wind Farm",
      location: "North Sea, UK",
      coordinates: [53.8667, 1.9333],
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2000&auto=format&fit=crop",
      coatings: "Renewable energy protection systems",
      client: "Ørsted",
      role: "Wind turbine and foundation coating systems designed for 25-year offshore durability"
    },
    {
      id: 7,
      name: "Petronas Twin Towers",
      location: "Kuala Lumpur, Malaysia",
      coordinates: [3.1578, 101.7119],
      image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=2000&auto=format&fit=crop",
      coatings: "High-rise facade protection",
      client: "Petronas",
      role: "Advanced facade coating systems for tropical climate protection and aesthetic preservation"
    },
    {
      id: 8,
      name: "Øresund Bridge",
      location: "Denmark-Sweden",
      coordinates: [55.5719, 12.8547],
      image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?q=80&w=2000&auto=format&fit=crop",
      coatings: "Marine bridge protection",
      client: "Øresund Bridge Consortium",
      role: "Complete bridge coating system for this crucial Nordic transportation link"
    },
    {
      id: 9,
      name: "Maersk Fleet",
      location: "Global Operations",
      coordinates: [55.6761, 12.5683],
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?q=80&w=2000&auto=format&fit=crop",
      coatings: "Container ship hull coatings",
      client: "A.P. Møller-Mærsk",
      role: "Advanced hull coating systems for fuel efficiency and environmental protection across global shipping routes"
    },
    {
      id: 10,
      name: "Qatar LNG Facilities",
      location: "Doha, Qatar",
      coordinates: [25.3548, 51.1839],
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
      coatings: "Industrial facility protection",
      client: "Qatar Gas",
      role: "Comprehensive coating systems for LNG processing facilities in extreme desert conditions"
    }
  ];

const WorldMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const loadLeaflet = async () => {
      if (typeof window !== 'undefined' && mapRef.current && !mapInstanceRef.current) {
        try {
          // Dynamically import Leaflet
          const L = await import('leaflet');
          // Fix for default markers
          delete (L.Icon.Default.prototype as unknown as { _getIconUrl: string })._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
          });

          // Initialize map
          const map = L.map(mapRef.current, {
            center: [20, 0],
            zoom: 2,
            zoomControl: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            dragging: true,
            attributionControl: false
          });

          // Store map instance in ref
          mapInstanceRef.current = map;

          // Add tile layer from OpenStreetMap
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            className: 'map-tiles'
          }).addTo(map);

          // Custom marker icon
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `<div class="marker-pin">
                     <div class="marker-icon">📍</div>
                     <div class="marker-pulse"></div>
                   </div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 15]
          });

          // Add project markers
          projects.forEach((project) => {
            const marker = L.marker([project.coordinates[0], project.coordinates[1]], {
              icon: customIcon
            }).addTo(map);

            marker.bindTooltip(project.name, {
              permanent: false,
              direction: 'top',
              className: 'custom-tooltip'
            });

            marker.on('click', () => {
              setSelectedProject(project);
            });
          });

          // Add custom styles
          if (!document.querySelector('style[data-worldmap-styles]')) {
            const style = document.createElement('style');
            style.setAttribute('data-worldmap-styles', 'true');
            style.textContent = `
              .custom-marker {
                background: transparent;
                border: none;
              }
              .marker-pin {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .marker-icon {
                font-size: 20px;
                z-index: 2;
                position: relative;
              }
              .marker-pulse {
                position: absolute;
                width: 20px;
                height: 20px;
                background: #d4af37;
                border-radius: 50%;
                opacity: 0.6;
                animation: pulse 2s infinite;
              }
              @keyframes pulse {
                0% { transform: scale(0.5); opacity: 0.8; }
                50% { transform: scale(1.2); opacity: 0.4; }
                100% { transform: scale(1.5); opacity: 0; }
              }
              .custom-tooltip {
                background: rgba(45, 45, 45, 0.95);
                color: #f5f5dc;
                border: 1px solid #d4af37;
                border-radius: 4px;
                font-size: 12px;
                padding: 4px 8px;
              }
              .map-tiles {
                filter: grayscale(20%) contrast(1.1) brightness(0.8);
              }
            `;
            document.head.appendChild(style);
          }

          setMapLoaded(true);
        } catch (error) {
          console.error('Error loading map:', error);
        }
      }
    };

    loadLeaflet();

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setMapLoaded(false);
      }
    };
  }, []); // Remove projects dependency to prevent re-initialization

  return (
    <div className="relative">
      {/* World Map Container */}
      <div className="relative w-full h-96 bg-graphene/30 rounded-lg overflow-hidden border border-gold/20">
        <div 
          ref={mapRef} 
          className="w-full h-full rounded-lg"
          style={{ background: '#2d2d2d' }}
        />
        
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-graphene/50">
            <div className="text-ivory/60">Loading interactive map...</div>
          </div>
        )}
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-charcoal/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-ivory text-charcoal rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.name}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 bg-charcoal/80 text-ivory rounded-full p-2 hover:bg-charcoal transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="font-playfair text-3xl font-bold mb-2">{selectedProject.name}</h3>
              <p className="text-gold font-medium mb-4 flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {selectedProject.location}
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-inter font-semibold mb-1">Coatings Used:</h4>
                  <p className="text-charcoal/80">{selectedProject.coatings}</p>
                </div>
                
                <div>
                  <h4 className="font-inter font-semibold mb-1">Client:</h4>
                  <p className="text-charcoal/80">{selectedProject.client}</p>
                </div>
                
                <div>
                  <h4 className="font-inter font-semibold mb-1">Jotun's Role:</h4>
                  <p className="text-charcoal/80">{selectedProject.role}</p>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-charcoal/20">
                <Button 
                  onClick={() => setSelectedProject(null)}
                  className="bg-charcoal hover:bg-charcoal/90 text-ivory"
                >
                  Close Project Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorldMap;
