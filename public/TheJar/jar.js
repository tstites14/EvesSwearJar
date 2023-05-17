/*Matter.js jar*/
const Engine = Matter.Engine,
    Common = Matter.Common,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Body = Matter.Body,
    Composite = Matter.Composite,
    Svg = Matter.Svg,
    Vertices = Matter.Vertices;

//Set up decomp for jar outline
Common.setDecomp(decomp);

// create an engine
const engine = Engine.create();

// create a renderer
const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: 800,
        height: 800,
        wireframes: false,
        showAngleIndicator: false,
        background: 'transparent'
    }
});

//Load jar outline SVG
function select(root, selector) {
    return Array.prototype.slice.call(root.querySelectorAll(selector));
}

function loadSVG(url) {
    return fetch(url)
        .then((response) => { return response.text() })
        .then((raw) => { return new window.DOMParser().parseFromString(raw, 'image/svg+xml') })
}

loadSVG("http://wh1178760.ispot.cc/evesswearjar/jar/jar.svg")
    .then((root) => {
        const paths = select(root, 'path');
        const vertexSets = paths.map(function(path) { return Vertices.scale(Svg.pathToVertices(path, 15), 3, 3); });
        
        const jar = Bodies.fromVertices(420, 510, vertexSets, {
            isStatic: true,
            render: {
                strokeStyle: '#ffffff00',
                fillStyle: '#ffffff00',
                lineWidth: 0
            }
        });

        const spriteContainer = Bodies.rectangle(400, 400, 300, 300, {
            isStatic: true,
            isSensor: true,
            render: {
                sprite: {
                    texture: 'http://wh1178760.ispot.cc/evesswearjar/jar/jar.png',
                    xoffset: 0,
                    xScale: 1,
                    yOffset: 0,
                    yScale: 1
                },
                lineWidth: 0
            },
            collisionFilter: {
                mask: 0
            }
        });
        
        Composite.add(engine.world, [spriteContainer, jar]);
    });

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
        console.log(value);
        
        if (value == "1") {
            const coin = Bodies.circle(400, 200, 30);

            Composite.add(engine.world, coin);
        }
    });
}

setInterval(checkStatus, 2000);