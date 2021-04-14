const {nanoid} = require('nanoid');

module.exports = {
    shortenUrl: async function (parent, args, context) {
        const origin = context.headers.origin //gets current url of localhost
        const short_id = nanoid(6) //generates a unique 6 character string
        
        valid = new URL(args.url) //Takes url from arguments and validates it using NodeJs URL Class, returns true if it matches a true url
        if(this.valid) { //runs if the url class returns true on the valid variable
            try { //if url is valid 
                data = await context.prisma.shortenedUrls.create({ //creates a new entry in database with unique short_id, full_url & short_url, which is localhost concated with uniquw short_id
                    data: {
                        short_id,
                        full_url: args.url,
                        short_url: `${origin}/${short_id}`
                    }
                })
                return this.data //returns data that matches the type of URL defined in graphql Schema
            } catch (e) {
                //Catches any error raised while trying to insert data into database using prisma 
                switch (e.code) {
                    case "P2002": //Standard error code from postgres database when a unique field is being update with information already in database
                        throw new Error("url already exists in database")
                    default: //Incase its another error from database, tells user its a databse error
                        throw new Error("Sometging went wrong, contact Admin")
                }
            }
        }
    }, 
    feed: async function(parent, args, context) {
        data =  await context.prisma.shortenedUrls.findMany() // gets all the fields from database including full_url and its associated shortened_url
        return this.data //returns data matching Url type defined in graphQL Schema
    }
}