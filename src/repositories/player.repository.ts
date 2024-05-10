import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ScorebookDataSource} from '../datasources';
import {Player, PlayerRelations, Team} from '../models';
import {TeamRepository} from './team.repository';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {

  public readonly teams: HasManyRepositoryFactory<Team, typeof Player.prototype.id>;

  constructor(
    @inject('datasources.scorebook') dataSource: ScorebookDataSource, @repository.getter('TeamRepository') protected teamRepositoryGetter: Getter<TeamRepository>,
  ) {
    super(Player, dataSource);
    this.teams = this.createHasManyRepositoryFactoryFor('teams', teamRepositoryGetter,);
    this.registerInclusionResolver('teams', this.teams.inclusionResolver);
  }
}
