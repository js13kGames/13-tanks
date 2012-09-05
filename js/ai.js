var AI = function(player) {
	function base(player) {
		var	basePosition = { X: Math.random() * 100 | 0, Y: Math.random() * 50 | 0 + 50 },
			factory = null,
			selected = ns.Node(),
			buildIndex = 0,
			updateTimer = 3000,
			maxTanks = 20,
			tankCount = 0,
			buildorder =  [ def.powerplant, def.mine, def.powerplant, def.powerplant, def.factory, def.turret, def.turret, def.powerplant, def.mine, def.mine, def.mine, def.hydroplant, 
							def.mine, def.mine, def.mine, def.powerplant, def.hydroplant ];		
		var base = {
			complete: false,
			lastUpdate: 0,
			update: function() {
				var now = (new Date()).getTime();
				if(now - base.lastUpdate < updateTimer) return;
				if(buildorder.length > 0 && player.credits > buildorder[0].cost) {
					var structure = buildorder.shift(),
						p = game.spiral(1, basePosition, structure);
						s = player.build(p[0].X, p[0].Y, structure);
						if(structure == def.factory) {
							factory = s;
							console.log("built factory");
						}
						s.ondeath = function(spec) {
							buildorder.push(def.powerplant);
							buildorder.push(spec);
							buildorder.push(def.turret);
						};
				}
				if(factory && buildorder.length === 0 && tankCount < maxTanks) {
					var u = null;
					if(player.credits > def.heavyTank.cost) {
						console.log("tank");
						u = player.unit(factory.tile.X, factory.tile.Y, def.heavyTank);
					} else {
						if(player.credits > def.tank.cost) {
							console.log("tank");
							u = player.unit(factory.tile.X, factory.tile.Y, def.tank);
						}	
					}
					if(u) {
						tankCount++;
						var rallyPoint = game.spiral(1, factory.rallyPoint || factory.tile)[0];
						u.go(rallyPoint, true);
						u.ondeath = function() {
							tankCount--;
						}
					}
					//buildorder.push(def.powerplant, def.mine);
					base.complete = true;
				}
			}
		};
		return base;
	}

	var ai = {
		maxBases: 5,
		bases: ns.Node(),
		update: function() {
			var build = true;			
			ai.bases.each(function() {
				this.update();
				if(!this.complete) {
					build = false;
				}
			});
			if ((build || ai.bases.length === 0) && ai.bases.length < ai.maxBases) {
				ai.bases.add(base(player));
			}
			/*if(player.units) {
				player.units.each(function() {
					if(this.idle) {
						selected.add(this);
					}
				});
			}			
			if(selected.length > 0) {
				var target = {X: 10, Y: 10};
	            var p = game.map.at(target.X, target.Y),
	                destinations = game.spiral(selected.length, p);
	            selected.each(function() {
	                this.go(destinations.shift());
	            });	
	            selected.clear();			
			}*/
			/*
			if(buildorder.length > 0 && player.credits > buildorder[0].cost) {
				var structure = buildorder.shift(),
					p = game.spiral(1, base, structure);
					s = player.build(p[0].X, p[0].Y, structure);
					if(structure == def.factory) {
						factory = s;
						console.log("built factory");
					}
					s.ondeath = function(spec) {
						buildorder.push(def.powerplant);
						buildorder.push(spec);
						buildorder.push(def.turret);
					};
			}
			if(factory && buildorder.length === 0) {
				var u = null;
				if(player.credits > def.heavyTank.cost) {
					console.log("tank");
					u = player.unit(factory.tile.X, factory.tile.Y, def.heavyTank);
				} else {
					if(player.credits > def.tank.cost) {
						console.log("tank");
						u = player.unit(factory.tile.X, factory.tile.Y, def.tank);
					}	
				}
				if(u) {
					var rallyPoint = game.spiral(1, factory.rallyPoint || factory.tile)[0];
					u.go(rallyPoint, true);					
				}
			}*/
		}
	};
	/*
	base = { X: 100, Y: 100 },
	factory = null,
	selected = ns.Node(),
	buildIndex = 0,
	buildorder = [ def.powerplant, def.mine, def.powerplant, def.powerplant, def.factory, def.turret, def.turret, def.powerplant, def.mine, def.mine, def.mine, def.hydroplant ];
	*/
	return ai;
};