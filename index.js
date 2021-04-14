const express = require("express")
const app = express()
const { ApolloServer } = require("apollo-server-express")
const {PrismaClient} = require("@prisma/client") //imported prismaClent from generated prisma schema

const fs = require("fs")
const path = require("path")

const prisma = new PrismaClient() //initializing PrismaClient 
const resolvers = { Query } = require("./resolvers") //Resolvers fetched from /resolver/index.js

const startServer = async function(){
    const server = new ApolloServer({
        typeDefs: fs.readFileSync(
            path.join(__dirname, "schema.graphql"),
            "utf-8"
        ),//typeDefs is read from external file 
        resolvers, //resolvers desconstruction
        context: ({req}) => { //capture requests
            return { //returns req object and prisma to context, which can be accessed from the resolvers 
                ...req, 
                prisma
            }
        },
        playground: true, //Enables PLayground to be used in production 
        introspection: true
    })

    server.applyMiddleware({app, path: "/graphiql"}) //Applying express middleware and initializing playground at path:graphiql

    app.use("/:short_id", async (req, res, next) => { //path for any url, encoded url is gotten in the parameter
        try {
            const short_id = req.params.short_id //gets url id from req object
            data = await prisma.shortenedUrls.findUnique({// finds unique id in database and returns object is found, return null or undefined if not
                where:{
                    short_id
                }
            })
            if (!data) { //checks if data is null or undefined, if true responds to client with error message 
                res.status(404).json({
                    "message": "This URL doesn't exist"
                })
            }
            res.redirect(data.full_url)// redricts user to full url, if the if statement isnt called
        } catch (error) { //catches error, such as database errors and forwards it to user
            next(error.message)
        }
    })

    await new Promise((resolve) => {
        app.listen({ port: process.env.PORT || 4000 }, resolve)
    });
    console.log(`🚀 Graphql Playground mounted at ${server.graphqlPath}`);
    return { server, app };
}

startServer() 