const pup = require("puppeteer");
let {id,pass} = require("./secret");
let tab;
let dataFile = require("./data");

async function main(){

        let browser = await pup.launch({
            headless : false,
            defaultViewport : false,
            args : ["--start-maximized"]
        });

        let pages = await browser.pages();
        tab = pages[0];
        await tab.goto("https://internshala.com/");
        await tab.click(".login-cta")
        await tab.type("#modal_email", id);
        await tab.type("#modal_password", pass);
        await tab.click("#modal_login_submit");

        await tab.waitForNavigation({waitUntil : "networkidle2"});
        await tab.click(".nav-link.dropdown-toggle.profile_container .is_icon_header.ic-24-filled-down-arrow");

         let profile_options = await tab.$$(".profile_options a");
         let app_urls = [];
         for(let i=0; i<11; i++){
            let url = await tab.evaluate(function(ele){
                    return ele.getAttribute("href");                                 
            }, profile_options[i]); 
            app_urls.push(url);    
            console.log(app_urls[[i]]);
        }                                              
        await new Promise(function(resolve,reject){                             
            return setTimeout(resolve, 2000);
        });
        tab.goto("https://internshala.com"+"/student/resume?detail_source=resume_direct");
        // tab.goto("https://internshala.com"+app_urls[1]);
        console.log(app_urls[1]);

        await tab.waitForSelector(".add_more_item_container", {visible : true});
        await tab.click(".add_more_item_container");
        await graduation(dataFile[0]);
        console.log(1)
        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 1000);
        });
        console.log(1)
        tab.goto("https://internshala.com"+"/student/resume?detail_source=resume_direct");
        // await tab.waitForSelector(".next-button", {visible : true});
        await tab.waitForSelector("#training-resume", {visible : true});
        console.log(2);
        // await tab.click(".next-button");
        await tab.click("#training-resume");

        await training(dataFile[0]);
        console.log(1)
        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 1000);
        });
        console.log(1)
        tab.goto("https://internshala.com"+"/student/resume?detail_source=resume_direct");
        await tab.waitForSelector("#work-modal", {visible : true});
        console.log(2);
        await tab.click("#work-modal");
        console.log(2);
        // await tab.waitForSelector("#work-modal", {visible : true});
        // await tab.click("#work-modal");
        console.log(2);
        await workSample(dataFile[0]);
        console.log(1)
        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 1000);
        });
        console.log(1)

        // await tab.waitForSelector("#save_work_samples", {visible : true});
        // await tab.click("#save_work_samples");
        console.log(1)
        // await tab.waitForSelector(".resume_download_mobile", {visible : true});
        // await tab.click(".resume_download_mobile");                                // if you want to download resume.
        
        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 1000);
        });
        console.log(1)
        await application(dataFile[0]);
    }
    console.log(1)
    async function graduation(data){
    //    await tab.waitForSelector("#degree_completion_status_pursuing", {visible : true});
    //     await tab.click("#degree_completion_status_pursuing");
        await tab.waitForSelector("#graduation-tab.education-tabs", {visible : true});
        await tab.click("#graduation-tab.education-tabs");

        await tab.waitForSelector("#college", {visible : true});
        await tab.type("#college", data["College"]);

        await tab.waitForSelector("#start_year_chosen", {visible : true});
        await tab.click("#start_year_chosen");
        await tab.waitForSelector(".active-result[data-option-array-index='5']", {visible : true});
        await tab.click(".active-result[data-option-array-index='5']");
        console.log(1)
        await tab.waitForSelector("#end_year_chosen", {visible : true});
        await tab.click('#end_year_chosen');
        await tab.waitForSelector("#end_year_chosen .active-result[data-option-array-index = '6']", {visible : true});
        await tab.click("#end_year_chosen .active-result[data-option-array-index = '6']");
        console.log(1)
        await tab.waitForSelector("#degree", {visible : true});
        await tab.type("#degree", data["Degree"]);
        console.log(1)
        await new Promise(function(resolve,reject){                             
            return setTimeout(resolve, 1000);
        });
        await tab.waitForSelector("#stream", {visible : true});
        await tab.type("#stream", data["Stream"]);
        console.log(1)
        await new Promise(function(resolve,reject){                           
            return setTimeout(resolve, 1000);
        });
        await tab.waitForSelector("#performance-college", {visible : true});
        await tab.type("#performance-college", data["Percentage"]);
        console.log(1)
        await new Promise(function(resolve,reject){                              
            return setTimeout(resolve, 1000);
        });
        console.log(1)
        await tab.click("#college-submit");

    }

    async function training(data){
        // await tab.waitForSelector(".experiences-tabs[data-target='#training-modal'] .ic-16-plus", {visible : true});
        // await tab.click(".experiences-tabs[data-target='#training-modal'] .ic-16-plus");
        console.log(1)
        await tab.waitForSelector("#other_experiences_course", {visible : true});
        await tab.type("#other_experiences_course", data["Training"]);

        await new Promise(function(resolve,reject){                             
            return setTimeout(resolve, 1000);
        });
        console.log(1)

        await tab.waitForSelector("#other_experiences_organization", {visible : true});
        await tab.type("#other_experiences_organization", data["Organization"]);

        await new Promise(function(resolve,reject){                             
            return setTimeout(resolve, 1000);
        });
        console.log(1)
        
        await tab.click("#other_experiences_start_date");

        // await new Promise(function(resolve,reject){                             
        //     return setTimeout(resolve, 1000);
        // });
        console.log(1)
        
        await tab.waitForSelector(".ui-state-default[href='#']", {visible : true});
        let date = await tab.$$(".ui-state-default[href='#']");
        await date[0].click();
        await tab.click("#other_experiences_is_on_going");

        await tab.waitForSelector("#other_experiences_training_description", {visible : true});
        await tab.type("#other_experiences_training_description", data["description"]);
        console.log(1)
        await new Promise(function(resolve,reject){                             
            return setTimeout(resolve, 2000);
        });
        await tab.click("#other_experiences_location");
        // tab.goto("https://internshala.com"+"/student/resume?detail_source=resume_direct");
        await tab.keyboard.type("Pune, Maharashtra, India");
        // await tab.click("#ui-id-10.ui-menu-item");
        await new Promise(function(resolve,reject){                             
            return setTimeout(resolve, 1000);
        });
        console.log(1)

        await tab.click("#training-submit");
        
    }

    async function workSample(data){
        await tab.waitForSelector("#other_portfolio_link", {visible : true});
        await tab.type("#other_portfolio_link", data["link"]);
        // await new Promise(function(resolve,reject){                             
        //     return setTimeout(resolve, 1000);
        // });
        console.log(1)
        await tab.click("#work-samples-submit");
    }
    console.log(1)
    async function application(data){
        
        await tab.goto("https://internshala.com/the-grand-summer-internship-fair");

        await tab.waitForSelector("#internship_list_container_1", {visible : true});
        await tab.click("#internship_list_container_1")
        // await tab.waitForSelector(".btn.btn-primary.campaign-btn.view_internship", {visible : true});
        // await tab.click(".btn.btn-primary.campaign-btn.view_internship")
        console.log(1)
        await new Promise(function(resolve,reject){                             
            return setTimeout(resolve, 2000);
        });
        // await tab.waitForSelector("#internship_meta", {visible : true});
        // let details = await tab.$$("#internship_meta");
        await tab.waitForSelector(".view_detail_button", {visible : true});
        let details = await tab.$$(".view_detail_button");
        console.log(details);
        let detailUrl = [];
        for(let i=0; i<3; i++){
            let url = await tab.evaluate(function(ele){
                    return ele.getAttribute("href");                                 
            }, details[i]); 
            detailUrl.push(url);    
        }
        console.log(1)
        
        for(let i of detailUrl){
            await apply(i, data);
            await new Promise(function(resolve,reject){                             
                return setTimeout(resolve, 1000);
            });
        }
        console.log(1)
    }

    async function apply(url, data){
        await tab.goto("https://internshala.com"+url);
        
        await tab.waitForSelector(".btn.btn-large", {visible : true});
        await tab.click(".btn.btn-large");

        await tab.waitForSelector("#application_button", {visible : true});
        await tab.click("#application_button");
        console.log(1)
        await tab.waitForSelector(".textarea.form-control", {visible : true});
        let ans = await tab.$$(".textarea.form-control");

        for(let i=0; i<ans.length ; i++){
            if(i==0){
                await ans[i].type(data["hiringReason"]);
                await new Promise(function(resolve,reject){                             
                    return setTimeout(resolve, 1000);
                });
            }
            else if(i==1){
                await ans[i].type(data["availability"]);
                await new Promise(function(resolve,reject){                             
                    return setTimeout(resolve, 1000);
                });
            }
            else{
                await ans[i].type(data["rating"]);
                await new Promise(function(resolve,reject){                             
                    return setTimeout(resolve, 1000);
                });
            } 
        }
        console.log(1)
           await tab.click(".submit_button_container");

    }

main();