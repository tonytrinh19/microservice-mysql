### A server hosted on Heroku that makes simple queries to clearDB (MySQL addons) on Heroku.

The database stores name of a person and their score/grade.

### API endpoints:

```
POST /write
```

body of request must contains 2 fields `name` and `score`

```
GET /read
```

GET method will return all entries in the database.
