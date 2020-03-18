var snake;
var canvas, context;

function firstLaunch(){
	
	 startStopSelect();
	 document.getElementById("startStop").onclick = startStopSelect;
		
	canvas = document.getElementById("canv");
	context = canvas.getContext("2d");
	snake = new component(15, 15, "red", 100, 100);
}

var imgData = context.getImageData(10, 10, 50, 50);
	
function component(width, height, color, x, y, type) {
	
		this.type = type;
		this.width = width;
		this.height = height;
		this.direction = 1;
		this.speed = 1;
		this.angle = 0;
		this.moveAngle = 0;
		this.x = x;
		this.y = y;
		this.update = function(){
			var image;
			switch(this.direction){
				
				case 1: this.x += this.speed;  // Right
				image = context.getImageData(this.x+this.width, this.y, 1, 1);
				break;
				
				case 2: this.y += this.speed;  // Down
				image = context.getImageData(this.x, this.y+this.height, 1, 1);
				break;
				
				case 3: this.x -= this.speed;  // Left
				image = context.getImageData(this.x, this.y, 1, 1);
				break;
				
				case 4: this.y -= this.speed;  // Up
				image = context.getImageData(this.x, this.y, 1, 1);
				break;
				
				default: console.log("Error: invalid direction"); break;
			}
			
			if(document.getElementById("startStop").value == "Start"){
				this.speed = 0;
			}
			else{
				this.speed = 1;
			}
			
			
			if(this.x > 700 || this.x < 0 || this.y > 1500 || this.y < 0 || image.data[0] == 255) {
				this.speed = 0;
				alert("GAME OVER");
				
			}
			else{
				context.fillStyle = color;
				context.rect(this.x, this.y, this.width, this.height);
				context.fill();

			}
			
		}
		
}

function updateCanvas(){
		snake.update();
}

function goLeft(){
		snake.direction -= 1;
		if(snake.direction < 1) snake.direction = 4;
}

function goRight(){
		snake.direction += 1;
		if(snake.direction > 4) snake.direction = 1;
}

function startStopSelect(){
	
	if(document.getElementById("startStop").value == "Start"){
		document.getElementById("startStop").value="Stop";
		interval = setInterval(updateCanvas, 20);
	}
	else{
		clearInterval(interval);
		document.getElementById("startStop").value="Start";
	}
	
}

