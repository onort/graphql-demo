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

// Models
const User = seq.define('user', {
  userId: { type: Sequelize.STRING, unique: true },
  firstName: { type: Sequelize.STRING, allowNull: false },
  lastName: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, validate: { isEmail: true } },
  avatar: { type: Sequelize.STRING },
  city: { type: Sequelize.STRING },
})


const Bookmark = seq.define('bookmark', {
  bookmarkId: { type: Sequelize.STRING, unique: true },
  title: { type: Sequelize.TEXT, allowNull: false },
  desc: { type: Sequelize.TEXT },
  url: { type: Sequelize.STRING, allowNull: false },
})

// Relationships
User.hasMany(Bookmark)
Bookmark.belongsTo(User)

// Helper Methods To Create A Database With Faker.js Data
function createFakeUser() {
  return User.create({
    userId: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar(),
    city: faker.address.city(),
  })
}

// ?? Should pass owner as argument add owner.id to entry?
function createFakeBookmark(user) {
  return user.createBookmark({
    bookmarkId: faker.random.uuid(),
    title: faker.lorem.sentence(),
    desc: faker.lorem.paragraph(),
    url: faker.internet.url(),
  })
}

// Create Initial Database Data (Will be overwritten everytime)
seq.sync({ force: true }).then(() => {
  _.times(10, () => {
    createFakeUser().then(user => _.times(3, () => createFakeBookmark(user)))
  })
})

export default seq
