import * as db from './../../models/index';
import InputType from './inputTypes';

export const schema = `

    # All user  information 
    type User {
        # A unique key  for the userid  
        id: String
        # game user  use  to play array  of  string with  game  code 
        games: [String]
        #followeres of the user "array  of user ids "
        followers: [String]
        createdAt: String
        profile: Profile
        disabled: Boolean
        active: String
        online: Boolean
        services: Services
    }

    #profile info  of the  user 
    type Profile {
        firstName: String!
        lastName: String
        city:String
        zip: String
        mobileNumber: Int
        games: [String]
    }

    type Services {
        password: String!
        token : String
    }
`;

export const resolvers = {
    User: {
        id: ({ _id }) => _id,
        async profile({ profile }) {
            return await db.Profile.findById({ _id: profile });
        },
        services: ({ services }) => services
    },

    Profile: {
        firstName: ({ first_name }) => first_name,
        lastName: ({ last_name }) => last_name,
        mobileNumber: ({ mobile_num }) => mobile_num
    }
}
