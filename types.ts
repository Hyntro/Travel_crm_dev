
export interface TransferMaster {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  transferType: string;
  description: string;
  internalNote: string;
  status: 'Active' | 'Inactive';
}

export interface TransportationMaster {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  transferType: string;
  description: string;
  internalNote: string;
  status: 'Active' | 'Inactive';
}

export interface TransportationTariff {
  id: string;
  transportationId: string;
  supplierName: string;
  destination: string;
  validFrom: string;
  validTo: string;
  type: string;
  status: 'Active' | 'Inactive';
  vehicleType: string;
  taxSlab: string;
  currency: string;
  vehicleCost: number;
  parkingFee: number;
  representativeEntryFee: number;
  assistance: number;
  additionalAllowance: number;
  interStateToll: number;
  miscCost: number;
  remarks: string;
}

export interface EmergencyContact {
  id: string;
  contactName: string;
  countryCode: string;
  mobileNumber: string;
  mobileNumber2: string;
  emailId: string;
  availableOn: string;
  isProposalContact: boolean;
}

export interface FitInclusionMaster {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  inclusion: string;
  exclusion: string;
  status: 'Active' | 'Inactive';
  language: string;
  isDefault: boolean;
}

// --- General & AI ---
export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    description: string;
  }[];
}

// --- Leads & CRM ---
export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  notes: string;
  createdAt: string;
  aiInsight?: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  budget?: number;
}

export interface CRMLead {
  id: string;
  leadSource?: string;
  clientCountry?: string;
  businessType?: 'B2C' | 'Agent';
  contactPerson: string;
  email?: string;
  mobile?: string;
  fromDate?: string;
  toDate?: string;
  totalNights?: number;
  paxAdult?: number;
  paxChild?: number;
  destination?: string;
  rooms?: {
    sgl: number;
    dbl: number;
    twin: number;
    tpl: number;
    extraBed: number;
    cwBed: number;
    cnBed: number;
  };
  salesPerson?: string;
  opsPerson?: string;
  budget?: number;
  hotelCategory?: string;
  stageId?: string;
  potentialValue: number;
  updatedAt?: string;
}

export interface SalesStage {
  id: string;
  name: string;
  probability: number;
  color: string;
}

