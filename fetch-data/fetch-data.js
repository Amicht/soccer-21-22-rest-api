const builder = require('./builder');
const scrapper = require('./web-scrapping');
const insertDB = require('./insert-data-to-db');
const fixAPI = require('./fix-api');
const leagues = ["La_liga","Bundesliga","EPL","Serie_A","Ligue_1","RFPL"];

const leagueData = {};

(async function leaguesScrap(idx){
    leagueData[leagues[idx]]= await scrapper.getLeagueData(builder.leagueUrl(leagues[idx]));

    if(++idx<leagues.length){
        await leaguesScrap(idx);
    }
    return leagueData;
})(0).then(data => fixAPI(data)).then(insertDB);

