/** ********************************************** **
	@Author			Frederic Voyer
	@Last Update	September 9, 2020

	NOTE!  This program takes the values from a form and calculates different fields
			and return them to the form. Hide and show sections depending of
			the building type selected and update content when user changes input

	credit to https://www.javascript-coder.com/javascript-form/javascript-calculator-script/


*************************************************** **/

// Hiding sections before the building type is selected function myFunction() {

  document.getElementById("resSec").style.display = "none";
  document.getElementById("comSec").style.display = "none";
  document.getElementById("corSec").style.display = "none";
  document.getElementById("hybSec").style.display = "none";
  document.getElementById("radSec").style.display = "none"; 

// Getting and updating or pushing values to the form
function majForm() {
	// Read the content of the html form 
	//var theForm = document.forms["step1"];

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

		// Section Commercial (class=com) getElementsByClassName
			// Number of distinct businesses in the building
	var comBiz = document.getElementById("comBiz").value;
			// Number of floors in the building
	var comFloor = document.getElementById("comFloors").value;
			// Number of basements in the building
	var comBasem = document.getElementById("comBasem").value;
			// Number of parking spaces available in the building
	var comParkSpace = document.getElementById("comParkSpace").value;
			// Number of elevator cages to be deployed in the building
	var comCages = document.getElementById("comCages").value;
			// element de la section Commercial
	var sectionCom = document.getElementsByClassName("com");
			
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

	/******************************************************************************************************************** */
	// Change variable type to num to calculate outputs
	var resApartNum = parseInt(resApart);
	var resFloorNum = parseInt(resFloor);

	var comCagesNum = parseInt(comCages);

	var corMaxOccFloorNum = parseInt(corMaxOccFloor);
	var corFloorNum = parseInt(corFloor);
	//var corBasemNum = parseInt(corBasem);

	var hybMaxOccFloorNum = parseInt(hybMaxOccFloor);
	var hybFloorNum = parseInt(hybFloor);
	//var hybBasemNum = parseInt(hybBasem);
	

	/******************************************************************************************************************** */
	// Estimate of the number of lift cages (recommended number of elevators; read only)) 
	var outCages;
		// Compute/calculate considering the type of building
			// Residential
	if (typeBuil === 'Residential')  {
		if (isNaN(resApartNum) || isNaN(resFloorNum))  {
			outCages=null;
		}
		else {
			// divide the number of apartments by the number of floors (excluding the number of basements) to obtain an average 
			// of doors per floor 
			var avgDoorPerFloor= Math.ceil(resApartNum / resFloorNum);
			// and require an elevator shaft for every 6 apartments. If the apartment has more than 20 stories, 
			// it is necessary to provide an additional column of elevators and thus double the number of elevator shafts. A new column 
			// is therefore added to each new group of 20 stories.
			var reselevColumn= Math.ceil(resFloorNum / 20);
			var reselevPerColumn= Math.ceil(avgDoorPerFloor / 6);

			outCages= reselevColumn * reselevPerColumn;
		}

		// Show sections of the building types not selected
		document.getElementById("resSec").style.display = "block";
		//document.getElementById("radSec").style.display = "block";
		//document.getElementById("output2").style.display = "block";

		// Hide section of the building type is selected (and the rest of the form?)
		document.getElementById("corSec").style.display = "none";
		document.getElementById("comSec").style.display = "none";
		document.getElementById("hybSec").style.display = "none"; 

	} 
	// Commercial
	else if (typeBuil === 'Commercial')  {
		// Estimate of the number of lift cages is the number of elevator cages to be deployed in the building
		if (comCagesNum >=0) {
			outCages=comCagesNum;
		}
		else {
			outCages=null;
		}

		// Show  sections of the building types not selected
		document.getElementById("comSec").style.display = "block";
		//document.getElementById("radSec").style.display = "block";
		//document.getElementById("output2").style.display = "block";

		// Hide section of the building type is selected (and the rest of the form?)
		document.getElementById("resSec").style.display = "none";
		document.getElementById("corSec").style.display = "none";
		document.getElementById("hybSec").style.display = "none"; 

	}
	// Corporate
	else if (typeBuil === 'Corporate')  {
		if (isNaN(corFloorNum) || isNaN(corMaxOccFloorNum))  {
			outCages=null;
		}
		else  {
			// multiply the number of occupants per floor by the number of floors (including the number of basements) to obtain the 
			//total number of occupants. It's rather excluding to match Patrick's numbers
			var occupants= corMaxOccFloorNum * (corFloorNum);// + corBasemNum);
			// The number of elevators required is determined by the number of occupants divided by 1000. 
			var elevators= Math.ceil(occupants / 1000);
			// The number of stories (including the number of basements) is divided by 20 to obtain the number of elevator columns required. 
			var elevColumn= Math.ceil((corFloorNum / 20)); // + corBasemNum) / 20);
			// Then divide the number of elevators by the number of columns to get the number of elevators per column. 
			var elevPerColumn= Math.ceil(elevators / elevColumn);
			// The total number of elevators is determined by the number of elevators per column multiplied by the number of columns
			outCages= elevPerColumn * elevColumn;
		}

		// Show  sections of the building types not selected
		document.getElementById("corSec").style.display = "block";
		//document.getElementById("radSec").style.display = "block";
		//document.getElementById("output2").style.display = "block"; 

		// Hide section of the building type is selected (and the rest of the form?)
		document.getElementById("resSec").style.display = "none";
		document.getElementById("comSec").style.display = "none";
		document.getElementById("hybSec").style.display = "none"; 

	}
	// Hybrid
	else if (typeBuil === 'Hybrid')  {
		if (isNaN(hybFloorNum) || isNaN(hybMaxOccFloorNum)) {
			outCages=null;
		}		
		else {
			// multiply the number of occupants per floor by the number of floors (including the number of basements) to obtain the 
			//total number of occupants. It's rather excluding to match Patrick's numbers
			var hyboccupants= hybMaxOccFloorNum * (hybFloorNum);// + hybBasemNum);
			// The number of elevators required is determined by the number of occupants divided by 1000. 
			var hybelevators= Math.ceil(hyboccupants / 1000);
			// The number of stories (including the number of basements) is divided by 20 to obtain the number of elevator columns required. 
			var hybelevColumn= Math.ceil((hybFloor / 20));// + hybBasemNum) / 20);
			// Then divide the number of elevators by the number of columns to get the number of elevators per column. 
			var hybelevPerColumn= Math.ceil(hybelevators / hybelevColumn);
			// The total number of elevators is determined by the number of elevators per column multiplied by the number of columns
			outCages= hybelevPerColumn * hybelevColumn;
		}

		// Show sections of the building types not selected
		document.getElementById("hybSec").style.display = "block";
		//document.getElementById("radSec").style.display = "block";
		//document.getElementById("output2").style.display = "block";

		// Hide section of the building type is selected (and the rest of the form?)
		document.getElementById("resSec").style.display = "none";
		document.getElementById("comSec").style.display = "none";
		document.getElementById("corSec").style.display = "none";  

	}
	// Hide all sections (typeBuil === '')
	else {
		document.getElementById("resSec").style.display = "none";
		document.getElementById("comSec").style.display = "none";
		document.getElementById("corSec").style.display = "none";
		document.getElementById("hybSec").style.display = "none";
		document.getElementById("radSec").style.display = "none";
		document.getElementById("output1").style.display = "none";
		document.getElementById("output2").style.display = "none";
		document.getElementById("output3").style.display = "none";
	  
	} 
		
	
	// Radio button for selection of distinct product lines: Standard, Premium or Excelium 

	var radios = document.getElementsByName('productLine');

	for (var i = 0, length = radios.length; i < length; i++) {
		if (radios[i].checked) {
			// Identify the value selected
			var  productLine = radios[i].value;

			// only one radio can be logically checked, don't check the rest
			break;
		}
	}

	// Unit and total price for an elevator shaft (appears after radio box choice) - class="readOnly" id="outUnitPriceElev"
	var outUnitPriceElev;
	var outTotalPriceElev;
		// Determine considering the product line
			// Standard 7565
	if (productLine === 'Standard'  && outCages >=0)  {
		outUnitPriceElev=7565 ;
		outTotalPriceElev=7565 * outCages;
	}
			// Premium
	else if (productLine === 'Premium'  && outCages >=0)  {
		outUnitPriceElev=12345 ;
		outTotalPriceElev=12345 * outCages;
	}
			// Excelium
	else if (productLine === 'Excelium'  && outCages >=0)  {
		outUnitPriceElev=15400 ;
		outTotalPriceElev=15400 * outCages;
	}
	//else	

			
	// Estimated cost of installation (read only) - class="readOnly" id="outCostInst"
	var instFees;

		// Determine considering the product line (installation fees and number of cages)
		// Standard 7565  (installation fee 10%)
	if (productLine === 'Standard' && outCages >=0)  {
		instFees=  Math.round(outTotalPriceElev * 0.1 * 100) / 100;// * outCages
	}
	// Premium (installation fee 13%)
	else if (productLine === 'Premium' && outCages >=0)  {
		instFees=  Math.round(outTotalPriceElev * 0.13 * 100) / 100;// * outCages
	}
	// Excelium (installation fee 16%)
	else if (productLine === 'Excelium' && outCages >=0)  {
		instFees=  Math.round(outTotalPriceElev * 0.16 * 100) / 100;// * outCages
	}
	//else	
			
	// Estimated cost of installation (read only) - class="readOnly" id="outCostInst" unit is cents Math.round((100 / 3) * 100) / 100;
	var outCostInst;
	if (outCages >=0 && instFees >=0 && outTotalPriceElev >=0) {
		outCostInst = outTotalPriceElev  * outCages + instFees ;

	}
	else {
		outCostInst=null;
	}

	
	//var outCostInst2= outCostInst.toFixed(2);

	//var outCostInst2 = outCostInst.toLocaleString("es-MX",{style:"currency", currency:"MXN"});
	//var outCostInst3 = outCostInst.numberFormat(2);
	//console.log(outCostInst2);
	/*
	var n = num.toString();
	
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2
	  })
	  
	  formatter.format(1000) // "$1,000.00"
	  formatter.format(10) // "$10.00"
	  formatter.format(123233000) // "$123,233,000.00"

	  function formatMoney(amount)
	{
	// All money is dollars with two fractional digits...right?
	return "$" + amount.toFixed(2);
	} */
	
	//Determine considering the product line (installation fees and number of cages)
		// Standard 7565  (installation fee 10%)
	if (productLine === 'Standard')  {
		outCostInst= outTotalPriceElev + instFees;//* outCages
	}
		// Premium (installation fee 13%)
	else if (productLine === 'Premium')  {
		outCostInst= outTotalPriceElev + instFees;//* outCages
	}
		// Excelium (installation fee 16%)
	else if (productLine === 'Excelium')  {
		outCostInst= outTotalPriceElev + instFees;//* outCages
	}
	//else */


	/**********************************************************************************************************************/
	// Push the calculated fields to the form

		// Estimate of the number of lift cages (recommended number of elevators; read only)) 
	if (outCages === null || isNaN(outCages)) {
		document.getElementById("output1").style.display = "none";
	}
	else if (outCages >= 0)  {
		document.getElementById("output1").style.display = "block";
		document.getElementById("output1").innerHTML = "Recommended number of elevators : " + outCages;
		document.getElementById("radSec").style.display = "block";
	}
	
		// Unit price for an elevator shaft (appears after radio box choice and outcage)
	if (outUnitPriceElev > 0)  {
		document.getElementById("output2").style.display = "block";
		document.getElementById("output2").innerHTML = "The unit price is ($) : " + outUnitPriceElev;
	}
	else /*if (outCages === null)*/ {
		document.getElementById("output2").style.display = "none";
	}

		// Total price for an elevators shaft (appears after radio box choice and outcage)
	if (outTotalPriceElev > 0)  {
		document.getElementById("output2b").style.display = "block";
		document.getElementById("output2b").innerHTML = "The price for the recommended number of elevators is ($) : " + outTotalPriceElev;
	}
	else /*if (outCages === null)*/ {
		document.getElementById("output2b").style.display = "none";
	}
		

		// Installation fees for an elevator shaft (appears after radio box choice and outcage) Estimated cost of installation ($) : " + outCostInst;
	if (instFees > 0)  {
		document.getElementById("output").style.display = "block";
		document.getElementById("output").innerHTML = "The installation fee is ($) : " + instFees;
	}	
	else /*if (outCages === null)*/ {
		document.getElementById("output").style.display = "none";
	}
		
		// Estimated cost of installation (read only) - class="readOnly" id="outCostInst"
	if (outCostInst > 0)  {
		document.getElementById("output3").style.display = "block";
		document.getElementById("output3").innerHTML = "The total cost is ($) : " + outCostInst;
	}
	else /*if (outCages === null)*/ {
		document.getElementById("output3").style.display = "none";
	}

} 
