import {Entity, hasMany, model, property} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Client extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  clientId?: number;


  @hasMany(() => User, {keyTo: 'userId'})
  users?: User[];

  @property({
    type: 'string',
    required: true,
  })
  name: string;


  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
