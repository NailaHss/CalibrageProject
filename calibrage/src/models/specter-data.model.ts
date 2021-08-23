import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Test} from './test.model';

@model()
export class SpecterData extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  specterDataId?: number;

  @belongsTo(() => Test)
  testId: number;

  @property({
    type: 'array',
    itemType: 'number',
    required: true,
  })
  specterArray: number[][];

  constructor(data?: Partial<SpecterData>) {
    super(data);
  }
}

export interface SpecterDataRelations {
  // describe navigational properties here
}

export type SpecterDataWithRelations = SpecterData & SpecterDataRelations;


