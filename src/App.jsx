import React, { useState } from 'react';
import { 
  Search, MapPin, Star, Navigation, Users, Calendar, ArrowRight, Filter, TrendingUp,
  ArrowLeft, Share2, Bookmark, AlertCircle, ThumbsUp, User, Camera, ChevronDown,
   Fuel, Coffee, Wind, Sun, Cloud, Droplets,
  CheckCircle, XCircle, AlertTriangle, MessageSquare, Clock
} from 'lucide-react';

// Sample route data for Maharashtra, Telangana, Karnataka
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
    description: "Scenic coastal route with beautiful sea views and multiple beach stops. This iconic highway runs along the Konkan coast, offering breathtaking ocean vistas, pristine beaches, and charming coastal villages. The route is well-maintained with smooth tarmac for most of the journey.",
    highlights: ["Coastal views", "Beach stops", "Good road condition", "Seafood cuisine", "Sunset points"],
    bestSeason: "October - February",
    avoidSeason: "June - September (Monsoon)",
    routeType: "Coastal Highway",
    roadCondition: "Excellent",
    trafficLevel: "Moderate",
    featured: true,
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
    description: "Winding hill roads with stunning valley views and strawberry farms. Experience the beauty of the Western Ghats as you climb through 21 hairpin bends, lush forests, and scenic viewpoints. The route offers a perfect weekend escape with cool climate and natural beauty.",
    highlights: ["Hill station", "Ghats", "Valley views", "Strawberry farms", "Waterfalls"],
    bestSeason: "June - September",
    avoidSeason: "March - May (Very hot)",
    routeType: "Hill Route",
    roadCondition: "Good",
    trafficLevel: "High on weekends",
    featured: true,
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
    description: "Spiritual journey through Nallamala forest with wildlife and temple. This route takes you through dense forests, winding ghats, and offers a unique blend of spirituality and nature. Watch out for wildlife crossings in the forest sections.",
    highlights: ["Forest route", "Wildlife", "Temple visit", "Ghat roads", "Krishna River views"],
    bestSeason: "November - February",
    avoidSeason: "April - June (Very hot)",
    routeType: "Forest & Temple Route",
    roadCondition: "Good",
    trafficLevel: "Low",
    featured: false,
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
    description: "Experience the scenic beauty of Karnataka as you ride through lush coffee plantations and misty hills. This route offers a perfect blend of good roads, natural beauty, and cultural experiences. The journey takes you through small towns, winding ghats, and into the heart of India's coffee country.",
    highlights: ["Coffee estates", "Waterfalls", "Hill roads", "Wildlife spotting", "Local cuisine"],
    bestSeason: "September - March",
    avoidSeason: "April - June (Hot), July - August (Heavy rains)",
    routeType: "Hill Route",
    roadCondition: "Good",
    trafficLevel: "Low to Moderate",
    featured: true,
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
    description: "Popular weekend getaway with scenic ghats and viewpoints. The expressway offers smooth riding, while the old Mumbai-Pune highway provides a more scenic alternative with waterfalls during monsoon. Perfect for a quick escape from city life.",
    highlights: ["Hill station", "Monsoon beauty", "Quick escape", "Waterfalls", "Viewpoints"],
    bestSeason: "July - September",
    avoidSeason: "March - May (Hot and crowded)",
    routeType: "Hill Route",
    roadCondition: "Excellent",
    trafficLevel: "Very High on weekends",
    featured: false,
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
    description: "Historical route with ancient temples and fort ruins. Four-lane highway for most of the journey makes it an easy and comfortable ride. Rich in history and heritage, this route connects you to the glorious Kakatiya dynasty era.",
    highlights: ["Heritage sites", "Good highways", "Cultural experience", "Ancient temples", "Fort ruins"],
    bestSeason: "October - March",
    avoidSeason: "April - June (Very hot)",
    routeType: "Heritage Highway",
    roadCondition: "Excellent",
    trafficLevel: "Moderate",
    featured: false,
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
    description: "Early morning ride to catch spectacular sunrise views. Popular among riders for weekend morning rides. The last 10 km involves climbing hairpin bends. The sunrise view from the top is absolutely worth the early wake-up call.",
    highlights: ["Sunrise views", "Hill climb", "Popular spot", "Cycling route", "Ancient fort"],
    bestSeason: "Year-round",
    avoidSeason: "Monsoon nights (Foggy roads)",
    routeType: "Hill Climb",
    roadCondition: "Good",
    trafficLevel: "Very High on weekends",
    featured: true,
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
    description: "Scenic route to planned hill city with lakeside views. The road winds through the Sahyadri mountains offering beautiful valley and lake views. Lavasa's European-style architecture provides a unique destination experience.",
    highlights: ["Lake views", "Planned city", "Watersports", "Mountain roads", "Photo opportunities"],
    bestSeason: "October - May",
    avoidSeason: "June - September (Monsoon, road damage)",
    routeType: "Lake & Hill Route",
    roadCondition: "Good",
    trafficLevel: "Low to Moderate",
    featured: false,
    fuelStops: ["Pune (0 km)", "Pirangut (40 km)"],
    foodStops: ["Lavasa Restaurants", "Waterfront Café"],
    attractions: ["Warasgaon Dam", "Dasve Viewpoint", "Lavasa Promenade", "Water sports activities"],
    mapPath: [
      { lat: 18.5204, lng: 73.8567, label: "Pune" },
      { lat: 18.4088, lng: 73.5086, label: "Lavasa" }
    ]
  }
];

