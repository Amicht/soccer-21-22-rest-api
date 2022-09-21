import { readFileSync } from 'fs';

const getAllPlayers = async () => {
    const players = readFileSync('./server/database/players.json');
    return JSON.parse(players);
}

const getAllTeams = async () => {
    const teams = readFileSync('./server/database/teams.json');
    return JSON.parse(teams);
}


export {
    getAllTeams,
    getAllPlayers
}