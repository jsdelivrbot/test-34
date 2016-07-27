import {Tracker} from '../../src/tracker/tracker';
import {TrayDataService} from '../../src/services/dataservices/tray-service';
import './setup';

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

describe('the Tracker module', ()=> {
        var sut;
        var mockedHttp;

        //constructor(dialogService, customerDataService, partTypeDataService, partDataService, 
        //    serialDataService, trayDataService, exportDataService, stockDataService, session)        
        beforeEach(() => {    
            mockedHttp = new HttpStub();

            sut = new Tracker();  
            sut.trayDataService = new TrayDataService(mockedHttp);
                    
        });
        
        it('configures the router title', () => {
            expect(sut.heading).toEqual('Tracker');
        });

        describe('on constructing', () => {        

            it('sets the trayLocked to false', () => {
                expect(sut.trayLocked).toEqual(false);
            });           
            it('sets the partLocked to false', () => {
                expect(sut.partLocked).toEqual(false);
            });
            it('sets the searchByTray to true', () => {
                expect(sut.searchByTray).toEqual(true);
            });            
        });


        describe('search()', () => {
               
            it('calls getTrayBySerialNumber when selectedSearch == Serial', () => {          
    
                var spy = spyOn( sut.trayDataService, "getTrayBySerialNumber").and.callFake(function() {
                    return Promise.resolve([]);
                });

                sut.selectedSearch = "Serial";
                sut.searchItem = true;
               
                sut.search();

                expect(spy).toHaveBeenCalled();

            });
            it('calls getTrayByTrayNumber when selectedSearch == TrayNumber', () => {          
    
                var spy = spyOn( sut.trayDataService, "getTrayByTrayNumber").and.callFake(function() {
                    return Promise.resolve([]);
                });

                sut.selectedSearch = "TrayNumber";
                sut.searchItem = true;
               
                sut.search();

                expect(spy).toHaveBeenCalled();

            });
            it('doesnt call getTrayBySerialNumber when searchItem hasnt been selected', () => {          
    
                var spy = spyOn( sut.trayDataService, "getTrayBySerialNumber").and.callFake(function() {
                    return Promise.resolve([]);
                });

                sut.selectedSearch = "Serial";
                sut.searchItem = false;
               
                sut.search();

                expect(spy).not.toHaveBeenCalled();

            });
        });
    });

    