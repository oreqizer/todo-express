'use strict';

// Load modules
let app = require('../../app');

// Load dependencies
let expect = require('chai').expect,
    mongoose = require('mongoose');

// Load models
let Todo = mongoose.model('Todo'),
    User = mongoose.model('User');

// Global test variables
var todo, user;

describe('Todo model:', () => {

  before(() => {

    // Create a sample todo owner
    user = new User ({

      username: 'test',
      email: 'test@test.com',
      password: 'heslojeveslo'

    });

  });

  beforeEach(() => {

    // Create a new 'Todo' model instance
    todo = new Todo({

      title: 'Test',
      content: 'Test TODO',
      _owner: user.id

    });

  });

  describe('Valid input', () => {

    it('should save the todo', done => {

      todo.save()
      .then(data => {
        expect(data).to.be.an('object');
        expect(data.title).to.equal('Test');
        expect(data.content).to.equal('Test TODO');
        expect(data.importance).to.equal('neutral');
        expect(data.created).to.be.a('date');
        done();
      })
      .catch(err => {
        done(err);
      });

    });

    it('should save reference to the creator', done => {

      todo.save()
      .then(data => {
        expect(data._owner).to.be.an('object');
        expect(data._owner.toString()).to.equal(user.id);
        done();
      })
      .catch(err => {
        done(err);
      });

    });

  });

  describe('Invalid input', () => {

    it('should not save a todo without a title', done => {

      todo.title = null;

      todo.save()
      .then(data => {
        done(new Error('should not have saved'));
      })
      .catch(err => {
        expect(err).to.be.an('object');
        done();
      });

    });

    it('should not save a todo with invalid importance', done => {

      todo.importance = 'trash';

      todo.save()
      .then(data => {
        done(new Error('should not have saved'));
      })
      .catch(err => {
        expect(err).to.be.an('object');
        done();
      });

    });

  });

  // Database cleanup
  afterEach(done => {

    Todo.remove()
    .then(() => {
      done();
    })
    .catch(err => {
      done(err);
    });

  });

});
