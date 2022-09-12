class PlayerModel{

    constructor(player){
        this.id = player.id;
        this.no = player.no;     
        this.team = player.team;            
        this.player = player.player;
        this.pos = player.pos;
        this.apps = player.apps;
        this.mins = player.mins;
        this.goals = player.goals;
        this.assists = player.assists;
        this.sh90 = player.sh90;               
        this.kp90 = player.kp90;               
        this.xG = player.xG;
        this.xA = player.xA;                  
        this.xG90 = player.xG90;
        this.xA90 = player.xA90;                 
    }
}

module.exports = PlayerModel;