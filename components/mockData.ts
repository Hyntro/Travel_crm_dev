
import { 
  TransferMaster, TransportationMaster, City, Country, State, 
  LeadSource, BusinessType, MarketType, Destination, Language, 
  Commission, Division, Season, TourType, RoomType, Amenity, 
  HotelCategory, HotelType, HotelMealPlan, Weekend, HotelMaster, 
  HotelChain, Restaurant, RestaurantMealPlan, Monument, 
  MonumentPackage, ActivityMaster, Enroute, TransferType,
  SightseeingActivity, CityDistance, VehicleType, Driver, Fleet,
  Airline, FlightSeatClass, FlightMaster, TrainMaster, Guide,
  GuideTariff, AdditionalRequirement, ItineraryInfoMaster,
  ItineraryOverview, EmergencyContact, FitInclusionMaster
} from '../types';

export const initialFitInclusions: FitInclusionMaster[] = [
  {
    id: '1',
    name: 'PI Proposal',
    destinationId: 'All',
    destinationName: 'All',
    inclusion: `<ul>
    <li>Daily elaborate buffet breakfast at all the hotels</li>
    <li>Lunch at a local restaurant in Delhi on Aug.24</li>
    <li>Welcome dinner at Dhilli OR Indian Accent restaurant on Aug.24</li>
    <li>Dinner at Esphahan restaurant at Agra on Aug.25</li>
    <li>Lunch at Aagman Camp on the way to Jaipur on Aug.26</li>
    <li>Farm-to-table organic lunch at farmhouse in Jaipur on Aug.28</li>
    <li>Lunch at Panna Villas restaurant local restaurant in Udaipur on Aug.30</li>
    <li>Culinary session followed by dinner with Noble family in Udaipur on Aug.30</li>
    </ul>`,
    exclusion: `<ul>
    <li>Meeting and assistance on arrival/departure by our representative</li>
    <li>VIP Meet and assistance upon arrival at Delhi Airport on Aug.23</li>
    <li>All sightseeing excursions as mentioned in the itinerary.</li>
    <li>Private Chauffeur-driven, air-conditioned Force Urbania Minivan (8-seater, 2024 model) for all transfers and excursions. Complimentary packaged drinking water and soft beverages in all vehicles</li>
    <li>Meet and assist at all hotels and airports.</li>
    </ul>`,
    status: 'Active',
    language: 'English',
    isDefault: false
  },
  {
    id: '2',
    name: 'Golden Triangle',
    destinationId: 'd1,d2',
    destinationName: 'Agra, Jaipur',
    inclusion: `<ul>
    <li>Accommodation as per itinerary - Double room on twin sharing basis at all destinations. (We will offer choice to select hotel in 4 star catagory)</li>
    <li>Daily Breakfast at hotel.</li>
    <li>Private AC car for all transfers, sightseeing and drives.</li>
    <li>Assistance on arrival and departure.</li>
    <li>Monuments Entrance fees during sightseeing</li>
    <li>Tour Guides.</li>
    <li>All the taxes included, no hidden charges.</li>
    </ul>`,
    exclusion: `<ul>
    <li>Air fare / train fare.</li>
    <li>Any other item not specified in the Package Inclusions.</li>
    <li>Gratuities.</li>
    <li>Lunch and Dinner</li>
    </ul>`,
    status: 'Active',
    language: 'English',
    isDefault: false
  },
  {
    id: '3',
    name: 'Rajasthan Heritage Exploration',
    destinationId: 'd1',
    destinationName: 'Jaisalmer, Jodhpur, Udaipur',
    inclusion: `<ul>
    <li><strong>Accommodation:</strong> 1 night in a luxury hotel in Delhi, 1 night in a luxury hotel in Agra, 2 nights in a luxury hotel in Jaipur.</li>
    <li><strong>Meals:</strong> Daily breakfast and dinner, including special regional dinners.</li>
    <li><strong>Transportation:</strong> Private air-conditioned vehicle with driver for all transfers and sightseeing.</li>
    <li><strong>Guides:</strong> English-speaking guides for sightseeing in Delhi, Agra, and Jaipur.</li>
    <li><strong>Entry Fees:</strong> Entry fees to all mentioned attractions.</li>
    <li><strong>Activities:</strong> Camel ride</li>
    </ul>`,
    exclusion: `<ul>
    <li><strong>International Airfare:</strong> Flights to and from India.</li>
    <li><strong>Lunch and Additional Meals:</strong> Meals not mentioned in the itinerary.</li>
    <li><strong>Personal Expenses:</strong> Tips, laundry, phone calls, etc.</li>
    <li><strong>Optional Activities:</strong> Activities not mentioned in the itinerary.</li>
    <li><strong>Travel Insurance:</strong> Insurance coverage for the duration of the trip.</li>
    <li><strong>Visa Fees:</strong> Indian visa fees.</li>
    </ul>`,
    status: 'Active',
    language: 'English',
    isDefault: false
  }
];

export const initialEmergencyContacts: EmergencyContact[] = [
  {
    id: 'ec1',
    contactName: 'raja',
    countryCode: '+91',
    mobileNumber: '789456123',
    mobileNumber2: '2144234211',
    emailId: 'rajakumar@gmail.com',
    availableOn: 'Calls & Whatsapp',
    isProposalContact: true
  },
  {
    id: 'ec2',
    contactName: 'Naman Dheer',
    countryCode: '91',
    mobileNumber: '9897969594',
    mobileNumber2: '',
    emailId: '',
    availableOn: '',
    isProposalContact: false
  },
  {
    id: 'ec3',
    contactName: 'Ankit Kumar Sharma',
    countryCode: '+91',
    mobileNumber: '08279530775',
    mobileNumber2: '',
    emailId: '',
    availableOn: '',
    isProposalContact: false
  }
];

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

export const initialItineraryOverviews: ItineraryOverview[] = [
  {
    id: '1',
    name: 'Aspire Magic',
    overviewInfo: 'The Red Fort, also known as Lal Qila...',
    highlightInfo: 'The Red Fort, also known as Lal Qila...',
    language: 'English',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Rajasthan Heritage Exploration',
    overviewInfo: 'Experience the regal splendor...',
    highlightInfo: 'Udaipur: Discover the romantic city...',
    language: 'English',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Golden Trangle',
    overviewInfo: 'Golden Triangle Tour Itinerary...',
    highlightInfo: 'Dear Clients, if you are planning...',
    language: 'English',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Agra',
    overviewInfo: 'it is for example',
    highlightInfo: '',
    language: 'English',
    status: 'In Active'
  }
];
