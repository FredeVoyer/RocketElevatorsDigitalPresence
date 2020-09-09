/** ********************************************** **
	@Author			Frederic Voyer
	@Last Update	September 9, 2020

	NOTE!  This program takes the values from a form and calculates different fields
			and return them to the form. Hide and show sections depending of
			the building type selected and update content when user changes input

	credit to https://www.javascript-coder.com/javascript-form/javascript-calculator-script/


*************************************************** **/

// Hiding sections before the building type is selected

// Read then content of the html form 
// var theForm = document.forms["step1"];

	// Type of building (class=tBuil id=typeBuil)
var typeBuil = document.getElementById("typeBuil").value;
//var typeBuil = document.querySelector("form.tBuil input[id='typeBuil']");

	// Section Residential (class=res)
		// Number of apartments in the building
var resApart = document.getElementById("resApart").value;
//var typeBuil = document.querySelector("form.res input[id='resApart']");
		// Number of floors in the building
var resFloor = document.getElementById("resFloors").value;
		// Number of basements in the building
var resBasem = document.getElementById("resBasem").value;

	// Section Commercial (class=com)
		// Number of distinct businesses in the building
var comBiz = document.getElementById("comBiz").value;
		// Number of floors in the building
var comFloor = document.getElementById("comFloors").value;
		// Number of basements in the building
var resBasem = document.getElementById("resBasem").value;
		// Number of parking spaces available in the building
var comParkSpace = document.getElementById("comParkSpace").value;
		// Number of elevator cages to be deployed in the building
var comCages = document.getElementById("recomCagessBasem").value;
		
	// Section Corporate (class=cor)
		// Number of separate tenant companies in the building
var corBiz = document.getElementById("corBiz").value;
		// Number of floors in the building
var corFloor = document.getElementById("corFloors").value;
		// Number of basements in the building
var corBasem = document.getElementById("corBasem").value;
		// Number of parking spaces available in the building
var corParkSpace = document.getElementById("corParkSpaces").value;
		// Maximum number of occupants per floor in the building
var corMaxOccFloor = document.getElementById("corMaxOccFloor").value;

	// Section Hybrid (class=hyb)
		// Number of distinct businesses in the building
var hybBiz = document.getElementById("hybBiz").value;
		// Number of floors in the building
var hybFloor = document.getElementById("hybFloors").value;
		// Number of basements in the building
var hybBasem = document.getElementById("hybBasem").value;
		// Number of parking spaces available in the building
var hybParkSpace = document.getElementById("hybParkSpaces").value;
		// Maximum number of occupants per floor in the building
var hybMaxOccFloor = document.getElementById("hybMaxOccFloor").value;
		// Number of hours of activity of the hybrid building (the maximum being 24)
var hybHrsAct = document.getElementById("hybHrsAct").value;


// Estimate of the number of lift cages (recommended number of elevators; read only)) 
var outCages;
	// Compute/calculate considering the type of building
		// Residential
