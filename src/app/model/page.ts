export class PageInfo {

    pageHref          : string  = '';
    pageNumber        : number  = 1 ;

    constructor(values: Object = {}){
        Object.assign(this,values)
    }

}