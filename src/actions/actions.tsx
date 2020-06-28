import {IRoundMatches,IMatchResult, IClubData} from '../types/types';
import {Actions} from './types';
import {ActionCreator, Dispatch} from 'redux';
import {ThunkAction} from 'redux-thunk';
import axios from 'axios';


export interface IActionGetAllMatches{
    type: Actions,
    payload: IRoundMatches
}


export const getAllMatches:ActionCreator<ThunkAction<Promise<any>,IRoundMatches,null,any>> = () => {
    return async (dispatch:Dispatch) => {
        const response = await axios.get('http://localhost:8000/data.json');
        let allRoundMatches:IRoundMatches [] = [];
        let keys , values;

        response.data.map((round:IRoundMatches)=>{
            
            let matchRoundElement: IRoundMatches;
            let matches:IMatchResult[] = [];

            round.matches.map((match:IMatchResult)=>{
                let matchResult:IMatchResult;

                keys = Object.keys(match);
                values = Object.values(match);
                let club1:IClubData = {name:keys[0],score:values[0]};
                let club2:IClubData= {name:keys[1],score:values[1]};

                matchResult = {firstClub:club1,secondClub:club2};
                matches.push(matchResult);
            });
            
            matchRoundElement = {round:round.round,matches:matches};
            allRoundMatches.push(matchRoundElement);
        });
       
        

        try {
            dispatch({
                type: Actions.GET_ALL,
                payload:allRoundMatches
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export interface ISelectRoundData{
    round:number
} 

export const selectRoundData = (round:number) =>{
    return {
        type:Actions.SELECT_ROUND_DATA,
        payload:round
    }
}