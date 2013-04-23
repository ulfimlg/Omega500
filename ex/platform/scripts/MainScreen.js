(function (Ω) {

	"use strict";

	var MainScreen = Ω.Screen.extend({

		players: [],
		sheet: new Ω.SpriteSheet("res/tiles.png", 32),
		bg: new Ω.Image("res/background.png"),

		init: function () {

			var i;

			this.players = [new Player(Ω.env.w, 51, true)];

			for (i = 1; i < 3; i++) {
				this.players.push(new Player(i * 40, 51));
				this.players.push(new Player(i * 40, 211));
			}

			this.camera = new Ω.TrackingCamera(this.players[0], 0, 0, Ω.env.w, Ω.env.h);

			this.map = new Ω.Map(this.sheet, [
				[ 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
				[ 1, 1, 1, 1, 1, 7, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
				[ 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2],
				[ 7, 0, 0, 1, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 3, 9, 0, 0, 3],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
				[ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
			]);

			this.physics = new Ω.Physics();

			this.trig = new Teleporter(19, 2, -15, 5);
			this.trig2 = new Teleporter(1, 7, -1, -5);

		},

		tick: function (d) {

			var self = this;

			this.camera.tick(d);
			//this.camera.x += (Math.sin(Date.now() / 1000) * 20);
			//this.camera.y += (Math.cos(Date.now() / 2000) * 20);

			this.players.forEach(function (p, i) {

				p.tick(d, self.map);

			});

			this.trig.tick(d);
			this.trig2.tick(d);

			this.physics.checkCollisions([
				this.players,
				this.trig,
				this.trig2
			]);

			if (Ω.input.pressed("escape")) {
				game.setScreen(new TitleScreen());
			}

		},

		render: function (gfx) {

			var c = gfx.ctx,
				self = this;

			c.fillStyle = "hsl(195, 40%, 50%)";
			c.fillRect(0, 0, gfx.w, gfx.h);

			this.bg.render(gfx, 0, 0);

			this.camera.render(gfx, [
				this.map,
				this.players,
				this.trig,
				this.trig2
			]);

			gfx.text.drawShadowed("[esc]", 2, 10, 1, "7pt MonoSpace");
		}
	});

	window.MainScreen = MainScreen;

}(Ω));
