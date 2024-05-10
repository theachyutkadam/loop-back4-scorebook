import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {ScorebookDataSource} from '../datasources';
import {User, UserRelations, Player} from '../models';
import {PlayerRepository} from './player.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly player: HasOneRepositoryFactory<Player, typeof User.prototype.id>;

  constructor(
    @inject('datasources.scorebook') dataSource: ScorebookDataSource, @repository.getter('PlayerRepository') protected playerRepositoryGetter: Getter<PlayerRepository>,
  ) {
    super(User, dataSource);
    this.player = this.createHasOneRepositoryFactoryFor('player', playerRepositoryGetter);
    this.registerInclusionResolver('player', this.player.inclusionResolver);
  }
}
