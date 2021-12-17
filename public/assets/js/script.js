//page element vriables
const projectDisplay = document.getElementById("projects");
const personalInfo = document.getElementById("info");
const selectedEmailSubject = document.getElementById("select");

//form variables
const form = document.getElementById('contactForm');
const username = document.getElementById('yourName');
const email = document.getElementById('yourEmail');
const subject = document.getElementById('select');
const message = document.getElementById('message');

const submitData = form.addEventListener('submit', async (event) => {
  event.preventDefault();
  let data = {
    name: username.value,
    email: email.value,
    subject: subject.value,
    message: message.value
  }

  fetch('/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(data => {
    console.log('Sent:', data);
    appendData("Email sent");
  })
  .catch((error => {
    console.error("Error:", error)
    appendData("Email failed");
  }));

  function appendData(message) {
    let alertmes = document.createElement('p');
  alertmes.style.position = "center";
  form.appendChild(alertmes);
  //Show sent message after 1 second wait
  setTimeout(function() {
    alertmes.textContent = message; 
}, 500);

//Hide message after 3 seconds
setTimeout(function() {
  alertmes.style.display = "none"; 
}, 3000);
  }
});

const imageArray = 
["./assets/images/cryptoworld.WebP",
  "./assets/images/flicked.WebP",
"./assets/images/password-generator.WebP",
"./assets/images/portfolio-web.WebP",
"./assets/images/product-generator.WebP",
"./assets/images/horiseon-refactor2.WebP",
"./assets/images/vehicle.WebP",
"./assets/images/weather-api-app.WebP",
"./assets/images/work-day-scheduler.gif",

];

const projectNames = 
["Flicked-Movie-Scheduler",
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

        console.log(repoArray);
        projectGen(repoArray)
      });
}

function projectGen(repoArray) {
    
    for (let k = 0; k < repoArray.length; k++) {

    const cardArea = document.createElement("div");
    cardArea.classList.add("col-sm-12", "col-md-6", "col-lg-4", "cardArea",);  

    //card
    const card = document.createElement("div");
    card.classList.add("projectCard","p-1");
    
    cardArea.appendChild(card);
    projectDisplay.appendChild(cardArea);

    //overlay
    const overlay = document.createElement('div');
    overlay.classList.add("overlay");

    //header
    const cardHeader = document.createElement("h2");

    //subtitle
    const cardSubtitle = document.createElement("div");

    //image
    const cardImage = document.createElement("img");
    cardImage.classList.add("cardImage", "w-100");

    //text
    const cardText = document.createElement("p");
    cardText.classList.add("cardText");

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
      //Change links to corresponding websites if not github pages
      if (k === 1) {
        window.open('https://flick3d.herokuapp.com/' , "_blank")
      } else if (k === 3) {
        window.open('https://zachobbawebdev.herokuapp.com/' , "_blank")
        } else if (k === 6) {
        window.open('https://adrift-dev.itch.io/random-vehicle-generator-2' , "_blank")
        } else if (k !== 1 && k !== 3 && k !== 6) {
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

        let row = document.createElement('div');
        let container = document.createElement('div');

        row.appendChild(container);
        cardSubtitle.appendChild(row);

        for(const [key,value] of Object.entries(data)) {
            let bar = document.createElement('div');
            bar.classList.add(`${key}`)
            bar.style.width = `${(value/total)*100}%`;
            bar.textContent = (key +" " + ((value/total)*100).toFixed(0)+ "%");
            container.appendChild(bar);
        }
      });

    //assign data elements
    cardHeader.textContent = repoArray[k].name.replace(/-/g, " "); //need to use global replace as local replace only gets first instance of -
    cardText.innerHTML = "<h6>About:</h6>"+repoArray[k].description;
    cardlinkDeployed.textContent = "Website";
    cardlinkGithub.textContent = "Github";

    cardImage.setAttribute("src", imageArray[k]);
    
    card.appendChild(overlay);

    overlay.appendChild(cardHeader);
    card.appendChild(cardImage);
    overlay.appendChild(cardSubtitle);
    overlay.appendChild(cardText);
    overlay.appendChild(cardlinkDeployed);
    overlay.appendChild(cardlinkGithub);
} 
}

getApi();