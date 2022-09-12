class TeamModel{

    constructor(team){
        this.no = team.no;                          // place number in the league 
        this.team = team.team;                       // team name
        this.matches = team.matches;
        this.wins = team.wins;
        this.draws = team.draws;
        this.loses = team.loses;
        this.goals_for = team.goals_for;
        this.goals_against = team.goals_against;
        this.pts = team.pts;
        this.xG = team.xG;                  // expected goals
        this.xGA = team.xGA;                // expected goals against
        this.xPTS = team.xPTS;              // expected points
    }
}

module.exports = TeamModel;