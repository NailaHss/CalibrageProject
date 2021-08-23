import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Client} from './client.model';
import {Test} from './test.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  userId?: number;

  @belongsTo(() => Client)
  clientId: number;

  @hasMany(() => Test, {keyTo: 'testId'})
  tests?: Test[];

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  passwd: string;

  @property({
    type: 'number',
    required: true,
  })
  role: number;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
