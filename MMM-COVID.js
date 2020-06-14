//setting up module
var USData;
var MIData;

Module.register("MMM-COVID",{
  //default properties
  defaults: {
  },

  start: function() {
    var self = this;
    this.sendSocketNotification('DOWNLOAD_DATA', "US");
    this.sendSocketNotification('DOWNLOAD_DATA', "MI");
		setInterval(function() {
			self.updateDom(); // no speed defined, so it updates instantly.
	
		}, 5000); //perform every 5000 milliseconds.
	
	},

getDom: function() {
  this.sendSocketNotification('GET_DATA', "US");
  this.sendSocketNotification('GET_DATA', "MI");

  //creating table
  var wrapper = document.createElement("div");
  var tbl = document.createElement("table");
      var tblBody = document.createElement("tbody");

      for (var i = 0; i < 3; i++) {
        // creates 3 table rows
        var row = document.createElement("tr");
        row.id = "r" + i;

        for (var j = 0; j < 5; j++) {
          // Create a <td> element and a text node, make the text
          // node the contents of the <td>, and put the <td> at
          // the end of the table row
          var cell = document.createElement("td");
          cell.id = "" + i + "cell" + j; //setting cell id as (row + "cell" + column)
          var cellText = document.createTextNode("");
          //CELL ASSIGNMENT SWITCH CASE
          //notated as "row/column"
          switch(i + "/" + j){

            //COLUMN ZERO
            case "0/0":
              var cellText = document.createTextNode(MIData.date.toString().substring(4,6) + "/" + MIData.date.toString().substring(6) + "/" + MIData.date.toString().substring(0,4));
                break;
            case "1/0":
              var cellText = document.createTextNode("US DATA");
                break;
            case "2/0":
              var cellText = document.createTextNode("MI DATA");
                break;

            //COLUMN ONE
            case "0/1":
              var cellText = document.createTextNode("CURR CASES");
                break;
            case "1/1":
              var cellText = document.createTextNode(USData[0].positive); //CURRENT US CASES
                break;
            case "2/1":
              var cellText = document.createTextNode(MIData.positive); //CURRENT MI CASES
                break;
            
            //COLUMN TWO
            case "0/2":
              var cellText = document.createTextNode("RECOVERED");
                break;
            case "1/2":
              var cellText = document.createTextNode(USData[0].recovered); //RECOVERED US
                break;
            case "2/2":
              var cellText = document.createTextNode(MIData.recovered);  //RECOVERED MI
                break;

            //COLUMN THREE
            case "0/3":
              var cellText = document.createTextNode("DEATHS");
                break;
            case "1/3":
              var cellText = document.createTextNode(USData[0].death); // US DEATHS
                break;
            case "2/3":
              var cellText = document.createTextNode(MIData.death); // MI DEATHS
                break;
            //COLUMN FOUR

            case "0/4":
              var cellText = document.createTextNode("DAILY + CASES");
              break;
            case "1/4":
              var cellText = document.createTextNode(USData[0].positiveIncrease); //DAILY INC US
              break;
            case "2/4":
              var cellText = document.createTextNode(MIData.positiveIncrease); // DAILY INC MI 

          }

          cell.appendChild(cellText);
          row.appendChild(cell);
        }

        tblBody.appendChild(row);
      }     

      // put the <tbody> in the <table>
      tbl.appendChild(tblBody);
      // appends <table> into <body>
      //body.appendChild(tbl);
      // sets the border attribute of tbl to 2;
      tbl.setAttribute("border", "2");
      wrapper.appendChild(tbl);
return wrapper;
},
socketNotificationReceived: function(notification, payload) {
  var currObject = payload;
  // Log.log(currObject);
  // Log.log("log done");
		// if (notification === 'DATA_RETURN'){
		//   Log.log(payload + " = recieved notification from node.");	
    // }
    if (notification === "US_RETURN"){
      USData = currObject;
      Log.log(currObject);
      Log.log("US log done");
    }
    if (notification === "MI_RETURN"){
      MIData = currObject;
      Log.log(currObject);
      Log.log("MI log done");
    }
    // if(notification === 'TEST'){
    //     numDeaths = payload;
    // }
  }
});

