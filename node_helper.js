var NodeHelper = require("node_helper");
var http = require('http');
var fs = require('fs');

var USObj;
var MIObj;
var downloadsDone = 0;
var jsonPath = "/home/pi/MagicMirror/modules/MMM-COVID/jsondata/";

module.exports = NodeHelper.create({
	start: function () {
    	this.started = false;
      },
      
      //function for downloading files
     downloadURL: function(url, dest, cb) {
        var file = fs.createWriteStream(dest);
        http.get(url, function(response) {
            response.pipe(file);
            file.on('finish', function() {
            downloadsDone++;
            file.close(cb);
            });
        });
    },
	
	socketNotificationReceived: function(notification, payload) {
		if (notification == 'DOWNLOAD_DATA'){
            console.log(notification + " - " + payload);
    		
            if(payload == 'US'){
               this.downloadURL("http://covidtracking.com/api/v1/us/current.json", jsonPath + "US_DATA.txt");
               
            }
            if(payload == 'MI'){
                this.downloadURL("http://covidtracking.com/api/v1/states/mi/current.json", jsonPath + "MI_DATA.txt");
            }
        }
        
        if (notification == 'GET_DATA'){
            console.log(notification + " - " + downloadsDone);
    	
            
            if(payload == 'US' && downloadsDone >= 2){
  		        fs.readFile(jsonPath + 'US_DATA.txt', (err, data) => { 
                   if (err) throw err; 
                 
                   //console.log(data);
                   
                   USObj = JSON.parse(data);
                   
                   console.log(USObj[0].positive);
			        //console.log("HI HI HI HI IT SHOULDVE POSTED THE FILE");
               });
               
             

               this.sendSocketNotification("US_RETURN", USObj);
            }
            if(payload == 'MI'  && downloadsDone >= 2){
                fs.readFile(jsonPath + 'MI_DATA.txt', (err, data) => { 
                    if (err) throw err; 
                  
                    //console.log(data);
                    
                    MIObj = JSON.parse(data);
                    
                    
                     //console.log("HI HI HI HI IT SHOULDVE POSTED THE FILE");
                });
                
              
                console.log(MIObj.positive);
                this.sendSocketNotification("MI_RETURN", MIObj);
            }
		} 
}});
