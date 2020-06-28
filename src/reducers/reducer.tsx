import react from 'react';
import {IAllRoundMatches,IRoundMatches, IMatchResult} from '../types/types';
import {Actions} from '../actions/types';
import {TypedActions} from '../types/types';
import {IActionGetAllMatches} from '../actions/actions';

const initialState = {
    matches:[]
}


export const reducer = (
    state = initialState ,
    action: TypedActions
    ) =>{
    switch(action.type){
        case Actions.GET_ALL:
            return {
                matches:action.payload
            }
        case Actions.SELECT_ROUND_DATA:
            return {
                matches: [...state.matches],
                selectedRound:action.payload
                /*matches:[
                    ...state.matches.filter((match:IRoundMatches)=>{
                        return match.round <= action.payload
                    })
                    */
                    //...state.matches.slice(0,index.round)
                    //...state.matches.slice(0,round)
                    /*
                    ...state.matches.filter((match:IRoundMatches,index:number)=>{
                        console.log(match.round + ' ' + (index+1))
                        return (index+1) < action.payload.round ? match : 
                    })*/
                //]
            }
            
        default:
            return state;
    }
}
