const {nanoid} = require('nanoid');

module.exports = {
    shortenUrl: async function (parent, args, context) {
        const origin = context.headers.origin
        const short_id = nanoid(6)
        
        valid = new URL(args.url)
        // console.log(context.prisma.shortenedUrls)
        if(valid) {
            try {
                data = await context.prisma.shortenedUrls.create({
                    data: {
                        short_id,
                        full_url: args.url,
                        short_url: `${origin}/${short_id}`
                    }
                })
                return this.data
            } catch (e) {
                switch (e.code) {
                    case "P2002":
                        throw new Error("url already exists in database")
                    default:
                        throw new Error("Sometging went wrong, contact Admin")
                        break;
                }
            }
        }
    }
}