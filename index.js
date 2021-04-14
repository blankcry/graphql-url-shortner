const express = require("express")
const app = express()
const { ApolloServer } = require("apollo-server-express")
const {PrismaClient} = require("@prisma/client")

const fs = require("fs")
const path = require("path")

const prisma = new PrismaClient()
const resolvers = {
    Query,
    Mutation
} = require("./resolvers")

const startServer = async function(){
    const server = new ApolloServer({
        typeDefs: fs.readFileSync(
            path.join(__dirname, "schema.graphql"),
            "utf-8"
        ),
        resolvers,
        context: ({req}) => {
            return {
                ...req,
                prisma
            }
        }, 
        
    })

    server.applyMiddleware({app})
    server.setGraphQLPath("/graphiql")

    app.use("/:short_id", async (req, res, next) => {
        try {
            const short_id = req.params.short_id
            data = await prisma.shortenedUrls.findUnique({
                where:{
                    short_id
                }
            })
            if (!data) {
                throw new Error("Sorry Can't resolve shortend URL")
            }
            res.redirect(data.full_url)
        } catch (error) {
            next(error.message)
        }
    })

    await new Promise((resolve) => {
        app.listen({ port: process.env.PORT || 4000 }, resolve)
    });
    console.log(`🚀 Graphql Playground mounted at http://localhost:4000${server.graphqlPath}`);
    return { server, app };
}

startServer()