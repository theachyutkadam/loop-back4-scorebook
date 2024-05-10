import {Entity, model, property, hasMany} from '@loopback/repository';
import {Team} from './team.model';

@model({settings: {strict: false}})
export class Player extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
  })
  last_name?: string;

  @property({
    type: 'string',
  })
  contact?: string;

  @property({
    type: 'string',
    default: "batsman",
  })
  speciality?: string;

  @property({
    type: 'number',
  })
  userId?: number;

  @hasMany(() => Team, {keyTo: 'captainId'})
  teams: Team[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Player>) {
    super(data);
  }
}

export interface PlayerRelations {
  // describe navigational properties here
}

export type PlayerWithRelations = Player & PlayerRelations;
