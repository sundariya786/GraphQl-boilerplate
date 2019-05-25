import * as db from './../../models/index';
import InputType from './inputTypes';

export const schema = `

    # Root queries to  head the information 
    type Query {
        ### Query to  find all the user
        allUsers: [User]

        ### Query to find specific user
        user(_id: String): [User]

        ### Query to find specific users in a specific city  and game 
        userInCityAndGame(cityId: String, gameIds: [String]): [User]

        ### Query to find  all the user
        allOrders: [Order]

        ### Query to find  all the product
        allProducts: [Product]

        ### Query to find all category
        allCategorys: [Category]

        ### query to  get all  the games
        allGames: [Game]

        ### find  game with  game id
        getGame(id: String): Game

        ### find  all the  city
        allCities : [City]

        ### find city by city id 
        getCity(id: String): City
    }
`;

export const resolvers = {
    Query: {
        async allUsers( _, args) {
            return await db.User.find({});
        },

        async user(_, args) {
            const user = await db.User.findById({_id: args._id});
            return [user];
        },

        async userInCityAndGame(_, {cityId, gameIds}) {
            const aggregationStatement = [
                { 
                    "$match" : {
                        "$and" : [
                            {
                                "city" : cityId
                            }, 
                            gameIds.length ? {
                                "games" : {
                                    "$in" : gameIds
                                }
                            } : {}
                        ]
                    }
                }, 
                { 
                    "$lookup" : {
                        "from" : "users", 
                        "localField" : "_id", 
                        "foreignField" : "profile", 
                        "as" : "User"
                    }
                }, 
                { 
                    "$unwind" : {
                        "path" : "$User", 
                        "preserveNullAndEmptyArrays" : true
                    }
                }, 
                { 
                    "$project" : {
                        "users" : "$User"
                    }
                }
            ]
            const  User =  await db.Profile.aggregate(aggregationStatement);
            const  result = User.map((d) => d.users);

            console.log('result ', result);
            return result;
        },

        async allOrders(_, args) {
            const orders = await db.Order.find();
            return orders;
        },

        async allProducts(_, args) {
            const products = await db.Product.find();
            return products;
        },

        async allCategorys(_, args){
            const categories = await db.Category.find();
            return categories; 
        },

        async allGames(_, args) {
            return await db.Game.find();
        },

        async getGame(_, args) {
            return await db.Game.findById({ _id: args.id });
        },

        async allCities(_, args) {
            return await db.City.find();
        },

        async getCity(_, args) {
            return await db.City.findById({_id: args.id })
        }
    },
};
