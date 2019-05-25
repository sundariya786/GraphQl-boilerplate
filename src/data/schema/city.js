
export  const schema = `

    #City information 

    type City {
        id: String!
        name: String
        description: String
        zip: Int
        population : String
    }
`;

export const resolvers = {
    City: {
        id: ({ _id }) => _id,
    }
}