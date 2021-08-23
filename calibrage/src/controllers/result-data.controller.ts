import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ResultData} from '../models';
import {ResultDataRepository} from '../repositories';

export class ResultDataController {
  constructor(
    @repository(ResultDataRepository)
    public resultDataRepository : ResultDataRepository,
  ) {}

  @post('/result-data')
  @response(200, {
    description: 'ResultData model instance',
    content: {'application/json': {schema: getModelSchemaRef(ResultData)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultData, {
            title: 'NewResultData',
            exclude: ['resultDataId'],
          }),
        },
      },
    })
    resultData: Omit<ResultData, 'resultDataId'>,
  ): Promise<ResultData> {
    return this.resultDataRepository.create(resultData);
  }

  @get('/result-data/count')
  @response(200, {
    description: 'ResultData model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ResultData) where?: Where<ResultData>,
  ): Promise<Count> {
    return this.resultDataRepository.count(where);
  }

  @get('/result-data')
  @response(200, {
    description: 'Array of ResultData model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ResultData, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ResultData) filter?: Filter<ResultData>,
  ): Promise<ResultData[]> {
    return this.resultDataRepository.find(filter);
  }

  @patch('/result-data')
  @response(200, {
    description: 'ResultData PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultData, {partial: true}),
        },
      },
    })
    resultData: ResultData,
    @param.where(ResultData) where?: Where<ResultData>,
  ): Promise<Count> {
    return this.resultDataRepository.updateAll(resultData, where);
  }

  @get('/result-data/{id}')
  @response(200, {
    description: 'ResultData model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ResultData, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ResultData, {exclude: 'where'}) filter?: FilterExcludingWhere<ResultData>
  ): Promise<ResultData> {
    return this.resultDataRepository.findById(id, filter);
  }

  @patch('/result-data/{id}')
  @response(204, {
    description: 'ResultData PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResultData, {partial: true}),
        },
      },
    })
    resultData: ResultData,
  ): Promise<void> {
    await this.resultDataRepository.updateById(id, resultData);
  }

  @put('/result-data/{id}')
  @response(204, {
    description: 'ResultData PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() resultData: ResultData,
  ): Promise<void> {
    await this.resultDataRepository.replaceById(id, resultData);
  }

  @del('/result-data/{id}')
  @response(204, {
    description: 'ResultData DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.resultDataRepository.deleteById(id);
  }
}
