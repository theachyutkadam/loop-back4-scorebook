import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Player,
  Team,
} from '../models';
import {PlayerRepository} from '../repositories';

export class PlayerTeamController {
  constructor(
    @repository(PlayerRepository) protected playerRepository: PlayerRepository,
  ) { }

  @get('/players/{id}/teams', {
    responses: {
      '200': {
        description: 'Array of Player has many Team',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Team)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Team>,
  ): Promise<Team[]> {
    return this.playerRepository.teams(id).find(filter);
  }

  @post('/players/{id}/teams', {
    responses: {
      '200': {
        description: 'Player model instance',
        content: {'application/json': {schema: getModelSchemaRef(Team)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Player.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {
            title: 'NewTeamInPlayer',
            exclude: ['id'],
            optional: ['captainId']
          }),
        },
      },
    }) team: Omit<Team, 'id'>,
  ): Promise<Team> {
    return this.playerRepository.teams(id).create(team);
  }

  @patch('/players/{id}/teams', {
    responses: {
      '200': {
        description: 'Player.Team PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Team, {partial: true}),
        },
      },
    })
    team: Partial<Team>,
    @param.query.object('where', getWhereSchemaFor(Team)) where?: Where<Team>,
  ): Promise<Count> {
    return this.playerRepository.teams(id).patch(team, where);
  }

  @del('/players/{id}/teams', {
    responses: {
      '200': {
        description: 'Player.Team DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Team)) where?: Where<Team>,
  ): Promise<Count> {
    return this.playerRepository.teams(id).delete(where);
  }
}
