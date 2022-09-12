const puppeteer = require('puppeteer');
const getTeamURL = require('./builder').teamUrl;

async function getTeamData(url){
    const browser = await puppeteer.launch({headless:true}); 
    const page = await browser.newPage();
    await page.goto(url);
    const teamData =  await page.evaluate(async() =>{
            const team = [];
            this.document.querySelectorAll('table')[1].querySelectorAll('tbody tr').forEach(p => {
            const pl = p.querySelectorAll('td');
            const player = {
                no: +pl[0].innerText,
                player: pl[1].innerText,
                pos: pl[2].innerText,
                apps: +pl[3].innerText,
                mins: +pl[4].innerText,
                goals: +pl[5].innerText,
                assists: +pl[6].innerText,
                sh90: +pl[7].innerText,
                kp90: +pl[8].innerText,
                xG: +pl[9].innerText.replace('-',' ').replace('+',' ').split(' ')[0],
                xA: +pl[10].innerText.replace('-',' ').replace('+',' ').split(' ')[0],
                xG90: +pl[11].innerText,
                xA90: +pl[12].innerText
            }
            team.push(player);
        });
        return team;
    });
    await browser.close();
    return teamData;
}

async function getLeagueData(url){
    const browser = await puppeteer.launch({headless:true}); 
    const page = await browser.newPage();
    await page.goto(url);
    const leagueTeams = await page.evaluate(()=>{
        const teams = [];
        const tableTeams = document.querySelectorAll('table')[0].querySelectorAll('tbody tr');
        for(const t of tableTeams){
            const tm = t.querySelectorAll('td');
            const team = {
                no: +tm[0].innerText,
                team: tm[1].innerText,
                matches: +tm[2].innerText,
                wins: +tm[3].innerText,
                draws: +tm[4].innerText,
                loses: +tm[5].innerText,
                goals_for: +tm[6].innerText,
                goals_against: +tm[7].innerText,
                pts: +tm[8].innerText,
                xG: +tm[9].innerText.replace('-',' ').replace('+',' ').split(' ')[0],
                xGA: +tm[10].innerText.replace('-',' ').replace('+',' ').split(' ')[0],
                xPTS: +tm[11].innerText.replace('-',' ').replace('+',' ').split(' ')[0]
            }
            teams.push(team);
        };
        return teams;
    });
    for(const team of leagueTeams){
        const teamData = await getTeamData(getTeamURL(team.team,2021));
        team.players = teamData;
    }
    return leagueTeams;
}

module.exports = {
    getTeamData,
    getLeagueData
}




















