import {AxiosHttpClient, HttpClient, Model as BaseModel , ToManyRelation, ToOneRelation} from 'coloquent';
import axios from 'redaxios'

export class Model extends BaseModel {
    static jsonApiBaseUrl = 'http://valed.test/api/v1'
    // static httpClient = new AxiosHttpClient(customAxioInstance);
    static endpoint = 'v1'

}
