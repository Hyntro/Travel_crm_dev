
export enum LeadStatus {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  BOOKED = 'Booked',
  LOST = 'Lost'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  notes: string;
  budget?: number;
  destination?: string;
  aiInsight?: string;
  sentiment?: 'Positive' | 'Neutral' | 'Negative';
  createdAt: string;
}

export interface ItineraryDay {
  day: number;
  title: string;
  activities: {
    time: string;
    activity: string;
    description: string;
  }[];
}

export interface ItineraryRequest {
  destination: string;
  duration: number;
  travelers: string;
  interests: string;
  budgetLevel: 'Budget' | 'Moderate' | 'Luxury';
}

// CRM Module Types

export interface Department {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  parentId: string | null;
  children?: Role[];
}

export interface User {
  id: string;
  code: string;
  name: string;
  email: string;
  role: string;
  department: string;
  reportingManager: string | null;
  status: 'Active' | 'Inactive';
  mobile: string;
  avatar: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
}

export type QueryStatus = 'New' | 'Contacted' | 'In Process' | 'Quotation Generated' | 'Confirmed' | 'Cancelled' | 'Lost';
export type QueryPriority = 'Low' | 'High' | 'Urgent';

export interface TravelQuery {
  id: string;
  tourId: string;
  type: 'Agent' | 'B2C';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  pax: number;
  tourDate: string;
  destination: string;
  queryType: 'Query' | 'Inbound' | 'FIT';
  priority: QueryPriority;
  assignedTo: string;
  status: QueryStatus;
  createdAt: string;
}

// Phase 2 Models

export interface Agent {
  id: string;
  code: string;
  companyName: string;
  businessType: string;
  website?: string;
  email: string;
  phone: string;
  assignedSales: string;
  assignedOps: string;
  status: 'Active' | 'Inactive';
  logo?: string;
  
  // Extended Fields
  contactPerson?: string;
  companyType?: string;
  consortia?: string;
  iso?: string;
  competitor?: string;
  marketType?: string;
  department?: string;
  nationalityType?: string;
  nationalityName?: string;
  country?: string;
  category?: string;
  tourType?: string;
  preferredLanguage?: string;
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
  status?: 'Active' | 'Inactive';
}

export interface B2CClient {
  id: string;
  // Personal Info
  title: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  name: string; // Composite for display
  gender: 'Male' | 'Female' | 'Other';
  dob: string;
  nationalityType: string;
  nationality: string;
  anniversaryDate?: string;
  accountingCode?: string;
  
  // Contact Info
  mobileCode: string;
  mobile: string;
  email: string;
  emailType?: string;
  
  // Address Info
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  
  // CRM & Preferences (Right Column)
  salesPerson: string;
  status: 'Active' | 'Inactive';
  familyCode?: string;
  familyRelation?: string;
  
  marketType?: string;
  holidayPreference?: string;
  covidVaccinated?: 'Yes' | 'No';
  newsletter?: 'Yes' | 'No';
  
  preferences: {
    meal: string;
    seat: string;
    special: string;
    accommodation?: string;
  };
  
  // Emergency Contact
  emergencyContact: {
    name: string;
    relation: string;
    code?: string;
    phone: string;
  };
  
  // Documents
  passportNumber?: string;
  visaNumber?: string;
  documents: {
    id: string;
    type: string;
    required: string;
    number: string;
    issueDate: string;
    expiryDate: string;
    issueCountry: string;
    title: string;
    file?: string;
  }[];
  
  // Social Media
  socialMedia: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
  
  remarks: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  senderName: string;
  senderAvatar?: string;
  recipientId?: string | null;
  timestamp: string;
  type: 'System' | 'Message';
}

// Phase 3 Models

export interface SalesStage {
  id: string;
  name: string;
  probability: number;
  color: string;
}

