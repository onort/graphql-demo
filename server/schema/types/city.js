import { GraphQLEnumType } from 'graphql'

const CityType = new GraphQLEnumType({
  name: 'City',
  values: {
    Berlin: { value: 'Berlin' },
    Istanbul: { value: 'Istanbul' },
    Vancouver: { value: 'Vancouver' },
    Buenos_Aires: { value: 'Buenos Aires' },
  }
})

export default CityType
