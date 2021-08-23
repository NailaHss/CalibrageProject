import {UserProfile} from '@loopback/security';
import {Role} from './role';

export interface UserRoleFn {
  (userRole: Role, requiredRole: RequiredRole): boolean;
}

export interface RequiredRole {
  required: Role;
}

export interface MyUserProfile extends UserProfile {
  id: number;
  role: Role;
}

export const UserProfileSchema = {
  type: 'object',
  required: ['email', 'password', 'name', 'role'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
    name: {type: 'string'},
    role: {type: 'string'},
  },
};

// export const UserRequestBody = {
//   description: 'The input of create user function',
//   required: true,
//   content: {
//     'application/json': {schema: UserProfileSchema},
//   },
// };

export interface KeysResponse {
  customerName: string;
  endDate: string;
  response: string;
}
export interface KeysCredential {
  spectroId: string;
  key: string;
  activDate: string;
}

export const KeysCredentialsSchema = {
  type: 'object' as const,
  required: ['key'],
  properties: {
    spectroId: {type: 'string' as const},
    key: {type: 'string' as const},
    activDate: {type: 'string' as const},
  },
};

export const KeysCredentialsRequestBody = {
  description: 'The input of validate function',
  required: true,
  content: {
    'application/json': {schema: KeysCredentialsSchema},
  },
};

export interface Credential {
  email: string;
  password: string;
  refreshToken: boolean;
}

export const CredentialsSchema = {
  type: 'object' as const,
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string' as const,
      format: 'email',
    },
    password: {
      type: 'string' as const,
      minLength: 8,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export interface NewCredential {
  email: string;
  password: string;
  newPassword: string;
  refreshToken: boolean;
}

export const NewCredentialsSchema = {
  type: 'object',
  required: ['email', 'password', 'newPassword'],

  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 8,
    },
    newPassword: {
      type: 'string',
      minLength: 8,
    },
  },
};

export const NewCredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: NewCredentialsSchema},
  },
};

export interface IEmail {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export const IEmailSchema = {
  type: 'object' as const,
  required: ['from', 'to', 'subject', 'html'],
  properties: {
    from: {type: 'string' as const},
    to: {type: 'string' as const},
    subject: {type: 'string' as const},
    html: {type: 'string' as const},
  },
};

export const IEmailRequestBody = {
  description: 'The input of sendMail function',
  required: true,
  content: {
    'application/json': {schema: IEmailSchema},
  },
};


