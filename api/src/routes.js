const mockData = require('../src/mockdata.json');
const mongojs = require('mongojs');
const db = mongojs('TodoDataBase');
const todoC = db.TodoList;

const todos = {};

todos.getAllTodos = (req, res, next) => {
  todoC.find(function (err, docs) {
    res.json(200, docs);
    next();
  });
};

todos.getTodosByUser = (req, res, next) => {
  todoC.find({createdById: req.params.userId}, function (err, docs) {
    res.json(200, docs);
    next();
  });
};

todos.addTodo = (req, res, next) => {
  todoC.insert(req.body, function (err, doc) {
    console.log(doc);
    res.json(200, doc);
    next();
  });
};

todos.updateTodo = (req, res, next) => {
  if (!req.body || !req.params.id) {
    res.send(404, 'A user object is required.');
    return next();
  }
  console.log(req.body);
  todoC.findAndModify({
    'query': { '_id': mongojs.ObjectId(req.params.id) },
    'update': { '$set': req.body }
  }, function (err, doc) {
    if (err) {
      res.send(503, err);
    } else {
      res.send(200, doc);
    }
  });

  return next();
};

todos.removeTodo = (req, res, next) => {
  if (!req.params.id) {
    res.send(404, 'An id is required.');
    return next();
  }

  todoC.remove({ '_id': mongojs.ObjectId(req.params.id) }, true, function (err, doc) {
    if (err) {
      res.send(503, err);
    } else {
      res.send(200, doc);
    }
  });

  return next();
}
module.exports = todos;