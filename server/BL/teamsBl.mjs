import { getAllTeams } from "../DAL/dal.mjs"
import {ErrorModel} from "../models/error-model.mjs";

const getAllTeamsFromDal = async () => await getAllTeams();

const getTeamById = async teamId => {
    const teams = await getAllTeams();
    const teamIdx = teams.findIndex(t => t.id === teamId);
    if(teamIdx === -1) throw new ErrorModel(400, `team with  id '${teamId}' doesnt exist`);
    return teams[teamIdx]
}

const getTeamByName = async teamName => {
    const teams = await  getAllTeams();
    const teamIdx = teams.findIndex(t => t.team === teamName);
    if(teamIdx === -1) throw new ErrorModel(400, `team '${teamName}' doesnt exist`);
    return teams[teamIdx]
}

const getTeamsByLeague = async leagueName => {
    const allTeams = await  getAllTeams()
    const teams = allTeams.filter(t => t.league === leagueName);
    if(teams.length === 0) throw new ErrorModel(400, `league '${leagueName}' doesnt exist in this rest-api`);
    return teams;
}


export {
    getAllTeamsFromDal,
    getTeamById,
    getTeamByName,
    getTeamsByLeague
}