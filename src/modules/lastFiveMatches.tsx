import {IRoundMatches,IMatchResult} from '../types/types';

export const lastFiveMatches = (rounds:IRoundMatches[],name:string,length:number) => {
    let lastFive:IMatchResult[] = [];
    

    rounds.map((round)=>{
        round.matches.map((match:IMatchResult)=>{
            return match.firstClub.name == name ||match.secondClub.name == name ? lastFive.push(match) : match;
        });
    });

    return (length <= 5) ?  lastFive.slice(0,length) : lastFive.slice(length-5,length);
}