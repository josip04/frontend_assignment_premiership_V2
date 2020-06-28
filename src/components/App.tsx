import React from 'react';
import RoundMatchesTable from '../components/RoundMatchesTable';
import {IMatchResult,IRoundMatches} from '../types/types'
import {calculateWDD} from '../modules/calculateWDD';
import {lastFiveMatches} from '../modules/lastFiveMatches';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


interface ILeaderBoard{
  name:string,
  wins:number,
  draws:number,
  defeats:number,
  goalF:number,
  goalA:number
}

interface IProps{
  readonly selectedRound:number,
  readonly matches:IRoundMatches [],
  onClick: (round:number) => void
}

interface IlastFiveMatches{
  rounds: IRoundMatches[],
  name:string,
  selectedRound:number
}


const renderLastFiveMatches = (props:IlastFiveMatches) =>{
  const matches:IMatchResult[] = lastFiveMatches(props.rounds,props.name,props.selectedRound);
  return (
    <Tooltip id="button-tooltip" className="tooltip">
      {matches.map((match:IMatchResult,index:number)=>{
        return (
          <tr>
            <td key={index}> {match.firstClub.name}  {match.firstClub.score} - {match.secondClub.score} {match.secondClub.name}</td>
            <td className="tooltip_mark"> 
            {match.firstClub.score >= match.secondClub.score ? match.firstClub.score === match.secondClub.score ? 'D' : 'W' :'L'}
            </td>
          </tr>
        )
      })}
    </Tooltip>
  );
}

function App(props:IProps) {
  let clubList:string[] = [];
  let clubListData:ILeaderBoard[] = [];
  let clubData:ILeaderBoard;
  let wins:number = 0, draws:number = 0, defeats:number = 0,goalF:number = 0,goalA:number = 0,pts:number = 0;
  let leaderBoard;

  
  props.matches.map((round)=>{
      if(round.round==1){
        round.matches.map((match)=>{
          clubList.push(match.firstClub.name);
          clubList.push(match.secondClub.name);
        });
      }
  });

  clubList.map((name)=>{
    wins = 0;
    draws = 0;
    defeats = 0;
    goalF = 0;
    goalA = 0;
    

    props.matches.map((round)=>{
      if(round.round <= props.selectedRound){
        round.matches.map((match)=>{
          clubData = calculateWDD(match,name);
        
          wins += clubData.wins;
          draws += clubData.draws;
          defeats += clubData.defeats;
          goalF+= clubData.goalF;
          goalA+= clubData.goalA;
        }) 
      }
    });
    clubListData.push({name:name,wins:wins,draws:draws,defeats:defeats,goalF:goalF,goalA:goalA});
  });

  /*
   onMouseEnter={()=>{
        console.log(lastFiveMatches(props.matches,clubData.name,length:props.selectedRound))
      }
  }
  */
  leaderBoard = clubListData.sort(
    (a,b) => (a.wins*3+a.draws) >= (b.wins*3+b.draws) ? (a.goalA - a.goalF) > (b.goalF - b.goalA)  ? -1 : -1 : 1
  ).map((clubData,index)=>{
    return (
      <OverlayTrigger
        placement="right"
        delay={{ show: 250, hide: 400 }}
        overlay={renderLastFiveMatches({rounds:props.matches,name:clubData.name,selectedRound:props.selectedRound})}
        key={index}
      >
      <tr key={index}>
        <td>{clubData.name}</td>
        <td>{props.selectedRound}</td>
        <td>{clubData.wins}</td>
        <td>{clubData.draws}</td>
        <td>{clubData.defeats}</td>

        
        <td>{clubData.goalF}</td>
        <td>{clubData.goalA}</td>
        <td>{clubData.goalF-clubData.goalA}</td>
        <td>{clubData.wins*3+clubData.draws}</td>
      </tr>
      </OverlayTrigger>
    )
  })

  return (
    <>
    <div className="container mt-5 mb-5">
      <div className="row">
      <div className="col-md-7">
      <table className="table">
        <thead className="thead-dark custom-thead">
          <tr>
            <th>Club</th>
            <th>MP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GF</th>
            <th>GA</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
          <tbody>
              {leaderBoard}
          </tbody>
        </table>
      </div>

      <div className="col-md-5 col-sm-12 ml-md-auto">
        <RoundMatchesTable matches={props.matches} onClick={props.onClick} selectedRound={props.selectedRound}/>
      </div>
      </div>
    </div>
    </>
  )
}


export default App;
