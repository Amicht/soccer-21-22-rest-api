import { getAllPlayersFromDal,getPlayerById,getPlayerByName,getPlayersByFilterParams,getPlayersByPosition,getPlayersByTeam,getTopPlayersByParameterAndLimit} from '../BL/playersBl.mjs'
import { Router } from 'express'

const playersCtrl = Router();


playersCtrl.get('/',async (req,res,next)=> {
    try{
        const players = getAllPlayersFromDal();
        res.send(players)
    }
    catch(err){next(err)}
});

playersCtrl.get("/filter",async (req,res,next)=> {
    try{
        const minGoals = +req.query?.minGoals || null;
        const minassists = +req.query?.minAssists || null;
        const team = req.query?.team || null;
        const players = getPlayersByFilterParams(minGoals, minassists, team);
        res.send(players);
    }
    catch(err){next(err)}
})

playersCtrl.get('/team/:teamName',async (req,res,next)=>{
    try{
        const teamName = req.params?.teamName || null;
        const players = getPlayersByTeam(teamName);
        res.send(players);
    }
    catch(err){next(err)}
});

playersCtrl.get('/position/:pos',async (req,res,next)=>{
    try{
        const position = req.params?.pos || null;
        const players = getPlayersByPosition(position);
        res.send(players);
    }
    catch(err){next(err)}
});


// currently only 'scorer' / 'assists'
playersCtrl.get('/top/assists',async (req,res,next)=> {
    try{
        const limit = +req.query?.limit;
        const players = getTopPlayersByParameterAndLimit(limit, "assists");
        res.send(players);
    }catch(err){ next(err) }
});

playersCtrl.get('/top/scorrers',async (req,res,next)=> {
    try{
        const limit = +req.query?.limit;
        const players = getTopPlayersByParameterAndLimit(limit, "goals");
        res.send(players);
    }catch(err){ next(err) }
});

playersCtrl.get('/:id([0-9]+)',async (req,res,next)=>{
    try{
        const playerId = +req.params?.id || null;
        const player = getPlayerById(playerId);
        res.send(player);
    }
    catch(err){next(err)}
});

playersCtrl.get('/:name',async (req,res,next)=> {
    try{
        const playerName = req.params?.name || null;
        const player = getPlayerByName(playerName);
        res.send(player);
    }
    catch(err){next(err)}
});

export { playersCtrl };