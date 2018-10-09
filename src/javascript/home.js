// homepage starts
document.getElementById("photographer-arrow-down").onclick = function() {hidePhotographerDiv()};

function hidePhotographerDiv() {

  var skewed = document.getElementById("gb-card-50-skewed");
  
    var defaultdiv = document.getElementById("photographer-default");
    var overlaydiv = document.getElementById("photographer-overlay");
    if (overlaydiv.style.display === "none") {
      overlaydiv.style.display = "block";
      
      setTimeout(() => {
        skewed.classList.add("gb-card-50-skewed-extended");
       }, 100);

      defaultdiv.style.display = "none";
    } else {
      overlaydiv.style.display === "block";
    }
}

document.getElementById("modal-list").onclick = function() {showPhotographerDiv()};
function showPhotographerDiv() {
  var skewed = document.getElementById("gb-card-50-skewed");
  var defaultdiv = document.getElementById("photographer-default");
  var overlaydiv = document.getElementById("photographer-overlay");
  if (overlaydiv.style.display === "block") {
    overlaydiv.style.display = "none";
    defaultdiv.style.display = "block";
    setTimeout(() => {
      skewed.classList.remove("gb-card-50-skewed-extended");
     }, 100);

  } else {
    overlaydiv.style.display === "none";
  }
}

document.getElementById("company-arrow-down").onclick = function() {hideCompanyDefault()};

function hideCompanyDefault() {

  var skewed = document.getElementById("gb-card-50-skewed-company");
  
    var companyDefaultDiv = document.getElementById("company-default");
    var companyOverlayDiv = document.getElementById("company-overlay");
    if (companyOverlayDiv.style.display === "none") {
      companyOverlayDiv.style.display = "block";
      
      setTimeout(() => {
        skewed.classList.add("gb-card-50-skewed-extended");
       }, 100);

       companyDefaultDiv.style.display = "none";
    } else {
      companyOverlayDiv.style.display === "block";
    }
}

document.getElementById("modal-list-company").onclick = function() {showCompanyDefault()};
function showCompanyDefault() {
  var skewed = document.getElementById("gb-card-50-skewed-company");
  var companyDefaultDiv = document.getElementById("company-default");
  var companyOverlayDiv = document.getElementById("company-overlay");
  if (companyOverlayDiv.style.display === "block") {
    companyOverlayDiv.style.display = "none";
    companyDefaultDiv.style.display = "block";
    setTimeout(() => {
      skewed.classList.remove("gb-card-50-skewed-extended");
     }, 100);

  } else {
    companyOverlayDiv.style.display === "none";
  }
}

// homepage ends

/* Script for the nav to be sticky */
	const navBar = document.querySelector('.gb-navbar');

let isPassed = scrollY < 10;
if(isPassed && navBar.classList.contains('gb-background-transparent')){
  navBar.classList.remove('gb-background-transparent');
  navBar.classList.add('gb-background-primary' , 'sticky');
}else if(!isPassed && navBar.classList.contains('sticky')){
  navBar.classList.remove('gb-background-primary' , 'sticky')
  navBar.classList.add('gb-background-transparent');
}