const team = {
    _players: [],
    _games: [],
    get players() {
        return this._players;
    },
    get games() {
        return this._games;
    },
    addPlayer(newFirstName, newLastName, newAge) {
        let player = {
            firstName: newFirstName,
            lastName: newLastName,
            age: newAge
        };
        this._players.push(player);
    },
    addGame(newOpponent, newTeamPoints, newOpponentPoints) {
        let game = {
            opponent: newOpponent,
            teamPoints: newTeamPoints,
            opponentPoints: newOpponentPoints
        };
        this._games.push(game);
    }
};

team._players = [
    {firstName: 'Michael', lastName: 'Jordan', age: 57},
    {firstName: 'Lebron', lastName: 'James', age: 37},
    {firstName: 'Kobe', lastName: 'Bryant', age: 41}
];

team._games = [
    {opponent: 'Bulls', teamPoints: 110, opponentPoints: 106},
    {opponent: 'Cavaliers', teamPoints: 98, opponentPoints: 96},
    {opponent: 'Lakers', teamPoints: 89, opponentPoints: 85}
];

console.log(team.players); // Output the players
console.log(team.games); // Output the games

team.addPlayer('Bugs','Bunny',76);
console.log(team.players); // Output the players after adding new player

team.addGame('Titans',100,98);
console.log(team.games); // Output the games after adding new game
