export class ListItem {
    // user should use labelKey and valueKey to define the 2 properties used here
}
export class MyException {
    status: number;
    body: any;
    constructor(status: number, body: any) {
        this.status = status;
        this.body = body;
    }

}