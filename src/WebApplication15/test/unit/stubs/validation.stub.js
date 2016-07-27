export class ValidationStub{
    constructor(){
    }
    on() {
        return new Promise((resolve) => {
            resolve({ json: () => response });
        })
    }
}