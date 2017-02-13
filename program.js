// NOTATION : Fichier à supprimer , et il y en a pas mal d'autres ...
'use strict'; // va s'arrêter si une variable est indéfinie
/*** Exo 1 ***/
/*
var user = process.argv[2];
//console.log(`Hello, ${name},
//Your name lowercased is '${name.toLowerCase()}'`);
var message = `Hello ${user}`;
console.log(message);
/*** Fin Exo 1 ***/

/*** Exo 2 ***/
/*
class Person {
    constructor(name) {
      this.name = name;
    }
    getName() {
      return this.name;
    }
    setName(name) {
      this.name = name;
    }
}

var alice = new Person("alice");
alice.getName(); // alic
alice.setName('bob');
alice.getName(); // bob

/*** Fin Exo 2 ***/

/*** Exo 3 ***/
/*
class Character {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.health_ = 100;
    }
    damage() {
      this.health_ = this.health_ - 10;
    }
    getHealth() {
      return this.health_;
    }
    toString() {
      return "x: " + this.x + " y: " + this.y + " health: " + this.getHealth();
    }
}

class Player extends Character{
    constructor(x, y, name) {
        super(x, y);
        this.name = name;
    }
    move(dx, dy){
      this.x += dx;
      this.y += dy;
    }
    toString(){
      return "name: " + this.name + " " + super.toString();
    }
}

var x = process.argv[2];
var y = process.argv[3];
var name = process.argv[4];
var character = new Character(+x, +y);
character.damage();
console.log(character.toString());
var player = new Player(+x, +y, name);
player.damage();
player.move(7, 8);
console.log(player.toString());
/*** Fin Exo 3 ***/

/*** Exo 4 ***/
/* $ babel-node program.js 16 9 */
/*
    var arg1 = process.argv[2];
    var arg2 = process.argv[3];
    import {PI} from './Maths';
    import {sqrt} from './Maths';
    import {square} from './Maths';

    console.log(PI);
    console.log(sqrt(+arg1));
    console.log(square(+arg2));
/*** Fin Exo 4 ***/

/*** Exo 5 ***/

/*** Fin Exo 5 ***/

/*** Exo 6 ***/

/*** Fin Exo 6 ***/

/*** Exo 5 ***/
