import {PluralResponse} from "coloquent";

export const getApiMeta = (presponse: PluralResponse) => {
    return presponse.getHttpClientResponse().getData().meta
}
