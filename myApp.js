require('dotenv').config();
var mongoose = require('mongoose');
const mySecret = process.env['MONGO_URI']
console.log(mySecret);
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

let personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number
    },
    favoriteFoods: { type: [String] }
})



let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
    let doc = new Person({
        name: 'John',
        age: 19,
        favoriteFoods: ["Burger", 'Ice Cream']

    })
    doc.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    })

};
let arrayOfPeople = [{ name: "James", age: 49, favoriteFoods: ['noodles', 'cherry'] }, { name: 'Jeremy', age: 60, favoriteFoods: ['chicken', 'curry'] }, { name: 'Richard', age: 50, favoriteFoods: ['hot dog', 'bread'] }]
const createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, people) => {
        if (err) return console.log(err);
        done(null, people);
    });

};
let personName = 'John'
const findPeopleByName = (personName, done) => {
    Person.find({ name: personName }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });

};
let food = ['chicken']
const findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });

};

const findPersonById = (personId, done) => {
    Person.findById({ _id: personId }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    });
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById({ _id: personId }, (err, data) => {
        if (err) return console.log(err);
        data.favoriteFoods.push(foodToAdd);
        data.save((err, data) => {
            if (err) return console.log(err);
            done(null, data);
        })
    });
};


const findAndUpdate = (personName, done) => {
    const ageToSet = 20;
    Person.findOneAndUpdate({ name: personName }, {age:ageToSet}, { new: true },(err,data)=>{
        if(err) return console.log(err);
        done(null, data);
    });
}

const removeById = (personId, done) => {
    Person.findByIdAndRemove({ _id: personId }, (err, data) => {
        if (err) return console.log(err);
        done(null, data);
    })
};

const removeManyPeople = (done) => {
    const nameToRemove = "Mary";
    Person.remove({name:nameToRemove},(err,data)=>{
        if(err) return console.log(err);
        done(null, data);
    });
    
};

const queryChain = (done) => {
    const foodToSearch = "burrito";

    done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
