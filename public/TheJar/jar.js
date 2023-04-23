/*Matter.js jar*/
const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite;

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine
});

// create two boxes and a ground
const boxA = Bodies.rectangle(400, 200, 80, 80);
const boxB = Bodies.rectangle(450, 50, 80, 80);
const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

// run the renderer
Render.run(render);

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);

/*server polling*/
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function getStatus() {
    var status = await fetch("http://wh1178760.ispot.cc/evesswearjar/jar/status");
    var text = await status.text();

    return text;
}

function checkStatus() {
    getStatus().then(value => {
        if (value == "New event")
            Composite.add(engine.world, [Bodies.circle(400, 200, 80)]);
    });
}

setInterval(checkStatus, 2000);