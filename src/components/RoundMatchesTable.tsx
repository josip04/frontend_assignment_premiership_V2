import React from 'react';
import {IRoundMatches} from '../types/types';
//https://blog.logrocket.com/data-fetching-in-redux-apps-a-100-correct-approach-4d26e21750fc/

interface IProps{
    readonly selectedRound:number,
    readonly matches: IRoundMatches[],
    onClick: (round:number) => void
}

const MainContent = (props:IProps) => {
    let matches:any;
    let lastRound:number = 0;
    const result =  props.matches.map((round:IRoundMatches,index:number)=>{
        
        if(round.round===props.selectedRound) {
            lastRound = round.round;
            matches = round.matches.map((match,index)=>{
                return (
                    <tr key={index}>
                        <td>{match.firstClub.name}</td>
                        <td>{match.firstClub.score}</td>
                        <td> - </td>
                        <td>{match.secondClub.score}</td> 
                        <td>{match.secondClub.name}</td> 
                    </tr>
                )
            });
            return matches//<p key={index}>{round}</p>
        }
    })
    return (
        <>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th colSpan={5}>
                            <div className="dropdown">
                            <button className="btn btn-outline-light btn-sm custom-button dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Round {props.selectedRound}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {
                                props.matches.map((round)=>{
                                    return round.round != props.matches.length ? 
                                    <a className="dropdown-item" key={round.round} onClick={()=>{props.onClick(round.round)}}  href="#">Round {round.round}</a>:
                                    <a className="dropdown-item" key={round.round} onClick={()=>{props.onClick(round.round)}}  href="#">Round {props.matches.length}</a>
                                })
                                }
                                
                            </div>
                            </div>

                        </th>
                    </tr>
                </thead>
                <tbody>
                    {result}
                </tbody>
            </table>
        </>
    )
}

export default MainContent;



