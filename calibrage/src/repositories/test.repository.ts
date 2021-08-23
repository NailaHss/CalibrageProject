import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {Test, TestRelations} from '../models';

export class TestRepository extends DefaultCrudRepository<
  Test,
  typeof Test.prototype.testId,
  TestRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(Test, dataSource);
  }
}
