let width = window.innerWidth * 0.6;
let heightUp = 350;
let heightBottom = 150;


//bug
new p5(p => {
    let bug;
    const grayLevel = 240;
    let x = [0, 0];
    let y = [0, 0];
    let segLength = 50;

    p.setup = function() {
      p.createCanvas(width+40, heightUp).parent(box2);
      p.background(grayLevel);
      bug = p.loadImage("images/ladybug.png");
      fly = p.loadImage("images/butterfly.png");
    };
    
    p.draw = function() {
      p.background(grayLevel);
      dragSegmentFly(0, p.mouseX, p.mouseY);
      dragSegmentBug(1, x[0], y[0]);
    }
    
    function dragSegmentBug(i, xin, yin) {
      const dx = xin - x[i];
      const dy = yin - y[i];
      const angle = p.atan2(dy, dx);
      x[i] = xin - p.cos(angle) * segLength;
      y[i] = yin - p.sin(angle) * segLength;
      segmentBug(x[i], y[i], angle);
    }

    function dragSegmentFly(i, xin, yin) {
      const dx = xin - x[i];
      const dy = yin - y[i];
      const angle = p.atan2(dy, dx);
      x[i] = xin - p.cos(angle) * segLength;
      y[i] = yin - p.sin(angle) * segLength;
      segmentFly(x[i], y[i], angle);
    }
    
    function segmentBug(x, y, a) {
      p.push();
      p.translate(x, y);
      p.rotate(a);
      p.image(bug, 0, 0, bug.width/13, bug.height/13);
      p.pop();
    }

    function segmentFly(x, y, a) {
      p.push();
      p.translate(x, y);
      p.rotate(a);
      p.image(fly, 0, 0, fly.width/13, fly.height/13);
      p.pop();
    }    
    
  });



  //grass
  new p5(p => {
      
    const grayLevel = 240;

    p.setup = function() {
      p.createCanvas(width+40, heightBottom).parent(box3);
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


      for (let x=border; y<=heightBottom+30;
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