const person = {
    name: 'jeam',
    walk() {
        console.log(this);
    }
};

person.walk();

const walk = person.walk();