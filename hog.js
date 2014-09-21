var p0 = {
        score: 0
    },
    p1 = {
        score: 0
    };

var GOAL_SCORE = 100;

var six_sided = function() {
    return Math.floor(Math.random() * 6 + 1);
}

var four_sided = function() {
    return Math.floor(Math.random() * 4 + 1);
}

function roll_dice(rolls, dice) {
    var diceSum = 0;
    for (var i = 0; i < rolls; i++) {
        var outcome = dice();
        if (outcome == 1)
            return 1;
        diceSum += outcome;
    }
    return diceSum;
}

function take_turn(rolls, opponent_score, dice) {
    //Free BAKUNNN! :D
    if (rolls == 0) {
        return Math.abs(Math.floor(opponent_score / 10) - opponent_score % 10) + 1;
    }

    //YUNO FREE BAKUN.
    return roll_dice(rolls, dice);
}

function select_dice(off_score, def_score) {
    if ((off_score + def_score) % 7 === 0) {
        return four_sided;
    }
    return six_sided;
}

function bid_for_start(bid0, bid1) {
    if (bid0 === bid1)
        return [GOAL_SCORE, GOAL_SCORE, 0];
    if (bid0 === bid1 + 5)
        return [10, 0, 0];
    if (bid1 === bid0 + 5)
        return [0, 10, 1];
    if (bid0 > bid1)
        return [bid1, bid0, 0];
    if (bid1 > bid0)
        return [bid1, bid0, 1];
}

function play(strat0, strat1) {
    var who = 0;
    p0.strat = strat0;
    p1.strat = strat1;
    while (p0.score < 100 && p1.score < 100) {
        //Define "offensive" player and "defensive" player here
        var off, def;
        if (who === 0) {
            off = p0;
            def = p1;
        } else {
            off = p1;
            def = p0;
        }

        var dice = select_dice(p0.score, p1.score);
        var score = take_turn(off.strat(off.score, def.score), def.score, dice);
        off.score += score;

        //Swine swap :D
        if (off.score === def.score * 2 || def.score === off.score * 2) {
            off.score = def.score + off.score;
            def.score = off.score - def.score;
            off.score = off.score - def.score;
        }

        //console.log(who, p0.score, p1.score);

        //Pass off turn
        who = 1 - who;
    }
    return [p0.score, p1.score];
}

function resetGame() {
    p0 = {
        score: 0
    };
    p1 = {
        score: 0
    };
}