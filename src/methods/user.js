import { Random } from "../healpers";
import * as db from '../models/index';

export async function add ({ firstName, lastName, city, zip, games, followers, password, mobileNum, userName, email, roles, status, online, disabled }) {
    const userObject = {
        _id: Random.id(),
        roles,
        followers,
        online,
        status,
        disabled,
        user_name: userName,
        email
    };

    // if(mobileNum.length != 10)  throw new Error ('please  enter  valid mobile number ');
    
    const profileObj = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        city: city.trim(),
        zip,
        games,
        mobile_num: mobileNum
    };

    const profile = await db.Profile.create(profileObj);
    userObject.services = {
        password,
        token: null,
    }

    userObject.profile = profile._id;

    return await db.User.create(userObject);

}

export async function login({ userName, password}) {
    if(!userName.trim().length) throw new Error("please  enter  user  name");
    if(!password.trim().length) throw new  Error ("please  enter password");
    const loginObj = {
        $or: [
            { user_name: userName },
            { email: userName },
        ]
    }
    const user = await db.User.findOne(loginObj);
    if(!user) throw new Error ("please  enter  valid  user  name or  email");
    if(user.services.password == password) return user;
}