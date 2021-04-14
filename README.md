"# graphql-url-shortner" 
#To generate prismaClient module in production enviroment run npx prisma migrate deploy 
#To connect to your database create new enviromental variable named DATABASE_URL which is a string, following the below expression
#postgresql://USER:PASSWORD@HOST:PORT/DATABASE

Host =	HOST =  IP address/domain of your database server, e.g. localhost
Port =  PORT =  Port on which your database server is running, e.g. 5432
User =  USER =  Name of your database user, e.g. janedoe
Password = PASSWORD =  Password for your database user
Database = DATABASE = Name of the database you want to use, e.g. mydb

to connect file can be found in "./prisma/schema.prisma"