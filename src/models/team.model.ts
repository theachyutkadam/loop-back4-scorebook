import {Entity, model, property, hasMany} from '@loopback/repository';
import {Match} from './match.model';

@model({settings: {strict: false}})
export class Team extends Entity {
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
  name: string;

  @property({
    type: 'string',
    default: "active",
  })
  status?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
    required: true,
  })
  contact: string;

  @hasMany(() => Match, {keyTo: 'team1_id'})
  matches: Match[];

  @property({
    type: 'number',
  })
  captainId?: number;

  @hasMany(() => Match, {keyTo: 'team2Id'})
  team2Matches: Match[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Team>) {
    super(data);
  }
}

export interface TeamRelations {
  // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
