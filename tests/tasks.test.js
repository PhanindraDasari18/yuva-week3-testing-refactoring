const request=require('supertest');const app=require('../src/app');const store=require('../src/services/taskStore');
beforeEach(()=>store.resetTasks());
describe('Task Manager API',()=>{
 test('health endpoint returns ok',async()=>{const r=await request(app).get('/health');expect(r.status).toBe(200);expect(r.body).toEqual({status:'ok'});});
 test('creates task and applies defaults',async()=>{const r=await request(app).post('/api/tasks').send({title:'  Learn Jest  '});expect(r.status).toBe(201);expect(r.body.data).toMatchObject({id:1,title:'Learn Jest',status:'pending',description:'',dueDate:null});});
 test('rejects missing and blank titles',async()=>{for(const body of [{},{title:'  '}]){const r=await request(app).post('/api/tasks').send(body);expect(r.status).toBe(400);}});
 test('lists tasks and filters by status',async()=>{await request(app).post('/api/tasks').send({title:'A'});await request(app).post('/api/tasks').send({title:'B',status:'completed'});expect((await request(app).get('/api/tasks')).body.count).toBe(2);expect((await request(app).get('/api/tasks?status=completed')).body.count).toBe(1);});
 test('rejects unknown status filter',async()=>{expect((await request(app).get('/api/tasks?status=bad')).status).toBe(400);});
 test('gets existing task and returns 404 for missing task',async()=>{const c=await request(app).post('/api/tasks').send({title:'Find'});expect((await request(app).get('/api/tasks/1')).status).toBe(200);expect((await request(app).get('/api/tasks/999')).status).toBe(404);});
 test('updates fields and timestamp',async()=>{await request(app).post('/api/tasks').send({title:'Original'});const r=await request(app).put('/api/tasks/1').send({status:'completed'});expect(r.status).toBe(200);expect(r.body.data.title).toBe('Original');expect(r.body.data.status).toBe('completed');expect(r.body.data.updatedAt).toBeTruthy();});
 test('rejects invalid status update',async()=>{await request(app).post('/api/tasks').send({title:'Valid'});expect((await request(app).put('/api/tasks/1').send({status:'done'})).status).toBe(400);});
 test('deletes task and handles repeat deletion',async()=>{await request(app).post('/api/tasks').send({title:'Delete'});expect((await request(app).delete('/api/tasks/1')).status).toBe(200);expect((await request(app).delete('/api/tasks/1')).status).toBe(404);});
 test('unknown route returns JSON 404',async()=>{const r=await request(app).get('/unknown');expect(r.status).toBe(404);expect(r.body.error.message).toMatch(/Route not found/);});
});