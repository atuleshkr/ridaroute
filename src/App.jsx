import React, { useState } from 'react';
import { 
  Search, MapPin, Star, Navigation, Calendar, ArrowRight, Filter, TrendingUp,
  ArrowLeft, Share2, Bookmark, AlertCircle, ThumbsUp, Camera, ChevronDown,
  Fuel, Coffee, Wind, Sun, Cloud, CheckCircle, AlertTriangle, MessageSquare, Clock
} from 'lucide-react';

// Sample route data with real Unsplash images
const ROUTES_DATABASE = [
  {
    id: 1,
    name: "Mumbai to Goa Coastal Highway",
    start: "Mumbai, Maharashtra",
    end: "Goa",
    distance: "485 km",
    duration: "8-10 hours",
    difficulty: "Easy",
    rating: 4.5,
    reviewCount: 234,
    description: "Scenic coastal route with beautiful sea views and multiple beach stops. This iconic highway runs along the Konkan coast, offering breathtaking ocean vistas, pristine beaches, and charming coastal villages.",
    highlights: ["Coastal views", "Beach stops", "Good road condition", "Seafood cuisine", "Sunset points"],
    bestSeason: "October - February",
    avoidSeason: "June - September (Monsoon)",
    routeType: "Coastal Highway",
    destinationType: ["beach", "coast", "tourist"],
    roadCondition: "Excellent",
    trafficLevel: "Moderate",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
    fuelStops: ["Panvel (40 km)", "Mahad (120 km)", "Chiplun (230 km)", "Ratnagiri (330 km)"],
    foodStops: ["Highway Gomantak, Panvel", "Patil Khanaval, Chiplun", "Konkani Kitchen, Ratnagiri"],
    attractions: ["Murud Beach", "Ganpatipule Temple", "Ratnagiri Fort", "Tarkarli Beach"],
    mapPath: [
      { lat: 19.0760, lng: 72.8777, label: "Mumbai" },
      { lat: 18.1124, lng: 73.0125, label: "Mahad" },
      { lat: 17.5333, lng: 73.5167, label: "Chiplun" },
      { lat: 15.3733, lng: 73.8278, label: "Goa" }
    ]
  },
  {
    id: 2,
    name: "Pune to Mahabaleshwar Hill Route",
    start: "Pune, Maharashtra",
    end: "Mahabaleshwar, Maharashtra",
    distance: "120 km",
    duration: "3-4 hours",
    difficulty: "Moderate",
    rating: 4.7,
    reviewCount: 456,
    description: "Winding hill roads with stunning valley views and strawberry farms. Experience the beauty of the Western Ghats as you climb through 21 hairpin bends.",
    highlights: ["Hill station", "Ghats", "Valley views", "Strawberry farms", "Waterfalls"],
    bestSeason: "June - September",
    avoidSeason: "March - May (Very hot)",
    routeType: "Hill Route",
    destinationType: ["hills", "mountains", "tourist"],
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    fuelStops: ["Pune (0 km)", "Wai (70 km)", "Panchgani (100 km)"],
    foodStops: ["Mapro Garden, Panchgani", "Bagicha Corner, Mahabaleshwar"],
    attractions: ["Pratapgad Fort", "Table Land Panchgani", "Arthur's Seat", "Venna Lake"],
    mapPath: [
      { lat: 18.5204, lng: 73.8567, label: "Pune" },
      { lat: 17.9529, lng: 73.7449, label: "Wai" },
      { lat: 17.7833, lng: 73.6667, label: "Mahabaleshwar" }
    ]
  },
  {
    id: 3,
    name: "Hyderabad to Srisailam Temple Route",
    start: "Hyderabad, Telangana",
    end: "Srisailam, Andhra Pradesh",
    distance: "213 km",
    duration: "4-5 hours",
    difficulty: "Moderate",
    rating: 4.3,
    reviewCount: 178,
    description: "Spiritual journey through Nallamala forest with wildlife and temple. This route takes you through dense forests, winding ghats.",
    highlights: ["Forest route", "Wildlife", "Temple visit", "Ghat roads", "Krishna River views"],
    bestSeason: "November - February",
    avoidSeason: "April - June (Very hot)",
    routeType: "Forest & Temple Route",
    roadCondition: "Good",
    trafficLevel: "Low",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    fuelStops: ["Hyderabad (0 km)", "Kurnool Highway (100 km)", "Dornala (180 km)"],
    foodStops: ["Highway Dhaba, Kurnool Road", "Temple Prasadam, Srisailam"],
    attractions: ["Srisailam Dam", "Mallikarjuna Temple", "Akka Mahadevi Caves", "Pathala Ganga"],
    mapPath: [
      { lat: 17.3850, lng: 78.4867, label: "Hyderabad" },
      { lat: 16.4333, lng: 78.8667, label: "Dornala" },
      { lat: 16.0733, lng: 78.8678, label: "Srisailam" }
    ]
  },
  {
    id: 4,
    name: "Bangalore to Coorg Coffee Country",
    start: "Bangalore, Karnataka",
    end: "Coorg, Karnataka",
    distance: "265 km",
    duration: "5-6 hours",
    difficulty: "Moderate",
    rating: 4.8,
    reviewCount: 892,
    description: "Experience the scenic beauty of Karnataka as you ride through lush coffee plantations and misty hills.",
    highlights: ["Coffee estates", "Waterfalls", "Hill roads", "Wildlife spotting", "Local cuisine"],
    bestSeason: "September - March",
    avoidSeason: "April - June (Hot), July - August (Heavy rains)",
    routeType: "Hill Route",
    roadCondition: "Good",
    trafficLevel: "Low to Moderate",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&h=600&fit=crop",
    fuelStops: ["Ramanagara (40 km)", "Channarayapatna (120 km)", "Hassan (180 km)", "Madikeri (250 km)"],
    foodStops: ["Kamat Restaurant, Ramanagara", "Hoysala Village, Hassan", "Coorg Cuisine, Madikeri"],
    attractions: ["Abbey Falls - 8 km from Madikeri", "Raja's Seat - Viewpoint in Madikeri", "Dubare Elephant Camp - 35 km from Madikeri", "Talacauvery Temple - Origin of River Cauvery"],
    mapPath: [
      { lat: 12.9716, lng: 77.5946, label: "Bangalore" },
      { lat: 12.7184, lng: 77.2847, label: "Ramanagara" },
      { lat: 12.9941, lng: 76.0962, label: "Hassan" },
      { lat: 12.4244, lng: 75.7382, label: "Madikeri (Coorg)" }
    ]
  },
  {
    id: 5,
    name: "Mumbai to Lonavala Weekend Escape",
    start: "Mumbai, Maharashtra",
    end: "Lonavala, Maharashtra",
    distance: "83 km",
    duration: "2-3 hours",
    difficulty: "Easy",
    rating: 4.2,
    reviewCount: 651,
    description: "Popular weekend getaway with scenic ghats and viewpoints. The expressway offers smooth riding.",
    highlights: ["Hill station", "Monsoon beauty", "Quick escape", "Waterfalls", "Viewpoints"],
    bestSeason: "July - September",
    avoidSeason: "March - May (Hot and crowded)",
    routeType: "Hill Route",
    roadCondition: "Excellent",
    trafficLevel: "Very High on weekends",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    fuelStops: ["Panvel (40 km)", "Lonavala (83 km)"],
    foodStops: ["Makrand Snacks, Lonavala", "Rama Krishna, Lonavala"],
    attractions: ["Tiger Point", "Bhushi Dam", "Karla Caves", "Lohagad Fort"],
    mapPath: [
      { lat: 19.0760, lng: 72.8777, label: "Mumbai" },
      { lat: 18.7537, lng: 73.4057, label: "Lonavala" }
    ]
  },
  {
    id: 6,
    name: "Hyderabad to Warangal Heritage Trail",
    start: "Hyderabad, Telangana",
    end: "Warangal, Telangana",
    distance: "145 km",
    duration: "3 hours",
    difficulty: "Easy",
    rating: 4.4,
    reviewCount: 289,
    description: "Historical route with ancient temples and fort ruins. Four-lane highway for most of the journey.",
    highlights: ["Heritage sites", "Good highways", "Cultural experience", "Ancient temples", "Fort ruins"],
    bestSeason: "October - March",
    avoidSeason: "April - June (Very hot)",
    routeType: "Heritage Highway",
    roadCondition: "Excellent",
    trafficLevel: "Moderate",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    fuelStops: ["Hyderabad (0 km)", "Jangaon (85 km)", "Warangal (145 km)"],
    foodStops: ["Highway Paradise, Jangaon", "Kakatiya Deluxe, Warangal"],
    attractions: ["Warangal Fort", "Thousand Pillar Temple", "Ramappa Temple (UNESCO)", "Bhadrakali Temple"],
    mapPath: [
      { lat: 17.3850, lng: 78.4867, label: "Hyderabad" },
      { lat: 17.5469, lng: 79.1553, label: "Jangaon" },
      { lat: 17.9689, lng: 79.5941, label: "Warangal" }
    ]
  },
  {
    id: 7,
    name: "Bangalore to Nandi Hills Sunrise Ride",
    start: "Bangalore, Karnataka",
    end: "Nandi Hills, Karnataka",
    distance: "61 km",
    duration: "1.5 hours",
    difficulty: "Moderate",
    rating: 4.6,
    reviewCount: 1024,
    description: "Early morning ride to catch spectacular sunrise views. Popular among riders for weekend morning rides.",
    highlights: ["Sunrise views", "Hill climb", "Popular spot", "Cycling route", "Ancient fort"],
    bestSeason: "Year-round",
    avoidSeason: "Monsoon nights (Foggy roads)",
    routeType: "Hill Climb",
    roadCondition: "Good",
    trafficLevel: "Very High on weekends",
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&h=600&fit=crop",
    fuelStops: ["Bangalore (0 km)", "Devanahalli (40 km)"],
    foodStops: ["Hill View Restaurant, Nandi Hills", "Breakfast at the peak"],
    attractions: ["Tipu's Drop", "Yoga Nandeeshwara Temple", "Amrita Sarovar", "Brahmashram"],
    mapPath: [
      { lat: 12.9716, lng: 77.5946, label: "Bangalore" },
      { lat: 13.3704, lng: 77.6839, label: "Nandi Hills" }
    ]
  },
  {
    id: 8,
    name: "Pune to Lavasa Lake City",
    start: "Pune, Maharashtra",
    end: "Lavasa, Maharashtra",
    distance: "65 km",
    duration: "2 hours",
    difficulty: "Moderate",
    rating: 4.1,
    reviewCount: 423,
    description: "Scenic route to planned hill city with lakeside views. The road winds through the Sahyadri mountains.",
    highlights: ["Lake views", "Planned city", "Watersports", "Mountain roads", "Photo opportunities"],
    bestSeason: "October - May",
    avoidSeason: "June - September (Monsoon, road damage)",
    routeType: "Lake & Hill Route",
    roadCondition: "Good",
    trafficLevel: "Low to Moderate",
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    fuelStops: ["Pune (0 km)", "Pirangut (40 km)"],
    foodStops: ["Lavasa Restaurants", "Waterfront Café"],
    attractions: ["Warasgaon Dam", "Dasve Viewpoint", "Lavasa Promenade", "Water sports activities"],
    mapPath: [
      { lat: 18.5204, lng: 73.8567, label: "Pune" },
      { lat: 18.4088, lng: 73.5086, label: "Lavasa" }
    ]
  }
];

