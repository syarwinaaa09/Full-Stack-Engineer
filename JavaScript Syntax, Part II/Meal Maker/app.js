let menu = {
    _meal: '',
    _price: 0,
    set meal(mealToCheck) {
        if (typeof mealToCheck === 'string') {
            this._meal = mealToCheck;
        }
    },
    set price(priceToCheck) {
        if (typeof priceToCheck === 'number') {
            this._price = priceToCheck;
        }
    },
    get todaysSpecial() {
        if (this._meal && this._price) {
            return `Today's Special is ${this._meal} for $${this._price}!`;
        } else {
            return 'Meal or price was not set correctly!';
        }
    }
}

menu._meal = 7;
menu._price = 'five dollars';
console.log(menu); // { _meal: 7, _price: 'five dollars' }

menu.meal = 'Spaghetti';
menu.price = 5;
console.log(menu); // { _meal: 'Spaghetti', _price: 5 }

console.log(menu.todaysSpecial); // "Today's Special is Spaghetti for $5!"
