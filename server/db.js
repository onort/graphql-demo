import Sequelize from 'sequelize'
import faker from 'faker'
import _ from 'lodash'
import slugify from 'slugify'

const seq = new Sequelize(
  'graphql-demo',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost',
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    }
  }
)

const CITIES = ['Istanbul', 'Berlin', 'Buenos Aires', 'Vancouver']
const IMAGES = [
  'abstract,',
  'animals',
  'business',
  'cats' ,
  'city',
  'food',
  'nightlife',
  'fashion',
  'people',
  'nature',
  'sports',
  'technics',
  'transport'
]

// Models
const User = seq.define('user', {
  userId: { type: Sequelize.STRING, unique: true, allowNull: false },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 50],
        msg: 'First name must be at least 2 and at most 50 characters long.'
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 50],
        msg: 'Last name must be at least 2 and at most 50 characters long.'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: 'Please enter a valid email address.'
      },
      isUnique: (value, next) => {
        User.findOne({ where: { email: value }})
          .then(user => user ? next(`Email address "${value}" is already in use.`): next())
          .catch(err => console.log('Error on email uniqueness valdiation', err)) // eslint-disable-line no-console
      }
    }
  },
  avatar: { type: Sequelize.STRING, defaultValue: null }, // avatar placeholder img/url here
  city: {type: Sequelize.ENUM(...CITIES) },
})

const Post = seq.define('post', {
  slug: { type: Sequelize.TEXT, allowNull: true },
  postId: { type: Sequelize.STRING, unique: true, allowNull: false },
  title: { type: Sequelize.TEXT, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  image: { type: Sequelize.TEXT }
  },
  {
    hooks: {
      beforeValidate: post => {
        post.slug = slugify(post.title).toLowerCase()
      }
    }
  }
)

// Relationships
User.hasMany(Post)
Post.belongsTo(User)

// Helper Methods To Create A Database With Faker.js Data
function createFakeUser() {
  return User.create({
    userId: _.uniqueId('u'),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email().toLowerCase(),
    avatar: faker.internet.avatar(),
    city: _.sample(CITIES)
  })
}

// ?? Should pass owner as argument add owner.id to entry? or get it using db?
function createFakePost(user) {
  return user.createPost({
    postId: _.uniqueId('p'),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(_.sample([1,2,3])),
    image: _.sample([true, false]) ? faker.image[_.sample(IMAGES)]() : null
  })
}

/* eslint-disable no-console */
// DB connection test
seq
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.log('PostgreSQL connection error.', err))

// Drop Tables & Create Initial Data
// seq.sync({ force: true, logging: console.log })
//   .then(() => {
//     _.times(10, () => {
//       createFakeUser().then(user => _.times(3, () => createFakePost(user)))
//     })
//   })
//   .catch(err => console.log('Database sync error', err))
/* eslint-enable no-console */

export default seq
