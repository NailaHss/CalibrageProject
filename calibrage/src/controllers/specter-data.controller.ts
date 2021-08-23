import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {SpecterData} from '../models';
import {SpecterDataRepository} from '../repositories';

export class SpecterDataController {
  constructor(
    @repository(SpecterDataRepository)
    public specterDataRepository: SpecterDataRepository,
  ) { }

  @post('/specter-data')
  @response(200, {
    description: 'SpecterData model instance',
    content: {'application/json': {schema: getModelSchemaRef(SpecterData)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SpecterData, {
            title: 'NewSpecterData',
            exclude: ['specterDataId'],
          }),
        },
      },
    })
    specterData: Omit<SpecterData, 'specterDataId'>,
  ): Promise<SpecterData> {
    return this.specterDataRepository.create(specterData);
  }

  @get('/specter-data/count')
  @response(200, {
    description: 'SpecterData model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SpecterData) where?: Where<SpecterData>,
  ): Promise<Count> {
    return this.specterDataRepository.count(where);
  }

  @get('/specter-data')
  @response(200, {
    description: 'Array of SpecterData model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SpecterData, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SpecterData) filter?: Filter<SpecterData>,
  ): Promise<SpecterData[]> {
    return this.specterDataRepository.find(filter);
  }

  @patch('/specter-data')
  @response(200, {
    description: 'SpecterData PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SpecterData, {partial: true}),
        },
      },
    })
    specterData: SpecterData,
    @param.where(SpecterData) where?: Where<SpecterData>,
  ): Promise<Count> {
    return this.specterDataRepository.updateAll(specterData, where);
  }

  @get('/specter-data/{id}')
  @response(200, {
    description: 'SpecterData model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SpecterData, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SpecterData, {exclude: 'where'}) filter?: FilterExcludingWhere<SpecterData>
  ): Promise<SpecterData> {
    return this.specterDataRepository.findById(id, filter);
  }

  @patch('/specter-data/{id}')
  @response(204, {
    description: 'SpecterData PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SpecterData, {partial: true}),
        },
      },
    })
    specterData: SpecterData,
  ): Promise<void> {
    await this.specterDataRepository.updateById(id, specterData);
  }

  @put('/specter-data/{id}')
  @response(204, {
    description: 'SpecterData PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() specterData: SpecterData,
  ): Promise<void> {
    await this.specterDataRepository.replaceById(id, specterData);
  }

  @del('/specter-data/{id}')
  @response(204, {
    description: 'SpecterData DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.specterDataRepository.deleteById(id);
  }
}
