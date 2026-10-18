const express=require('express');const store=require('../services/taskStore');const router=express.Router();
const STATUSES=['pending','in-progress','completed'];
function validate(body,update=false){
 if(!body||typeof body!=='object'||Array.isArray(body))return 'Request body must be a JSON object';
 if(!update||body.title!==undefined)if(typeof body.title!=='string'||!body.title.trim())return 'Title is required and must be a non-empty string';
 if(body.description!==undefined&&typeof body.description!=='string')return 'Description must be a string';
 if(body.dueDate!==undefined&&body.dueDate!==null&&body.dueDate!==''&&(typeof body.dueDate!=='string'||Number.isNaN(Date.parse(body.dueDate))))return 'dueDate must be a valid date string';
 if(body.status!==undefined&&!STATUSES.includes(body.status))return `Status must be one of: ${STATUSES.join(', ')}`;
 return null;
}
router.get('/',(req,res)=>{if(req.query.status&&!STATUSES.includes(req.query.status))return res.status(400).json({error:{message:'Invalid status filter'}});const data=store.listTasks(req.query.status);res.json({count:data.length,data});});
router.get('/:id',(req,res)=>{const data=store.findTask(req.params.id);if(!data)return res.status(404).json({error:{message:'Task not found'}});res.json({data});});
router.post('/',(req,res)=>{const e=validate(req.body);if(e)return res.status(400).json({error:{message:e}});res.status(201).json({message:'Task created successfully',data:store.createTask(req.body)});});
router.put('/:id',(req,res)=>{const e=validate(req.body,true);if(e)return res.status(400).json({error:{message:e}});const data=store.updateTask(req.params.id,req.body);if(!data)return res.status(404).json({error:{message:'Task not found'}});res.json({message:'Task updated successfully',data});});
router.delete('/:id',(req,res)=>{const data=store.deleteTask(req.params.id);if(!data)return res.status(404).json({error:{message:'Task not found'}});res.json({message:'Task deleted successfully',data});});
module.exports=router;