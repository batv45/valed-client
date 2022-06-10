import {Deserializer as Des} from "ts-jsonapi";

export const Deserializer = (data,opts?: any) => {
    if( data ){
        return new Des(opts).deserialize(data)
    }else return null
}
