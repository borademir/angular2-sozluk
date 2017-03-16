/**
 * All session variables over shared service
 */
export class SessionBean {

    topicsType: String;

    constructor(values: Object = {}){
        Object.assign(this,values)
    }
}
