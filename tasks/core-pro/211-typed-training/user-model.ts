export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  isActive: boolean;
  dateOfBirth: Date;
  address: Address;
  phoneNumbers: string[];
  role: Role
  lastLoginTimestamp: number;
  settings: Settings;
}

export const enum Role {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

export interface Settings {
  notifications: boolean;
  theme: 'light' | 'dark';
  language: string;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

export const regularUser: User = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  age: 30,
  isActive: true,
  dateOfBirth: new Date('1993-01-01'),
  address: {
    street: '123 Main St',
    city: 'New York',
    country: 'USA',
    postalCode: '10001',
  },
  phoneNumbers: ['+1-555-555-5555', '+1-555-555-5556'],
  role: Role.USER,
  lastLoginTimestamp: Date.now(),
  settings: {
    notifications: true,
    theme: 'light',
    language: 'en',
  },
};
