import { getAllPlayers } from "../DAL/dal.mjs"
import {ErrorModel} from "../models/error-model.mjs";


const getAllPlayersFromDal = async () => await getAllPlayers();

const getPlayerById = async playerId => {
    const players = await getAllPlayers();
    const playerIdx = players.findIndex(p => p.id === playerId);
    if(playerIdx === -1) throw new ErrorModel(400, `player with  id '${playerId}' doesnt exist`);
    return players[playerIdx]
}

const getPlayerByName = async playerName => {
    const players = await getAllPlayers();
    const playerIdx = players.findIndex(p => p.player === playerName);
    if(playerIdx === -1) throw new ErrorModel(400, `player with the name '${playerName}' doesnt exist`);
    return players[playerIdx]
}

const getTopPlayersByParameterAndLimit = async (playerLimit, parameter) => {
    if(isNaN(Number(playerLimit))) throw new ErrorModel(400, `bad request, ${playerLimit} is not a number`);
    const players = await getAllPlayers();
    const scoreList = {};
    let topScorrers = [];
    let maxGoals = 0;
    for(let i = 0; i< players.length; i++){
        if(scoreList[players[i][parameter]]) scoreList[players[i][parameter]].push(players[i])
        else scoreList[players[i][parameter]] = [players[i]]
        if(players[i][parameter] > maxGoals) maxGoals = players[i][parameter];
    }

    const addPlayersToList = async goals => {
        if(!!scoreList[goals]){
            topScorrers = [...topScorrers, ...scoreList[goals]];
        }
        if(topScorrers.length < playerLimit || !scoreList[goals]){
            return addPlayersToList(goals - 1);
        }
        else{
            return topScorrers;
        }
    }
    return addPlayersToList(maxGoals);
}

const getPlayersByPosition = async position => {
    const allPlayers = await getAllPlayersFromDal();
    const players = allPlayers.filter(p => p.pos === position);
    if(players.length === 0){
        throw new ErrorModel(400, `No players found on position ${position}`)
    }
    return players;
}

const getPlayersByTeam = async teamName => {
    const allPlayers = await getAllPlayersFromDal()
    const players = allPlayers.filter(p => p.team === teamName);
    if(players.length === 0){
        throw new ErrorModel(400, `No players found on team ${teamName}`)
    }
    return players;
}
const getPlayersByFilterParams = async (minGoals, minAssists, team) => {
    const allPlayers = await getAllPlayersFromDal();
    const players = allPlayers.filter(p => 
        (team? p.team === team: true) && 
        (minGoals? p.goals >= minGoals: true) && 
        (minAssists? p.assists >= minAssists: true) 
    );
    
    if(players.length === 0){
        return "no player match filter"
    }
    return players;
}


export {
    getAllPlayersFromDal,
    getPlayerById,
    getPlayerByName,
    getTopPlayersByParameterAndLimit,
    getPlayersByTeam,
    getPlayersByPosition,
    getPlayersByFilterParams
}