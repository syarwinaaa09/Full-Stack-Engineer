// Current temperature in kelvin degrees.
const kelvin = 0;
// Converting kelvin to celsius.
const celsius = kelvin - 273;
// Convert celsius to farenheit.
let farenheit = celsius * (9/5) + 32;
// Round down farenheit variable.
farenheit = Math.floor(farenheit);
console.log(`The temperature is ${farenheit} degrees Farenheit.`);

let newton = celsius * (33/100);
newton = Math.floor(newton);
console.log(`The temperature in ${newton} degrees Newton.`);