//page element vriables
const projectDisplay = document.getElementById("projects");
const personalInfo = document.getElementById("info");

const imageArray = ["./images/brandable-box-yiU8G1K85AM-unsplash.jpg","./images/brandable-box-yiU8G1K85AM-unsplash.jpg"];

function getApi() {
    var requestUrl = 'https://api.github.com/users/HobbaZ/repos';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const repoArray = [data[1], data[7], data[10], data[11], data[14], data[15], data[16], data[17]];
        console.log(repoArray);
        projectGen(repoArray)
      });
}

function projectGen(repoArray) {
    
    for (let i = 0; i < repoArray.length; i++) {

    //card
    const card = document.createElement("div");
    card.classList.add("projectCard","col-sm-12", "col-md-6", "col-lg", "px-1", "m-1");
    //header
    const cardHeader = document.createElement("h2");

    //subtitle
    const cardSubtitle = document.createElement("h6");

    //image
    const cardImage = document.createElement("img");
    cardImage.classList.add("cardImage", "w-100");

    //text
    const cardText = document.createElement("p");

    //githublink
    const cardlinkGithub = document.createElement("button");
    cardlinkGithub.classList.add("btn", "btn-primary", "w-100");
    const githubLink = document.createElement("a");
    githubLink.href = repoArray[i].html_url;
    cardlinkGithub.appendChild(githubLink);

    //deployment link
    const cardlinkDeployed = document.createElement("button");
    cardlinkDeployed.classList.add("btn", "btn-primary", "w-100");
    const deployedLink = document.createElement("a");
    deployedLink.href = repoArray[i].html_url;
    cardlinkDeployed.appendChild(deployedLink);

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
    cardText.innerHTML = "<hr><h5>About:</h5>"+repoArray[i].description;
    cardSubtitle.innerHTML = "Code Breakdown<hr>";
    cardlinkDeployed.textContent = "Website";
    cardlinkGithub.textContent = "Github";

    cardImage.setAttribute("src", imageArray[i]);
    
    card.appendChild(cardHeader);
    card.appendChild(cardImage);
    card.appendChild(cardSubtitle);
    card.appendChild(cardText);
    card.appendChild(cardlinkDeployed);
    card.appendChild(cardlinkGithub);

    projectDisplay.appendChild(card);
} 

}

getApi();