class Target {
	constructor(context){
		this.ctx = context;
		this.x = this.ctx.canvas.clientWidth / 2;
		this.y = this.ctx.canvas.clientHeight / 2;
		this.r = 25;
	}

	draw(){
		this.ctx.beginPath();
			this.ctx.moveTo(this.x, this.y-this.r);
			this.ctx.lineTo(this.x, this.y+this.r);
			this.ctx.moveTo(this.x-this.r, this.y);
			this.ctx.lineTo(this.x+this.r, this.y);
			this.ctx.strokeStyle = "#ff0000";
			this.ctx.stroke();
		this.ctx.closePath();
		
		this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, 0.3*this.r,0,2*Math.PI);
			this.ctx.strokeStyle = "#ff0000";
			this.ctx.stroke();
		this.ctx.closePath();
		
		this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, 0.6*this.r,0,2*Math.PI);
			this.ctx.strokeStyle = "#ff0000";
			this.ctx.stroke();
		this.ctx.closePath();
		
		this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, 0.9*this.r,0,2*Math.PI);
			this.ctx.strokeStyle = "#ff0000";
			this.ctx.stroke();
		this.ctx.closePath();
	}
	re(){
		this.x = 
			Math.random()*(
				this.ctx.canvas.clientWidth - 250) + 200;
		this.y = 
			Math.random()*(
				this.ctx.canvas.clientHeight - 250) + 50;
	}
}