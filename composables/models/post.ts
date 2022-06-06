import {Model} from './_model'
import {ToOneRelation} from "coloquent";
import User from "./user";

export default class extends Model
{
    static jsonApiType = 'posts'

    author(): ToOneRelation<User, this>
    {
        return this.hasOne(User);
    }
    getAuthor(): User
    {
        return this.getRelation('author');
    }
}
