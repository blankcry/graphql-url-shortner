module.exports = {
    validateUrl: async function(parent, args, context) {
        data = await context.prisma.shortenedUrls.findUnique({
            where: {
                short_url: args.url
            }
        })
        return this.data
    }
}