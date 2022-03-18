//Variables
const char1Article = document.querySelector("#char1");
const char2Article = document.querySelector("#char2");


//Charatcer Class
class Charatcter {
  constructor(name, gender, height, mass, hairColor, pictureURL) {
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.pictureURL = pictureURL;
  }

  compareWeight(otherChar) {
    if (this.mass > otherChar.mass) {
      return `${this.name}´s mass is ${this.mass - otherChar.mass} kg more than ${otherChar.name}'s mass`;
    } else if (this.mass < otherChar.mass) {
      return `${this.name}´s mass is ${otherChar.mass - this.mass} kg less than ${otherChar.name}'s mass`;
    } else {
      return `${this.name} and ${otherChar.name} both have a mass of ${this.mass}`;
    }
  }

  compareHeight(otherChar) {
    if (this.height > otherChar.height) {
      return `${this.name} is ${this.height - otherChar.height} cm taller than ${otherChar.name}`;
    } else if (this.height < otherChar.height) {
      return `${this.name} is ${otherChar.height - this.height} cm shorter than ${otherChar.name}`;
    } else {
      return `${this.name} and ${otherChar.name} are the same height`
    }
  }

  compareHairColor(otherChar) {
    if (this.hairColor == otherChar.hairColor) {
      //Check if haircolor is n/a
      if (this.hairColor == "n/a") {
        return `Neither ${this.name} nor ${otherChar.name} has a haircolor`
      }
      return `${this.name} and ${otherChar.name} both have the haircolor ${this.hairColor}`;
    } else {
      return `${this.name} and ${otherChar.name} do not have the same haircolor`
    }
  }

  compareGender(otherChar) {
    if (this.gender == otherChar.gender) {
      //Check if gender is n/a
      if (this.gender == "n/a") {
        return `Neither ${this.name} nor ${otherChar.name} has a gender`
      }
      return `${this.name} and  ${otherChar.name} are both of the gender ${this.gender}`
    } else {
      return `${this.name} and ${otherChar.name} have different genders`;
    }
  }
 }

 //Images 
 const images = [
   {
     id: 1,
     img: "https://upload.wikimedia.org/wikipedia/en/9/9b/Luke_Skywalker.png",
   },
   {
    id: 2,
    img: "https://upload.wikimedia.org/wikipedia/en/5/5c/C-3PO_droid.png",
  },
  {
    id: 3,
    img: "https://upload.wikimedia.org/wikipedia/en/3/39/R2-D2_Droid.png",
  },
  {
    id: 4,
    img: "https://static.tvtropes.org/pmwiki/pub/images/vader_photo.png",
  },
  {
    id: 5,
    img: "https://upload.wikimedia.org/wikipedia/en/1/1b/Princess_Leia%27s_characteristic_hairstyle.jpg",
  },
  {
    id: 10,
    img: "https://upload.wikimedia.org/wikipedia/en/3/32/Ben_Kenobi.png",
  },
  {
    id: 11,
    img: "https://heroandvillainstyle.com/wp-content/uploads/2020/05/anakin-skywalker-hair-padawan-braid-e1589157322860.jpg",
  },
  {
    id: 13,
    img: "https://external-preview.redd.it/h1RdP1qkgBedXlLePxBH6Ui52goXTf5ob1turnI5RdQ.jpg?auto=webp&s=66d1a45301e8fbc09027ddd62a1b9a64561d491a",
  }
 ];


//Get data function
const fetchData = async (url) => {
  const respone = await fetch(url);
  const json = await respone.json();
  return json;
}

//Get picture
const getPicture = (id) => {
  let img = "";
  images.forEach(obj => {
    if (id == obj.id) {
      img = obj.img;
    }
  })
  return img;
}

//Update textbox text
const updateTextbox = (textbox, text) => {
    textbox.innerHTML = "";
    const p = document.createElement("p");
    p.innerText = text;
    textbox.appendChild(p);
}

//Render character
const renderCharacter = (char, article, otherChar) => {

  //Render image and name
  const img = document.createElement("img");
  img.src = char.pictureURL;
  const name = document.createElement("h2");
  name.innerText = char.name;
  article.appendChild(name);
  article.appendChild(img);

  //Render buttons
  const buttonDiv = document.createElement("div");

  const compareWeightBtn = document.createElement("button");
  compareWeightBtn.innerText = "Compare Weigth";
  const compareHeightBtn = document.createElement("button");
  compareHeightBtn.innerText = "Compare Heigth";
  const compareHairBtn = document.createElement("button");
  compareHairBtn.innerText = "Compare Haircolor";
  const compareGenderBtn = document.createElement("button");
  compareGenderBtn.innerText = "Compare Gender";

  buttonDiv.appendChild(compareWeightBtn);
  buttonDiv.appendChild(compareHeightBtn);
  buttonDiv.appendChild(compareHairBtn);
  buttonDiv.appendChild(compareGenderBtn);

  article.appendChild(buttonDiv);
  
  //Render textbox
  const textbox = document.createElement("div");
  article.appendChild(textbox);

  //Button Eventlisteners
  compareWeightBtn.addEventListener("click", () => {
    updateTextbox(textbox, char.compareWeight(otherChar));
  });

  compareHeightBtn.addEventListener("click", () => {
    updateTextbox(textbox, char.compareHeight(otherChar));
  });

  compareHairBtn.addEventListener("click", () => {
    updateTextbox(textbox, char.compareHairColor(otherChar));
  });

  compareGenderBtn.addEventListener("click", () => {
    updateTextbox(textbox, char.compareGender(otherChar));
  })
}


//Get Characters Button
document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  //Clear articles
  char1Article.innerHTML = "";
  char2Article.innerHTML = "";

  //Get and compare input values
  const char1Id = document.querySelector("#pickChar1").value;
  const char2Id = document.querySelector("#pickChar2").value;
  if(char1Id === char2Id) {
    alert("Please pick two diffrent characters!");
    return;
  };
  
  //Get pictures
  const picture1 = getPicture(char1Id);
  const picture2 = getPicture(char2Id);
  
  //Get data
  const char1Data = await fetchData(`https://swapi.dev/api/people/${char1Id}/`);
  const char2Data = await fetchData(`https://swapi.dev/api/people/${char2Id}/`);

  //Create character objects
  const char1 = new Charatcter(char1Data.name, char1Data.gender, parseInt(char1Data.height), parseInt(char1Data.mass),
    char1Data.hair_color, picture1);
  const char2 = new Charatcter(char2Data.name, char2Data.gender, parseInt(char2Data.height), parseInt(char2Data.mass),
    char2Data.hair_color, picture2);
  
  //Render characters
  renderCharacter(char1, char1Article, char2);
  renderCharacter(char2, char2Article, char1);
  
})