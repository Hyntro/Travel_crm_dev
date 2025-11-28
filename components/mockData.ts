
import { Country, State, City, LeadSource, BusinessType, MarketType, Destination, Language, Commission, Division, Season, TourType, RoomType, Amenity, HotelCategory, HotelType, HotelMealPlan, Weekend, HotelMaster, HotelChain, Restaurant, RestaurantMealPlan, Monument } from '../types';

export const initialCountries: Country[] = [
  { id: '1', name: 'India', shortName: 'IND', code: '+91', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: '2', name: 'United States', shortName: 'USA', code: '+1', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: '3', name: 'United Kingdom', shortName: 'UK', code: '+44', createdBy: 'Sarah Smith', modifiedBy: 'Sarah Smith', status: 'Inactive' },
];

export const initialStates: State[] = [
  { id: 's1', name: 'Maharashtra', countryId: '1', countryName: 'India', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 's2', name: 'California', countryId: '2', countryName: 'United States', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 's3', name: 'Delhi', countryId: '1', countryName: 'India', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
];

export const initialCities: City[] = [
  { id: 'c1', name: 'Mumbai', stateId: 's1', stateName: 'Maharashtra', countryId: '1', countryName: 'India', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'c2', name: 'Pune', stateId: 's1', stateName: 'Maharashtra', countryId: '1', countryName: 'India', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'c3', name: 'Los Angeles', stateId: 's2', stateName: 'California', countryId: '2', countryName: 'United States', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
];

export const initialLeadSources: LeadSource[] = [
  { id: 'ls1', name: 'Website', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'ls2', name: 'Referral', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 'ls3', name: 'Social Media', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Inactive' },
  { id: 'ls4', name: 'Walk-In', createdBy: 'Staff', modifiedBy: 'Staff', status: 'Active' },
];

export const initialBusinessTypes: BusinessType[] = [
  { id: 'bt1', name: 'B2B', isDefault: 'Yes', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'bt2', name: 'B2C', isDefault: 'No', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'bt3', name: 'Corporate', isDefault: 'No', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
];

export const initialMarketTypes: MarketType[] = [
  { id: 'mt1', name: 'Domestic', color: '#3b82f6', isDefault: 'Yes', addedBy: 'Admin', dateAdded: '2024-01-15', status: 'Active' },
  { id: 'mt2', name: 'International', color: '#ef4444', isDefault: 'No', addedBy: 'Admin', dateAdded: '2024-01-20', status: 'Active' },
  { id: 'mt3', name: 'Inbound', color: '#10b981', isDefault: 'No', addedBy: 'System', dateAdded: '2024-02-10', status: 'Active' },
];

export const initialDestinations: Destination[] = [
  { id: 'd1', serviceCode: 'DEST001', countryId: '1', countryName: 'India', name: 'Jaipur', airportCode: 'JAI', latitude: '26.9124', longitude: '75.7873', description: 'The Pink City of India.', weatherInfo: 'Hot summers, pleasant winters.', additionalInfo: 'Famous for palaces.', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'd2', serviceCode: 'DEST002', countryId: '2', countryName: 'United States', name: 'New York', airportCode: 'JFK', latitude: '40.7128', longitude: '-74.0060', description: 'The city that never sleeps.', weatherInfo: 'Four distinct seasons.', additionalInfo: 'Statue of Liberty.', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
];

export const initialLanguages: Language[] = [
  { id: 'l1', name: 'English', value: 'ENG', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'l2', name: 'Hindi', value: 'HIN', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 'l3', name: 'French', value: 'FRE', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Inactive' },
];

export const initialCommissions: Commission[] = [
  { id: 'com1', name: 'Standard Agent', percentage: '10', status: 'Active' },
  { id: 'com2', name: 'Preferred Partner', percentage: '15', status: 'Active' },
];

export const initialDivisions: Division[] = [
  { id: 'div1', division: 'Outbound', keyword: 'OB', name: 'Outbound Division', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'div2', division: 'Inbound', keyword: 'IB', name: 'Inbound Division', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
];

export const initialSeasons: Season[] = [
  { id: 'sea1', name: 'Summer', fromDate: '2025-04-01', toDate: '2025-06-30', status: 'Active' },
  { id: 'sea2', name: 'Winter', fromDate: '2025-10-01', toDate: '2025-02-28', status: 'Active' },
];

export const initialTourTypes: TourType[] = [
  { id: 'tt1', name: 'Inbound', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'tt2', name: 'Outbound', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 'tt3', name: 'Domestic', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
];

export const initialRoomTypes: RoomType[] = [
  { id: 'rt1', name: 'Standard Room', info: 'Basic amenities', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'rt2', name: 'Deluxe Room', info: 'City view', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 'rt3', name: 'Suite', info: 'Luxury suite with balcony', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
];

export const initialAmenities: Amenity[] = [
  { id: 'am1', name: 'WiFi', image: '', isDefault: true, createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'am2', name: 'Swimming Pool', image: '', isDefault: false, createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 'am3', name: 'Gym', image: '', isDefault: false, createdBy: 'Admin', modifiedBy: 'Admin', status: 'Inactive' },
];

export const initialHotelCategories: HotelCategory[] = [
  { id: 'hc1', categoryName: 'Luxury', starCategory: '5 Star', keyword: 'LUX', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'hc2', categoryName: 'Premium', starCategory: '4 Star', keyword: 'PREM', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 'hc3', categoryName: 'Economy', starCategory: '3 Star', keyword: 'ECO', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
];

export const initialHotelTypes: HotelType[] = [
  { id: 'ht1', name: 'High Rise', keyword: 'HR', isHouseBoat: 'No', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'ht2', name: 'Houseboat', keyword: 'HB', isHouseBoat: 'Yes', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 'ht3', name: 'Resort', keyword: 'RST', isHouseBoat: 'No', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
];

export const initialHotelMealPlans: HotelMealPlan[] = [
  { id: 'mp1', name: 'CP', voucherName: 'Continental Plan (Breakfast)', isDefault: true, createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'mp2', name: 'MAP', voucherName: 'Modified American Plan (Breakfast + Dinner)', isDefault: false, createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 'mp3', name: 'AP', voucherName: 'American Plan (Breakfast + Lunch + Dinner)', isDefault: false, createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'mp4', name: 'EP', voucherName: 'European Plan (Room Only)', isDefault: false, createdBy: 'System', modifiedBy: 'System', status: 'Active' },
];

export const initialWeekends: Weekend[] = [
  { id: 'w1', name: 'Standard Weekend', days: 'Saturday, Sunday', status: 'Active' },
  { id: 'w2', name: 'Middle East Weekend', days: 'Friday, Saturday', status: 'Active' },
  { id: 'w3', name: 'Sunday Only', days: 'Sunday', status: 'Active' },
];

export const mockAmenitiesList = [
  '24-hour Reception', 'AC Rooms', 'All Meal', 'Bar', 'Basic Toiletries', 'Breakfast', 
  'Card Accepted', 'Casino', 'Coffee/tea in lobby', 'Free Wi-Fi', 'Fridge', 'Garden', 
  'Kids Zone', 'Laundry', 'Meeting Room', 'Parking', 'Restaurant', 'Room Service', 
  'Safe', 'Spa', 'Swimming pool', 'Tea/coffee machines', 'Terrace', 'TV'
];

export const mockRoomTypesList = [
  'AC Delux', 'AC Superior', 'AC Villa', 'City Suite', 'Classic Cottage', 'Club Room',
  'Deluxe', 'Deluxe Garden View', 'Deluxe Lake View', 'Deluxe Pool View', 'Executive',
  'Executive Suite', 'Family Suite', 'Garden Room', 'Heritage Room', 'Junior Suite',
  'Luxury Room', 'Maharaja Suite', 'Premium Room', 'Presidential Suite', 'Royal Suite',
  'Standard', 'Suite', 'Super Deluxe', 'Superior', 'Tent', 'Villa'
];

export const initialHotels: HotelMaster[] = [
  {
    id: 'h1',
    chain: 'Taj Hotels',
    name: 'Taj Mahal Palace',
    destination: 'Mumbai',
    category: '5 Star',
    type: 'Luxury',
    email: 'reservations@tajhotels.com',
    website: 'www.tajhotels.com',
    weekendDays: 'Saturday, Sunday',
    checkInTime: '14:00',
    checkOutTime: '12:00',
    status: 'Active',
    amenities: ['Free Wi-Fi', 'Swimming pool', 'Spa', 'Restaurant'],
    roomTypes: ['Deluxe', 'Luxury Room', 'Suite'],
    selfSupplier: 'Yes',
    country: 'India',
    state: 'Maharashtra',
    city: 'Mumbai',
    pinCode: '400001',
    phone: '+91 22 6665 3366',
    address: 'Apollo Bunder, Colaba',
    gstn: '27AAACT2874M1Z2',
    contacts: [{
      id: 'c1', title: 'Mr.', firstName: 'Rahul', lastName: 'Verma', designation: 'GM', 
      countryCode: '+91', phone1: '9876543210', email: 'rahul.v@taj.com', isForContactList: true
    }],
    description: 'Iconic hotel by the sea.',
    policy: 'Cancellation 24hrs prior.',
    terms: 'Standard terms apply.',
    images: [],
    verified: 'Yes',
    internalNote: 'High priority partner.'
  }
];

export const initialHotelChains: HotelChain[] = [
  {
    id: 'hc1',
    name: 'Taj Hotels',
    destinations: 'Mumbai, Delhi, Jaipur',
    website: 'www.tajhotels.com',
    location: 'Mumbai',
    status: 'Active',
    createdBy: 'Admin',
    modifiedBy: 'Admin',
    contacts: [
      { id: 'cc1', division: 'Sales', title: 'Mr.', name: 'Amit Singh', designation: 'Sales Head', countryCode: '+91', phone: '9876543210', email: 'amit@taj.com', isPrimary: true }
    ]
  },
  {
    id: 'hc2',
    name: 'Oberoi Hotels',
    destinations: 'Agra, Udaipur',
    website: 'www.oberoihotels.com',
    location: 'Delhi',
    status: 'Active',
    createdBy: 'System',
    modifiedBy: 'System',
    contacts: []
  }
];

export const initialRestaurants: Restaurant[] = [
  {
    id: 'r1',
    name: '1135 AD',
    destination: 'Jaipur',
    address: 'Amber Fort, Jaipur',
    country: 'India',
    state: 'Rajasthan',
    city: 'Jaipur',
    pinCode: '302001',
    gstn: '08AAACR1234A1Z5',
    supplier: 'Yes',
    status: 'Active',
    contact: {
      title: 'Mr.',
      name: 'Sanjay Sharma',
      designation: 'Manager',
      countryCode: '+91',
      phone1: '9829012345',
      email: 'manager@1135ad.com'
    }
  }
];

export const initialRestaurantMealPlans: RestaurantMealPlan[] = [
  { id: 'rm1', name: 'Breakfast', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'rm2', name: 'Lunch', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
  { id: 'rm3', name: 'Dinner', createdBy: 'System', modifiedBy: 'System', status: 'Active' },
  { id: 'rm4', name: 'Hi-Tea', createdBy: 'Admin', modifiedBy: 'Admin', status: 'Active' },
];

export const initialMonuments: Monument[] = [
  {
    id: 'm1',
    serviceCode: 'M001',
    name: 'Taj Mahal',
    destinationId: 'd1',
    destinationName: 'Jaipur', // Just for mock demo, typically Agra
    description: 'A white marble mausoleum.',
    closedDays: 'Friday',
    isDefault: 'No',
    showInProposal: 'Yes',
    status: 'Active',
    languages: 'English, Hindi, French'
  },
  {
    id: 'm2',
    serviceCode: 'M002',
    name: 'Amber Fort',
    destinationId: 'd1',
    destinationName: 'Jaipur',
    description: 'Historic fort located in Amer.',
    closedDays: 'None',
    isDefault: 'Yes',
    showInProposal: 'Yes',
    status: 'Active',
    languages: 'English, Hindi'
  }
];