// Sample reviews database
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
      review: "The coastal highway is absolutely breathtaking! Started early morning from Mumbai and the sunrise over the Arabian Sea was spectacular. Road conditions are excellent throughout. Stopped at Ganpatipule for lunch - the beach is pristine. Traffic is manageable on weekdays. Highly recommend this route for a long weekend trip.",
      helpful: 52,
      photos: 6,
      roadCondition: { rating: 5, label: "Excellent" },
      safety: { rating: 5, label: "Very Safe" },
      scenic: { rating: 5, label: "Stunning" }
    },
    {
      id: 2,
      userName: "Neha Desai",
      userAvatar: "ND",
      rating: 4,
      date: "1 week ago",
      travelDate: "December 2024",
      vehicleType: "Yamaha FZ25",
      rideType: "Group (5 riders)",
      review: "Great route with amazing coastal views. We took it slow and explored multiple beaches along the way. Ratnagiri is a good midpoint for an overnight stay. Only issue was some traffic near Panvel, but once you cross that, it's smooth sailing. The seafood is fantastic at local dhabas!",
      helpful: 38,
      photos: 4,
      roadCondition: { rating: 4, label: "Good" },
      safety: { rating: 5, label: "Very Safe" },
      scenic: { rating: 5, label: "Stunning" }
    }
  ],
  2: [
    {
      id: 1,
      userName: "Vikram Singh",
      userAvatar: "VS",
      rating: 5,
      date: "4 days ago",
      travelDate: "January 2025",
      vehicleType: "KTM Duke 390",
      rideType: "Couple",
      review: "Perfect monsoon ride! The ghats are challenging but incredibly scenic. 21 hairpin bends test your riding skills. Stopped at Mapro Garden in Panchgani - the strawberry cream is a must-try. Mahabaleshwar offers numerous viewpoints. Weekend traffic is heavy, so plan accordingly.",
      helpful: 61,
      photos: 8,
      roadCondition: { rating: 4, label: "Good" },
      safety: { rating: 4, label: "Safe" },
      scenic: { rating: 5, label: "Stunning" }
    }
  ],
  3: [
    {
      id: 1,
      userName: "Karthik Reddy",
      userAvatar: "KR",
      rating: 4,
      date: "1 week ago",
      travelDate: "December 2024",
      vehicleType: "Bajaj Pulsar NS200",
      rideType: "Solo",
      review: "Spiritual and scenic journey through Nallamala forest. Watch out for wildlife, especially during early morning and evening hours. The ghat roads are well-maintained but require careful riding. Srisailam temple is magnificent. The view of Krishna River from the dam is breathtaking.",
      helpful: 29,
      photos: 3,
      roadCondition: { rating: 4, label: "Good" },
      safety: { rating: 4, label: "Safe" },
      scenic: { rating: 4, label: "Beautiful" }
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
      review: "Absolutely stunning route! The roads are in excellent condition, especially after Ramanagara. The coffee estates near Coorg are breathtaking. Make sure to stop at Abbey Falls - it's worth the detour. Traffic was minimal on a weekday. Highly recommend this route for both beginners and experienced riders.",
      helpful: 45,
      photos: 3,
      roadCondition: { rating: 5, label: "Excellent" },
      safety: { rating: 5, label: "Very Safe" },
      scenic: { rating: 5, label: "Stunning" }
    },
    {
      id: 2,
      userName: "Priya Sharma",
      userAvatar: "PS",
      rating: 4,
      date: "5 days ago",
      travelDate: "December 2024",
      vehicleType: "Honda CB350",
      rideType: "Group (4 riders)",
      review: "Great ride with friends! The ghat sections have some curves that require attention, but overall the route is manageable. We stayed overnight in Hassan which broke the journey nicely. The weather in December was perfect - cool and pleasant. Only downside was some roadwork near Channarayapatna which caused minor delays.",
      helpful: 32,
      photos: 5,
      roadCondition: { rating: 4, label: "Good" },
      safety: { rating: 4, label: "Safe" },
      scenic: { rating: 5, label: "Stunning" }
    },
    {
      id: 3,
      userName: "Amit Patel",
      userAvatar: "AP",
      rating: 5,
      date: "1 week ago",
      travelDate: "January 2025",
      vehicleType: "KTM Adventure 390",
      rideType: "Solo",
      review: "Rode this route multiple times and it never disappoints. Best time to go is early morning to avoid traffic near Bangalore. The sunrise view from Hassan is amazing. Fuel availability is good - multiple pumps along the way. The food at Hoysala Village restaurant in Hassan is must-try. Roads are well-maintained throughout.",
      helpful: 28,
      photos: 2,
      roadCondition: { rating: 5, label: "Excellent" },
      safety: { rating: 5, label: "Very Safe" },
      scenic: { rating: 4, label: "Beautiful" }
    },
    {
      id: 4,
      userName: "Sneha Reddy",
      userAvatar: "SR",
      rating: 4,
      date: "2 weeks ago",
      travelDate: "December 2024",
      vehicleType: "Bajaj Dominar 400",
      rideType: "Couple",
      review: "Lovely route for a weekend getaway. We took 2 days, stopped at multiple viewpoints and coffee estates. The roads after Hassan get more scenic. Some sections have loose gravel on curves - be careful. Overall a safe and enjoyable ride. Would recommend carrying rain gear even in winter as weather can be unpredictable in hills.",
      helpful: 19,
      photos: 4,
      roadCondition: { rating: 4, label: "Good" },
      safety: { rating: 4, label: "Safe" },
      scenic: { rating: 5, label: "Stunning" }
    }
  ],
  5: [
    {
      id: 1,
      userName: "Suresh Patil",
      userAvatar: "SP",
      rating: 4,
      date: "3 days ago",
      travelDate: "January 2025",
      vehicleType: "Honda Hornet 2.0",
      rideType: "Solo",
      review: "Quick weekend escape from Mumbai. The expressway is fast and smooth, but I prefer the old highway for scenic beauty, especially during monsoon when waterfalls are active. Lonavala gets very crowded on weekends. Try to go on weekdays if possible. Chikki and fudge shopping is a must!",
      helpful: 34,
      photos: 2,
      roadCondition: { rating: 5, label: "Excellent" },
      safety: { rating: 5, label: "Very Safe" },
      scenic: { rating: 4, label: "Beautiful" }
    }
  ],
  6: [
    {
      id: 1,
      userName: "Ramesh Naidu",
      userAvatar: "RN",
      rating: 5,
      date: "5 days ago",
      travelDate: "December 2024",
      vehicleType: "TVS Apache RTR 200",
      rideType: "Solo",
      review: "Excellent highway with rich historical significance. The four-lane road makes for comfortable riding. Warangal Fort and Ramappa Temple are must-visit destinations. The ride is easy and suitable for beginners. Highway has good facilities - plenty of fuel stations and restaurants.",
      helpful: 27,
      photos: 4,
      roadCondition: { rating: 5, label: "Excellent" },
      safety: { rating: 5, label: "Very Safe" },
      scenic: { rating: 3, label: "Average" }
    }
  ],
  7: [
    {
      id: 1,
      userName: "Aditya Rao",
      userAvatar: "AR",
      rating: 5,
      date: "1 day ago",
      travelDate: "January 2025",
      vehicleType: "Royal Enfield Himalayan",
      rideType: "Group (8 riders)",
      review: "Perfect sunrise ride! Start by 5 AM to catch the sunrise. The last 10 km climb is challenging but rewarding. Very crowded on weekends - cars and bikes everywhere. The view from the top is absolutely worth it. Carry warm clothes as it gets quite cold at the peak. Breakfast at Hill View restaurant is good.",
      helpful: 78,
      photos: 9,
      roadCondition: { rating: 4, label: "Good" },
      safety: { rating: 4, label: "Safe" },
      scenic: { rating: 5, label: "Stunning" }
    }
  ],
  8: [
    {
      id: 1,
      userName: "Pooja Joshi",
      userAvatar: "PJ",
      rating: 4,
      date: "1 week ago",
      travelDate: "December 2024",
      vehicleType: "Suzuki Gixxer SF",
      rideType: "Couple",
      review: "Beautiful route through mountains with stunning lake views. Lavasa is like a mini European town - great for photography. The roads can be tricky during monsoon due to landslides. Best visited in winter. Limited food options, so plan accordingly. Water sports activities at Lavasa are fun but expensive.",
      helpful: 23,
      photos: 7,
      roadCondition: { rating: 4, label: "Good" },
      safety: { rating: 4, label: "Safe" },
      scenic: { rating: 5, label: "Stunning" }
    }
  ]
};

