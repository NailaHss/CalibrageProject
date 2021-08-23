import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {ResultData, ResultDataRelations} from '../models';

export class ResultDataRepository extends DefaultCrudRepository<
  ResultData,
  typeof ResultData.prototype.resultDataId,
  ResultDataRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(ResultData, dataSource);
  }
}
