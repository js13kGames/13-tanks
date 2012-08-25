function SimplexNoise(){function u(e,t,n){return e.X*t+e.Y*n}function a(t,n,r,i){return t<0?0:Math.pow(t,4)*u(e[n],r,i)}var e=[bt.Vector(1,1),bt.Vector(-1,1),bt.Vector(1,-1),bt.Vector(-1,-1),bt.Vector(1,0),bt.Vector(-1,0),bt.Vector(1,0),bt.Vector(-1,0),bt.Vector(0,1),bt.Vector(0,-1),bt.Vector(0,1),bt.Vector(0,-1)],t=[],n=[],r=[],i,s=.5*(Math.sqrt(3)-1),o=(3-Math.sqrt(3))/6;for(i=0;i<512;i++)t.push(Math.floor(Math.random()*255)),n.push(t[i&255]),r.push(n[i]%12);this.noise=function(e,t){var i=(e+t)*s,u=e+i|0,f=t+i|0,l=(u+f)*o,c=e-(u-l),h=t-(f-l),p,d,v,m,g,y,b,w,E,S,x,T;return c>h?(p=1,d=0):(p=0,d=1),v=c-p+o,g=h-d+o,m=c-1+2*o,y=h-1+2*o,b=u&255,w=f&255,E=r[b+n[w]],S=r[b+p+n[w+d]],x=r[b+1+n[w+1]],T=a(.5-c*c-h*h,E,c,h)+a(.5-v*v-g*g,S,v,g)+a(.5-m*m-y*y,x,m,y),70*T}}function gameView(e,t){var n=makeCanvas(e,t),r=[bt.Color("#152568"),bt.Color("#CCE010"),bt.Color("#E6DFC8"),bt.Color("#7A6212")];gameView.canvas=n.canvas,gameView.context=n.context,gameView.width=e,gameView.height=t;var i=[procedural.terrain(tileSize,r[0]),procedural.terrain(tileSize,r[1]),procedural.terrain(tileSize,r[2]),procedural.terrain(tileSize,r[3]),procedural.terrainltr(tileSize,r[0],r[1]),procedural.terrainltr(tileSize,r[1],r[0])];game.map=ts.TileSet(i,procedural.noiseMap(128,128,40,4),gameView.canvas,e,t),game.mousePosition=bt.Vector(0,0),game.root.add(gameView),game.map.draw(),setInterval(gameView.scrollHandler,32)}function makeCanvas(e,t){var n=document.createElement("canvas");return n.width=e,n.height=t,{canvas:n,context:n.getContext("2d")}}function testUnits(){game.players.push(Player(10,10,Player.modes.LOCAL)),game.players.push(Player(100,100,Player.modes.AI))}var pathFinder=function(){var e=[],t=16,n=[],r=!1;for(var i=0;i<t;i++)e.push(new Worker("js/astar.js"));return{find:function(t,r,i){e.length>0?function(t,r,i,s){t.postMessage({collisionMap:game.collisionMap,x1:r.X,y1:r.Y,x2:i.X,y2:i.Y}),t.onmessage=function(r){s(r.data),e.push(t);if(n.length>0){var i=n.shift();pathFinder.find(i.start,i.end,i.cb)}}}(e.shift(),t,r,i):n.push({start:t,end:r,cb:i})}}}(),Events={attach:function(e){var t={},n={on:function(e,n){t[e]||(t[e]=[]),t[e].push(n)},fire:function(e,n){if(t[e])for(var r=0;r<t[e].length;r++)t[e][r](n)}};for(prop in n)e[prop]=n[prop]}},ns={};ns.Pooled=function(){"use strict";var e={},t=function(t){return e[t]?e[t].shift():null},n=function(t){return e[t]},r=function(){return{release:function(){if(!this.type)throw"Cannot release to pool: object has no type property.";e[this.type]||(e[this.type]=[]),e[this.type].push(this)}}};return r.pull=t,r.available=n,r}(),ns.Node=function(){"use strict";var e=ns.Pooled.pull("node");if(!e){var t=[];e=Object.create(ns.Pooled(),{visible:{value:!0,enumerable:!0,configurable:!0},each:{value:function(e){for(var n=0;n<t.length;n++)e.apply(t[n])},enumerable:!0},clear:{value:function(){t.length=0}},add:{value:function(n){t.push(n),n.parent=e},enumerable:!0},remove:{value:function(e){t.splice(t.indexOf(e),1)},enumerable:!0},up:{get:function(){return Object.getPrototypeOf(this)}},length:{get:function(){return t.length}}})}return e};var bt={};bt.Vector=function(e,t){"use strict";var n=ns.Pooled.pull("vector");return n||(n=Object.create(ns.Pooled(),{shallow:{value:function(){return{X:n.X,Y:n.Y}}},add:{value:function(e){return bt.Vector(n.X+e.X,n.Y+e.Y)}},subtract:{value:function(e){return bt.Vector(n.X-e.X,n.Y-e.Y)}},multiply:{value:function(e){return bt.Vector(n.X*e.X,n.Y*e.Y)}},divide:{value:function(e){return bt.Vector(n.X/e.X,n.Y/e.Y)}},is:{value:function(e){return n.X===e.X&&n.Y===e.Y}},isInside:{value:function(e){return n.X>e[0]&&n.X<e[0]+e[2]&&n.Y>e[1]&&n.Y<e[1]+e[3]}},distanceTo:{value:function(e){var t=Math.abs(n.X-e.X),r=Math.abs(n.Y-e.Y);return Math.sqrt(Math.pow(t,2)+Math.pow(r,2))}},type:{value:"vector"}})),n.X=e||0,n.Y=t||0,n},bt.Color=function(e){"use strict";var t,n,r;return e[0]==="#"&&(e.length===4?(t=(parseInt(e[1],16)+1)*16,n=(parseInt(e[2],16)+1)*16,r=(parseInt(e[3],16)+1)*16):(t=parseInt(e.substr(1,2),16)+1,n=parseInt(e.substr(3,2),16)+1,r=parseInt(e.substr(5,2),16)+1)),Object.create(ns.Pooled(),{array:{get:function(){return[t,n,r]},set:function(e){t=e[0],n=e[1],r=e[2]}},red:{get:function(){return t},set:function(e){t=e}},green:{get:function(){return n},set:function(e){n=e}},blue:{get:function(){return r},set:function(e){r=e}},toString:{value:function(){return"rgba("+t+","+n+","+r+",1.0)"}},mul:{value:function(e){var i=bt.Color("#FFF");return i.red=t*e|0,i.green=n*e|0,i.blue=r*e|0,i}}})};var procedural={};procedural.terrain=function(e,t){var n=makeCanvas(e,e);n.context.fillStyle=t.toString(),n.context.fillRect(0,0,e,e),t=t.mul(.8),n.context.fillStyle=t.toString();for(var r=0;r<128;r++){var i=Math.random()*e|0,s=Math.random()*e|0;n.context.fillRect(i,s,Math.random()*4|0,Math.random()*4|0)}return n.canvas},procedural.terrainltr=function(e,t,n){var r=makeCanvas(e,e),i=r.context.createLinearGradient(0,e/2,e,e/2);return i.addColorStop(0,n.toString()),i.addColorStop(1,t.toString()),r.context.fillStyle=i,r.context.fillRect(0,0,e,e),r.canvas},procedural.noise=function(e,t,n,r){var i=t||10,s=new SimplexNoise,o=makeCanvas(e,e),u=o.context.createImageData(e,e),a=r||bt.Color("#11A600"),f=n||3;for(var l=0;l<e;l++)for(var c=0;c<e;c++){var h=parseInt((s.noise(l/i,c/i)+1)/2*f,10)*(256/f);u.data[l*4+c*e*4]=a.red/255*h,u.data[l*4+c*e*4+1]=a.green/255*h,u.data[l*4+c*e*4+2]=a.blue/255*h,u.data[l*4+c*e*4+3]=255}return o.context.putImageData(u,0,0),o.canvas},procedural.noiseMap=function(e,t,n,r){var i=[],s=new SimplexNoise;for(var o=0;o<e;o++){i[o]=new Uint8Array(t);for(var u=0;u<t;u++)i[o][u]=parseInt((s.noise(o/n,u/n)+1)/2*r,10)}return i},procedural.spiral=function(e){if(e==0)return{X:0,Y:0};var t=(Math.sqrt(e)+1)/2|0,n=(e-Math.pow(2*t-1,2))/(2*t)|0,r=(e-Math.pow(2*t-1),2)-2*t*n-t+1,i=n===0?t:n===1?-r:n===2?-t:r,s=n===0?r:n===1?t:n===2?-r:-t;return{X:i,Y:s}},gameView.draw=function(){game.context.drawImage(gameView.canvas,0,0)},gameView.scrollHandler=function(){if(!game.map)return;game.mousePosition.X<tileSize*2&&game.map.offset.X>0&&game.map.horizontal(1),game.mousePosition.X>gameView.width-tileSize*2&&game.map.offset.X<game.map.width-gameView.width/tileSize&&game.map.horizontal(-1),game.mousePosition.Y<tileSize*2&&game.map.offset.Y>0&&game.map.vertical(1),game.mousePosition.Y>game.canvas.height-tileSize*2&&game.map.offset.Y<game.map.height-(game.canvas.height/tileSize+.5|0)&&game.map.vertical(-1)};var tileSize=32,game={tileSize:32,root:ns.Node(),count:0,frames:0,selectedUnits:ns.Node(),units:ns.Node(),enemy:ns.Node(),fps:0,playerCount:0,players:[],collisionMap:[],map:[],colors:["#3A3","#A3A","#AA3"]},collision={PASSABLE:0,UNPASSABLE:1,UNIT:2,RESERVED:3};game.deselectAll=function(){game.selectedUnits.each(function(){this.deselect()}),game.selectedUnits.clear()},game.init=function(){game.canvas=document.getElementById("game"),game.context=game.canvas.getContext("2d"),game.canvas.addEventListener("mousedown",function(e){game.mouseDown=!0,game.dragStart=bt.Vector(e.clientX,e.clientY)}),game.canvas.addEventListener("mousemove",function(e){game.mousePosition.X=e.clientX,game.mousePosition.Y=e.clientY;if(game.mouseDown){var t=game.dragStart.shallow(),n=e.clientX-game.dragStart.X,r=e.clientY-game.dragStart.Y;n<0&&(t.X+=n,n*=-1),r<0&&(t.Y+=r,r*=-1),game.selection=[t.X,t.Y,n,r]}}),game.canvas.addEventListener("mouseup",function(e){game.dragStart.release(),game.mouseDown=!1;if(game.dragStart.distanceTo({X:e.clientX,Y:e.clientY})<16){var t=!1;if(e.button===0){game.units.each(function(){this.click(e.clientX,e.clientY)&&(t=!0)});if(!t){var n=game.map.at(e.clientX,e.clientY),r=game.spiral(game.selectedUnits.length,n);game.selectedUnits.each(function(){this.go(r.shift())})}}else game.deselectAll()}else game.deselectAll(),game.units.each(function(){this.isInside(game.selection)&&this.owner.local&&(this.select(),game.selectedUnits.add(this))});return game.selection=null,!1}),gameView(800,800)},game.run=function(){game.frames++;for(var e=0;e<game.players.length;e++)game.players[e].update();game.root.each(function(){this.draw()}),game.selection&&(game.context.fillStyle="rgba(30, 210, 230, 0.5)",game.context.fillRect.apply(game.context,game.selection)),setTimeout(game.run,5)},game.unitAt=function(e){var t=null;return game.units.each(function(){this.tile.X===e.X&&this.tile.Y===e.Y&&(t=this)}),t},game.spiral=function(e,t){var n=0,r=0,i=0,s=-1,o,u=[];game.collisionMap[t.X][t.Y]===collision.PASSABLE&&u.push({X:t.X,Y:t.Y});while(u.length<e){if(n==r||n<0&&n==-r||n>0&&n==1-r)o=i,i=-s,s=o;n+=i,r+=s,game.collisionMap[t.X+n][t.Y+r]===collision.PASSABLE&&u.push({X:t.X+n,Y:t.Y+r})}return u};var Bullet=function(e,t,n){var r=e.X,i=e.Y,s=bt.Vector(r,i).distanceTo(t),o=s/tileSize*100,u=(t.X-e.X)/o,a=(t.Y-e.Y)/o,f=(new Date).getTime(),l={draw:function(){game.context.save(),game.context.translate(r-game.map.offset.X*tileSize+tileSize/2,i-game.map.offset.Y*tileSize+tileSize/2),game.context.fillStyle="#FF0000",game.context.fillRect(-2,-2,4,4),game.context.restore(),l.update()},update:function(){var s=(new Date).getTime()-f;r=e.X+u*s,i=e.Y+a*s;if(s>o){game.root.remove(l);var c=game.unitAt({X:t.X/tileSize|0,Y:t.Y/tileSize|0});c&&c.hit(n)}}};return l},Player=function(e,t,n){var r={local:n===Player.modes.LOCAL,id:game.playerCount++,update:function(){r.defeated||i.length===0&&(r.defeated=!0,console.log("player "+r.id+" was defeated."))}},i=ns.Node(),s=n,o="Player666",u=game.colors[r.id],a=function(e,t){var n=Unit(e,t,u);s===0&&n.on("click",function(e){return function(){game.deselectAll(),e.select(),game.selectedUnits.add(e)}}(n)),n.owner=r,game.units.add(n),i.add(n)};console.log(r.id),i.draw=function(){i.each(function(){this.draw(),this.dead&&(i.remove(this),game.units.remove(this))})},game.root.add(i);var f=game.spiral(13,{X:e,Y:t});for(var l=0;l<13;l++)a(f[l].X,f[l].Y);return r};Player.modes={LOCAL:0,AI:1,NETWORK:2};var Unit=function(e,t,n){var r=e*tileSize,i=t*tileSize,s=0,o=0,u=n,a=0,f=100,l=1e3,c=Unit.GUARD,h=100,p=[],d=5,v=!1,m=0,g=function(n,s,o){e=n,t=s,r=n*tileSize,i=s*tileSize,o&&(game.collisionMap[e][t]===collision.UNIT?(console.log("collision, evading."),b.go(game.spiral(2,{X:e,Y:t})[1],!0)):game.collisionMap[e][t]=collision.UNIT)},y=function(e){p=e,m=(new Date).getTime(),p.length===0&&console.log("no path!")},b={target:{X:0,Y:0},select:function(){v=!0},deselect:function(){v=!1},draw:function(){game.context.save(),game.context.fillStyle=u.toString(),game.context.strokeStyle=v?"yellow":"black",game.context.translate(r-game.map.offset.X*tileSize+tileSize/2,i-game.map.offset.Y*tileSize+tileSize/2),game.context.rotate(s),game.context.fillRect(-8,-16,16,32),game.context.strokeRect(-8,-16,16,32),o!==0&&(game.context.rotate(-s),game.context.rotate(o)),game.context.fillRect(-2,-16,4,24),game.context.strokeRect(-2,-16,4,24),game.context.fillRect(-5,-5,10,10),game.context.strokeRect(-5,-5,10,10),game.context.restore(),this.update()},hit:function(e){f-=e,f<0&&(b.dead=!0)},isInside:function(e,t){var n=game.map.offset.X*tileSize,s=game.map.offset.Y*tileSize;return t&&(n=0,s=0),r>e[0]+n&&r<e[0]+n+e[2]&&i>e[1]+s&&i<e[1]+s+e[3]},go:function(n,r){game.collisionMap[n.X][n.Y]===collision.PASSABLE?(r||(game.collisionMap[e][t]=collision.PASSABLE),pathFinder.find({X:e,Y:t},n,y)):console.log("sir no sir, destination is: "+game.collisionMap[n.X][n.Y])},click:function(e,t){var n=r-game.map.offset.X*tileSize,s=i-game.map.offset.Y*tileSize;return e>n-16&&e<n+16&&t>s-16&&t<s+16?(b.fire("click"),!0):!1},update:function(){if(p.length>0){curTime=(new Date).getTime()-m;if(curTime>h){var n=p.shift();g(n.X,n.Y,p.length===0),m=(new Date).getTime()}else{var u=p[0].X*tileSize,f=p[0].Y*tileSize,c=e*tileSize,v=t*tileSize,y=u-c,w=f-v,E=parseFloat(curTime)/parseFloat(h);r=c+E*y|0,i=v+E*w|0,s=Math.atan2(p[0].X-e,t-p[0].Y)}}rangeBox=[r-d*tileSize,i-d*tileSize,d*2*tileSize,d*2*tileSize],b.target={X:0,Y:0},game.units.each(function(){this.owner.id!==b.owner.id&&this.isInside(rangeBox,!0)&&(b.target=this.position)});var S=(new Date).getTime();if(b.target.X!==0&&b.target.Y!==0){o=Math.atan2(b.target.X-r,i-b.target.Y);if(S-a>l){var T=Bullet({X:r,Y:i},b.target,10);game.root.add(T),a=S}}else o=0}};return Object.defineProperty(b,"position",{get:function(){return{X:r,Y:i}}}),Object.defineProperty(b,"tile",{get:function(){return{X:e,Y:t}}}),game.collisionMap[e][t]=collision.UNIT,Events.attach(b),b};Unit.GUARD=0,Unit.AGRESSIVE=1,Unit.CEASEFIRE=0,navigator.isCocoonJS||setInterval(function(){game.fps=game.frames,document.getElementById("fps").innerHTML=game.fps,game.frames=0},1e3),window.addEventListener("load",function(){game.init(),testUnits(),game.run()});