const RidaRouteApp = () => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'detail'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' ? (
        <HomePage onRouteClick={handleRouteClick} />
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
const HomePage = ({ onRouteClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filter routes based on search and filters
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Navigation className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">RidaRoute</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">Routes</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Community</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Plan Trip</a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600">Sign In</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4">
              Discover Your Next Adventure
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Community-verified routes, real road conditions, and trusted reviews for motorcyclists and road travelers
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg shadow-lg p-2 flex items-center">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <input
                type="text"
                placeholder="Search routes or destinations..."
                className="flex-1 px-4 py-3 text-gray-900 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 flex items-center space-x-2">
                <span>Search</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8 text-center">
              <div>
                <div className="text-3xl font-bold">150+</div>
                <div className="text-blue-100 text-sm">Verified Routes</div>
              </div>
              <div>
                <div className="text-3xl font-bold">3,200+</div>
                <div className="text-blue-100 text-sm">Community Reviews</div>
              </div>
              <div>
                <div className="text-3xl font-bold">5,000+</div>
                <div className="text-blue-100 text-sm">Active Riders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
            
            <div className="text-sm text-gray-600">
              {filteredRoutes.length} routes found
            </div>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                >
                  <option value="all">All States</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="karnataka">Karnataka</option>
                  <option value="telangana">Telangana</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Challenging">Challenging</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Shortest Distance</option>
                  <option>Longest Distance</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Routes */}
      {featuredRoutes.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-900">Featured Routes</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">All Routes</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allRoutes.map((route) => (
              <RouteCard 
                key={route.id} 
                route={route}
                onClick={() => onRouteClick(route.id)}
              />
            ))}
          </div>

          {filteredRoutes.length === 0 && (
            <div className="text-center py-12">
              <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h4 className="text-xl font-medium text-gray-600 mb-2">No routes found</h4>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

// Route Card Component
const RouteCard = ({ route, featured = false, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow cursor-pointer overflow-hidden ${featured ? 'ring-2 ring-blue-500' : ''}`}
    >
      {/* Route Image Placeholder */}
      <div className="h-48 bg-gradient-to-r from-blue-400 to-blue-600 relative">
        <div className="absolute top-3 right-3">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900">
            {route.difficulty}
          </span>
        </div>
        {featured && (
          <div className="absolute top-3 left-3">
            <span className="bg-yellow-400 px-3 py-1 rounded-full text-sm font-medium text-gray-900 flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>Featured</span>
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h4 className="text-lg font-bold text-gray-900 mb-2">{route.name}</h4>
        
        {/* Start and End */}
        <div className="flex items-start space-x-2 mb-3 text-sm text-gray-600">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <div>{route.start}</div>
            <div className="text-gray-400">to {route.end}</div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{route.description.substring(0, 100)}...</p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-2 mb-4">
          {route.highlights.slice(0, 3).map((highlight, index) => (
            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
              {highlight}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1">
            <Navigation className="w-4 h-4" />
            <span>{route.distance}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{route.duration}</span>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="font-semibold text-gray-900">{route.rating}</span>
            <span className="text-gray-500 text-sm">({route.reviewCount})</span>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ROUTE DETAIL PAGE COMPONENT
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

  // Calculate rating breakdown
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
                  {/* Simulated Map with Route Path */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* Route markers */}
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
                      {/* Simulated route line */}
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
                      onClick={() => {
                        window.scrollTo(0, 0);
                        // This would trigger route change in parent
                      }}
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
        {/* User Avatar */}
        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
          {review.userAvatar}
        </div>

        <div className="flex-1">
          {/* User Info */}
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

          {/* Trip Details */}
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

          {/* Review Text */}
          <p className="text-gray-700 leading-relaxed mb-4">{review.review}</p>

          {/* Condition Ratings */}
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

          {/* Photos Badge */}
          {review.photos > 0 && (
            <div className="flex items-center space-x-2 mb-4">
              <Camera className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">{review.photos} photos</span>
            </div>
          )}

          {/* Helpful Button */}
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
