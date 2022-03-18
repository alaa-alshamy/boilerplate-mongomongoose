const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});
const Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const alaa = new Person({
    name: 'Alaa',
    age: 27,
    favoriteFoods: [
      'Chicken',
      'Hamburger'
    ]
  });
  alaa.save(done);
  // done(null /*, data*/);
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, done);
  // done(null /*, data*/);
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, done);
  // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, done);
  // done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  Person.findById(personId, done);
  // done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  findPersonById(personId, function(err, data) {
    data.favoriteFoods.push(foodToAdd);
    data.save(done);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true }, done);

  // done(null /*, data*/);
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, done);
  // done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, done);
  // done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
    .find({ favoriteFoods: foodToSearch })
    .sort('name')
    .limit(2)
    .select('-age')
    .exec(done);

  // done(null /*, data*/);
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
