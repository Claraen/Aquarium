animalPopulation = 0;
var animalList = [];
var zoeBot = 0;
var id = 0;
$(document).ready(function () {
  //alert("hi")
  var flipper = new Dolphin("Flipper", id);
  id++;
  var it = new Clownfish("It", id);
  id++
  var aqua = new Otter("Aqua", id);
  id++
  var toothy = new Shark("Toothy", id);
  id++
  var wiggins = new Walrus("Wiggins", id);
  id++
  listAll();
  renameList();
  relocateList();
  zoeBot = new Zookeeper("ZoeBot");
});

function addThisAnimal() {
  var type = parseInt($("#animalType").val());
  var name = $("#animalName").val();
  var animal;
  var nextID = id;
  switch (type) {
    case 0:
      animal = new Dolphin(name, nextID);
      break;
    case 1:
      animal = new Trout(name, nextID);
      break;
    case 2:
      animal = new Clounfish(name, nextID);
      break;
    case 3:
      animal = new Otter(name, nextID);
      break;
    case 4:
      animal = new Seaturtle(name, nextID);
      break;
    case 5:
      animal = new Shark(name, nextID);
      break;
    case 6:
      animal = new Whale(name, nextID);
      break;
    case 7:
      animal = new Seahorse(name, nextID);
      break;
    case 8:
      animal = new Walrus(name, nextID);
      break;
    case 9:
      animal = new Narwhal(name, nextID);
      break;
  }
  id++;
  renameList();
  relocateList();
  listAll();
}

function relocateList() {
  var newList = "";
  for (var i = 0; i < animalList.length; i++) {
    if (animalList[i] != undefined) {
      newList += "<option value='" + animalList[i].id + "' >" + animalList[i].name + "</option>"
    }
  }
  document.getElementById("animalList").innerHTML = newList;
}

function ethicallyRelocate() {
  var removeAnimal = parseInt($("#animalList").val());
  for (var i = 0; i < animalList.length; i++) {
    if (animalList[i] != undefined) {
      var animRem = animalList[i].id;
      if (animRem == removeAnimal) {
        break;
      }
    }
  }
  animalList[i] = undefined;
  listAll();
}

function listAll() {
  $("#list").html("");
  var list = "";
  for (var i = 0; i < animalList.length; i++) {
    if (animalList[i] != undefined) {
      list += animalList[i].name + ", a " + animalList[i].constructor.name + " whose favorite food is " + animalList[i].favoriteFood + " " + "<br>";
    }
  }
  $("#animList").html(list);
  relocateList();
  renameList();
}

function feed() {
  document.getElementById("whatHappens").innerHTML='';
  var type = parseInt($("#foodType").val());
  switch (type) {
    case 0:
      zoeBot.feedAnimals(animalList, "fish");
      break;
    case 1:
      zoeBot.feedAnimals(animalList, "insects");
      break;
    case 2:
      zoeBot.feedAnimals(animalList, "crabs");
      break;
    case 3:
      zoeBot.feedAnimals(animalList, "algae");
      break;
    case 4:
      zoeBot.feedAnimals(animalList, "humans");
      break;
    case 5:
      zoeBot.feedAnimals(animalList, "krill");
      break;
    case 6:
      zoeBot.feedAnimals(animalList, "shrimps");
      break;
    case 7:
      zoeBot.feedAnimals(animalList, "clams");
      break;
    case 8:
      zoeBot.feedAnimals(animalList, "squid");
      break;
  }
}

function renameList() {
  var newList = "";
  for (var i = 0; i < animalList.length; i++) {
    if (animalList[i] != undefined) {
      newList += "<option val='" + animalList[i].id + "' >" + animalList[i].name + "</option>"
    }
  }
  document.getElementById("oldName").innerHTML = newList;
}

function rename() {
  var oldName = $("#oldName").val();
  var newName = $("#newName").val();
  for (var i = 0; i < animalList.length; i++) {
    if (animalList[i] != undefined) {
      if (animalList[i].name == oldName) {
        break
      }
    }
  }
  console.log(i);
  animalList[i].name = newName;
  listAll();
}

