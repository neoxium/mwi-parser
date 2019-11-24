# mwi-parser
Mercury parser for MyWebIntelligence database

### Installation

Clone this repository and install dependencies

```console
> npm install
```

### Setup

Change path to your MyWI database file in ```index.js```

```javascript
const dbFile = '/path/to/your/mwi.db';
```

Set land id

```javascript
const landId = 1;
```

You can also change batch size

```javascript
const pageNumber = 1; // Page number
const pageLimit = 1000; // Results per page
```

### Run



```console
> node index.js
```
