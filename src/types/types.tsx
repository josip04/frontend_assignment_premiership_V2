import {Actions} from '../actions/types';
import {IActionGetAllMatches,ISelectRoundData} from '../actions/actions';
export interface IClubData{
    name:string,
    score:number
}

export interface IMatchResult{
    firstClub:IClubData,
    secondClub:IClubData
}
export interface IRoundMatches{
    round:number,
    matches: IMatchResult[]
}

export interface IAllRoundMatches{
    readonly selectedRound:number,
    readonly matches: IRoundMatches[]
}

export interface TypedAction<TAction,TPayload>{
    type: TAction,
    payload:TPayload
}

type GetAll = TypedAction<Actions.GET_ALL,IActionGetAllMatches>;
type GetLimitRounds = TypedAction<Actions.SELECT_ROUND_DATA,number>;

export type TypedActions = GetAll | GetLimitRounds;

