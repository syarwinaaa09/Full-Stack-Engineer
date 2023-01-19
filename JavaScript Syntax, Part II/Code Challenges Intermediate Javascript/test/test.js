console.log = function() {}
const { expect} = require('chai')
const rewire = require('rewire');
var appModule = rewire("../main.js")

describe('', function () {
    it('', function () {
        let dogFactory
        try {
            dogFactory = appModule.__get__("dogFactory");
        } catch (e) {
            expect(e, 'Did you create dogFactory?\n').to.not.exist;
        }
        expect(dogFactory, "Did you create dogFactory as either a function expression or a function declaration?").to.be.an.instanceOf(Function);
        let testDog = dogFactory("Cody", "Yellow Lab", 70)
        expect(testDog, "Does your dogFactory function return an object?").to.be.an.instanceOf(Object);

        //test that they Did the _ thing:
        expect(testDog._name, "Did you make property names prepended with an _ and assign their value to the arguments passed in to the function?").to.equal("Cody")

        //test getters:
        expect(testDog.weight, "Did you add a getter methods for the your object's properties?").to.equal(70)

        //test setters:
        testDog.breed = "Pug"
        expect(testDog.breed, "Did you add a getter methods for the your object's properties?").to.equal("Pug")

        //test bark()
        expect(testDog.bark, "Did you create a `bark()` function as a property on your object?").to.be.an.instanceOf(Function);
        expect(testDog.bark(), "Does your bark function return 'ruff! ruff!'?").to.equal('ruff! ruff!');

        //test bark()
        expect(testDog.eatTooManyTreats, "Did you create a `eatTooManyTreats()` function as a property on your object?").to.be.an.instanceOf(Function);

        testDog.eatTooManyTreats();

        expect(testDog.weight, "Does your eatTooManyTreats increment `weight` by one?").to.equal(71);
    })
})