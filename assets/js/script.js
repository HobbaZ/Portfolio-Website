//page element vriables
const projectDisplay = document.getElementById("projects");
const personalInfo = document.getElementById("info");

const imageArray = 
["./assets/images/coding-quiz.jpeg",
"./assets/images/CryptoWorld.gif",
"./assets/images/password-generator.PNG",
"./assets/images/website-revamp.PNG",
"./assets/images/product-generator.PNG",
"./assets/images/horiseon-refactor.png",
"./assets/images/vehicle.png",
"./assets/images/weather-api-app.png",
"./assets/images/work-day-scheduler.gif",

];

const projectNames = 
["coding-quiz",
"CryptoWorld",
"Password-Generator",
"Portfolio-Website",
"Refactor-Code-Horiseon",
"Vehicle-Generator-Game",
"Weather-API-app",
"Work-Day-Scheduler",
"Product-Generator-Website"
]

function getApi() {

  const repoArray = [];

    var requestUrl = 'https://api.github.com/users/HobbaZ/repos';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (let i = 0; i < data.length; i++) {

          for (let j = 0; j < projectNames.length; j++) {
            if (data[i].name === projectNames[j]) {
              repoArray.push(data[i])
            }
            
          }
          
        }

        //const repoArray = [data[1], data[2], data[7], data[8], data[11], data[12], data[13], data[14], data[10]];
        //console.log(data);
        console.log(repoArray);
        projectGen(repoArray)
      });
}

function projectGen(repoArray) {
    
    for (let k = 0; k < repoArray.length; k++) {

    const cardArea = document.createElement("div");
    cardArea.classList.add("col-sm-12", "cardArea", "col-md-6", "col-lg-4");  
    //card
    const card = document.createElement("div");
    card.classList.add("projectCard","p-1");
    
    cardArea.appendChild(card);
    projectDisplay.appendChild(cardArea);

    //header
    const cardHeader = document.createElement("h2");

    //subtitle
    const cardSubtitle = document.createElement("p");

    //image
    const cardImage = document.createElement("img");
    cardImage.classList.add("cardImage", "w-100");

    //text
    const cardText = document.createElement("p");
    cardText.className="cardText";

    //githublink
    const cardlinkGithub = document.createElement("button");
    cardlinkGithub.classList.add("btn", "btn-primary", "w-50", "mx-auto", "mb-2");
    const githubLink = document.createElement("a");
    githubLink.href = repoArray[k].html_url;
    cardlinkGithub.appendChild(githubLink);

    //deployment link
    const cardlinkDeployed = document.createElement("button");
    cardlinkDeployed.classList.add("btn", "btn-primary", "w-50", "mx-auto", "mb-2");
    const deployedLink = document.createElement("a");
    cardlinkDeployed.appendChild(deployedLink);

    cardlinkGithub.addEventListener("click", function() {
      window.open(repoArray[k].html_url, "_blank")
    });

    cardlinkDeployed.addEventListener("click", function() {
      if (k === 6) {
        window.open('https://adrift-dev.itch.io/random-vehicle-generator-2' , "_blank")
        } else {
          window.open(('https://hobbaz.github.io/'+repoArray[k].name), "_blank")
        }
    });

    //Call second API
    fetch(repoArray[k].languages_url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {

        let sum = Object.values(data); //get all numbers in object
        let total = 0;
        sum.forEach((element) => {
            total += element;
        });

        for(const [key,value] of Object.entries(data)) {
            let breakdown = document.createElement('div');
            
            breakdown.textContent = (key +" : " + ((value/total)*100).toFixed(0)+ "%");
            cardSubtitle.appendChild(breakdown);
        }
      });

    //assign data elements
    cardHeader.textContent = repoArray[k].name;
    cardText.innerHTML = "<h6>About:</h6>"+repoArray[k].description;
    cardSubtitle.innerHTML = "<br><h6>Code Breakdown</h6>";
    cardlinkDeployed.textContent = "Website";
    cardlinkGithub.textContent = "Github";

    cardImage.setAttribute("src", imageArray[k]);
    
    card.appendChild(cardHeader);
    card.appendChild(cardImage);
    //card.appendChild(cardSubtitle);
    card.appendChild(cardText);
    card.appendChild(cardlinkDeployed);
    card.appendChild(cardlinkGithub);
} 
}

getApi();