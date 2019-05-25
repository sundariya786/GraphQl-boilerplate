import * as db from './../../models/index';
import InputType from './inputTypes';

export const schema = `

    # All user  information 
    type User {
        # A unique key  for the userid  
        id: String
        #followeres of the user "array  of user ids "
        followers: [User]
        #creation date 
        createdAt: String
        #user  profule  information
        profile: Profile
        #disabled  or  enabled  user
        disabled: Boolean
        #active  inactive  status 
        active: String
        online: Boolean
        #store  password  and access  token 
        services: Services
    }

    #profile info  of the  user 
    type Profile {
        firstName: String!
        lastName: String
        city:City
        mobileNumber: Int
        games: [Game]
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
        services: ({ services }) => services,
        async followers({ followers }) {
            return await db.User.find({ _id: { $in: followers } });
        },
    },

    Profile: {
        firstName: ({ first_name }) => first_name,
        lastName: ({ last_name }) => last_name,
        mobileNumber: ({ mobile_num }) => mobile_num,
        async games({games}){
            return await db.Game.find({ _id: {$in: games }});
        },
        async city({ city }){
            return await db.City.findById({ _id: city });
        }
    },

}
