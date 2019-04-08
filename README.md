# [db-errors](https://github.com/Vincit/db-errors) plugin for objection

This plugin maps database errors using the [db-errors](https://github.com/Vincit/db-errors) library. By default
objection throws whatever the database client throws. The default errors are usually difficult to reason with.
This plugin along with the [db-errors](https://github.com/Vincit/db-errors) library try to provide more
manageable errors.

Every error class found in `require('db-errors')` can also be found in `require('objection-db-errors')`. See
[db-errors](https://github.com/Vincit/db-errors) for detailed documentation.

Error handling is something that should not need a plugin. The goal is to eventually merge this into objection core if
people find this plugin useful.

## Example usage

```js
const { Model } = require('objection');
const { DBErrors } = require('objection-db-errors');

// Usually you want to map each model class's errors. Easiest way to do this
// is to create a common superclass for all your models.
class BaseModel extends DBErrors(Model) {

}

module.exports = {
  BaseModel
};
```

```js
const { BaseModel } = require('./BaseModel')

class Person extends BaseModel {
  static get tableName() {
    return 'Person';
  }
}

module.exports = {
  Person
};
```

```js
const { UniqueViolationError } = require('objection-db-errors');

async function something() {
  await Person.query().insert({ id: 1 });

  try {
    // Try to insert a model with an existing primary key.
    await Person.query().insert({ id: 1 });
  } catch (err) {
    console.log(err instanceof UniqueViolationError); // true
  }
}
```
