import bikeStandard from "@/assets/bike-standard.jpg";
import bikeScooter from "@/assets/bike-scooter.jpg";
import bikeElectric from "@/assets/bike-electric.jpg";

export const AREAS = [
  "Tanta",
  "Cairo",
  "Giza",
  "Alexandria",
  "Mansoura",
  "Zagazig",
  "6th of October",
  "Nasr City",
  "New Cairo",
] as const;

export const BIKE_TYPES = [
  "Standard",
  "Scooter",
  "Delivery Bike",
  "Electric Motorcycle",
  "Sport/Commuter",
] as const;

export const FUEL_TYPES = ["Petrol", "Electric"] as const;
export const RENTAL_PERIODS = ["Daily", "Weekly", "Monthly"] as const;
export const WORKING_HOURS = ["Part-time", "Full-time", "Flexible"] as const;

export const REQUIREMENTS = [
  "Helmet included",
  "Delivery box included",
  "Maintenance included",
  "Insurance/coverage included",
  "Registration verified",
] as const;

export type Motorcycle = {
  id: string;
  brand: string;
  model: string;
  year: number;
  type: (typeof BIKE_TYPES)[number];
  fuel: (typeof FUEL_TYPES)[number];
  transmission: "Manual" | "Automatic";
  engine: string;
  consumption: string;
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  deposit: number;
  location: (typeof AREAS)[number];
  availability: "Available now" | "Available in 3 days" | "Rented";
  deliveryReady: boolean;
  helmet: boolean;
  deliveryBox: boolean;
  maintenanceIncluded: boolean;
  insurance: boolean;
  registrationVerified: boolean;
  rating: number;
  reviews: number;
  owner: { name: string; type: "Individual owner" | "Fleet partner"; verified: boolean; phone: string };
  image: string;
  storage: string;
  comfortableHours: string;
  operatingCostPerDay: number;
  fuelCostPerDay: number;
  maintenanceStatus: string;
  highlights: string[];
  workingHours: (typeof WORKING_HOURS)[number][];
  matchScore: number;
  matchReasons: string[];
};

