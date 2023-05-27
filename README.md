# Str

JavaScript equivalent of [Laravel Str](https://laravel.com/docs/10.x/helpers#strings) helper.

## Installation & setup

You can install the package via npm:

    npm install @bjnstnkvc/str

## Usage

Once the package has been installed, you can import it
using [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) declaration:

```js
import Str from '@bjnstnkvc/str'
```

## Usage

Once imported, you can use these functions which provide a fluent interface to interact with Strings.

### Strings
```js
Str.after('This is my name', 'This is');

// ' my name'
```

For detailed instructions on how to use String helper functions,
visit Laravel Helpers [docs](https://laravel.com/docs/10.x/helpers#strings-method-list).

### Fluent Strings
```js
Str.of('This is my name').after('This is');

// ' my name'
```

For detailed instructions on how to use Fluent String helper functions, 
visit Laravel Helpers [docs](https://laravel.com/docs/10.x/helpers#fluent-strings-method-list).