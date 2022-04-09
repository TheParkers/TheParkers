

function get_todayDate()
{

    let today = new Date();

    let dd = today.getDate();

    // As January is month 0
    let mm = today.getMonth()+1; 

    let yyyy = today.getFullYear();
    
    today = mm+'/'+dd+'/'+yyyy;

    return today;

}


describe('Demo Parker End to End tests', function()
    {

        it('Serach Parking tests', function()
            {
                
                //Fetching the the webpage by navigating to the App URL 
                browser.get('https://parkersdev-app-nixgrdwaba-ue.a.run.app/ ');
                browser.sleep(2000)
                // Getting element for the startDate 
                let daterange = element(by.id('mat-date-range-input-0'));

                // Getting element for the endDate 
                let enddate = element(by.css("input[formControlName=endDate]"));

                // Clearing startDate field
                daterange.clear();

                // Clearing the value for endDate field (Date Range)
                enddate.clear();

                //browser.sleep(2000);
                // Setting today's date in startDate field
              //  daterange.sendKeys(get_todayDate());

                browser.sleep(4000)
                // Setting today's date in endDate field
                //enddate.sendKeys(get_todayDate());

                let city = element(by.css("input[formControlName=city]"));
                city.sendKeys('Toronto, ON, Canada');
                browser.waitForAngularEnabled(false)
                let searchParking = element(by.cssContainingText('.search-parking-button','Search Parking'));
                
                browser.sleep(4000);
                searchParking.click();
                //browser.actions().mouseMove (element(by.css("input[formControlName=city]"))).click()
               // browser.actions().sendKeys(protractor.Key.ARROW_DOWN)
                //browser.actions().sendKeys(protractor.Key.ENTER).perform()
                browser.sleep(1000)
                daterange.sendKeys(get_todayDate());
                browser.sleep(4000)
                enddate.sendKeys(get_todayDate());
                // browser.actions().sendKeys(protractor.Key.ARROW_DOWN)
                // browser.actions().sendKeys(protractor.Key.ENTER).perform()
                
                browser.sleep(7000)
                searchParking.click();
                // let subs = element(by.className("mat-form-field-hint-wrapper ng-tns-c44-2 ng-trigger ng-trigger-transitionMessages ng-star-inserted"))
                // browser.executeScript("arguments[0].click();", city);
                // let EC = protractor.ExpectedConditions;
                // browser.wait(EC.elementToBeClickable(subs), 2000)
                // browser.executeScript("arguments[0].click();", subs);
                // //browser.pause();

                
                // let subs1 = element(by.className("mat-form-field-subscript-wrapper ng-tns-c44-2"))
                // browser.wait(EC.elementToBeClickable(subs1), 2000)
                // browser.executeScript("arguments[0].click();", subs1);
                
                // browser.touchActions().tap(subs)
                // browser.touchActions().tap(subs1)
                //let title =  element(by.cssContainingText('.header-text','The Parkers'))
                //expect(title.getText()).toEqual('The Parkers')
                //let park=element(by.cssContainingText('.desc-heading','Parking Description'))
                //expect(park.getText()).toEqual('Parking Description')
                browser.sleep(6000);
                element(by.css('mat-expansion-panel-header')).click();
               
                //console.log(element(by.css('ion-row:nth-of-type(6)>div')).getText());
                browser.sleep(6000);
            }
        );

        it('Test title name is correct', function()
        {
            browser.get('https://parkersdev-app-nixgrdwaba-ue.a.run.app/ ');
            let title =  element(by.cssContainingText('.header-text','The Parkers'))
            browser.sleep(4000)
            expect(title.getText()).toEqual('The Parkers')
            
        });

        it('Test google login button is present', function()
        {
            browser.get('https://parkersdev-app-nixgrdwaba-ue.a.run.app/ ');
            let googleSignin =  element(by.cssContainingText('.login-with-google-btn',' Sign in with Google '))
            browser.sleep(4000)
            expect(googleSignin.isPresent()).toBe(true);
            
        });

        it('Test Search parking button rendering', function()
        {
            browser.get('https://parkersdev-app-nixgrdwaba-ue.a.run.app/ ');
            let searchParking = element(by.cssContainingText('.search-parking-button','Search Parking'));
            browser.sleep(2000)
            expect(searchParking.isPresent()).toBe(true);
            
        });

        it('Test enter end date range error message', function()
        {
            browser.get('https://parkersdev-app-nixgrdwaba-ue.a.run.app/ ');
            let city = element(by.css("input[formControlName=city]"));
            city.sendKeys('Toronto, ON, Canada');
            browser.waitForAngularEnabled(false)
            browser.sleep(3000)
            let daterange = element(by.id('mat-date-range-input-0'));
            daterange.clear();
            daterange.sendKeys(get_todayDate());
            
            let searchParking = element(by.cssContainingText('.search-parking-button','Search Parking'));
            searchParking.click()
            browser.sleep(6000);
            let parking = element(by.css('mat-error'));
            expect(parking.isPresent()).toBe(true);
            browser.sleep(4000)
        });

        it('Test enter start date range error message', function()
        {
            browser.get('https://parkersdev-app-nixgrdwaba-ue.a.run.app/ ');
            let city = element(by.css("input[formControlName=city]"));
            city.sendKeys('Toronto, ON, Canada');
            browser.waitForAngularEnabled(false)
            browser.sleep(3000)
            let enddate = element(by.css("input[formControlName=endDate]"));
            enddate.clear();
            enddate.sendKeys(get_todayDate());
            let searchParking = element(by.cssContainingText('.search-parking-button','Search Parking'));
            searchParking.click()
            browser.sleep(6000);
            let error = element(by.css('mat-error'));
            expect(error.isPresent()).toBe(true);
            browser.sleep(4000)
        });

        it('Test enter location error message', function()
        {
            browser.get('https://parkersdev-app-nixgrdwaba-ue.a.run.app/ ');
            let enddate = element(by.css("input[formControlName=endDate]"));
            enddate.clear();
            browser.sleep(4000)
            enddate.sendKeys(get_todayDate());
            browser.sleep(2000)
            let daterange = element(by.id('mat-date-range-input-0'));
            daterange.clear();
            daterange.sendKeys(get_todayDate());
            let searchParking = element(by.cssContainingText('.search-parking-button','Search Parking'));
            searchParking.click()
            let error = element(by.id('mat-error-0'));
            expect(error.isPresent()).toBe(true);
            browser.sleep(3500)
        });
        
        it('Test the Add Parking guard ', function(){
            browser.waitForAngularEnabled(false)
            browser.get('https://parkersdev-app-nixgrdwaba-ue.a.run.app/addParking');
            let title= element(by.css('h1'))
            expect(title.getText()).toEqual('404 Not Found')
            browser.sleep(4000)
        });

        it('Test the Get Bookings guard ', function(){
            browser.waitForAngularEnabled(false)
            browser.get('https://parkersdev-app-nixgrdwaba-ue.a.run.app/bookings');
            let title= element(by.css('h1'))
            expect(title.getText()).toEqual('404 Not Found')
            browser.sleep(4000)
        });

    

    }
);