class Zookeeper {
  constructor(name) {
    this.name = name;
  }
  feedAnimals(arrAnim, strFood) {
    for (var i = 0; i < animalList.length; i++) {
      if (animalList[i] != undefined) {
        document.getElementById("whatHappens").innerHTML += this.name + ' is feeding ' + strFood + ' to ' + arrAnim[i].name + ". "//', who lives with ' + (Animal.getPopulation() - 1) + ' other animal(s). '
          ;
        arrAnim[i].eat(strFood);
        ;
      }
    }
  }
}

class Animal {
  constructor(name, favoriteFood, id) {
    this.name = name;
    this.favoriteFood = favoriteFood;
    this.id = id;
    animalPopulation++;
    animalList.push(this);
  }

  sleep() {
    document.getElementById("whatHappens").innerHTML += this.name + " sleeps for 8 hours" + "<br>"
  }

  eat(food) {
    document.getElementById("whatHappens").innerHTML += this.name + ' eats ' + food + ". " + '<br>'
    if (food == this.favoriteFood) {
      document.getElementById("whatHappens").innerHTML += "Yum!!! " + this.name + " wants more " + food + ". " + "<br>"
    } else {
      this.sleep();
    }
  }
  static getPopulation() {
    return animalPopulation;
  }
}

class Dolphin extends Animal {
  constructor(name, id) {
    super(name, 'fish', id);
  }
}

class Otter extends Animal {
  constructor(name) {
    super(name, 'clams', id);
  }
}

class Shark extends Animal {
  constructor(name) {
    super(name, 'humans', id);
  }
}

class Narwhal extends Animal {
  constructor(name) {
    super(name, 'fish', id);
  }
}

class Walrus extends Animal {
  constructor(name) {
    super(name, 'fish', id);
  }
  sleep() {
    document.getElementById("whatHappens").innerHTML += this.name + ' sleeps for 20 hours ' + "<br>"
  }
}

class Seahorse extends Animal {
  constructor(name) {
    super(name, 'Shrimp', id);
  }
  eat(food) {
    if (food == this.favoriteFood) {
      super.eat('Shrimp');
      super.sleep();
    } else {
      document.getElementById("whatHappens").innerHTML += 'Yuck!!! ' + this.name + ' will not eat ' + food + "<br>";
    }
  }
  sleep() {
    document.getElementById("whatHappens").innerHTML += this.name + ' never sleeps'
  }
}

class Whale extends Animal {
  constructor(name) {
    super(name, 'krill', id);
  }
  eat(food) {
    if (food == this.favoriteFood) {
      super.eat('krill');
    } else {
      document.getElementById("whatHappens").innerHTML += 'Yuck!!! ' + this.name + ' will not eat ' + food + "<br>";
    }
  }
}

class Seaturtle extends Animal {
  constructor(name) {
    super(name, 'clams', id);
  }
  eat(food) {
    if (food == this.favoriteFood) {
      super.eat('krill');
    } else {
      document.getElementById("whatHappens").innerHTML += 'Yuck!!! ' + this.name + ' will not eat ' + food + ". <br>";
    }
  }
}

class Clownfish extends Animal {
  constructor(name) {
    super(name, 'algae', id);
  }
  eat(food) {
    if (food == this.favoriteFood) {
      super.eat('krill');
    } else {
      document.getElementById("whatHappens").innerHTML += 'Yuck!!! ' + this.name + ' will not eat ' + food + ". <br>";
    }
  }
}

class Trout extends Animal {
  constructor(name) {
    super(name, 'insects', id);
  }
  eat(food) {
    if (food == this.favoriteFood) {
      super.eat('krill');
    } else {
      document.getElementById("whatHappens").innerHTML += 'Yuck!!! ' + this.name + ' will not eat ' + food + "<br>";
    }
  }
}
