import {Settings} from '../../src/settings/settings';
import {CustomerDataService} from '../../src/services/dataservices/customer-service';

class HttpStub {
    fetch(url) {
        return new Promise((resolve) => {
            resolve({ json: () => response });
        });
    }
    configure() {       
        return true;
    }
}

describe('the Settings module', () => {
    var sut;
    var mockedHttp;

    beforeEach(() => {     
        mockedHttp = new HttpStub();   
        sut = new Settings();       
        sut.customerDataService = new CustomerDataService(mockedHttp);     
    });
     
    it('configures the router title', () => {
        expect(sut.heading).toEqual('Settings');
    });



});