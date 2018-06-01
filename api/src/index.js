const restify = require('restify');

const server = require('restify').createServer();
const color = require('node-colorify');
const routes = require('../src/routes');
const userRoutes = require('./routes/users/index')

server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());

// routes

server.get('/api/allTodos', routes.getAllTodos);
server.get('/api/todos/:userId', routes.getTodosByUser);
server.post('/api/addTodo', routes.addTodo);
server.put('/api/updateTodo/:id', routes.updateTodo);
server.del('/api/removeTodo/:id', routes.removeTodo);

server.get('/api/users', userRoutes.getAll);
server.post('/api/addUser', userRoutes.add);
server.put('/api/updateUser/:id', userRoutes.update);
server.del('/api/removeUser/:id', userRoutes.remove);
server.post('/api/authenticate', userRoutes.authenticate);

server.listen(3050, '127.0.0.1', () => {
  console.log(
    color.colorItSync(`REST server running at ${server.url}`, { 'fColor': 'green' })
  );
});