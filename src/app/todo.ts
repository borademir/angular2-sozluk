/**
 * Todo bean, POJO
 */
export class Todo {
    id: number;
    title: string = '';
    complete: boolean = false;

    /**
     * 
     * @param values : Object array aliyor.
     * Ornek kullanim :
     * let todo = new Todo({
     *      title: 'Read SitePoint article',
     *        complete: false
     * });
     */
    constructor(values: Object = {}){
        /**
         * assign metod mevcut instance uzerine, verilen arraydeki tum elemanlari kopyaliyor . Bean.copy() gibi dusunulebilir.
         */
        Object.assign(this,values)
    }
}
