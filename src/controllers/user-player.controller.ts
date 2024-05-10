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
  User,
  Player,
} from '../models';
import {UserRepository} from '../repositories';

export class UserPlayerController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/player', {
    responses: {
      '200': {
        description: 'User has one Player',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Player),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Player>,
  ): Promise<Player> {
    return this.userRepository.player(id).get(filter);
  }

  @post('/users/{id}/player', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Player)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {
            title: 'NewPlayerInUser',
            exclude: ['id'],
            optional: ['userId']
          }),
        },
      },
    }) player: Omit<Player, 'id'>,
  ): Promise<Player> {
    return this.userRepository.player(id).create(player);
  }

  @patch('/users/{id}/player', {
    responses: {
      '200': {
        description: 'User.Player PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Player, {partial: true}),
        },
      },
    })
    player: Partial<Player>,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.userRepository.player(id).patch(player, where);
  }

  @del('/users/{id}/player', {
    responses: {
      '200': {
        description: 'User.Player DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Player)) where?: Where<Player>,
  ): Promise<Count> {
    return this.userRepository.player(id).delete(where);
  }
}
