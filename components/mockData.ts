
import { 
  TransferMaster, TransportationMaster, City, Country, State, 
  LeadSource, BusinessType, MarketType, Destination, Language, 
  Commission, Division, Season, TourType, RoomType, Amenity, 
  HotelCategory, HotelType, HotelMealPlan, Weekend, HotelMaster, 
  HotelChain, Restaurant, RestaurantMealPlan, Monument, 
  MonumentPackage, ActivityMaster, Enroute, TransferType,
  SightseeingActivity, CityDistance, VehicleType, Driver, Fleet,
  Airline, FlightSeatClass, FlightMaster, TrainMaster, Guide,
  GuideTariff, AdditionalRequirement, ItineraryInfoMaster
} from '../types';

export const initialTransfers: TransferMaster[] = [
  {
    id: 'tm1',
    name: 'Airport Pick-up',
    destinationId: 'd1',
    destinationName: 'Jaipur',
    transferType: 'Private Transfer',
    description: 'Pick up from airport to hotel.',
    internalNote: 'Standard sedan vehicle.',
    status: 'Active'
  }
];

export const initialTransportations: TransportationMaster[] = [
  {
    id: 'tr1',
    name: 'Luxury Bus Service',
    destinationId: 'd1',
    destinationName: 'Jaipur',
    transferType: 'Shuttle Service',
    description: 'AC Coach for city tour.',
    internalNote: 'Vendor: ABC Travels',
    status: 'Active'
  }
];

