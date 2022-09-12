import { readFileSync } from 'fs';

const getAllPlayers = () => {
    const players = readFileSync('./server/database/players.json');
    return JSON.parse(players);
}

const getAllTeams = () => {
    const teams = readFileSync('./server/database/teams.json');
    return JSON.parse(teams);
}


export {
    getAllTeams,
    getAllPlayers
}