export const MOTORCYCLES: Motorcycle[] = [
  {
    id: "boxer-150-tanta",
    brand: "Bajaj",
    model: "Boxer 150",
    year: 2023,
    type: "Standard",
    fuel: "Petrol",
    transmission: "Manual",
    engine: "150cc / 13.8 hp",
    consumption: "35–40 km/L",
    pricePerDay: 120,
    pricePerWeek: 760,
    pricePerMonth: 2900,
    deposit: 2000,
    location: "Tanta",
    availability: "Available now",
    deliveryReady: true,
    helmet: true,
    deliveryBox: true,
    maintenanceIncluded: true,
    insurance: false,
    registrationVerified: true,
    rating: 4.7,
    reviews: 64,
    owner: { name: "Ahmed Fleet Services", type: "Fleet partner", verified: true, phone: "010 2xxx xxxx" },
    image: bikeStandard,
    storage: "Rear box 60 L + side rack",
    comfortableHours: "8–10 hours per day",
    operatingCostPerDay: 75,
    fuelCostPerDay: 60,
    maintenanceStatus: "Serviced 900 km ago — next oil change in 1,100 km",
    highlights: [
      "Low fuel consumption for long shifts",
      "Cheap and widely available spare parts",
      "Delivery box already mounted",
    ],
    workingHours: ["Full-time", "Part-time", "Flexible"],
    matchScore: 92,
    matchReasons: [
      "Same working area (Tanta)",
      "Accepted by food delivery platforms",
      "Fits your preferred evening shift",
      "Within your daily budget",
    ],
  },
  {
    id: "scooter-city-cairo",
    brand: "SYM",
    model: "Jet City 150",
    year: 2024,
    type: "Scooter",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "150cc / 12 hp",
    consumption: "32–36 km/L",
    pricePerDay: 180,
    pricePerWeek: 1150,
    pricePerMonth: 4300,
    deposit: 2500,
    location: "Nasr City",
    availability: "Available now",
    deliveryReady: true,
    helmet: true,
    deliveryBox: true,
    maintenanceIncluded: true,
    insurance: true,
    registrationVerified: true,
    rating: 4.8,
    reviews: 41,
    owner: { name: "CityRide Fleet", type: "Fleet partner", verified: true, phone: "011 4xxx xxxx" },
    image: bikeScooter,
    storage: "Top box 55 L + under-seat storage",
    comfortableHours: "9–11 hours per day",
    operatingCostPerDay: 85,
    fuelCostPerDay: 70,
    maintenanceStatus: "Full service completed 2 weeks ago",
    highlights: [
      "Automatic — easier in heavy traffic",
      "Optimised for dense city delivery",
      "Insurance coverage included",
    ],
    workingHours: ["Full-time", "Flexible"],
    matchScore: 84,
    matchReasons: [
      "Automatic transmission matches your preference",
      "High job density in Nasr City",
      "Insurance included",
    ],
  },
  {
    id: "electric-urban-giza",
    brand: "Volta",
    model: "E-Urban 3000",
    year: 2025,
    type: "Electric Motorcycle",
    fuel: "Electric",
    transmission: "Automatic",
    engine: "3 kW motor / 72V battery",
    consumption: "~90 km per charge",
    pricePerDay: 220,
    pricePerWeek: 1400,
    pricePerMonth: 5200,
    deposit: 3000,
    location: "Giza",
    availability: "Available now",
    deliveryReady: true,
    helmet: true,
    deliveryBox: true,
    maintenanceIncluded: true,
    insurance: true,
    registrationVerified: true,
    rating: 4.6,
    reviews: 27,
    owner: { name: "Volta Rider Hub", type: "Fleet partner", verified: true, phone: "012 8xxx xxxx" },
    image: bikeElectric,
    storage: "Cargo box 70 L",
    comfortableHours: "7–9 hours per charge cycle",
    operatingCostPerDay: 45,
    fuelCostPerDay: 25,
    maintenanceStatus: "Battery health 96% — checked this week",
    highlights: [
      "Lowest running cost per day",
      "Charging support at partner hubs",
      "Quiet and simple to operate",
    ],
    workingHours: ["Part-time", "Full-time", "Flexible"],
    matchScore: 78,
    matchReasons: [
      "Very low operating cost",
      "Charging hub near your area",
      "Range fits part-time shifts",
    ],
  },
  {
    id: "delivery-bike-alex",
    brand: "Halawa",
    model: "Cargo 150",
    year: 2022,
    type: "Delivery Bike",
    fuel: "Petrol",
    transmission: "Manual",
    engine: "150cc / 12.5 hp",
    consumption: "30–34 km/L",
    pricePerDay: 110,
    pricePerWeek: 700,
    pricePerMonth: 2650,
    deposit: 1500,
    location: "Alexandria",
    availability: "Available now",
    deliveryReady: true,
    helmet: false,
    deliveryBox: true,
    maintenanceIncluded: false,
    insurance: false,
    registrationVerified: true,
    rating: 4.3,
    reviews: 88,
    owner: { name: "Mostafa Saleh", type: "Individual owner", verified: true, phone: "010 9xxx xxxx" },
    image: bikeStandard,
    storage: "Reinforced cargo rack 80 L",
    comfortableHours: "8 hours per day",
    operatingCostPerDay: 80,
    fuelCostPerDay: 65,
    maintenanceStatus: "Brake pads replaced last month",
    highlights: [
      "Largest cargo capacity in this price range",
      "Built for grocery and pharmacy runs",
      "Lowest daily price available now",
    ],
    workingHours: ["Full-time", "Flexible"],
    matchScore: 71,
    matchReasons: ["Cheapest daily rate", "Large cargo capacity", "Registration verified"],
  },
  {
    id: "commuter-mansoura",
    brand: "Honda",
    model: "CB 125F",
    year: 2023,
    type: "Sport/Commuter",
    fuel: "Petrol",
    transmission: "Manual",
    engine: "125cc / 11 hp",
    consumption: "40–45 km/L",
    pricePerDay: 145,
    pricePerWeek: 930,
    pricePerMonth: 3500,
    deposit: 2200,
    location: "Mansoura",
    availability: "Available in 3 days",
    deliveryReady: true,
    helmet: true,
    deliveryBox: false,
    maintenanceIncluded: true,
    insurance: false,
    registrationVerified: true,
    rating: 4.5,
    reviews: 33,
    owner: { name: "Delta Bikes", type: "Fleet partner", verified: true, phone: "015 1xxx xxxx" },
    image: bikeElectric,
    storage: "Rear rack — box can be added",
    comfortableHours: "8–10 hours per day",
    operatingCostPerDay: 65,
    fuelCostPerDay: 50,
    maintenanceStatus: "Scheduled service in 2 weeks",
    highlights: [
      "Best fuel economy in the list",
      "Comfortable for long shifts",
      "Maintenance included in the rent",
    ],
    workingHours: ["Part-time", "Flexible"],
    matchScore: 68,
    matchReasons: ["Low fuel cost", "Maintenance included", "Available within 3 days"],
  },
  {
    id: "scooter-october",
    brand: "Piaggio",
    model: "Liberty 150",
    year: 2024,
    type: "Scooter",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "150cc / 12.9 hp",
    consumption: "33–37 km/L",
    pricePerDay: 260,
    pricePerWeek: 1650,
    pricePerMonth: 6100,
    deposit: 3500,
    location: "6th of October",
    availability: "Rented",
    deliveryReady: true,
    helmet: true,
    deliveryBox: true,
    maintenanceIncluded: true,
    insurance: true,
    registrationVerified: true,
    rating: 4.9,
    reviews: 19,
    owner: { name: "October Fleet Co.", type: "Fleet partner", verified: true, phone: "010 6xxx xxxx" },
    image: bikeScooter,
    storage: "Top box 60 L",
    comfortableHours: "10 hours per day",
    operatingCostPerDay: 90,
    fuelCostPerDay: 72,
    maintenanceStatus: "Under full service contract",
    highlights: [
      "Premium condition, latest model",
      "Full maintenance and insurance package",
      "Highest rated fleet partner",
    ],
    workingHours: ["Full-time"],
    matchScore: 61,
    matchReasons: ["Highest rated fleet", "Full coverage package"],
  },
];

