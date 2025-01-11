export class ListItem {
    // user should use labelKey and valueKey to define the 2 properties used here
}
export class MyException {
    status: number;
    body: unknown;
    constructor(status: number, body: unknown) {
        this.status = status;
        this.body = body;
    }

}