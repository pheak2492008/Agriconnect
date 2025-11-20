export type UserRole = "admin" | "farmer" | "customer";

export type tokenPayload = {
  _id: string;
  email: string;
  roles: UserRole[];
};