// Reviews database remains the same as before
const REVIEWS_DATABASE = {
  1: [
    {
      id: 1,
      userName: "Arjun Mehta",
      userAvatar: "AM",
      rating: 5,
      date: "3 days ago",
      travelDate: "January 2025",
      vehicleType: "Royal Enfield Interceptor 650",
      rideType: "Solo",
      review: "Absolutely stunning route! The roads are in excellent condition, especially after Ramanagara. The coffee estates near Coorg are breathtaking.",
      helpful: 52,
      photos: 6,
      roadCondition: { rating: 5, label: "Excellent" },
      safety: { rating: 5, label: "Very Safe" },
      scenic: { rating: 5, label: "Stunning" }
    }
  ],
  4: [
    {
      id: 1,
      userName: "Rajesh Kumar",
      userAvatar: "RK",
      rating: 5,
      date: "2 days ago",
      travelDate: "January 2025",
      vehicleType: "Royal Enfield Classic 350",
      rideType: "Solo",
      review: "Absolutely stunning route! The roads are in excellent condition. Make sure to stop at Abbey Falls.",
      helpful: 45,
      photos: 3,
      roadCondition: { rating: 5, label: "Excellent" },
      safety: { rating: 5, label: "Very Safe" },
      scenic: { rating: 5, label: "Stunning" }
    }
  ]
};

