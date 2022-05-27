import {CurrencyEnum, ExperienceEnum, IndustryEnum, LocationEnum, ProgramEnum} from "./job.model";

export interface JobFilterInputs {
  industry: IndustryEnum[];
  experience: ExperienceEnum[];
  undefinedPeriod: boolean;
  period: number;
  program: ProgramEnum[];
  salaryLowerRange: number;
  salaryUpperRange: number;
  currency: CurrencyEnum;
  location: LocationEnum[];
}
