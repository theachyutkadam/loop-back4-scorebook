import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {ScorebookDataSource} from '../datasources';
import {Team, TeamRelations, Match} from '../models';
import {MatchRepository} from './match.repository';

export class TeamRepository extends DefaultCrudRepository<
  Team,
  typeof Team.prototype.id,
  TeamRelations
> {

  public readonly matches: HasManyRepositoryFactory<Match, typeof Team.prototype.id>;

  public readonly team2Matches: HasManyRepositoryFactory<Match, typeof Team.prototype.id>;

  constructor(
    @inject('datasources.scorebook') dataSource: ScorebookDataSource, @repository.getter('MatchRepository') protected matchRepositoryGetter: Getter<MatchRepository>,
  ) {
    super(Team, dataSource);
    this.team2Matches = this.createHasManyRepositoryFactoryFor('team2Matches', matchRepositoryGetter,);
    this.registerInclusionResolver('team2Matches', this.team2Matches.inclusionResolver);
    this.matches = this.createHasManyRepositoryFactoryFor('matches', matchRepositoryGetter,);
    this.registerInclusionResolver('matches', this.matches.inclusionResolver);
  }
}