export type Job = {
  id: string;
  title: string;
  company: string;
  location: (typeof AREAS)[number];
  workType: "Full-time" | "Part-time" | "Flexible";
  shift: string;
  earnings: string;
  category: string;
  requirements: string[];
  matchScore: number;
  matchReasons: string[];
  posted: string;
};

export const JOBS: Job[] = [
  {
    id: "food-tanta",
    title: "Delivery Rider",
    company: "Local Food Delivery",
    location: "Tanta",
    workType: "Full-time",
    shift: "6 PM – 12 AM",
    earnings: "350–500 EGP/day",
    category: "Food delivery",
    requirements: ["Motorcycle", "Smartphone", "Delivery experience preferred"],
    matchScore: 92,
    matchReasons: [
      "Same working area",
      "Motorcycle type accepted",
      "Preferred working hours match",
      "Experience requirement satisfied",
    ],
    posted: "Posted 2 days ago",
  },
  {
    id: "pharmacy-cairo",
    title: "Pharmacy Courier",
    company: "SehaLine Pharmacies",
    location: "Cairo",
    workType: "Part-time",
    shift: "9 AM – 3 PM",
    earnings: "220–300 EGP/day",
    category: "Pharmacy",
    requirements: ["Motorcycle", "Delivery box", "Clean record"],
    matchScore: 81,
    matchReasons: ["Delivery box available on your bike", "Morning shift matches availability"],
    posted: "Posted 4 days ago",
  },
  {
    id: "grocery-giza",
    title: "Grocery Delivery Rider",
    company: "FreshCart",
    location: "Giza",
    workType: "Flexible",
    shift: "Choose your own slots",
    earnings: "280–420 EGP/day",
    category: "Grocery",
    requirements: ["Motorcycle with cargo box", "Smartphone", "Own helmet"],
    matchScore: 76,
    matchReasons: ["Flexible shifts", "Cargo capacity requirement met"],
    posted: "Posted today",
  },
  {
    id: "ecom-nasr",
    title: "E-commerce Last-Mile Rider",
    company: "Sandook Logistics",
    location: "Nasr City",
    workType: "Full-time",
    shift: "10 AM – 7 PM",
    earnings: "9,000–12,000 EGP/month",
    category: "E-commerce",
    requirements: ["Motorcycle", "ID documents", "6 months experience"],
    matchScore: 69,
    matchReasons: ["Monthly contract available", "Bike type accepted"],
    posted: "Posted 1 week ago",
  },
  {
    id: "darkkitchen-mansoura",
    title: "Dark Kitchen Rider",
    company: "Kitchen 24",
    location: "Mansoura",
    workType: "Part-time",
    shift: "7 PM – 1 AM",
    earnings: "260–380 EGP/day",
    category: "Food delivery",
    requirements: ["Motorcycle", "Smartphone"],
    matchScore: 64,
    matchReasons: ["Evening shift", "No experience required"],
    posted: "Posted 3 days ago",
  },
];

