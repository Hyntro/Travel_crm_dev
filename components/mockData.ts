
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
  ItineraryOverview, EmergencyContact, FitInclusionMaster, GitInclusionMaster,
  ClientBillingInstruction, SupplierBillingInstruction, ProposalSettings,
  Currency, TaxMaster, ExpenseType, ExpenseHead, SacCode, PaymentType, BankMaster,
  RoleNode, Profile, Department, Agent, User, HotelTariff, TransportationTariff,
  ActivityTariff
} from '../types';

export const initialCountries: Country[] = [
  { id: '1', name: 'India', shortName: 'IND', code: '+91', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '2', name: 'USA', shortName: 'USA', code: '+1', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '3', name: 'UK', shortName: 'UK', code: '+44', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialStates: State[] = [
  { id: '1', name: 'Delhi', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '2', name: 'Maharashtra', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '3', name: 'Uttar Pradesh', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialCities: City[] = [
  { id: '1', name: 'New Delhi', stateId: '1', stateName: 'Delhi', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '2', name: 'Mumbai', stateId: '2', stateName: 'Maharashtra', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '3', name: 'Agra', stateId: '3', stateName: 'Uttar Pradesh', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '4', name: 'Jaipur', stateId: '3', stateName: 'Rajasthan', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialDestinations: Destination[] = [
  { id: '1', serviceCode: 'DEST001', name: 'Agra', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '2', serviceCode: 'DEST002', name: 'Delhi', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '3', serviceCode: 'DEST003', name: 'Jaipur', countryId: '1', countryName: 'India', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialAgents: Agent[] = [
  { id: '1', code: 'AGT001', companyName: 'Global Travels Inc', contactPerson: 'John Doe', businessType: 'B2B', website: 'www.globaltravels.com', email: 'contact@globaltravels.com', phone: '+1 555-0123', assignedSales: 'Sarah Smith', assignedOps: 'John Doe', status: 'Active', country: 'USA' },
  { id: '2', code: 'AGT002', companyName: 'Corporate Fly', contactPerson: 'Jane Smith', businessType: 'Corporate', website: 'www.corpfly.com', email: 'booking@corpfly.com', phone: '+1 555-0124', assignedSales: 'James Wilson', assignedOps: 'John Doe', status: 'Active', country: 'India' }
];

export const initialUsers: User[] = [
  { id: '1', name: 'Sarah Smith', email: 'sarah@example.com', role: 'Sales', status: 'Active', address: { street: '', city: '', state: '', zip: '', country: '' } },
  { id: '2', name: 'John Doe', email: 'john@example.com', role: 'Operations', status: 'Active', address: { street: '', city: '', state: '', zip: '', country: '' } }
];

export const initialHotels: HotelMaster[] = [
  { id: 'h1', name: 'Taj Mahal Hotel', chain: 'Taj', destination: 'Agra', category: '5 Star', type: 'Luxury', email: 'taj@example.com', website: 'www.tajhotels.com', weekendDays: 'SS', checkInTime: '14:00', checkOutTime: '11:00', amenities: ['Wifi', 'Pool'], roomTypes: ['Deluxe', 'Suite'], selfSupplier: 'Yes', country: 'India', state: 'UP', city: 'Agra', pinCode: '282001', phone: '1234567890', address: 'Agra', gstn: 'GST123', status: 'Active', contacts: [] }
];

export const initialTariffs: HotelTariff[] = [
    {
        id: 't1', hotelId: 'h1', marketType: 'General', supplierName: 'Direct', paxType: 'FIT', tariffType: 'Normal', seasonType: 'Summer', seasonYear: '2025',
        validFrom: '2025-01-01', validTo: '2025-12-31', status: 'Active', roomType: 'Deluxe', mealPlan: 'CP', currency: 'INR',
        rates: { single: 10000, double: 12000, extraBedAdult: 3000, extraBedChild: 1500, childWithBed: 2000, tacPercentage: 10, roomTaxSlab: '12%', mealTaxSlab: '5%', markupType: '%', markupCost: 10 },
        mealRates: { breakfastAdult: 500, lunchAdult: 800, dinnerAdult: 1000, breakfastChild: 300, lunchChild: 500, dinnerChild: 700 }
    }
];

export const initialItineraryInfos: ItineraryInfoMaster[] = [
  { id: '1', fromDestinationId: '2', fromDestinationName: 'Delhi', toDestinationId: '1', toDestinationName: 'Agra', transferMode: 'Surface', title: 'Delhi to Agra by Car', description: 'Drive to Agra via Yamuna Expressway.', status: 'Active' }
];

export const initialActivitiesMasterList: ActivityMaster[] = [
  { id: '1', serviceCode: 'ACT001', name: 'Taj Mahal Visit', type: 'Activity', destinationId: '1', destinationName: 'Agra', supplierName: 'Self', isDefault: 'No', status: 'Active', language: 'English', weekendDays: 'FSS', description: 'Visit the Taj Mahal.' },
  { id: '2', serviceCode: 'ACT002', name: 'Red Fort Visit', type: 'Activity', destinationId: '2', destinationName: 'Delhi', supplierName: 'Self', isDefault: 'No', status: 'Active', language: 'English', weekendDays: 'SS', description: 'Visit the Red Fort.' }
];

export const initialActivities = initialActivitiesMasterList;

export const initialActivityTariffs: ActivityTariff[] = [
  { id: '1', activityId: '1', supplierName: 'Self', validFrom: '2025-01-01', validTo: '2025-12-31', currency: 'INR', serviceName: 'Taj Mahal Visit', fromPax: 1, toPax: 10, costType: 'Per Person', perPaxCost: 1500, status: 'Active', taxSlab: '0%', remarks: '' }
];

export const initialTransfers: TransferMaster[] = [
  { id: '1', name: 'Agra Station Transfer', destinationId: '1', destinationName: 'Agra', transferType: 'Station', description: 'Pick up from station', internalNote: '', status: 'Active' }
];

export const initialRestaurants: Restaurant[] = [
  { id: '1', name: 'Pinch of Spice', destination: 'Agra', address: 'Agra', status: 'Active', contact: { title: 'Mr', name: 'Manager', designation: 'Manager', countryCode: '+91', phone1: '9876543210', email: 'pos@example.com' } }
];

export const initialAdditionalRequirements: AdditionalRequirement[] = [
  { id: '1', serviceType: 'Visa', name: 'Indian Tourist Visa', destinationId: '1', destinationName: 'Agra', currency: 'USD', costType: 'Per Person', displayName: 'Visa Fee', showInProposal: 'Yes', status: 'Active', createdBy: 'Admin' }
];

export const initialHotelCategories: HotelCategory[] = [
  { id: '1', categoryName: '5 Star', starCategory: '5 Star', keyword: 'Luxury', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '2', categoryName: '4 Star', starCategory: '4 Star', keyword: 'Premium', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialHotelTypes: HotelType[] = [
  { id: '1', name: 'Heritage', keyword: 'Heritage', isHouseBoat: 'No', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
  { id: '2', name: 'Business', keyword: 'Business', isHouseBoat: 'No', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialHotelChains: HotelChain[] = [
    { id: '1', name: 'Taj Hotels', location: 'Mumbai', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin', contacts: [] }
];

export const initialHotelMealPlans: HotelMealPlan[] = [
    { id: '1', name: 'CP', voucherName: 'Breakfast Only', isDefault: true, status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialRoomTypes: RoomType[] = [
    { id: '1', name: 'Deluxe', info: 'Standard Deluxe Room', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
    { id: '2', name: 'Suite', info: 'Luxury Suite', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialAmenities: Amenity[] = [
    { id: '1', name: 'Wifi', image: '', isDefault: true, status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
    { id: '2', name: 'Pool', image: '', isDefault: false, status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialWeekends: Weekend[] = [
    { id: '1', name: 'Standard', days: 'Saturday, Sunday', status: 'Active' }
];

export const initialRestaurantMealPlans: RestaurantMealPlan[] = [
    { id: '1', name: 'Buffet Lunch', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialMonuments: Monument[] = [
    { id: '1', serviceCode: 'MON001', name: 'Taj Mahal', destinationId: '1', destinationName: 'Agra', status: 'Active' }
];

export const initialMonumentPackages: MonumentPackage[] = [];

export const initialEnroutes: Enroute[] = [];

export const initialTransferTypes: TransferType[] = [
    { id: '1', name: 'Airport', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialTransportations: TransportationMaster[] = [
    { id: '1', name: 'Innova Crysta', destinationId: '1', destinationName: 'Agra', transferType: 'Private', description: '', internalNote: '', status: 'Active' }
];

export const initialCityDistances: CityDistance[] = [];

export const initialVehicleTypes: VehicleType[] = [
    { id: '1', name: 'Sedan', capacity: '4', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
    { id: '2', name: 'SUV', capacity: '6', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialDrivers: Driver[] = [];
export const initialFleets: Fleet[] = [];

export const initialAirlines: Airline[] = [
    { id: '1', name: 'Indigo', status: 'Active' },
    { id: '2', name: 'Air India', status: 'Active' }
];

export const initialFlightSeatClasses: FlightSeatClass[] = [
    { id: '1', name: 'Economy', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
    { id: '2', name: 'Business', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialFlights: FlightMaster[] = [];

export const initialTrains: TrainMaster[] = [];

export const initialGuides: Guide[] = [
    { id: '1', name: 'Rajesh Kumar', serviceType: 'Guide', destinationName: 'Agra', mobile: '9876543210', email: 'rajesh@example.com', status: 'Active' }
];

export const initialGuideTariffs: GuideTariff[] = [
    { id: '1', guideId: '1', supplierName: 'Direct', validFrom: '2025-01-01', validTo: '2025-12-31', paxRange: '1-5', dayType: 'Full Day', universalCost: 'Yes', currency: 'INR', serviceCost: 2000, languageAllowance: 500, otherCost: 0, gstSlab: '0', status: 'Active' }
];

export const initialItineraryOverviews: ItineraryOverview[] = [];

export const initialEmergencyContacts: EmergencyContact[] = [];

export const initialFitInclusions: FitInclusionMaster[] = [];
export const initialGitInclusions: GitInclusionMaster[] = [];

export const initialClientBillingInstructions: ClientBillingInstruction[] = [];
export const initialSupplierBillingInstructions: SupplierBillingInstruction[] = [];

export const initialProposalSettings: ProposalSettings[] = [];

export const initialCurrencies: Currency[] = [
    { id: '1', countryId: '1', countryName: 'India', currencyCode: 'INR', currencyName: 'Indian Rupee', status: 'Active' },
    { id: '2', countryId: '2', countryName: 'USA', currencyCode: 'USD', currencyName: 'US Dollar', status: 'Active' }
];

export const initialTaxes: TaxMaster[] = [
    { id: '1', serviceType: 'Hotel', slabName: 'GST 12%', taxValue: '12', status: 'Active', createdBy: 'Admin' }
];

export const initialExpenseTypes: ExpenseType[] = [];
export const initialExpenseHeads: ExpenseHead[] = [];
export const initialSacCodes: SacCode[] = [];
export const initialPaymentTypes: PaymentType[] = [];
export const initialBanks: BankMaster[] = [];

export const initialRoles: RoleNode = { id: 'root', name: 'TravCRM', children: [ { id: 'ceo', name: 'CEO', children: [ { id: 'vp', name: 'Vice President', children: [ { id: 'mgr', name: 'Manager', children: [ { id: 'ops', name: 'Operation' }, { id: 'sales', name: 'Sales' } ] } ] } ] } ] } ] };

export const initialProfiles: Profile[] = [
    { id: '1', name: 'Administrator', description: 'Full Access', createdBy: 'System', createdAt: '01-01-2024' }
];

export const initialDepartments: Department[] = [
    { id: '1', name: 'Sales', createdBy: 'System', createdAt: '01-01-2024', modifiedBy: '', modifiedAt: '' },
    { id: '2', name: 'Operations', createdBy: 'System', createdAt: '01-01-2024', modifiedBy: '', modifiedAt: '' }
];

export const initialLeadSources: LeadSource[] = [
    { id: '1', name: 'Website', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' },
    { id: '2', name: 'Referral', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialBusinessTypes: BusinessType[] = [
    { id: '1', name: 'B2B', isDefault: 'Yes', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialMarketTypes: MarketType[] = [
    { id: '1', name: 'Inbound', color: '#3b82f6', isDefault: 'Yes', status: 'Active', addedBy: 'Admin', dateAdded: '2024-01-01' }
];

export const initialLanguages: Language[] = [
    { id: '1', name: 'English', value: 'en', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialCommissions: Commission[] = [
    { id: '1', name: 'Standard', percentage: 10, status: 'Active' }
];

export const initialDivisions: Division[] = [
    { id: '1', division: 'Main', keyword: 'main', name: 'Main Division', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const initialSeasons: Season[] = [
    { id: '1', name: 'Summer', fromDate: '2025-04-01', toDate: '2025-09-30', status: 'Active' }
];

export const initialTourTypes: TourType[] = [
    { id: '1', name: 'Leisure', status: 'Active', createdBy: 'Admin', modifiedBy: 'Admin' }
];

export const mockAmenitiesList = ['Wifi', 'Pool', 'Spa', 'Gym', 'Parking', 'Bar', 'Restaurant'];
export const mockRoomTypesList = ['Standard', 'Deluxe', 'Suite', 'Family Room'];

export const initialPaxSlabs = [
    '1 to 5',
    '6 to 10',
    '11 to 15',
    '16 to 20',
    '21 to 30',
    '31 to 50',
    '51 to 100'
];
