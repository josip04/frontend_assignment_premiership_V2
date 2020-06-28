import {IMatchResult} from '../types/types';

interface IClubWDD{
    name:string,
    wins:number,
    draws:number,
    defeats:number,
    goalF:number,
    goalA:number
  }


export const calculateWDD = (match:IMatchResult,name:string):IClubWDD => {
    let wins:number = 0, draws:number = 0, defeats:number = 0, goalF:number = 0,goalA:number = 0;


    if(match.firstClub.name === name){
        goalF = match.firstClub.score;
        goalA = match.secondClub.score;

        goalF >= goalA ? goalA == goalF ? draws = 1 : wins = 1 : defeats = 1;

      }else if(match.secondClub.name === name){
        goalF = match.secondClub.score;
        goalA = match.firstClub.score;
        
        goalF >= goalA ? goalA == goalF ? draws = 1 : wins = 1 : defeats = 1;

      }


      return {name:name,wins:wins,draws:draws,defeats:defeats,goalF:goalF,goalA:goalA}
}