if (typeBuil === 'Residential')  {
	// divide the number of apartments by the number of floors (excluding the number of basements) to obtain an average 
	// of doors per floor 
	var avgDoorPerFloor= ceil(resApart / resFloor);
	// and require an elevator shaft for every 6 apartments. If the apartment has more than 20 stories, 
	// it is necessary to provide an additional column of elevators and thus double the number of elevator shafts. A new column 
	// is therefore added to each new group of 20 stories.
	var reselevColumn= ceil(resFloor / 20);
	var reselevPerColumn= ceil(avgDoorPerFloor / 6);
	outCages= reselevColumn * reselevPerColumn;


			// Number of apartments in the building
var resApart = document.getElementById("resApart").value;
//var typeBuil = document.querySelector("form.res input[id='resApart']");
		// Number of floors in the building
var resFloor = document.getElementById("resFloors").value;
		// Number of basements in the building
var resBasem = document.getElementById("resBasem").value;


	// Hide sections of the building types not selected

	// Show section of the building type is selected (and the rest of the form?)

}
// Commercial
else if (typeBuil === 'Commercial')  {
	// Estimate of the number of lift cages is the number of elevator cages to be deployed in the building
	outCages=comCages;

	// Hide sections of the building types not selected

	// Show section of the building type is selected (and the rest of the form?)

}
// Corporate
else if (typeBuil === 'Corporate')  {
	// multiply the number of occupants per floor by the number of floors (including the number of basements) to obtain the 
	//total number of occupants. 
	var occupants= corMaxOccFloor * (corFloor + corBasem);
	// The number of elevators required is determined by the number of occupants divided by 1000. 
	var elevators= ceil(occupants / 1000);
	// The number of stories (including the number of basements) is divided by 20 to obtain the number of elevator columns required. 
	var elevColumn= ceil((corFloor + corBasem) / 20);
	// Then divide the number of elevators by the number of columns to get the number of elevators per column. 
	var elevPerColumn= ceil(elevators / elevColumn);
	// The total number of elevators is determined by the number of elevators per column multiplied by the number of columns
	outCages= elevPerColumn * elevColumn;




	// Hide sections of the building types not selected

	// Show section of the building type is selected (and the rest of the form?)


}
// Hybrid
else if (typeBuil === 'Hybrid')  {
	// multiply the number of occupants per floor by the number of floors (including the number of basements) to obtain the 
	//total number of occupants. 
	var hyboccupants= hybMaxOccFloor * (hybFloor + hybBasem);
	// The number of elevators required is determined by the number of occupants divided by 1000. 
	var hybelevators= ceil(hyboccupants / 1000);
	// The number of stories (including the number of basements) is divided by 20 to obtain the number of elevator columns required. 
	var hybelevColumn= ceil((hybFloor + hybBasem) / 20);
	// Then divide the number of elevators by the number of columns to get the number of elevators per column. 
	var hybelevPerColumn= ceil(hybelevators / hybelevColumn);
	// The total number of elevators is determined by the number of elevators per column multiplied by the number of columns
	outCages= hybelevPerColumn * hybelevColumn;


	// Hide sections of the building types not selected

	// Show section of the building type is selected (and the rest of the form?)


}
//else	

var estimate_cages= new Array();
estimate_cages["Residential"]=outCages;
estimate_cages["Commercial"]=outCages;
estimate_cages["Corporate"]=outCages;
estimate_cages["Hybrid"]=outCages;


And, here is the script that finds the filling price from the drop down selection


//This function finds the estimated number of cages based on the
//drop down selection
function getEstimateCages()
{
    var estCages=0;
    //Get a reference to the form id="step1"
    var theForm = document.forms["step1"];
    //Get a reference to the select id="typeBuil"
     var selectedTypeBuil = theForm.elements["typeBuil"];

    //set estCages equal to value user chose
    //For example estimate_cages["Commercial".value] is calculated above
    estCages = estimate_cages[selectedTypeBuil.value];

    //finally we return estCages
    return estCages;
}


// Radio button for selection of distinct product lines: Standard, Premium or Excelium 

var radios = document.getElementsByName('productLine');

for (var i = 0, length = radios.length; i < length; i++) {
  if (radios[i].checked) {
    // Identify the value selected
    productLine = radios[i].value;

    // only one radio can be logically checked, don't check the rest
    break;
  }
}

// Unit price for an elevator shaft (appears after radio box choice) - class="readOnly" id="outUnitPriceElev"
var outUnitPriceElev;
	// Determine considering the product line
		// Standard 7565
if (productLine === 'Standard')  {
	outUnitPriceElev=7565;
}
		// Premium
else if (productLine === 'Premium')  {
	outUnitPriceElev=12345;
}
		// Excelium
else if (productLine === 'Excelium')  {
	outUnitPriceElev=15400;
}
//else	

