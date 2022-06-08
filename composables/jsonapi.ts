import {Deserializer as Des} from "ts-jsonapi";

export const Deserializer = (data,opts?: any) => {
    if( data ){
        console.log(data,'composesn')
        return new Des(opts).deserialize(data)
    }else
        console.log('COMPO BOŞ','composesn')
}
