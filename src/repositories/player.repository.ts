import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ScorebookDataSource} from '../datasources';
import {Player, PlayerRelations} from '../models';

export class PlayerRepository extends DefaultCrudRepository<
  Player,
  typeof Player.prototype.id,
  PlayerRelations
> {
  constructor(
    @inject('datasources.scorebook') dataSource: ScorebookDataSource,
  ) {
    super(Player, dataSource);
  }
}
