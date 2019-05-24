import { Random } from "../healpers";
import * as db from '../models/index';

export async function add ({ firstName, lastName, city, zip, games, followers, password, mobile_num, userName, email, roles, status, online, disabled }) {
    const userObject = {
        _id: Random.id(),
        roles,
        followers,
        online,
        status,
        disabled,
        userName,
        email
    };

    // if(mobile_num.length != 10)  throw new Error ('please  enter  valid mobile number ');

    const profileObj = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        city: city.trim(),
        zip,
        games
    };

    const profile = await db.Profile.create(profileObj);
    userObject.services = {
        password,
        token: null,
    }

    userObject.profile = profile._id;

    return await db.User.create(userObject);


}