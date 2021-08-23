import {Entity, model, property} from '@loopback/repository';

@model()
export class Test extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  testId?: number;

  @property({
    type: 'string',
    required: true,
  })
  sensor?: string;

  @property({
    type: 'date',
    required: true,
  })
  dateTime: string;


  constructor(data?: Partial<Test>) {
    super(data);
  }
}

export interface TestRelations {
  // describe navigational properties here
}

export type TestWithRelations = Test & TestRelations;
