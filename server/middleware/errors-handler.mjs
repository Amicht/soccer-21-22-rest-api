import { ErrorModel } from "../models/error-model.mjs";


const errorHandler = (err, req, res,next) => {
    const docsMessage = ". For more information, check out the api docs on https://github.com/Amicht/soccer-21-22-rest-api"   
    if(err instanceof Error){
        res.status(err.status || 500).send(err.message + docsMessage);
        return;
    }
    if(err instanceof ErrorModel){
        res.status(err.status).send(err.message + docsMessage);
        return;
    }
    next();
}

export { errorHandler };