"use strict";
var canvas;
var gl;
var positions;
var numTimesToSubdivide = 0;
var bufferId;

init();

function init()
{
    canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext('webgl2');
    if (!gl) alert("WebGL 2.0 isn't available");



    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);


    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);


    bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    gl.bufferData(gl.ARRAY_BUFFER, 8*Math.pow(3, 6), gl.STATIC_DRAW);



    // Associate out shader variables with our data buffer

    var positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

        document.getElementById("slider").onchange = function(event) {
        numTimesToSubdivide = parseInt(event.target.value);
        render();
    };


    render();
};
function distance(a, b)
{
    return (Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2)))
}

function line(a, b)
{
    
    positions.push(a, b);
}



function divideLine(a1, z1, count)
{


    if (count == 0) {
        line(a1, z1);
    }
    else {
        let a = mix(a1, z1, 1/3);
        let b = mix(a1, z1, 2/3);
        
        let len = distance(a,b);
        
        let ca = vec2(len/2 + a[0], a[1] + len);
        ca = vec2(len/2 + a[0], len * Math.sqrt(3) / 2);
        
        --count;

        line(a, ca);
        line(ca, b);

        // two new lines

        divideLine(a1, a, count);
        divideLine(b, z1, count);
    }
}

function render()
{
    var vertices = [
        vec2(-1, 0),
        vec2(1, 0)
    ];
    positions = [];
    divideLine( vertices[0], vertices[1], 
                    numTimesToSubdivide);

    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(positions));
    gl.clear( gl.COLOR_BUFFER_BIT );
    gl.drawArrays( gl.LINES, 0, positions.length );
    positions = [];
}