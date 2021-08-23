import {Provider} from '@loopback/context';
import {RequiredRole, Role, UserRoleFn} from '../authorization';

export class UserRoleProvider implements Provider<UserRoleFn> {
  constructor() { }

  value(): UserRoleFn {
    return (userRole, requiredRole) => this.action(userRole, requiredRole);
  }

  action(userRole: Role, requiredRole: RequiredRole): boolean {
    /*
      Roles are ordered hierarchically,
      0 has all the permissions (Admin)
      1 has a subset of 0 (Manager)
      2 has a subset of 1 (Operator)
      Required Role represents the maximum level allowed
    */
    return userRole <= requiredRole.required;
  }
}
