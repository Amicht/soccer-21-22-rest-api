# Soccer REST-API


### About The Project

* This project designed to create a soccer API, of all teams and players in the top 5 leagues of europe (and rossia, from some reason...).

* The data was scrapped from understat.com

* I used the web-scrapping method, using "puppeteer" on Node.js .

* The database contain over 3000 players and over 100 teams.

* This API is meant for progremming purposes only.


### Model Documentation

#### Team
```
{
    no: number,                          // rank number in the league 
    team: string,                        // team name
    matches: number,
    wins: number,
    draws: number,
    loses: number,
    goals_for: number,
    goals_against: number,
    pts: number,
    xG: number,                          // expected goals
    xGA: number,                         // expected goals against
    xPTS: number                         // expected points  
    league: string,
    id: number                  
}
```

#### Player
```
{
    no: number,                  // rank on the team
    player: string,              // player name
    pos: F | F M | M | D | S | G K,
    apps: number,
    mins: number,
    goals: number,
    assists: number,
    sh90: number,                // shots per 90 minutes
    kp90: number,                // passes led per 90 minutes
    xG: number,                  // expected goals
    xA: number,                  
    xG90: number,                // expected goals per 90 minutes
    xA90: number                 // expected assists per 90 minutes
    id: number,
    team: string
}
```

## API Documentation

### ServerUrl: https://soccer-rest-api-21-22.herokuapp.com/

### Endpoints:
#### Players

1. Get all players - 
    * `/api/players`
2. Get player by id - 
    * `/api/players/${playerId}`
3. Get player by name - 
    * `/api/players/${playerName}`
4. Get top scorrers (limit the amount of players) - 
    * `/api/players/top/scorrers?limit=10`  - will return the top 20 players that have scorred the biggest amount of goals (or maybe more in case of a equality).
5. Get top assist player (works the same as the 'scorrers' above) - 
    * `/api/players/top/assists?limit=10`
6. Get players by position    F | F M | M | D M | S | D | GK
    * `/api/players/position/{positionInitials}`
7. Get players by team
    * `/api/players/team/{teamName}`
8. Get players by filter querystring (all optional, not required): 
    * `/api/players/filter?`
    
    params:               
    * `minGoals={number}`
    * `minAssists={number}`
    * `team={teamName}`
    `
   
    For example: 
    
    /api/players/filter?minGoals=10&minAssists=1&team=Barcelona

    Will return an array containing all players scored at least 10 goals, and have at least 1 assist and are on team 'Barcelona'. 


#### Teams
1. Get all teams - 
    * `/api/teams`
2. Get team by id - 
    * `/api/teams/{teamId}`
3. Get team by name - 
    * `/api/teams/{teamName}`
4. Get all the teams in the league ( The leagues available are: "La_liga","Bundesliga","EPL","Serie_A","Ligue_1","RFPL" ) - 
    * `/api/teams/league/{leagueName}`
