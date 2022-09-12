import { getAllTeams } from "../DAL/dal.mjs"
import {ErrorModel} from "../models/error-model.mjs";

const getAllTeamsFromDal = () => getAllTeams();

const getTeamById = teamId => {
    const teams = getAllTeams();
    const teamIdx = teams.findIndex(t => t.id === teamId);
    if(teamIdx === -1) throw new ErrorModel(400, `team with  id '${teamId}' doesnt exist`);
    return teams[teamIdx]
}

const getTeamByName = teamName => {
    const teams = getAllTeams();
    const teamIdx = teams.findIndex(t => t.team === teamName);
    if(teamIdx === -1) throw new ErrorModel(400, `team '${teamName}' doesnt exist`);
    return teams[teamIdx]
}

const getTeamsByLeague = leagueName => {
    const teams = getAllTeams().filter(t => t.league === leagueName);
    if(teams.length === 0) throw new ErrorModel(400, `league '${leagueName}' doesnt exist in this rest-api`);
    return teams;
}


export {
    getAllTeamsFromDal,
    getTeamById,
    getTeamByName,
    getTeamsByLeague
}