export interface CRMLead {
  id: string;
  leadSource: string;
  clientCountry: string;
  businessType: 'Agent' | 'B2C';
  contactPerson: string;
  email: string;
  mobile: string;
  fromDate: string;
  toDate: string;
  totalNights: number;
  paxAdult: number;
  paxChild: number;
  destination: string;
  rooms: {
    sgl: number;
    dbl: number;
    twin: number;
    tpl: number;
    extraBed: number;
    cwBed: number;
    cnBed: number;
  };
  salesPerson: string;
  opsPerson: string;
  budget: number;
  hotelCategory: '1 Star' | '2 Star' | '3 Star' | '4 Star' | '5 Star';
  stageId: string;
  potentialValue: number;
  updatedAt: string;
}

export type ActivityType = 'Call' | 'Meeting' | 'Task';

export interface Activity {
  id: string;
  type: ActivityType;
  leadId?: string;
  salesPerson: string;
  startDate: string;
  startTime: string;
  duration: string;
  nextFollowUp: string;
  status: 'Scheduled' | 'Completed' | 'Overdue';
  description: string;
  callType?: 'Incoming' | 'Outgoing';
  campaign?: string;
  location?: string;
  meetingOutcome?: string;
  priority?: 'High' | 'Medium' | 'Low';
}

// Phase 4 Models

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
  type: 'Hotel' | 'Guide' | 'Activity' | 'Monument' | 'Transfer' | 'Flight' | 'Train' | 'Restaurant' | 'Other' | 'TPT' | 'Enroute' | 'Additional';
  serviceName: string;
  supplierName: string;
  serviceType: string;
  dayType: 'Full Day' | 'Half Day';
  paxRange: string; 
  paxSlab: string; 
  perDayCost: number;
  noOfDays: number;
  totalCost: number;
}

export interface PackageCosting {
  markupType: 'Universal' | 'Service Wise';
  markups: {
    hotel: number;
    guide: number;
    tourEscort: number;
    activity: number;
    entrance: number;
    enroute: number;
    transfer: number;
    train: number;
    flight: number;
    restaurant: number;
    other: number;
  };
  gstType: string;
  gstPercentage: number;
  currency: string;
  roe: number;
}

export interface TravelPackage {
  id: string;
  code: string;
  name: string;
  planType: 'Date Wise' | 'Day Wise';
  supplier: string;
  fromDate?: string;
  toDate?: string;
  totalNights: number;
  duration: string;
  destination: string;
  paxType: 'GIT' | 'FIT';
  status: 'Active' | 'Inactive';
  description: string;
  packageValidity?: string;
  additionalInfo?: string;
  itinerary?: PackageItineraryItem[];
  services?: PackageService[];
  costing?: PackageCosting;
  creationDate?: string;
}

// New SubSeries Interface
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
  rooms: {
    single: number;
    double: number;
    twin: number;
    triple: number;
  };
  extraBeds: {
    adult: number;
    childWithBed: number;
    childNoBed: number;
  };
  status: 'Confirmed' | 'Tentative';
  active: boolean;
  createdAt: string;
}

export interface SeriesMaster {
  id: string;
  code: string;
  name: string;
  clientType: 'Agent' | 'Direct';
  clientName?: string;
  destination?: string;
  marketType: string;
  tourType: string;
  vehicle: string;
  hotelCategory: string;
  mealPlan: 'CP' | 'MAP' | 'AP';
  year: number;
  season: 'Summer' | 'Winter';
  status: 'Active' | 'Inactive' | 'Completed';
  departures: { date: string; seats: number; booked: number }[];
  
  // Extended fields for form
  nationality?: string;
  planType?: 'Day Wise' | 'Date Wise';
  totalNights?: number;
  operationPerson?: string;
  salesPerson?: string;
  additionalInfo?: string;
  description?: string;
  itinerary?: { day: number; destination: string }[];
  
