module.exports=function errorHandler(err,req,res,next){
 if(res.headersSent)return next(err);
 const status=Number.isInteger(err.statusCode)?err.statusCode:500;
 if(status>=500)console.error(err.stack||err);
 res.status(status).json({error:{message:status>=500?'Internal server error':err.message}});
};