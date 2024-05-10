import {Entity, model, property} from '@loopback/repository';

@model()
export class Match extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    default: 5,
  })
  number_of_overs?: number;

  @property({
    type: 'boolean',
    default: false,
  })
  is_draw?: boolean;

  @property({
    type: 'date',
    required: true,
  })
  start_at: string;

  @property({
    type: 'date',
  })
  end_at?: string;


  constructor(data?: Partial<Match>) {
    super(data);
  }
}

export interface MatchRelations {
  // describe navigational properties here
}

export type MatchWithRelations = Match & MatchRelations;
