import { Router } from 'express'
import { getAllTeamsFromDal, getTeamById, getTeamByName, getTeamsByLeague } from '../BL/teamsBl.mjs'


const teamsCtrl = Router();


teamsCtrl.get('/',async (req,res,next)=> {
    try{
        const teams = await getAllTeamsFromDal();
        res.send(teams);
    }
    catch(err){next(err)}
});

teamsCtrl.get('/league/:leagueName',async (req,res,next)=> {
    try{
        const leagueName = req.params.leagueName;
        const team = await getTeamsByLeague(leagueName);
        res.send(team);
    } 
    catch(err){next(err)}
});

teamsCtrl.get('/:id([0-9]+)',async (req,res,next)=>{
    try{
        const teamId = +req.params.id;
        const team = await getTeamById(teamId);
        res.send(team);
    }
    catch(err){ next(err) }
});

teamsCtrl.get('/:name',async (req,res,next)=> {
    try{
        const teamName = req.params.name;
        const team = await getTeamByName(teamName);
        res.send(team);
    } 
    catch(err){next(err)}
});

export { teamsCtrl };