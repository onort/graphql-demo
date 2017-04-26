import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

const BookmarkType = new GraphQLObjectType({
  name: 'Bookmark',
  description: 'This represents bookmark object type.',
  fields: () => ({
    bookmarkId: {
      type: GraphQLString,
      resolve(bookmark) {
        return bookmark.bookmarkId
      }
    },
    title: {
      type: GraphQLString,
      resolve(bookmark) {
        return bookmark.title
      }
    },
    desc: {
      type: GraphQLString,
      resolve(bookmark) {
        return bookmark.desc
      }
    },
    url: {
      type: GraphQLString,
      resolve(bookmark) {
        return bookmark.url
      }
    }
  })
})

export default BookmarkType
