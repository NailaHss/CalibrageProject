import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {UserDataSource} from '../datasources';
import {SpecterData, SpecterDataRelations} from '../models';

export class SpecterDataRepository extends DefaultCrudRepository<
  SpecterData,
  typeof SpecterData.prototype.specterDataId,
  SpecterDataRelations
> {
  constructor(
    @inject('datasources.user') dataSource: UserDataSource,
  ) {
    super(SpecterData, dataSource);
  }
}