const RidaRouteApp = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRouteId, setSelectedRouteId] = useState(null);

  const handleRouteClick = (routeId) => {
    setSelectedRouteId(routeId);
    setCurrentPage('detail');
    window.scrollTo(0, 0);
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedRouteId(null);
    window.scrollTo(0, 0);
  };

  const handleNavigateToRoutes = () => {
    setCurrentPage('routes');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' ? (
        <HomePage onRouteClick={handleRouteClick} onNavigateToRoutes={handleNavigateToRoutes} />
      ) : currentPage === 'routes' ? (
        <RoutesPage onRouteClick={handleRouteClick} onBackToHome={handleBackToHome} />
      ) : (
        <RouteDetailPage 
          routeId={selectedRouteId} 
          onBackClick={handleBackToHome} 
        />
      )}
    </div>
  );
};

// HOME PAGE COMPONENT
const HomePage = ({ onRouteClick, onNavigateToRoutes }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredRoutes = ROUTES_DATABASE.filter(route => {
    const matchesSearch = searchQuery === '' || 
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.start.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.end.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = selectedDifficulty === 'all' || route.difficulty === selectedDifficulty;
    
    const matchesState = selectedState === 'all' || 
      route.start.toLowerCase().includes(selectedState.toLowerCase()) ||
      route.end.toLowerCase().includes(selectedState.toLowerCase());
    
    return matchesSearch && matchesDifficulty && matchesState;
  });

  const featuredRoutes = filteredRoutes.filter(route => route.featured);
  const allRoutes = filteredRoutes;

  return (
    <div>
      {/* Enhanced Hero Section */}
      <div className="relative h-screen">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1920&h=1080&fit=crop)',
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
        </div>

        {/* Navigation Bar */}
        <header className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center space-x-2">
                <Navigation className="w-8 h-8 text-white" />
                <h1 className="text-2xl font-bold text-white">RidaRoute</h1>
              </div>
              <nav className="hidden md:flex space-x-8">
                <a href="#" onClick={(e) => { e.preventDefault(); }} className="text-white hover:text-blue-300 transition">Home</a>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToRoutes(); }} className="text-white hover:text-blue-300 transition">Routes</a>
                <a href="#" onClick={(e) => { e.preventDefault(); }} className="text-white hover:text-blue-300 transition">Community</a>
                <a href="#" onClick={(e) => { e.preventDefault(); }} className="text-white hover:text-blue-300 transition">Plan Trip</a>
              </nav>
              <div className="flex items-center space-x-4">
                <button className="text-white hover:text-blue-300 transition">Sign In</button>
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition flex items-center space-x-2">
                  <span>Plan Your Trip</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center max-w-4xl mx-auto">
              {/* Main Headline */}
              <p className="text-white/90 text-lg mb-4 tracking-widest uppercase">Discover Your Next</p>
              <h2 className="text-white text-7xl md:text-8xl font-bold mb-6 leading-tight">
                ADVENTURE
              </h2>
              <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                Experience the magic of exploring India's most breathtaking routes with community-verified information and trusted reviews
              </p>
              
              {/* Simplified Search Bar */}
              <div className="bg-white rounded-2xl shadow-2xl p-2 flex items-center gap-2 max-w-3xl mx-auto relative">
                <MapPin className="w-6 h-6 text-blue-600 ml-4" />
                <input
                  type="text"
                  placeholder="Where do you want to travel?"
                  className="flex-1 px-4 py-4 text-gray-900 text-lg focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition flex items-center space-x-2 font-medium">
                  <span>Find Routes</span>
                  <Search className="w-5 h-5" />
                </button>

                {/* Autosuggestion Dropdown */}
                {searchQuery.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50">
                    {ROUTES_DATABASE
                      .filter(route => 
                        route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        route.start.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        route.end.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .slice(0, 5)
                      .map((route) => (
                        <div
                          key={route.id}
                          onClick={() => {
                            onRouteClick(route.id);
                            setSearchQuery('');
                          }}
                          className="px-6 py-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <div className="flex items-center space-x-3">
                            <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">{route.name}</div>
                              <div className="text-sm text-gray-500">{route.start} → {route.end}</div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium">{route.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    {ROUTES_DATABASE.filter(route => 
                      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      route.start.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      route.end.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="px-6 py-8 text-center text-gray-500">
                        No routes found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
                <div className="text-white">
                  <div className="text-4xl font-bold mb-2">150+</div>
                  <div className="text-white/70 text-sm">Verified Routes</div>
                </div>
                <div className="text-white">
                  <div className="text-4xl font-bold mb-2">3,200+</div>
                  <div className="text-white/70 text-sm">Community Reviews</div>
                </div>
                <div className="text-white">
                  <div className="text-4xl font-bold mb-2">5,000+</div>
                  <div className="text-white/70 text-sm">Active Riders</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex flex-col items-center">
          <div className="text-white/70 text-sm mb-2 text-center">Scroll to explore</div>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-center justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Featured Routes */}
      {featuredRoutes.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  <span className="text-blue-600 font-semibold uppercase text-sm tracking-wide">Popular</span>
                </div>
                <h3 className="text-4xl font-bold text-gray-900">Featured Routes</h3>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-2">
                <span>View All</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredRoutes.map((route) => (
                <RouteCard 
                  key={route.id} 
                  route={route} 
                  featured={true}
                  onClick={() => onRouteClick(route.id)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Routes */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-4xl font-bold text-gray-900">All Routes</h3>
            <div className="text-sm text-gray-600">
              {filteredRoutes.length} routes found
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allRoutes.map((route) => (
              <RouteCard 
                key={route.id} 
                route={route}
                onClick={() => onRouteClick(route.id)}
              />
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <div className="text-center py-20">
              <MapPin className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h4 className="text-2xl font-medium text-gray-600 mb-2">No routes found</h4>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Enhanced Route Card Component with Real Images
const RouteCard = ({ route, featured = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group ${featured ? 'ring-2 ring-blue-500' : ''}`}
    >
      {/* Route Image */}
      <div className="h-64 bg-gray-200 relative overflow-hidden">
        <img 
          src={route.imageUrl} 
          alt={route.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-900">
            {route.difficulty}
          </span>
        </div>
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-yellow-400 px-3 py-1.5 rounded-full text-sm font-bold text-gray-900 flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>Featured</span>
            </span>
          </div>
        )}

        {/* Rating Overlay */}
        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-semibold text-gray-900">{route.rating}</span>
          </div>
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm text-gray-700">
            {route.reviewCount} reviews
          </div>
        </div>
      </div>

      <div className="p-6">
        <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition">
          {route.name}
        </h4>
        
        {/* Start and End */}
        <div className="flex items-start space-x-2 mb-4 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <div>{route.start}</div>
            <div className="text-gray-400">to {route.end}</div>
          </div>
        </div>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-5">
          {route.highlights.slice(0, 3).map((highlight, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
              {highlight}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1">
            <Navigation className="w-4 h-4" />
            <span className="font-medium">{route.distance}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{route.duration}</span>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-1">
            <span>Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ROUTES PAGE WITH ADVANCED FILTERING
const RoutesPage = ({ onRouteClick, onBackToHome }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedDestinationType, setSelectedDestinationType] = useState('all');
  const [selectedDistance, setSelectedDistance] = useState('all');

  // Filter routes based on all criteria
  const filteredRoutes = ROUTES_DATABASE.filter(route => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
      route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.start.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.end.toLowerCase().includes(searchQuery.toLowerCase());
    
    // State filter
    const matchesState = selectedState === 'all' || 
      route.start.toLowerCase().includes(selectedState.toLowerCase()) ||
      route.end.toLowerCase().includes(selectedState.toLowerCase());
    
    // Destination type filter
    const matchesDestinationType = selectedDestinationType === 'all' || 
      route.routeType.toLowerCase().includes(selectedDestinationType.toLowerCase()) ||
      route.highlights.some(h => h.toLowerCase().includes(selectedDestinationType.toLowerCase()));
    
    // Distance filter
    const distanceKm = parseInt(route.distance);
    let matchesDistance = true;
    if (selectedDistance === '0-100') matchesDistance = distanceKm <= 100;
    else if (selectedDistance === '100-250') matchesDistance = distanceKm > 100 && distanceKm <= 250;
    else if (selectedDistance === 'under-500') matchesDistance = distanceKm < 500;
    else if (selectedDistance === 'over-1000') matchesDistance = distanceKm >= 1000;
    
    return matchesSearch && matchesState && matchesDestinationType && matchesDistance;
  });

  // Count active filters
  const activeFiltersCount = [selectedState, selectedDestinationType, selectedDistance].filter(f => f !== 'all').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Navigation className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">RidaRoute</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <button onClick={onBackToHome} className="text-gray-700 hover:text-blue-600 transition">Home</button>
              <a href="#" className="text-blue-600 font-semibold">Routes</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Community</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition">Plan Trip</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600 transition">Sign In</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-2">Explore Routes</h2>
          <p className="text-blue-100">Discover amazing routes across India</p>
        </div>
      </section>

      {/* Search and Filter Bar */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Search Bar */}
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search routes or destinations..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="bg-white text-blue-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="bg-gray-50 rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* State Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">State</label>
                <div className="space-y-2">
                  {['all', 'maharashtra', 'karnataka', 'telangana', 'goa', 'kerala'].map((state) => (
                    <label key={state} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="state"
                        value={state}
                        checked={selectedState === state}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700 capitalize">
                        {state === 'all' ? 'All States' : state}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Destination Type Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Destination Type</label>
                <div className="space-y-2">
                  {[
                    'all',
                    'hills',
                    'mountains',
                    'beach',
                    'villages',
                    'forest',
                    'city',
                    'sanctuaries',
                    'historical',
                    'tourist',
                    'pilgrimage'
                  ].map((type) => (
                    <label key={type} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="destinationType"
                        value={type}
                        checked={selectedDestinationType === type}
                        onChange={(e) => setSelectedDestinationType(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700 capitalize">
                        {type === 'all' ? 'All Types' : type}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distance Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Distance</label>
                <div className="space-y-2">
                  {[
                    { value: 'all', label: 'Any Distance' },
                    { value: '0-100', label: '0-100 kms' },
                    { value: '100-250', label: '100-250 kms' },
                    { value: 'under-500', label: 'Under 500 kms' },
                    { value: 'over-1000', label: 'More than 1000 kms' }
                  ].map((option) => (
                    <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="distance"
                        value={option.value}
                        checked={selectedDistance === option.value}
                        onChange={(e) => setSelectedDistance(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <div className="md:col-span-3 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedState('all');
                      setSelectedDestinationType('all');
                      setSelectedDistance('all');
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            {filteredRoutes.length} {filteredRoutes.length === 1 ? 'route' : 'routes'} found
          </div>
        </div>
      </section>

      {/* Routes Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredRoutes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRoutes.map((route) => (
                <RouteCard 
                  key={route.id} 
                  route={route}
                  onClick={() => onRouteClick(route.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <MapPin className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h4 className="text-2xl font-medium text-gray-600 mb-2">No routes found</h4>
              <p className="text-gray-500 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedState('all');
                  setSelectedDestinationType('all');
                  setSelectedDistance('all');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// ROUTE DETAIL PAGE - Full detailed version
const RouteDetailPage = ({ routeId, onBackClick }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all');

  const route = ROUTES_DATABASE.find(r => r.id === routeId);
  const reviews = REVIEWS_DATABASE[routeId] || [];
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  if (!route) {
    return <div className="p-8 text-center">Route not found</div>;
  }

  const ratingBreakdown = {
    5: Math.floor(route.reviewCount * 0.76),
    4: Math.floor(route.reviewCount * 0.17),
    3: Math.floor(route.reviewCount * 0.05),
    2: Math.floor(route.reviewCount * 0.01),
    1: Math.floor(route.reviewCount * 0.01)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBackClick}
                className="text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center space-x-2">
                <Navigation className="w-6 h-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">RidaRoute</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                Start Trip
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Route Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{route.name}</h2>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-5 h-5" />
                  <span>{route.start} → {route.end}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-1">
                <Star className="w-6 h-6 text-yellow-400 fill-current" />
                <span className="text-2xl font-bold text-gray-900">{route.rating}</span>
              </div>
              <div className="text-sm text-gray-600">{route.reviewCount} reviews</div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <Navigation className="w-5 h-5" />
                <span className="text-sm">Distance</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{route.distance}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Duration</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{route.duration}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">Difficulty</span>
              </div>
              <div className="text-xl font-bold text-gray-900">{route.difficulty}</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <Calendar className="w-5 h-5" />
                <span className="text-sm">Best Season</span>
              </div>
              <div className="text-sm font-bold text-gray-900">{route.bestSeason}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {['overview', 'reviews', 'map', 'tips'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Map Section */}
            {(activeTab === 'map' || activeTab === 'overview') && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Route Map</h3>
                <div className="bg-gradient-to-br from-green-100 via-blue-100 to-green-200 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {route.mapPath.map((point, index) => (
                        <div
                          key={index}
                          className="absolute"
                          style={{
                            left: `${20 + index * 25}%`,
                            top: `${30 + index * 15}%`
                          }}
                        >
                          <div className="relative">
                            <div className="w-8 h-8 bg-blue-600 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-3 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
                              {point.label}
                            </div>
                          </div>
                        </div>
                      ))}
                      <svg className="absolute inset-0 w-full h-full">
                        <path
                          d="M 20% 30% Q 35% 40%, 45% 45% T 70% 60% T 95% 75%"
                          stroke="#2563eb"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray="8,4"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded shadow-md text-sm">
                    <strong>Interactive Map:</strong> In production, this will show Google Maps/Mapbox
                  </div>
                </div>
              </div>
            )}

            {/* Overview Section */}
            {activeTab === 'overview' && (
              <>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">About This Route</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{route.description}</p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Route Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {route.highlights.map((highlight, index) => (
                          <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Road Conditions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Road Conditions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <div>
                          <div className="font-medium text-gray-900">Overall Condition</div>
                          <div className="text-sm text-gray-600">Based on recent reviews</div>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-green-600">{route.roadCondition}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Wind className="w-6 h-6 text-blue-500" />
                        <div>
                          <div className="font-medium text-gray-900">Traffic Level</div>
                          <div className="text-sm text-gray-600">Typical conditions</div>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{route.trafficLevel}</span>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-medium text-gray-900 mb-1">Best avoided in:</div>
                          <div className="text-sm text-gray-600">{route.avoidSeason}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Reviews Section */}
            {(activeTab === 'reviews' || activeTab === 'overview') && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Community Reviews</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                    Write a Review
                  </button>
                </div>

                {/* Rating Summary */}
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-gray-900 mb-2">{route.rating}</div>
                      <div className="flex items-center justify-center space-x-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-gray-600">{route.reviewCount} reviews</div>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="flex items-center space-x-3">
                          <span className="text-sm text-gray-600 w-8">{rating} ★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ width: `${(ratingBreakdown[rating] / route.reviewCount) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 w-12 text-right">{ratingBreakdown[rating]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Review Filters */}
                <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-200 overflow-x-auto">
                  <span className="text-sm font-medium text-gray-700">Filter by:</span>
                  {['all', '5 stars', '4 stars', 'Recent', 'Most Helpful'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setReviewFilter(filter)}
                      className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                        reviewFilter === filter
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {displayedReviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                  ))}
                </div>

                {!showAllReviews && reviews.length > 2 && (
                  <button
                    onClick={() => setShowAllReviews(true)}
                    className="w-full mt-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center space-x-2"
                  >
                    <span>Show All {reviews.length} Reviews</span>
                    <ChevronDown className="w-5 h-5" />
                  </button>
                )}

                {reviews.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No reviews yet. Be the first to review this route!
                  </div>
                )}
              </div>
            )}

            {/* Tips Section */}
            {activeTab === 'tips' && (
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Fuel Stops</h3>
                  <div className="space-y-3">
                    {route.fuelStops.map((stop, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Fuel className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-700">{stop}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Food Stops</h3>
                  <div className="space-y-3">
                    {route.foodStops.map((stop, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Coffee className="w-5 h-5 text-brown-500" />
                        <span className="text-gray-700">{stop}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Must-Visit Attractions</h3>
                  <div className="space-y-3">
                    {route.attractions.map((attraction, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{attraction}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Safety Alert */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Safety Tips</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Carry sufficient fuel</li>
                    <li>• Check weather before departure</li>
                    <li>• Ride in groups when possible</li>
                    <li>• Keep emergency contacts handy</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Weather Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Current Weather</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <span className="text-gray-700">{route.start.split(',')[0]}</span>
                  </div>
                  <span className="font-medium">24°C</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Cloud className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">{route.end.split(',')[0]}</span>
                  </div>
                  <span className="font-medium">22°C</span>
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-500">Last updated: 2 hours ago</div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2">
                  <Bookmark className="w-4 h-4" />
                  <span>Save Route</span>
                </button>
                <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share with Friends</span>
                </button>
                <button className="w-full py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Community</span>
                </button>
              </div>
            </div>

            {/* Related Routes */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Similar Routes</h4>
              <div className="space-y-3">
                {ROUTES_DATABASE
                  .filter(r => r.id !== route.id)
                  .slice(0, 2)
                  .map((relatedRoute) => (
                    <div 
                      key={relatedRoute.id}
                      className="p-3 border border-gray-200 rounded-lg hover:border-blue-300 cursor-pointer"
                    >
                      <div className="font-medium text-gray-900 text-sm mb-1">{relatedRoute.name}</div>
                      <div className="text-xs text-gray-600">{relatedRoute.distance} • {relatedRoute.duration}</div>
                      <div className="flex items-center space-x-1 mt-2">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs font-medium">{relatedRoute.rating}</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review }) => {
  const [isHelpful, setIsHelpful] = useState(false);

  return (
    <div className="border-b border-gray-200 pb-6">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
          {review.userAvatar}
        </div>

        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="font-semibold text-gray-900">{review.userName}</div>
              <div className="text-sm text-gray-600">{review.date}</div>
            </div>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {review.vehicleType}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {review.rideType}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              Traveled: {review.travelDate}
            </span>
          </div>

          <p className="text-gray-700 leading-relaxed mb-4">{review.review}</p>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Road:</span>
              <span className="text-sm font-medium text-gray-900">{review.roadCondition.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Safety:</span>
              <span className="text-sm font-medium text-gray-900">{review.safety.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Scenic:</span>
              <span className="text-sm font-medium text-gray-900">{review.scenic.label}</span>
            </div>
          </div>

          {review.photos > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{review.photos} photos</span>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsHelpful(!isHelpful)}
              className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm ${
                isHelpful
                  ? 'bg-blue-50 text-blue-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful + (isHelpful ? 1 : 0)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RidaRouteApp;
