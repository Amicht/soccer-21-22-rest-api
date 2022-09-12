const baseURL = 'https://understat.com';
const ENDPOINTS = {
    league: '/league',
    team: '/team'
}

const leagueUrl = leagueName => `${baseURL + ENDPOINTS.league}/${leagueName}`;
const teamUrl = (teamName,year) => `${baseURL + ENDPOINTS.team}/${teamName}/${year}`;

module.exports = {
    leagueUrl,
    teamUrl
}