export type MaintenanceProvider = {
  id: string;
  name: string;
  distanceKm: number;
  rating: number;
  reviews: number;
  services: string[];
  startingPrice: number;
  hours: string;
  verified: boolean;
  area: (typeof AREAS)[number];
};

export const MAINTENANCE_CATEGORIES = [
  "Oil Change",
  "Tires",
  "Brakes",
  "Battery",
  "Engine",
  "Electrical",
  "Inspection",
  "General Service",
] as const;

export const PROVIDERS: MaintenanceProvider[] = [
  {
    id: "elsherbiny",
    name: "El Sherbiny Motors",
    distanceKm: 1.2,
    rating: 4.8,
    reviews: 212,
    services: ["Oil Change", "Brakes", "General Service"],
    startingPrice: 120,
    hours: "9 AM – 10 PM",
    verified: true,
    area: "Tanta",
  },
  {
    id: "rider-garage",
    name: "Rider Garage",
    distanceKm: 2.6,
    rating: 4.6,
    reviews: 148,
    services: ["Engine", "Electrical", "Inspection"],
    startingPrice: 200,
    hours: "10 AM – 9 PM",
    verified: true,
    area: "Tanta",
  },
  {
    id: "hassan-tires",
    name: "Hassan Tires & Brakes",
    distanceKm: 3.4,
    rating: 4.4,
    reviews: 96,
    services: ["Tires", "Brakes"],
    startingPrice: 90,
    hours: "8 AM – 8 PM",
    verified: false,
    area: "Cairo",
  },
  {
    id: "volt-service",
    name: "Volt E-Bike Service",
    distanceKm: 5.1,
    rating: 4.7,
    reviews: 58,
    services: ["Battery", "Electrical", "Inspection"],
    startingPrice: 150,
    hours: "10 AM – 8 PM",
    verified: true,
    area: "Giza",
  },
  {
    id: "delta-quick",
    name: "Delta Quick Service",
    distanceKm: 6.8,
    rating: 4.2,
    reviews: 74,
    services: ["Oil Change", "General Service", "Engine"],
    startingPrice: 110,
    hours: "24 hours",
    verified: true,
    area: "Mansoura",
  },
];

export const formatEGP = (value: number) =>
  `${Math.round(value).toLocaleString("en-US")} EGP`;
