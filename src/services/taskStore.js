let tasks=[];let nextId=1;
function listTasks(status){return status?tasks.filter(t=>t.status===status):[...tasks];}
function findTask(id){return tasks.find(t=>t.id===Number(id))||null;}
function createTask(input){const now=new Date().toISOString();const t={id:nextId++,title:input.title.trim(),description:(input.description||'').trim(),dueDate:input.dueDate||null,status:input.status||'pending',createdAt:now,updatedAt:now};tasks.push(t);return t;}
function updateTask(id,input){const i=tasks.findIndex(t=>t.id===Number(id));if(i<0)return null;const t=tasks[i];tasks[i]={...t,...(input.title!==undefined?{title:input.title.trim()}:{}),...(input.description!==undefined?{description:input.description.trim()}:{}),...(input.dueDate!==undefined?{dueDate:input.dueDate||null}:{}),...(input.status!==undefined?{status:input.status}:{}),updatedAt:new Date().toISOString()};return tasks[i];}
function deleteTask(id){const i=tasks.findIndex(t=>t.id===Number(id));return i<0?null:tasks.splice(i,1)[0];}
function resetTasks(){tasks=[];nextId=1;}
module.exports={listTasks,findTask,createTask,updateTask,deleteTask,resetTasks};