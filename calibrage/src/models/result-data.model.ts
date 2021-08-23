import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Test} from './test.model';

@model()
export class ResultData extends Entity {//entity
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  resultDataId?: number;
  @belongsTo(() => Test)
  testId: number;

  @property({
    type: 'any',
    required: true,
  })
  model: any;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  constructor(data?: Partial<ResultData>) {
    super(data);
  }
}

export interface ResultDataRelations {
  // describe navigational properties here
}

export type ResultDataWithRelations = ResultData & ResultDataRelations;

