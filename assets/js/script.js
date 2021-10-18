//page element vriables
const projectDisplay = document.getElementById("projects");
const personalInfo = document.getElementById("info");

const imageArray = 
["./assets/images/coding-quiz.jpeg",
"./assets/images/CryptoWorld.gif",
"./assets/images/password-generator.PNG",
"./assets/images/website-revamp.PNG",
"./assets/images/horiseon-refactor.png",
"./assets/images/vehicle.png",
"./assets/images/weather-api-app.png",
"./assets/images/work-day-scheduler.gif",
"./assets/images/product-generator.PNG",
];

function getApi() {
    var requestUrl = 'https://api.github.com/users/HobbaZ/repos';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const repoArray = [data[1], data[2], data[7], data[8], data[11], data[12], data[13], data[14], data[10]];
        console.log(data);
        projectGen(repoArray)
      });
}

function projectGen(repoArray) {
    
    for (let i = 0; i < repoArray.length; i++) {

    const cardArea = document.createElement("div");
    cardArea.classList.add("col-sm-12", "col-md-6", "col-lg-4", "mb-2");  
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
    cardlinkGithub.classList.add("btn", "btn-primary", "w-100", "mb-2");
    const githubLink = document.createElement("a");
    githubLink.href = repoArray[i].html_url;
    cardlinkGithub.appendChild(githubLink);

    //deployment link
    const cardlinkDeployed = document.createElement("button");
    cardlinkDeployed.classList.add("btn", "btn-primary", "w-100", "mb-2");
    const deployedLink = document.createElement("a");
    cardlinkDeployed.appendChild(deployedLink);

    cardlinkGithub.addEventListener("click", function() {
      window.open(repoArray[i].html_url, "_blank")
    });

    cardlinkDeployed.addEventListener("click", function() {
      if (i === 5) {
        window.open('https://adrift-dev.itch.io/random-vehicle-generator-2' , "_blank")
        } else {
          window.open(('https://hobbaz.github.io/'+repoArray[i].name), "_blank")
        }
    });

    //Call second API
    fetch(repoArray[i].languages_url)
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
    cardHeader.textContent = repoArray[i].name;
    cardText.innerHTML = "<h6>About:</h6>"+repoArray[i].description;
    cardSubtitle.innerHTML = "<br><h6>Code Breakdown</h6>";
    cardlinkDeployed.textContent = "Website";
    cardlinkGithub.textContent = "Github";

    cardImage.setAttribute("src", imageArray[i]);
    
    card.appendChild(cardHeader);
    card.appendChild(cardImage);
    card.appendChild(cardSubtitle);
    card.appendChild(cardText);
    card.appendChild(cardlinkDeployed);
    card.appendChild(cardlinkGithub);
} 
}

getApi();