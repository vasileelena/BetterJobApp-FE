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
  description: string;
  birthDate: Date;
  cvUrl: string;
  role: RoleEnum;
}
