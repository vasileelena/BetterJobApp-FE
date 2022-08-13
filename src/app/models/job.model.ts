export enum ExperienceEnum {
  None,
  Entry,
  Mid,
  Senior,
  Manager
}

export enum ProgramEnum {
  part_time,
  full_time,
  project,
  internship
}

export enum LocationEnum {
  Remote,
  Bucharest,
  Arad,
  Cluj_Napoca,
  Constanta,
  Craiova,
  Galati,
  Iasi,
  Oradea,
  Pitesti,
  Ploiesti,
  Sibiu,
  Timisoara
}

export enum CurrencyEnum {
  RON,
  EURO
}

export enum IndustryEnum {
  Administration_and_public_services,
  Accounting_banking_and_finance,
  Agriculture_and_environment,
  Art_and_design,
  Business_consulting_and_management,
  Construction,
  Energy_and_utilities,
  Engineering_and_manufacturing,
  Healthcare,
  Hospitality_and_events_management,
  Information_technology,
  Law,
  Law_enforcement_and_security,
  Leisure_sport_and_tourism,
  Marketing_advertising_and_PR,
  Media_and_internet,
  Recruitment_and_HR,
  Retail,
  Sales,
  Science_and_pharmaceuticals,
  Teacher_training_and_education,
  Transport_and_logistics
}

export interface Job {
  id: number;
  recruiterId: number;
  jobTitle: string;
  industry: IndustryEnum;
  experience: ExperienceEnum;
  undefinedPeriod: boolean;
  period: number;
  program: ProgramEnum;
  salaryLowerRange: number;
  salaryUpperRange: number;
  currency: CurrencyEnum;
  location: LocationEnum;
  description: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
  creationDate: Date;
}
