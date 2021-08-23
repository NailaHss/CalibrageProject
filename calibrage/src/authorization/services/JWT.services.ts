import {TokenService} from '@loopback/authentication';
import {inject} from '@loopback/context';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {promisify} from 'util';
import {User} from '../../models';
import {UserRepository} from '../../repositories';
import {PasswordHasherBindings, TokenServiceConstants} from '../keys';
import {Credential, MyUserProfile} from '../types';
import {PasswordHasher} from './hash.password.bcryptjs';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject(PasswordHasherBindings.PASSWORD_HASHER)
    public passwordHasher: PasswordHasher,
  ) { }

  async verifyToken(token: string): Promise<MyUserProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`,
      );
    }
    const decryptedToken = await verifyAsync(
      token,
      TokenServiceConstants.TOKEN_SECRET_VALUE,
    );
    const user = await this.userRepository.findById(decryptedToken.id);

    let userProfile = {
      id: user.userId,
      name: user.name,
      email: user.email,
      role: user.role,
    } as MyUserProfile;
    return userProfile;
  }

  async generateToken(userProfile: MyUserProfile): Promise<string> {
    const token = await signAsync(
      userProfile,
      TokenServiceConstants.TOKEN_SECRET_VALUE,
      {
        expiresIn: TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE,
      },
    );

    return token;
  }

  async verifyCredential(credential: Credential): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: {email: credential.email},
    });

    if (!foundUser) {
      throw new HttpErrors['NotFound'](
        `User with email ${credential.email} not found.`,
      );
    }

    const passwordMatched = await this.passwordHasher.comparePassword(
      credential.password,
      foundUser.passwd!!,
    );

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized('The credentials are not correct');
    }

    return foundUser;
  }




  // async getToken(credential: Credential): Promise<string> {
  //   const foundUser = await this.verifyCredential(credential);
  //   if (credential.refreshToken) {
  //     //Log out all other devices
  //     await this.userRepository.updateById(foundUser.userId, {
  //       tokenRefreshedAt: Math.round(new Date().getTime() / 1000),
  //     });
  //   }
  //   const currentUser: MyUserProfile = {
  //     role: foundUser.role,
  //     id: foundUser.userId,
  //   } as MyUserProfile;
  //   const token = await this.generateToken(currentUser);
  //   return token;
  // }
}