// --- Users & Roles ---
export interface User {
  id: string;
  code?: string;
  name: string;
  email: string;
  mobile?: string;
  role: string;
  department?: string;
  reportingManager?: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export interface Role {
  id: string;
  name: string;
  parentId: string | null;
  children?: Role[];
}

// --- Travel Query ---
export type QueryStatus = 'Confirmed' | 'Lost' | 'Quotation Generated' | 'In Process' | 'Contacted' | 'New';
export type QueryPriority = 'High' | 'Low' | 'Urgent' | 'Normal';

export interface TravelQuery {
  id: string;
  tourId: string;
  type: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  pax: number;
  tourDate: string;
  destination: string;
  queryType: string;
  priority: QueryPriority;
  assignedTo: string;
  status: QueryStatus;
  createdAt: string;
}

// --- Agents & Suppliers ---
export interface Agent {
  id: string;
  code: string;
  companyName: string;
  businessType: string;
  website: string;
  email: string;
  phone: string;
  assignedSales: string;
  assignedOps: string;
  status: 'Active' | 'Inactive';
  logo?: string;
  nationalityType?: string;
  nationalityName?: string;
  country?: string;
  marketType?: string;
  department?: string;
  companyType?: string;
  consortia?: string;
  competitor?: string;
  category?: string;
  preferredLanguage?: string;
  iso?: string;
  tourType?: string;
  accountingCode?: string;
  localAgent?: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  alias: string;
  contactPerson: string;
  phone: string;
  email: string;
  services: string[];
  paymentTerms: 'Cash' | 'Credit';
  destination: string;
  status: 'Active' | 'Inactive';
}

export interface B2CClient {
  id: string;
  title: string;
  firstName: string;
  middleName: string;
  lastName: string;
  name: string;
  gender: string;
  dob: string;
  nationalityType: string;
  nationality: string;
  anniversaryDate: string;
  accountingCode: string;
  mobileCode: string;
  mobile: string;
  email: string;
  emailType: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  salesPerson: string;
  status: 'Active' | 'Inactive';
  familyCode: string;
  familyRelation: string;
  marketType: string;
  holidayPreference: string;
  covidVaccinated: string;
  newsletter: string;
  preferences: {
    meal: string;
    seat: string;
    special: string;
    accommodation: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    code: string;
    phone: string;
  };
  documents: { type: string; number: string }[];
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  remarks: string[];
  passportNumber?: string;
  visaNumber?: string;
}

// --- Activity & Notifications ---
export interface Notification {
  id: string;
  title: string;
  message: string;
  senderName: string;
  timestamp: string;
  type: 'System' | 'Message';
  recipientId: string | null;
}

export type ActivityType = 'Task' | 'Meeting' | 'Call';

export interface Activity {
  id: string;
  type: ActivityType;
  salesPerson: string;
  startDate: string;
  startTime: string;
  duration: string;
  nextFollowUp: string;
  status: string;
  description: string;
  callType?: 'Outgoing' | 'Incoming';
  priority?: string;
  location?: string;
  meetingOutcome?: string;
}

// --- DMS ---
export interface DMSFolder {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
}

export interface DMSDocument {
  id: string;
  name: string;
  folderId: string;
  size: string;
  type: string;
  createdAt: string;
}

// --- Package & Costing ---
export interface PackageItineraryItem {
  id: string;
  dayNumber: number;
  date: string;
  dayName: string;
  destination: string;
}

export interface PackageService {
  id: string;
  dayNumber: number;
  type: string;
  serviceName: string;
  supplierName: string;
  serviceType: string;
  dayType: string;
  paxRange: string;
  paxSlab: string;
  perDayCost: number;
  noOfDays: number;
  totalCost: number;
}

export interface PackageCosting {
  markupType: string;
  markups: { [key: string]: number };
  gstType: string;
  gstPercentage: number;
  currency: string;
  roe: number;
}

export interface TravelPackage {
  id: string;
  code: string;
  name: string;
  planType: string;
  supplier: string;
  fromDate?: string;
  toDate?: string;
  totalNights: number;
  duration: string;
  destination: string;
  paxType: string;
  status: 'Active' | 'Inactive';
  description?: string;
  creationDate?: string;
  itinerary?: PackageItineraryItem[];
  services?: PackageService[];
  costing?: PackageCosting;
  additionalInfo?: string;
}

export interface CostSheet {
  id: string;
  quotationId: string;
  hotelCost: number;
  transportCost: number;
  flightCost: number;
  guideCost: number;
  activityCost: number;
  monumentCost: number;
  mealCost: number;
  miscCost: number;
  escortCost: number;
  enrouteCost: number;
  permitCost: number;
  markupPercentage: number;
  agentCommission: number;
  isoCommission: number;
  gstType: 'IGST' | 'CGST/SGST';
  gstPercentage: number;
  totalLandCost: number;
  markupAmount: number;
  isoAmount: number;
  gstAmount: number;
  totalCost: number;
  finalSalePrice: number;
}

export interface Quotation {
  id: string;
  queryId: string;
  quoteCode: string;
  version: string;
  status: string;
  hotelCategory: string;
  mealPlan: string;
  clientName: string;
  destination: string;
  updatedAt: string;
  paxAdult: number;
  paxChild: number;
  travelDate: string;
}

export interface QuotationItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  cityName: string;
  description: string;
  services: {
    hotel: boolean;
    guide: boolean;
    activity: boolean;
    monument: boolean;
    transfer: boolean;
    flight: boolean;
    train: boolean;
  };
  itineraryHotels: any[];
  itineraryTransports: any[];
  itineraryFlights: any[];
  itineraryActivities: any[];
  itineraryRestaurants: any[];
  itineraryAdditionals: any[];
}

export interface TourExtension {
  id: string;
  name: string;
}

export interface CityContent {
  id: string;
  name: string;
}

// --- Series ---
export interface SubSeries {
  id: string;
  name: string;
  code: string;
  tourCode: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  adults: number;
  child: number;
  rooms: { single: number; double: number; twin: number; triple: number };
  extraBeds: { adult: number; childWithBed: number; childNoBed: number };
  status: string;
  active: boolean;
  createdAt: string;
}

