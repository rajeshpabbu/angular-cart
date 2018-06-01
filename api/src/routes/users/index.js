const mongojs = require('mongojs');
const db = mongojs('TodoDataBase');
const userC = db.UserList;

const userRoutes = {};

userRoutes.getAll = (req, res, next) => {
  userC.find(function (err, docs) {
    res.json(200, docs);
    next();
  });
};

userRoutes.add = (req, res, next) => {
  userC.insert(req.body, function (err, doc) {
    console.log(doc);
    res.json(200, doc);
    next();
  });
};

userRoutes.authenticate = (req, res, next) => {
  userC.findOne(req.body, function (err, doc) {
    console.log(doc);
    if (err) {
      res.send(503, err);
    } else {
      res.send(200, doc);
    }
    return next();
  });
};

userRoutes.update = (req, res, next) => {
  if (!req.body || !req.params.id) {
    res.send(404, 'A user object is required.');
    return next();
  }
  userC.findAndModify({
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

userRoutes.remove = (req, res, next) => {
  if (!req.params.id) {
    res.send(404, 'An id is required.');
    return next();
  }

  console.log(req.params);

  userC.remove({ '_id': mongojs.ObjectId(req.params.id) }, true, function (err, doc) {
    if (err) {
      res.send(503, err);
    } else {
      res.send(200, doc);
    }
  });

  return next();
}
module.exports = userRoutes;