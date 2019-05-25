import * as db from './../../models/index';

export const  mutations = `
    #### A mutation to add city
    # **name**: *name of the city*
    # **description** : *small description*
    # **zip** : *zip code  of city*
    # **population**: *population of city*,
    addCity(name: String!, description: String, zip: Int, population: String): City
`;


export const resolvers = {
    async addCity (_, {name, description,  zip, population}) {
        const  cityObj = {
            name,
            description,
            zip,
            population
        }
        return db.City.create(cityObj);
    }
}