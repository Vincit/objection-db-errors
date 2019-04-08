'use strict';

const { DbErrors, DBErrors, UniqueViolationError } = require('./');
const expect = require('chai').expect;
const Model = require('objection').Model;
const Knex = require('knex');

describe('tests', () => {
  let knex;

  before(() => {
    knex = Knex({
      client: 'sqlite3',
      useNullAsDefault: true,
      connection: {
        filename: './test.db'
      }
    });
  });

  before(() => {
    return knex.schema.createTable('Person', table => {
      table.increments('id').primary();
    });
  });

  after(() => {
    return knex.schema.dropTable('Person');
  });

  after(() => {
    return knex.destroy();
  });

  beforeEach(() => {
    return knex('Person').delete();
  });

  it('should have DbErrors alias for the DBErrors function for legacy reasons', () => {
    expect(DbErrors).to.equal(DBErrors)
  })

  it('should map errors', done => {
    class Person extends DBErrors(Model) {
      static get tableName() {
        return this.name;
      }
    }

    Person.query(knex)
      .insert({id: 1})
      .then(() => {
        return Person.query(knex).insert({id: 1});
      })
      .then(() => {
        done(new Error('should not get here'));
      })
      .catch(err => {
        expect(err instanceof UniqueViolationError).to.equal(true);
        expect(err.table).to.equal('Person');
        done();
      })
      .catch(done);
  });
});