export const initialCountries: Country[] = [
  { id: '1', name: 'India', shortName: 'IN', code: '+91', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '2', name: 'USA', shortName: 'US', code: '+1', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '3', name: 'UK', shortName: 'UK', code: '+44', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialStates: State[] = [
  { id: 's1', name: 'Rajasthan', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 's2', name: 'Maharashtra', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialCities: City[] = [
  { id: 'c1', name: 'Jaipur', stateId: 's1', stateName: 'Rajasthan', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'c2', name: 'Mumbai', stateId: 's2', stateName: 'Maharashtra', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'c3', name: 'Delhi', stateId: 's3', stateName: 'Delhi', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialLeadSources: LeadSource[] = [
  { id: 'ls1', name: 'Website', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'ls2', name: 'Referral', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialBusinessTypes: BusinessType[] = [
  { id: 'bt1', name: 'B2B', isDefault: 'Yes', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'bt2', name: 'B2C', isDefault: 'No', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialMarketTypes: MarketType[] = [
  { id: 'mt1', name: 'Domestic', color: '#ff0000', isDefault: 'Yes', status: 'Active', addedBy: 'Admin', dateAdded: '2023-01-01' },
];

export const initialDestinations: Destination[] = [
  { id: 'd1', serviceCode: 'DST001', name: 'Jaipur', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'd2', serviceCode: 'DST002', name: 'Delhi', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'd3', serviceCode: 'DST003', name: 'Abhaneri', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialLanguages: Language[] = [
  { id: 'l1', name: 'English', value: 'en', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialCommissions: Commission[] = [
  { id: 'cm1', name: 'Standard', percentage: 10, status: 'Active' },
];

export const initialDivisions: Division[] = [
  { id: 'div1', name: 'Sales', division: 'Sales', keyword: 'sales', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialSeasons: Season[] = [
  { id: 'sea1', name: 'Winter', fromDate: '2023-10-01', toDate: '2024-03-31', status: 'Active' },
];

export const initialTourTypes: TourType[] = [
  { id: 'tt1', name: 'Adventure', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'tt2', name: 'Leisure', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialRoomTypes: RoomType[] = [
  { id: 'rt1', name: 'Standard', info: 'Basic room', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'rt2', name: 'Deluxe', info: 'Better view', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialAmenities: Amenity[] = [
  { id: 'am1', name: 'WiFi', image: '', isDefault: true, status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialHotelCategories: HotelCategory[] = [
  { id: 'hc1', categoryName: '3 Star', starCategory: '3 Star', keyword: '3star', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'hc2', categoryName: '4 Star', starCategory: '4 Star', keyword: '4star', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'hc3', categoryName: '5 Star', starCategory: '5 Star', keyword: '5star', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialHotelTypes: HotelType[] = [
  { id: 'ht1', name: 'Business', keyword: 'business', isHouseBoat: 'No', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialHotelMealPlans: HotelMealPlan[] = [
  { id: 'hmp1', name: 'CP', voucherName: 'Continental Plan', isDefault: true, status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
];

export const initialWeekends: Weekend[] = [
  { id: 'w1', name: 'Standard Weekend', days: 'Saturday, Sunday', status: 'Active' },
];

export const initialHotels: HotelMaster[] = [
  {
    id: 'h1', name: 'Hotel Royal', chain: 'Independent', destination: 'Jaipur', category: '4 Star', type: 'Business',
    email: 'info@royal.com', website: 'www.royal.com', weekendDays: 'SS', checkInTime: '12:00', checkOutTime: '11:00',
    amenities: ['WiFi', 'Pool'], roomTypes: ['Deluxe'], selfSupplier: 'Yes', country: 'India', state: 'Rajasthan', city: 'Jaipur',
    pinCode: '302001', phone: '1234567890', address: 'Main Road', gstn: 'GST123', status: 'Active', contacts: []
  }
];

export const mockAmenitiesList = ['WiFi', 'Pool', 'Gym', 'Spa', 'Parking', 'Restaurant'];
export const mockRoomTypesList = ['Standard', 'Deluxe', 'Suite', 'Family Room'];

export const initialHotelChains: HotelChain[] = [
  { id: 'chain1', name: 'Taj Hotels', location: 'Mumbai', status: 'Active', contacts: [], createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialRestaurants: Restaurant[] = [
  { 
    id: 'r1', name: 'Spice Garden', destination: 'Jaipur', address: 'Civil Lines', status: 'Active', 
    contact: { title: 'Mr', name: 'Raj', designation: 'Manager', countryCode: '+91', phone1: '9876543210', email: 'raj@spice.com' } 
  }
];

export const initialRestaurantMealPlans: RestaurantMealPlan[] = [
  { id: 'rmp1', name: 'Buffet Lunch', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialMonuments: Monument[] = [
  { id: 'm1', serviceCode: 'MON001', name: 'Amber Fort', destinationId: 'd1', destinationName: 'Jaipur', status: 'Active' }
];

export const initialMonumentPackages: MonumentPackage[] = [
  { id: 'mp1', name: 'Jaipur Heritage', destinationId: 'd1', destinationName: 'Jaipur', serviceType: 'Entrance', services: [], status: 'Active' }
];

export const initialActivities: SightseeingActivity[] = [
  { id: 'a1', name: 'Elephant Ride', destinationId: 'd1' }
];

export const initialActivitiesMasterList: ActivityMaster[] = [
  { id: 'act1', serviceCode: 'ACT001', name: 'Hot Air Balloon', type: 'Activity', destinationId: 'd1', destinationName: 'Jaipur', supplierName: 'Sky High', isDefault: 'No', status: 'Active' }
];

export const initialEnroutes: Enroute[] = [
  { id: 'e1', serviceCode: 'ENR001', name: 'Midway Treat', supplierName: 'Highway Inn', gstSlab: '5%', currency: 'INR', isDefault: 'No', destinationId: 'd1', destinationName: 'Jaipur', status: 'Active' }
];

export const initialTransferTypes: TransferType[] = [
  { id: 'tt1', name: 'Airport Transfer', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialCityDistances: CityDistance[] = [
  { 
    id: 'cd1', 
    fromDestinationId: 'd1', 
    fromDestinationName: 'Jaipur', 
    toDestinations: [
      { destinationId: 'd2', destinationName: 'Delhi', km: 280 }
    ],
    status: 'Active' 
  }
];

export const initialVehicleTypes: VehicleType[] = [
  { 
    id: 'vt1', 
    name: 'Sedan', 
    capacity: '4', 
    status: 'Active', 
    createdBy: 'Admin', 
    modifiedBy: 'Admin' 
  },
  { 
    id: 'vt2', 
    name: 'SUV', 
    capacity: '6', 
    status: 'Active', 
    createdBy: 'Admin', 
    modifiedBy: 'Admin' 
  }
];

export const initialDrivers: Driver[] = [
  {
    id: 'dr1',
    name: 'Ramesh Kumar',
    dob: '1985-05-15',
    licenseNumber: 'RJ1420100055',
    validUpto: '2025-05-15',
    mobile: '9876543210',
    status: 'Active',
    vehicleType: 'Sedan'
  }
];

export const initialFleets: Fleet[] = [
  {
    id: 'fl1',
    vehicleType: 'Sedan',
    brandName: 'Toyota Etios',
    registrationNumber: 'RJ14 CA 1234',
    ownerName: 'Travel Agency',
    fuelType: 'Diesel',
    assignedDriver: 'Ramesh Kumar',
    status: 'Active'
  }
];

export const initialAirlines: Airline[] = [
  { id: '1', name: 'Indigo', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '2', name: 'Air India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialFlightSeatClasses: FlightSeatClass[] = [
  { id: 'fsc1', name: 'Economy', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: 'fsc2', name: 'Business', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialFlights: FlightMaster[] = [
  {
    id: 'fl1',
    airlineId: '1',
    airlineName: 'Indigo',
    flightNumber: '6E 202',
    fromDestinationId: 'd1',
    fromDestinationName: 'Jaipur',
    toDestinationId: 'd2',
    toDestinationName: 'Delhi',
    departureTime: '10:00',
    arrivalTime: '11:00',
    daysOfOperation: 'Daily',
    status: 'Active'
  }
];

export const initialTrains: TrainMaster[] = [
  {
    id: 'tr1',
    name: 'Dibrugarh',
    number: '12423 / 12424, 20503 / 20504',
    fromDestinationId: 'd2',
    fromDestinationName: 'Delhi',
    toDestinationId: 'd1',
    toDestinationName: 'Jaipur',
    daysOfOperation: 'Daily',
    cancellationPolicy: '',
    remarks: '',
    status: 'Active'
  }
];

export const initialGuides: Guide[] = [
    {
        id: 'g1',
        name: 'Suresh Sharma',
        serviceType: 'Guide',
        mobile: '9876543210',
        email: 'suresh@guide.com',
        languages: 'English, Hindi, French',
        destinationName: 'Jaipur',
        status: 'Active',
        rating: '5 Star',
        address: 'Hawa Mahal Road, Jaipur'
    }
];

export const initialGuideTariffs: GuideTariff[] = [
  {
    id: 'gt1',
    guideId: 'g1',
    supplierName: '1589 Gen X',
    validFrom: '09-09-2024',
    validTo: '26-09-2024',
    paxRange: 'All',
    dayType: 'Half Day',
    universalCost: 'Yes',
    currency: 'AED',
    serviceCost: 50,
    languageAllowance: 0,
    otherCost: 0,
    gstSlab: 'Slab 5',
    status: 'Active'
  }
];

export const initialAdditionalRequirements: AdditionalRequirement[] = [
  {
    id: 'ar1',
    serviceType: 'Visa',
    name: 'Indian E-Visa',
    destinationId: 'd1',
    destinationName: 'India',
    currency: 'USD',
    costType: 'Per Person',
    adultCost: 25,
    childCost: 25,
    groupCost: 0,
    displayName: 'E-Visa Fees',
    showInProposal: 'Yes',
    status: 'Active',
    description: 'Standard e-visa fee',
    language: 'English',
    createdBy: 'Admin'
  }
];

export const initialItineraryInfos: ItineraryInfoMaster[] = [
  {
    id: 'ii1',
    fromDestinationId: 'd2',
    fromDestinationName: 'Delhi',
    toDestinationId: 'd1',
    toDestinationName: 'Jaipur',
    transferMode: 'Surface',
    title: 'Drive to Jaipur',
    description: 'Scenic drive from Delhi to Jaipur via NH48.',
    status: 'Active'
  }
];
