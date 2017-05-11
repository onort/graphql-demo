import Sequelize from 'sequelize'
import faker from 'faker'
import _ from 'lodash'

const seq = new Sequelize(
  'graphql-demo',
  'postgres',
  'postgres',
  {
    dialect: 'postgres',
    host: 'localhost',
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
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true } },
  avatar: { type: Sequelize.STRING },
  city: { type: Sequelize.ENUM(...CITIES) },
})

const Post = seq.define('post', {
  postId: { type: Sequelize.STRING, unique: true, allowNull: false },
  title: { type: Sequelize.TEXT, allowNull: false },
  content: { type: Sequelize.TEXT, allowNull: false },
  image: { type: Sequelize.TEXT }
})

// Relationships
User.hasMany(Post)
Post.belongsTo(User)

// Helper Methods To Create A Database With Faker.js Data
function createFakeUser() {
  return User.create({
    userId: _.uniqueId('u'),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
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

// Create Initial Database Data (Will be overwritten everytime)
// seq.sync({ force: true }).then(() => {
//   _.times(10, () => {
//     createFakeUser().then(user => _.times(3, () => createFakePost(user)))
//   })
// })

export default seq
