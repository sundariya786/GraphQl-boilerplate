import * as db from './../../models/index';
import InputType from './inputTypes';

export const schema = `

    # All user  information 
    type User {
        # A unique key  for the user table 
        id: String

        # name of the user
        name:String

        # surname of the user
        surname: String
    }
`;

export const resolvers = {
    User: {
        id: ({ _id }) => _id,
    }
}
