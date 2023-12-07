export interface IUser {
  uid: string;
  email: string | null;
  username?: string;
  isAdmin?: boolean;
}