/*
var productLine_prices = new Array();
productLine_prices["Standard"]=7565;
productLine_prices["Premium"]=12345;
productLine_prices["Excelium"]=15400;

// getUnitPriceElev() finds the price based on the productLine selected.
// Here, we need to take user's the selection from radio button selection
function getUnitPriceElev()
{
    var outUnitPriceElev=0;
    //Get a reference to the form id="cakeform"
    var theForm = document.forms["cakeform"];
    //Get a reference to the cake the user Chooses name=productLine":
    var selectedProductLine = theForm.elements["productLine"];
    //Here since there are 3 radio buttons productLine.length = 3
    //We loop through each radio buttons
    for(var i = 0; i < productLine.length; i++)
    {
        //if the radio button is checked
        if(productLine[i].checked)
        {
            //we set outUnitPriceElev to the value of the selected radio button
            //i.e. if the user choose Standard we set it to 7565
            //by using the productLine_prices array
            //We get the selected Items value
            //For example productLine["Standard".value]"
            outUnitPriceElev = productLine_prices[productLine[i].value];
            //If we get a match then we break out of this loop
            //No reason to continue if we get a match
            break;
        }
    }
    //We return the outUnitPriceElev
    return outUnitPriceElev;
}
*/
		
// Estimated cost of installation (read only) - class="readOnly" id="outCostInst"
let instFees;
//var instFees;

	// Determine considering the product line (installation fees and number of cages)
		// Standard 7565  (installation fee 10%)
		if (productLine === 'Standard')  {
			instFees= outUnitPriceElev * 0.1 ;
		}
		// Premium (installation fee 13%)
		else if (productLine === 'Premium')  {
			instFees= outUnitPriceElev * 0.13 ;
		}
		// Excelium (installation fee 16%)
		else if (productLine === 'Excelium')  {
			instFees= outUnitPriceElev * 0.16 ;
		}
		//else	

// Estimated cost of installation (read only) - class="readOnly" id="outCostInst"
var outCostInst = outUnitPriceElev  * outCages + instFees;

	/* Determine considering the product line (installation fees and number of cages)
		// Standard 7565  (installation fee 10%)
		if (productLine === 'Standard')  {
			outCostInst= outUnitPriceElev * outCages + instFees;
		}
		// Premium (installation fee 13%)
		else if (productLine === 'Premium')  {
			outCostInst= outUnitPriceElev  * outCages + instFees;
		}
		// Excelium (installation fee 16%)
		else if (productLine === 'Excelium')  {
			outCostInst= outUnitPriceElev  * outCages + instFees;
		}
		//else */


/**********************************************************************************************************************/

// Push the calculated fields to the form
		// Estimate of the number of lift cages (recommended number of elevators; read only)) 
console.log(outCages);
document.getElementById("outCages").value = outCages;
	
		




















/*<script>
// Step 1: Find the element we want the event on
var button = document.getElementById("button");
// Step 2: Define the event listener function
   
var onButtonClick = function() {
  //var name = document.getElementById("name").value;
  var typeBuil = document.getElementById("typeBuil").value;
  var reply;
  if (typeBuil === "Residential") {
      reply = "You selected " + typeBuil;
      document.getElementById("formcontent").textContent = reply; 
      var e0 = document.createElement("text");
          e0.value = "Number of apartments in the building";//"text";
      var e1 = document.createElement("input");
          e1.type = "number";//"text";
          e1.name = "myformvar";

          var cont = document.getElementById("formcontent");
          cont.appendChild(e0);
          cont.appendChild(e1);
  } else if (typeBuil === "Commercial") {
      reply = "You selected " + typeBuil;
  } else if (typeBuil === "Corporate") {
      reply = "You selected " + typeBuil;
  } else if (typeBuil === "Hybrid") {
      reply = "You selected " + typeBuil;
  }else {
      reply = "Please, select a type of building among the 4 choices";
  }
  //document.getElementById("formcontent").textContent = reply;  
};
// Step 3: Attach event listener to element
button.addEventListener("click", onButtonClick);
</script>
