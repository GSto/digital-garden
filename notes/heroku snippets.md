# Heroku Snippets

Get the database url
`heroku config:get DATABASE_URL`

Copy heroku database into a local database: 
`heroku pg:pull $remote_database $local_database  -a $app_name`
