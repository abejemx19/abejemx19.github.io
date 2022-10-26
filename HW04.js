"use strict";

var canvas;
var gl;

var axis = 0;
var xAxis = 0;
var yAxis =1;
var zAxis = 2;
var theta = [0, 0, 0];
var thetaLoc;
var flag = true;

var numElements = 29;

var tParam = 0.0;
var tLoc;
var deltaT = 0.01;
var color = vec4(1.0,0.65,0.0,1.0);
//var vec4 color;
var Ucolor = vec4(1.0,0.65,0.0,1.0);
var Icolor = vec4(0.0,0.0,1.0,1.0);
var colorLoc;
var delay = 100;
var morph = true;
init();
function init()
{
 var canvas = document.getElementById(
"gl-canvas");
 gl = canvas.getContext('webgl2');
 if (!gl) alert("WebGL 2.0 isn't available");
//
 // Configure WebGL
 //
 gl.viewport(0, 0, canvas.width,
    canvas.height);
     gl.clearColor(1.0, 1.0, 1.0, 1.0);
     // Load shaders and initialize attribute buffers
     var program = initShaders(gl,
    "vertex-shader", "fragment-shader");
     gl.useProgram(program);
     var M = [
        // vec2(0.0,  0.2),
        // vec2(0.0,  0.4),
        // vec2(0.0, 0.8),
        // vec2(0.0, 1.0),
        // vec2(0.2,  0.8),
        // vec2(0.3,  0.6),
        // vec2(0.5, 0.3),
        // vec2(0.8, 0.2),
        // vec2(0.6, 0.3),
        // vec2(1.0, 1.0),
        // vec2(1.0, 0.8),
        // vec2(1.0, 0.6),
        // vec2(1.0, 0.4),
        // vec2(1.0, 0.2),
        // vec2(1.0, 0.0),
// x = (
//         vec2(0.0,  0.2),
//         vec2(0.0,  0.4),
//         vec2(0.0, 0.8),
//         vec2(0.0, 1.0),
//         vec2(0.2,  0.8),
//         vec2(0.3,  0.6),
//         vec2(0.5, 0.3),
//         vec2(0.8, 0.2),
//         vec2(0.6, 0.3),
//         vec2(1.0, 1.0),
//         vec2(1.0, 0.8),
//         vec2(1.0, 0.6),
//         vec2(1.0, 0.4),
//         vec2(1.0, 0.2),
//         vec2(1.0, 0.0))

   

    vec3(0.0,  0.2, 0.5),
    vec3(0.0,  0.4, 0.5),
    vec3(0.0, 0.8, 0.5),
    vec3(0.0, 1.0, 0.5),
    vec3(0.2,  0.8, 0.5),
    vec3(0.3,  0.6, 0.5),
    vec3(0.5, 0.3, 0.5),
    vec3(0.8, 0.2, 0.5),
    vec3(0.6, 0.3, 0.5),
    vec3(1.0, 1.0, 0.5),
    vec3(1.0, 0.8, 0.5),
    vec3(1.0, 0.6, 0.5),
    vec3(1.0, 0.4, 0.5),
    vec3(1.0, 0.2, 0.5),
    vec3(1.0, 0.0, 0.5),



    ];
    var U = [
    // vec2( -0.75 , 0.75 ),
    // vec2( -0.38 , 0.75 ),
    // vec2( -0.38 , -0.38 ),
    // vec2( 0.38 , -0.38 ),

    // vec2( 0.38 , 0.75 ),
    // vec2( 0.75 , 0.75 ),
    // vec2( 0.75 , 0.00 ),
    // vec2( 0.75 , -0.38 ),

    // vec2( 0.75 , -0.75 ),
    // vec2( -0.75 , -0.75 ),
    // vec2( -0.75 , -0.38 ),
    // vec2( -0.75 , 0.00 )


    vec3( -0.75 , 0.75 , 0.5),
    vec3( -0.38 , 0.75 , 0.5),
    vec3( -0.38 , -0.38 , 0.5),
    vec3( 0.38 , -0.38 , 0.5),
    vec3( 0.38 , 0.75 , 0.5),
    vec3( 0.75 , 0.75 , 0.5),
    vec3( 0.75 , 0.00 , 0.5),
    vec3( 0.75 , -0.38 , 0.5),
    vec3( 0.75 , -0.75 , 0.5),
    vec3( -0.75 , -0.75 , 0.5),
    vec3( -0.75 , -0.38 , 0.5),
    vec3( -0.75 , 0.00 , 0.5),

    ];
    // Load the I into the GPU
    var vBufferI = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,
   vBufferI);
    gl.bufferData(gl.ARRAY_BUFFER,
   flatten(M), gl.STATIC_DRAW);
    // Associate out shader variables with our data buffer
    var ipositionLoc = gl.getAttribLocation( program,
        "iPosition");
         gl.vertexAttribPointer(ipositionLoc,
        2, gl.FLOAT, false, 0, 0);
        
        gl.enableVertexAttribArray(ipositionLoc);
         // Load the U into the GPU
         var vBufferU = gl.createBuffer();
         gl.bindBuffer(gl.ARRAY_BUFFER,
        vBufferU);
         gl.bufferData(gl.ARRAY_BUFFER,
        flatten(U), gl.STATIC_DRAW);
         // Associate out shader variables with our data buffer
         var upositionLoc =
        gl.getAttribLocation( program,
        "uPosition");
         gl.vertexAttribPointer(upositionLoc,
        2, gl.FLOAT, false, 0, 0);
        
        gl.enableVertexAttribArray(upositionLoc);
         tLoc = gl.getUniformLocation( program,
        "t" );
        
         colorLoc = gl.getUniformLocation(program, "inColor" );


         
         // Initialize event handlers
        
    

        
        document.getElementById("Morph").onclick =
        function () {
         morph = !morph;
         };
         window.onkeydown = function(event) {
         var key =
        String.fromCharCode(event.keyCode);
         switch(key) {
         case '1':
         morph = !morph;
         break;
         case '2':
         deltaT /= 2.0;
         break;
         case '3':
         deltaT *= 2.0;
         break;
         }
         };
         render();
        };
        function render()


{
 gl.clear(gl.COLOR_BUFFER_BIT);
 if (morph) tParam += deltaT;
 if (tParam>=1.0 || tParam<= 0.0)
deltaT = -deltaT;
 gl.uniform1f(tLoc, tParam);
 color = mix(Icolor,Ucolor,tParam);
 gl.uniform4fv(colorLoc, color);
 gl.drawArrays(gl.TRIANGLE_FAN, 0, 12);
 setTimeout(
 function
(){requestAnimationFrame(render);}, delay
 );
}

