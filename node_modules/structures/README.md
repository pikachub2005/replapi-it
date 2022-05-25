# structures [![Build Status](https://secure.travis-ci.org/markselby/node-structures.png?branch=master)](http://travis-ci.org/markselby/node-structures) ![Dependencies Status](https://david-dm.org/markselby/node-structures.png)

Create data structures from SQL queries, especially useful for building API's

## Getting Started
Install with: `npm install structures`

## Examples
```javascript
var Structure = require('structures');

var myStructure = {
  source: person.list,
  children: {
    addresses: {
      source: person.addresses,
      key: 'person_id',
      parent_key: 'id'
    }
  }
}

new Structure(myStructure, { id: 1,2,3,4 })
  .on('done', function (structure) { console.log(structure); })
  .on('error', function (err) { console.log(err); })
  .init();
```
person.list and person.addresses should be functions which return a database query suitable for use with node-postgres / any-db.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Mark Selby  
Licensed under the MIT license.
