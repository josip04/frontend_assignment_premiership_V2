import App from '../components/App';
import {connect} from 'react-redux'
import { Dispatch } from 'redux';
import {IAllRoundMatches} from '../types/types';
import {selectRoundData} from '../actions/actions';

interface IProp{
    reducer: IAllRoundMatches
}

const mapStateToProps = ({reducer}:IProp):IAllRoundMatches =>{
    const {matches,selectedRound = matches.length} = reducer;
    return {
        matches,
        selectedRound,
    }
}

const mapDispatchToProps = (dispatch:Dispatch) =>{
    return {
        onClick: ((round:number)=> dispatch(selectRoundData(round)))
    }
}



const AppContainer = connect(mapStateToProps,mapDispatchToProps)(App);

export default AppContainer;