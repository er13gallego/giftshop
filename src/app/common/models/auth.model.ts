export interface AuthModel {
  id: string;
  email: string;
  name: string;
  roles: string[];
  expiresIn: number;
}
