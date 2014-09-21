function Game(s0, s1, p){
	this.p0={score:s0};
	this.p1={score:s1};
	this.who = p;
	
	this.doTurn = function(rolls){
		//Define "offensive" player and "defensive" player here
		var off,def;
		if(this.who === 0){
			off = this.p0;
			def = this.p1;
		}else{
			off = this.p1;
			def = this.p0;
		}
		
		var dice = this.select_dice(off.score, def.score);
		var score = this.take_turn(rolls, def.score, dice);
		off.score += score;
		
		//Swine swap :D
		if(off.score === def.score * 2 || def.score === off.score * 2){
			off.score = def.score + off.score;
			def.score = off.score - def.score;
			off.score = off.score - def.score;
		}
		
		//Pass off turn
		this.who = 1-this.who;
	};
}


Game.prototype.six_sided = function(){return Math.floor(Math.random()*6+1);}
Game.prototype.four_sided = function(){return Math.floor(Math.random()*4+1);} 
Game.prototype.roll_dice = function(rolls, dice){
	var diceSum = 0;
	for(var i=0; i<rolls; i++){
		var outcome = dice();
		if(outcome == 1)
			return 1;
		diceSum += outcome;
	}
	return diceSum;
}
Game.prototype.take_turn = function(rolls, opponent_score, dice){
	//Free BAKUNNN! :D
	if(rolls==0){
		return Math.abs(Math.floor(opponent_score/10) - opponent_score%10) + 1;
	}
	
	//YUNO FREE BAKUN.
	return this.roll_dice(rolls, dice);
}
Game.prototype.select_dice = function(off_score, def_score){
	if((off_score + def_score) % 7 === 0){
		return this.four_sided;
	}
	return this.six_sided;
}