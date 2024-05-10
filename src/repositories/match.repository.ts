import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ScorebookDataSource} from '../datasources';
import {Match, MatchRelations} from '../models';

export class MatchRepository extends DefaultCrudRepository<
  Match,
  typeof Match.prototype.id,
  MatchRelations
> {
  constructor(
    @inject('datasources.scorebook') dataSource: ScorebookDataSource,
  ) {
    super(Match, dataSource);
  }
}
