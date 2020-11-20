class Cannon {
	constructor (context, x=0, y=0){
		this.ctx = context;
		this.r = 50;
		this.x = x + 1.5*this.r;
		this.y = y + 2*this.r;
		this.angle = 0;

		this.maxStrength = 30;
		this.strength    = this.maxStrength / 2;
		this.ds          = .5;

		this.onAim  = false;
		this.onFire = false;

		this.ammo = {
			x: x + 5*this.r,
			y: y + this.r,
			r: 20,
			dx: 0,
			dy: 0,
			ddx: -.01,
			ddy: .35
		}

		window.addEventListener("mousemove", (ev) => {
			let a = ev.clientX - this.x,
				b = this.y - ev.clientY,
				c = Math.sqrt(a*a+b*b);
			this.angle = (ev.clientY > this.y)
				? Math.acos(a/c)
				: -Math.acos(a/c);
		})

		window.addEventListener("mousedown", (ev) => {
			if (this.onFire) return false;
			this.onAim = true;
		})

		window.addEventListener("mouseup", (ev) => {
			if (this.onFire) return false;
			this.onAim  = false;
			this.onFire = true;

			this.ammo.dx = this.strength * Math.cos(this.angle);
			this.ammo.dy = this.strength * Math.sin(this.angle);
		})
	}

	update(){
		this.ctx.clearRect(
			0,0,
			this.ctx.canvas.clientWidth, 
			this.ctx.canvas.clientHeight
		);

		if (this.onAim) {
			this.ds = (
					this.strength+this.ds > this.maxStrength ||
					this.strength+this.ds < 0
				)
				? this.ds * -1
				: this.ds;
			this.strength += this.ds;
		}

		if (this.onFire) {
			this.drawAmmo();
		}

		this.draw();
	}

	draw(){
		let acAngle = this.angle+Math.PI+1.0792,
			arcCenter = {
				x: Math.ceil(
					this.x + 
						Math.cos(acAngle)*this.r*Math.sqrt(1.25)
				)+1, 
				y: Math.floor(
					this.y + 
						Math.sin(acAngle)*this.r*Math.sqrt(1.25)
				)
			};
		let p1 = {
				x: this.x + Math.cos(this.angle)*(this.r/2), 
				y: this.y + Math.sin(this.angle)*(this.r/2)
			},
			p2 = {
				x: this.x + 
					Math.cos(this.angle-0.1422)*5*this.r*Math.sqrt(0.5), 
				y: this.y + 
					Math.sin(this.angle-0.1422)*5*this.r*Math.sqrt(0.5)
			},
			p3 = {
				x: this.x + 
					Math.cos(this.angle-0.4050)*this.r*Math.sqrt(14.5), 
				y: this.y + 
					Math.sin(this.angle-0.4050)*this.r*Math.sqrt(14.5)
			},
			p4 = {
				x: this.x + Math.cos(this.angle-1.3259)*this.r*Math.sqrt(4.25), 
				y: this.y + Math.sin(this.angle-1.3259)*this.r*Math.sqrt(4.25)
			},
			p5 = {
				x: this.x + Math.cos(this.angle-Math.PI+1.3259)*this.r*Math.sqrt(4.25),
				y: this.y + Math.sin(this.angle-Math.PI+1.3259)*this.r*Math.sqrt(4.25)
			};

		if (!this.onFire) {
			this.ammo.x = this.x + 
				Math.cos(this.angle-0.2784)*this.r*Math.sqrt(13.25);
			this.ammo.y = this.y +
				Math.sin(this.angle-0.2784)*this.r*Math.sqrt(13.25);
		}
		
		this.ctx.beginPath();
			this.ctx.arc(
				arcCenter.x, arcCenter.y, this.r, 
				1.5*Math.PI+this.angle, 0.5*Math.PI+this.angle, true);
			this.ctx.lineTo(p1.x, p1.y);
			this.ctx.lineTo(p2.x, p2.y);
			this.ctx.lineTo(p3.x, p3.y);
			this.ctx.lineTo(p4.x, p4.y);
			this.ctx.lineTo(p5.x, p5.y);
			this.ctx.fillStyle = "#FFE5A8";
			this.ctx.fill();
		this.ctx.closePath();
		
		this.ctx.beginPath();
			this.ctx.arc(this.x, this.y, this.r/2, 0, 2*Math.PI);
			this.ctx.fillStyle = "#BFBFBF";
			this.ctx.fill();
		this.ctx.closePath();

		let st = this.strength / this.maxStrength;
		this.ctx.beginPath();
			this.ctx.strokeStyle = "#000000";
			this.ctx.strokeRect(this.x-1,(this.y+50)-1,100+1,20+2);
		this.ctx.closePath();
		
		this.ctx.beginPath();
			this.ctx.fillStyle = "#00ff00";
			this.ctx.fillRect(this.x,(this.y+50),st*100,20);
		this.ctx.closePath();
	}

	drawAmmo(){
		if (this.ammo.y < 0) {
			this.ctx.beginPath();
				this.ctx.moveTo(this.ammo.x, 0);
				this.ctx.lineTo(this.ammo.x-10, 10);
				this.ctx.lineTo(this.ammo.x+10, 10);
				this.ctx.lineTo(this.ammo.x, 0);
				this.ctx.fillStyle = "#694B41";
				this.ctx.fill();
			this.ctx.closePath();
		}
		else {
			this.ctx.beginPath();
				this.ctx.arc(
					this.ammo.x, 
					this.ammo.y, 
					this.ammo.r, 
					0, 2*Math.PI,
					true);
				this.ctx.fillStyle = "#694B41";
				this.ctx.fill();
			this.ctx.closePath();
		}
		
		this.ammo.x += this.ammo.dx;
		this.ammo.y += this.ammo.dy;

		this.ammo.dx += this.ammo.ddx;
		this.ammo.dy += this.ammo.ddy;

		let OX = 
			(this.ammo.x > this.ctx.canvas.clientWidth) ||
			(this.ammo.x < 0),
			OY = 
			(this.ammo.y > this.ctx.canvas.clientHeight)

		if (OX || OY) {
			this.reload();
		}
	}

	reload(){
		this.onFire = false;
		this.strength = this.maxStrength/2;
		this.ds = .5;
	}
}