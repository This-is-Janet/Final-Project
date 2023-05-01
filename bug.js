let width = window.innerWidth * 0.6;
let heightUp = 350;
let heightBottom = 150;


//bug
new p5(p => {
    let bug;
    const grayLevel = 240;
    let s1, s2;
    let gravity = 9.0;
    let mass = 2.0;
  
    p.setup = function() {
      p.createCanvas(width, heightUp).parent(box2);
      p.background(grayLevel);
      bug = p.loadImage("images/ladybug.png");
      fly = p.loadImage("images/butterfly.png");
      s1 = new drawBug(0.0, p.width / 2, mass, gravity);
      s2 = new drawBug(0.0, p.width / 2, mass, gravity);
    };
  
    function drawBug(xpos, ypos, m, g) {
      this.x = xpos; // The x- and y-coordinates
      this.y = ypos;
      this.vx = 0; // The x- and y-axis velocities
      this.vy = 0;
      this.mass = m;
      this.gravity = g;
      this.radius = 30;
      this.stiffness = 0.2;
      this.damping = 0.7;
  
      this.update = function(targetX, targetY) {
        let forceX = (targetX - this.x) * this.stiffness;
        let ax = forceX / this.mass;
        this.vx = this.damping * (this.vx + ax);
        this.x += this.vx;
        let forceY = (targetY - this.y) * this.stiffness;
        forceY += this.gravity;
        let ay = forceY / this.mass;
        this.vy = this.damping * (this.vy + ay);
        this.y += this.vy;
      };
  
      this.display_1 = function(nx, ny) {
        p.image(bug, this.x, this.y, bug.width/13, bug.height/13);
        p.stroke(200);
        p.line(this.x, this.y, nx, ny);
      };

      this.display_2 = function(nx, ny) {
        p.image(fly, this.x, this.y, fly.width/13, fly.height/13);
      };
    }
  
    p.draw = function() {
      //bug
      p.background(grayLevel);
      s1.update(p.mouseX, p.mouseY);
      s1.display_1(p.mouseX, p.mouseY);
      s2.update(s1.x, s1.y);
      s2.display_2(s1.x, s1.y)      
    };
    
  });



  //grass
  new p5(p => {
      
    const grayLevel = 240;

    p.setup = function() {
      p.createCanvas(width, heightBottom).parent(box3);
      p.background(grayLevel);
      p.strokeWeight(1);
      // p.stroke(0, 30);
    };

    p.draw = function() {
      let xstep;
      let ystep;
      let border = p.random(width);
      let y = p.random(10, heightBottom);
      let lastx = border;
      let lasty = y;
      let b = p.random(50, 180);
      p.stroke(20, b, 180-b, y*1.5-100); //specify color of the stroke. stroke(red,green,blue,alpha)


      for (let x=border; y<=height;
        x += xstep, y += ystep) {
      xstep = p.noise(30)*5 + p.random(3);
      ystep = p.noise(10)*40 + p.random(15);
      p.line(x, y, lastx, lasty); //I don't want the line to disappear but how?
      lastx = x;
      lasty = y;
    };

    }
  })

  //grass referencs: https://openprocessing.org/sketch/119345/