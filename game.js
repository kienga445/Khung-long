minHeight=20;
maxHeight=100;
minWidth=10;
maxWidth=20;
minGap=200;
maxGap=500;
gap=randGap();


var myObstacles=[];
var colors=["black","red","blue","green","yellow","gray","indigo","Chocolate","brown","pink",];
var audio = document.getElementById("audio");
var audio1 = document.getElementById("audio1");
var audio2 = document.getElementById("audio2");


function startGame() {

	gamearea.start();
}

function everyinterval(n){
	if(gamearea.frame%n==0) return true;
	return false;
}
function jump(){
	player.speedY=-2;
	audio.play();


}

function randGap(){
	return Math.floor(minGap+Math.random()*(maxGap-minGap+1));
}
var scoreText={
	x:900,
	y:50,
	update:function(text){
		gamearea.context.fillStyle="gray";
		gamearea.context.font="30px Consolas";
		gamearea.context.fillText(text,this.x,this.y);
	}
}
var canvas = document.getElementById('myCanvas1');
var context = canvas.getContext('2d');
 
context.beginPath();
context.moveTo(0, 0);     
context.lineTo(10000,0);    
context.lineWidth = 20;     
context.strokeStyle = 'grey';
context.lineCap = 'butt';
context.stroke();           

var player={
	x:20,
	y:470,
	speedY:0,
	update:function(){
		// gamearea.context.fillStyle="0CyRWeqs_400x400copy.png";
		// gamearea.context.fillRect(this.x,this.y,40,40);
		var img = document.getElementById("dino");
		gamearea.context.drawImage(img, this.x, this.y-15,50,50);

		
	},
	newPos:function(){
		if(this.y<280){
			this.speedY=2;
		}
		this.y=this.y+this.speedY;
		if(this.speedY==2 && this.y==470){
			this.speedY=0;
		}
	},
	crashWith:function(obs){
		if(this.x+30>obs.x && this.x<obs.x+obs.width && this.y+30>obs.y){
			return true;
		}
		return false;
    },

}
function obstacle(){
	this.height=Math.floor(minHeight+Math.random()*(maxHeight-minHeight+1));
	this.width=Math.floor(minWidth+Math.random()*(maxWidth-minWidth+1));
	this.x=1200;
	this.y=gamearea.canvas.height-this.height;
	this.index=Math.floor(Math.random()*colors.length);
	this.color=colors[this.index];
	this.draw=function(){
		var img = document.getElementById("cactus")
		gamearea.context.drawImage(img, this.x,this.y,this.width+5,this.height);
	}
	}

var gamearea={
	canvas:document.createElement("canvas"),

	start:function(){
		this.canvas.height=500;
		this.canvas.width=1200;
		document.body.insertBefore(this.canvas,document.body.childNodes[0]);
		this.context=this.canvas.getContext("2d");
		this.frame=0;
		this.score=0;
		scoreText.update("Score: 0");
		this.interval=setInterval(this.updateGameArea,5);
		window.addEventListener("keyup",jump);
	},
	

	updateGameArea:function(){
		for(i=0;i<myObstacles.length;i++){
			if(player.crashWith(myObstacles[i])){

				gamearea.stop();
				audio2.pause();
				return;
			}
		}
		gamearea.clear();
		if(everyinterval(gap)){
			myObstacles.push(new obstacle());
			gap=randGap();
			gamearea.frame=0;
		}
		for(i=0;i<myObstacles.length;i++){
			myObstacles[i].x-=1;
			myObstacles[i].draw();
		}
		player.newPos();
		player.update();
		gamearea.frame+=1;
		gamearea.score+=0.01;
		scoreText.update("Score: "+Math.floor(gamearea.score));
		if(20<this.score){
			myObstacles[i].x-=10
		}
	},
	clear:function(){
		gamearea.context.clearRect(0,0,this.canvas.width,this.canvas.width);
	},
	stop:function(){
		audio1.play();
		clearInterval(this.interval);

	}

}

