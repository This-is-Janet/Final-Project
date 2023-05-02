let width1 = window.innerWidth * 0.3;
let height1 = 500;
let p;
let plants = [];
let height = 500;



new p5(p => {
    const grayLevel = 210;


    class Line {
        constructor(end, rid) {
            this.start = 0
            //this.end = end
            this.rid = p.random(100000)
        }
        show(len) {
            if (this.start < len) {
                let pY = p.sin((this.start+this.rid)/20)*3
                //circle(this.start,pY,5)
                // let sw = map(this.start,0,len,1,3)
                let sw = this.start >= len-20 ? p.map(this.start,len-20,len,1.5,3.5) : 1.5
                p.stroke(255, 255, 255); 
                p.strokeWeight(sw)
                p.point(this.start, pY)
                this.start+=1.3
            }
        }
    }
    
    class Lines {
        constructor(pos,lineCount) {
            this.pos = pos
            this.lineCount = lineCount
            //this.rid = random(10000)
            this.ls = Array.from(new Array(this.lineCount), x => new Line())
        }
        show() {
            for(let i=0; i<this.lineCount; i++) {
                let ang = i/this.lineCount * 6
                p.push()
                p.translate(this.pos)
                p.rotate(ang)
                let line = this.ls[i]
                let len = 60//degrees(ang) > 30 && degrees(ang) < 150 ? 50 : 100
                //let startLen = degrees(ang) > 30 && degrees(ang) < 150 ? 90 : 100
                //let lenOffset = degrees(ang) > 30 && degrees(ang) < 150 ? noise(line.rid)*35 : noise(line.rid) * 20
                let offset = p.map(p.noise(line.rid), 0,1,-13,13)
                //line.show(startLen-lenOffset)
                line.show(len+offset)
                p.pop()
            }
        }
    }
    
    class Root {
        constructor(endPos) {
            this.endPos = endPos
            this.startPos = p.createVector(this.endPos.X,0)
            this.start = 0
            this.len = height - this.endPos.y
            // this.Lines = new Lines(createVector(width/2,height/2),40)
            //this.growFlower = false
            this.finish = false
            this.rid = p.random(10000)
        }
        update() {
            this.growFlower = this.start >= this.len
        }
        show() {
            p.push()
            p.translate(this.endPos.x, height);
            p.stroke(79, 111 ,32);
            p.strokeWeight(2)
            let rootLen = height - this.endPos.y
            //let growInc = this.len/200
            //circle(0,0,50)
            if (this.start < rootLen) {
                
                //let rootTwist = map(rootLen, 0, height, 1.25*PI)
                let pX = p.sin((this.start+this.rid)/100)*50
                // let p = p5.Vector.lerp(createVector(this.endPos.x,this.start),
                // 											 this.endPos,
                // 											 this.start/(height-this.endPos.y))
                // p.x += sin(this.start/(height-this.endPos.y) *PI)*60
                // console.log(p.x)
                p.point(0, -this.start)
                this.start+=2
            }
            this.finish = this.start >= rootLen//this.endPos.y
            // if (this.growFlower) {
            // 	this.Lines.show()
            // }
            p.pop()
        }
    }
    
    class Plant {
        constructor(pos) {
            this.pos = pos
            this.Root = new Root(this.pos)
            this.Lines = new Lines(this.pos, 40)
            this.growTop = false
        }
        update() {
            
        }
        show() {
            this.Root.show()
            this.growTop = this.Root.finish
            if(this.growTop) {
                this.Lines.show()
            }
        }
    }

    p.setup = function() {
        p.createCanvas(width1, height1).parent(box1);
        p.background(grayLevel);
        p.noFill();
    }

    p.draw = function() {
        plants.forEach(p => p.show());
    }

    p.mousePressed = function() {
        plants.push(new Plant(p.createVector(p.mouseX, p.mouseY)))
    }
});

//https://openprocessing.org/sketch/1788116