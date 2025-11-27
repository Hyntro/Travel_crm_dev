
import { Country, State, City, LeadSource, BusinessType, MarketType, Destination, Language, Commission, Division, Season, TourType } from '../types';

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