  // New Sub Series List
  subSeries?: SubSeries[];
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

// Phase 5 Models

export interface Quotation {
  id: string;
  queryId: string;
  quoteCode: string;
  version: string;
  status: 'Draft' | 'Final' | 'Confirmed';
  hotelCategory: 'Standard' | 'Deluxe' | 'Luxury';
  mealPlan: 'CP' | 'MAP' | 'AP';
  clientName: string;
  destination: string;
  updatedAt: string;
  paxAdult: number;
  paxChild: number;
  travelDate: string;
}

// Module 26: Detailed Service Models
export interface ItineraryHotel {
  id: string;
  hotelName: string;
  roomType: string;
  mealPlan: 'CP' | 'MAP' | 'AP';
  checkIn: string;
  checkOut: string;
  cost: number;
  supplier: string;
  overrideCost?: number;
}

export interface ItineraryTransport {
  id: string;
  vehicleType: string;
  sector: string;
  disposal: boolean;
  cost: number;
  overrideCost?: number;
}

export interface ItineraryFlight {
  id: string;
  carrierName: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  class: 'Economy' | 'Business';
  pnr?: string;
  cost: number;
  overrideCost?: number;
}

export interface ItineraryActivity {
  id: string;
  serviceName: string;
  timeSlot: string;
  duration: string;
  cost: number;
  overrideCost?: number;
  type: 'Activity' | 'Monument' | 'Guide' | 'Transfer';
}

// New Module 26 Extensions
export interface ItineraryRestaurant {
  id: string;
  restaurantName: string;
  mealType: 'Lunch' | 'Dinner';
  supplier: string;
  cost: number; // Adult Cost basis
  overrideCost?: number;
}

export interface ItineraryAdditional {
  id: string;
  serviceName: string;
  type: string;
  supplier: string;
  cost: number;
  overrideCost?: number;
  costType: 'Per Person' | 'Group Cost';
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
  itineraryHotels: ItineraryHotel[];
  itineraryTransports: ItineraryTransport[];
  itineraryFlights: ItineraryFlight[];
  itineraryActivities: ItineraryActivity[];
  itineraryRestaurants: ItineraryRestaurant[];
  itineraryAdditionals: ItineraryAdditional[];
}

export interface CostSheet {
  id: string;
  quotationId: string;
  
  // Granular Costs
  hotelCost: number;
  transportCost: number;
  flightCost: number; // New
  guideCost: number;
  activityCost: number;
  monumentCost: number;
  mealCost: number; // New
  miscCost: number; // New
  escortCost: number;
  enrouteCost: number;
  permitCost: number;

  // Markups & Comm
  markupPercentage: number;
  agentCommission: number;
  isoCommission: number;
  
  gstType: 'IGST' | 'CGST/SGST';
  gstPercentage: number;
  
  // Calculated
  totalLandCost: number;
  markupAmount: number;
  isoAmount: number;
  gstAmount: number;
  totalCost: number;
  finalSalePrice: number;
}

export interface TourExtension {
  id: string;
  quotationId: string;
  type: 'Pre-Tour' | 'Post-Tour';
  title: string;
  startDate: string;
  nights: number;
  rooms: {
    sgl: number;
    dbl: number;
    tpl: number;
  };
}

export interface CityContent {
  id: string;
  city: string;
  title: string;
  description: string;
  language: string;
}

// MASTER SETTINGS MODELS
export interface Country {
  id: string;
  name: string;
  shortName: string;
  code: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

export interface State {
  id: string;
  name: string;
  countryId: string;
  countryName: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

export interface City {
  id: string;
  name: string;
  stateId: string;
  stateName: string;
  countryId: string;
  countryName: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

export interface LeadSource {
  id: string;
  name: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

export interface BusinessType {
  id: string;
  name: string;
  isDefault: 'Yes' | 'No';
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

export interface MarketType {
  id: string;
  name: string;
  color: string;
  isDefault: 'Yes' | 'No';
  addedBy: string;
  dateAdded: string;
  status: 'Active' | 'Inactive';
}

export interface Destination {
  id: string;
  serviceCode: string;
  countryId: string;
  countryName: string;
  name: string;
  airportCode: string;
  latitude: string;
  longitude: string;
  description: string;
  weatherInfo: string;
  additionalInfo: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

export interface Language {
  id: string;
  name: string;
  value: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}

export interface Commission {
  id: string;
  name: string;
  percentage: string;
  status: 'Active' | 'Inactive';
}

export interface Division {
  id: string;
  division: string;
  keyword: string;
  name: string;
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
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
  createdBy: string;
  modifiedBy: string;
  status: 'Active' | 'Inactive';
}
