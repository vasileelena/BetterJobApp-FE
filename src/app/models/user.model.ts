export enum RoleEnum {
  USER ,
  RECRUITER
}

export interface User {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: RoleEnum;
  company: string;
  birthDate: Date;
  description: string;
  location: string;
  skills: string;
}