export interface SeriesMaster {
  id: string;
  code: string;
  name: string;
  clientType: string;
  clientName?: string;
  destination: string;
  marketType: string;
  nationality: string;
  planType: string;
  tourType: string;
  vehicle: string;
  hotelCategory: string;
  mealPlan: string;
  year: number;
  season: string;
  status: 'Active' | 'Inactive';
  totalNights: number;
  operationPerson: string;
  salesPerson: string;
  departures: { date: string; seats: number; booked: number }[];
  subSeries?: SubSeries[];
  itinerary?: { day: number; destination: string }[];
  additionalInfo?: string;
  description?: string;
}

export interface Invoice {
  id: string;
  date: string;
  queryId: string;
  tourId?: string;
  clientName: string;
  companyName: string;
  amount: number;
  currency: string;
  status: 'Paid' | 'Unpaid' | 'Cancelled';
  invoiceFormat?: string;
  invoiceType?: string;
}

// --- Masters: Location & General ---
export interface Country {
  id: string;
  name: string;
  shortName: string;
  code: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface State {
  id: string;
  name: string;
  countryId: string;
  countryName: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface City {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  countryId: string;
  countryName: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface LeadSource {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface BusinessType {
  id: string;
  name: string;
  isDefault: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface MarketType {
  id: string;
  name: string;
  color: string;
  isDefault: string;
  status: 'Active' | 'Inactive';
  addedBy: string;
  dateAdded: string;
}

export interface Destination {
  id: string;
  serviceCode: string;
  name: string;
  countryId: string;
  countryName: string;
  airportCode?: string;
  latitude?: string;
  longitude?: string;
  description?: string;
  weatherInfo?: string;
  additionalInfo?: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface Language {
  id: string;
  name: string;
  value: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface Commission {
  id: string;
  name: string;
  percentage: number;
  status: 'Active' | 'Inactive';
}

export interface Division {
  id: string;
  division: string;
  keyword: string;
  name: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface Season {
  id: string;
  name: string;
  fromDate: string;
  toDate: string;
  status: 'Active' | 'Inactive';
}

export interface TourType {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface RoomType {
  id: string;
  name: string;
  info: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface Amenity {
  id: string;
  name: string;
  image: string;
  isDefault: boolean;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface HotelCategory {
  id: string;
  categoryName: string;
  starCategory: string;
  keyword: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface HotelType {
  id: string;
  name: string;
  keyword: string;
  isHouseBoat: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface HotelMealPlan {
  id: string;
  name: string;
  voucherName: string;
  isDefault: boolean;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface Weekend {
  id: string;
  name: string;
  days: string;
  status: 'Active' | 'Inactive';
}

// --- Masters: Hotel Details ---
export interface HotelContact {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  designation: string;
  countryCode: string;
  phone1: string;
  phone2?: string;
  phone3?: string;
  email: string;
  secondaryEmail?: string;
  isForContactList: boolean;
}

export interface HotelMaster {
  id: string;
  name: string;
  chain: string;
  destination: string;
  category: string;
  type: string;
  email: string;
  website: string;
  weekendDays: string;
  checkInTime: string;
  checkOutTime: string;
  amenities: string[];
  roomTypes: string[];
  selfSupplier: string;
  country: string;
  state: string;
  city: string;
  pinCode: string;
  phone: string;
  address: string;
  gstn: string;
  status: 'Active' | 'Inactive';
  contacts: HotelContact[];
  description?: string;
  policy?: string;
  terms?: string;
  verified?: 'Yes' | 'No';
  internalNote?: string;
}

export interface HotelTariff {
  id: string;
  hotelId: string;
  marketType: string;
  supplierName: string;
  paxType: string;
  tariffType: string;
  seasonType: string;
  seasonYear: string;
  validFrom: string;
  validTo: string;
  status: 'Active' | 'Inactive';
  roomType: string;
  mealPlan: string;
  currency: string;
  rates: {
    single: number;
    double: number;
    extraBedAdult: number;
    extraBedChild: number;
    childWithBed: number;
    tacPercentage: number;
    roomTaxSlab: string;
    mealTaxSlab: string;
    markupType: '%' | 'Flat';
    markupCost: number;
  };
  mealRates: {
    breakfastAdult: number;
    lunchAdult: number;
    dinnerAdult: number;
    breakfastChild: number;
    lunchChild: number;
    dinnerChild: number;
  };
  remarks?: string;
}

export interface HotelChainContact {
  id: string;
  division: string;
  title: string;
  name: string;
  designation: string;
  countryCode: string;
  phone: string;
  email: string;
  isPrimary: boolean;
}

export interface HotelChain {
  id: string;
  name: string;
  destinations?: string;
  website?: string;
  location: string;
  contacts: HotelChainContact[];
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface HotelRestriction {
  id: string;
  hotelId: string;
  fromDate: string;
  toDate: string;
  reason: string;
}

export interface RestaurantContact {
  title: string;
  name: string;
  designation: string;
  countryCode: string;
  phone1: string;
  email: string;
  secondaryEmail?: string;
  phone2?: string;
  phone3?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  destination: string;
  address: string;
  country?: string;
  state?: string;
  city?: string;
  supplier?: string;
  pinCode?: string;
  gstn?: string;
  status: 'Active' | 'Inactive';
  contact: RestaurantContact;
  image?: string;
}

export interface RestaurantMealPlan {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

// --- Masters: Activities & Monuments ---
export interface Monument {
  id: string;
  serviceCode: string;
  name: string;
  destinationId: string;
  destinationName: string;
  languages?: string;
  closedDays?: string;
  isDefault?: string;
  showInProposal?: string;
  description?: string;
  status: 'Active' | 'Inactive';
}

export interface MonumentTariff {
  id: string;
  monumentId: string;
  supplierName: string;
  nationality: string;
  validFrom: string;
  validTo: string;
  currency: string;
  adultFee: number;
  childFee: number;
  status: 'Active' | 'Inactive';
  taxSlab: string;
  policy: string;
  terms: string;
  remarks: string;
}

export interface SightseeingActivity {
  id: string;
  name: string;
  destinationId: string;
}

export interface MonumentPackageService {
  id: string;
  serviceId: string;
  serviceType: string;
  serviceName: string;
  serviceCity: string;
}

export interface MonumentPackage {
  id: string;
  name: string;
  destinationId: string;
  destinationName: string;
  serviceType: string;
  services: MonumentPackageService[];
  description?: string;
  status: 'Active' | 'Inactive';
}

export interface ActivityMaster {
  id: string;
  serviceCode: string;
  name: string;
  type: string;
  destinationId: string;
  destinationName: string;
  supplierName: string;
  isDefault: string;
  status: 'Active' | 'Inactive';
  language?: string;
  closedDays?: string;
  weekendDays?: string;
  weekendDayText?: string;
  description?: string;
}

export interface ActivityTariff {
  id: string;
  activityId: string;
  supplierName: string;
  validFrom: string;
  validTo: string;
  currency: string;
  serviceName: string;
  fromPax: number;
  toPax: number;
  costType: string;
  perPaxCost: number;
  status: 'Active' | 'Inactive';
  taxSlab: string;
  remarks: string;
}

export interface Enroute {
  id: string;
  serviceCode: string;
  name: string;
  supplierName: string;
  gstSlab: string;
  currency: string;
  cost?: number;
  isDefault: string;
  destinationId: string;
  destinationName: string;
  status: 'Active' | 'Inactive';
  description?: string;
  language?: string;
}

export interface TransferType {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface CityDistance {
  id: string;
  fromDestinationId: string;
  fromDestinationName: string;
  toDestinations: { destinationId: string; destinationName: string; km: number }[];
  status: 'Active' | 'Inactive';
}

export interface VehicleType {
  id: string;
  name: string;
  capacity: string;
  image?: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
  description?: string;
}

export interface Driver {
  id: string;
  name: string;
  dob: string;
  licenseNumber: string;
  validUpto: string;
  mobile: string;
  altMobile?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  vehicleType?: string; 
  registrationNumber?: string;
  status: 'Active' | 'Inactive';
  image?: string;
  licenseImage?: string;
}

export interface Fleet {
  id: string;
  vehicleType: string;
  brandName: string;
  registrationNumber: string;
  ownerName: string;
  chassisNumber?: string;
  engineNumber?: string;
  colour?: string;
  fuelType: string;
  seatingCapacity?: string;
  assignedDriver?: string; // Assigned Driver Name
  insuranceCompany?: string;
  insurancePolicy?: string;
  insuranceIssueDate?: string;
  insuranceDueDate?: string;
  premiumAmount?: number;
  coverAmount?: number;
  taxEfficiency?: string; 
  taxExpiry?: string;
  permitType?: string; 
  permitExpiry?: string;
  rtoAddress?: string;
  status: 'Active' | 'Inactive';
  image?: string;
  showOnCostSheet?: boolean;
}

export interface Airline {
  id: string;
  name: string;
  image?: string;
  status: 'Active' | 'Inactive';
  createdBy?: string;
  modifiedBy?: string;
}

export interface FlightSeatClass {
  id: string;
  name: string;
  status: 'Active' | 'Inactive';
  createdBy: string;
  modifiedBy: string;
}

export interface FlightMaster {
  id: string;
  airlineId: string;
  airlineName: string;
  flightNumber: string;
  fromDestinationId: string;
  fromDestinationName: string;
  toDestinationId: string;
  toDestinationName: string;
  departureTime: string;
  arrivalTime: string;
  daysOfOperation: string;
  viaDestinationId?: string;
  viaDestinationName?: string;
  departureTerminal?: string;
  arrivalTerminal?: string;
  status: 'Active' | 'Inactive';
}

export interface FlightTariff {
  id: string;
  flightId: string;
  supplierName: string;
  cabinClass: string;
  validFrom: string;
  validTo: string;
  currency: string;
  roe: number;
  adultBaseFare: number;
  adultTax: number;
  childBaseFare: number;
  childTax: number;
  baggageAllowance: string;
  taxSlab: string;
}

export interface TrainMaster {
  id: string;
  name: string;
  number: string;
  fromDestinationId: string;
  fromDestinationName: string;
  toDestinationId: string;
  toDestinationName: string;
  daysOfOperation: string;
  cancellationPolicy: string;
  remarks: string;
  image?: string;
  status: 'Active' | 'Inactive';
  departureTime?: string;
  arrivalTime?: string;
}

export interface TrainTariff {
  id: string;
  trainId: string;
  supplierName: string;
  journeyType: string;
  trainCoach: string;
  fromStation: string;
  toStation: string;
  validFrom: string;
  validTo: string;
  currency: string;
  roe: number;
  adultCost: number;
  childCost: number;
  taxSlab: string;
  status: 'Active' | 'Inactive';
}

export interface Guide {
  id: string;
  name: string;
  serviceType: 'Guide' | 'Porter' | 'Tour Escort' | 'Tour Manager';
  dob?: string;
  image?: string;
  mobile: string;
  whatsapp?: string;
  alternateNumber?: string;
  email: string;
  licenseNumber?: string;
  licenseIssueDate?: string;
  licenseExpiryDate?: string;
  licenseImage?: string;
  idProofNumber?: string;
  idProofIssueDate?: string;
  idProofExpiryDate?: string;
  idProofImage?: string;
  destinationId?: string;
  destinationName?: string;
  languages?: string;
  designation?: string;
  address?: string;
  country?: string;
  state?: string;
  city?: string;
  pinCode?: string;
  panNo?: string;
  gstNo?: string;
  rating?: string;
  vaccinationStatus?: 'Yes' | 'No';
  status: 'Active' | 'Inactive';
  selfSupplier?: 'Yes' | 'No';
  isDefault?: 'Yes' | 'No';
  remarks?: string;
  feedback?: string;
}

export interface GuideTariff {
  id: string;
  guideId: string;
  supplierName: string;
  validFrom: string;
  validTo: string;
  paxRange: string;
  dayType: 'Half Day' | 'Full Day';
  universalCost: 'Yes' | 'No';
  currency: string;
  serviceCost: number;
  languageAllowance: number;
  otherCost: number;
  gstSlab: string;
  status: 'Active' | 'Inactive';
}

export interface AdditionalRequirement {
  id: string;
  serviceType: string;
  name: string;
  destinationId: string;
  destinationName: string;
  currency: string;
  costType: string;
  adultCost?: number;
  childCost?: number;
  groupCost?: number;
  displayName: string;
  showInProposal: string;
  status: 'Active' | 'Inactive';
  image?: string;
  description?: string;
  language?: string;
  createdBy: string;
}

export interface ItineraryInfoMaster {
  id: string;
  fromDestinationId: string;
  fromDestinationName: string;
  toDestinationId: string;
  toDestinationName: string;
  transferMode: string;
  title: string;
  description: string;
  status: 'Active' | 'Inactive';
}

export interface ItineraryOverview {
  id: string;
  name: string;
  overviewInfo: string;
  highlightInfo: string;
  language: string;
  status: 'Active' | 'Inactive' | 'In Active';
}
