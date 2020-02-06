//variable declaration section
let physicsWorld, scene, camera, clock, stats, sound, controls, raycaster, renderer, rigidBodies = [], tmpTrans = null;
let player = null, playerMoveDirection = { left: 0, right: 0, forward: 0, back: 0 };
let ammoTmpPos = null, ammoTmpQuat = null;

let objects = [];
let canJump = false;
let prevTime = performance.now();
let direction = new THREE.Vector3();
let vertex = new THREE.Vector3();
let color = new THREE.Color();
let jumping = false;

//Ammojs Initialization
Ammo().then(start);

function start (){
	tmpTrans = new Ammo.btTransform();
	ammoTmpPos = new Ammo.btVector3();
	ammoTmpQuat = new Ammo.btQuaternion();

	setupPhysicsWorld();
	setupGraphics();
	loaders();
	createGround();
    //createGameStage(); //function call from gamestage.js file / creates level objects / rs
    createTestGround(); //function call to create test ground
    createStartPoint(); //function call to create a torus
	createPlayer();
	setupEventHandlers();
	showStats();
	initDebug();

}

function loaders(){//https://threejs.org/docs/#examples/en/loaders/OBJLoader
	let loadBar = document.getElementById( 'load');

	//enemy models
	let catLoader = new THREE.OBJLoader(THREE.DefaultLoadingManager);
	catLoader.load(
		"objects/catGun.obj",
		function(obj) {//onLoad, obj is an Object3D provided by load()
		    let tex = new THREE.TextureLoader().load("objects/catGun.png");//possibly 2 quick?
//https://stackoverflow.com/questions/33809423/how-to-apply-texture-on-an-object-loaded-by-objloader
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh)
                    child.material.map = tex;
            });

			obj.name = "Enemy";
			obj.position.set(5, 12.5, -14);//moves the mesh
            obj.rotateX(.3);
            obj.rotateY(-.8);
            obj.rotateZ(.4);
			scene.add(obj);
			loadBar.innerHTML = "";
		},
		function(xhr){//onProgress
			loadBar.innerHTML = "<h2>Loading Models " + (xhr.loaded / xhr.total * 100) + "%...</h2>";//#bytes loaded, the header tags at the end maintain the style.
			if(xhr.loaded / xhr.total * 100 == 100){ //if done loading loads next loader
				loadSounds(loadBar);
			}

		},
		function(err){//onError
			loadBar.innerHTML = "<h2>Error loading files.</h2>";//#bytes loaded, the header tags at the end maintain the style.
			console.log("error in loading enemy model");
		}
	);
}

function setupControls(){
	//create controls
	controls = new THREE.PointerLockControls(camera, document.body );
	let blocker = document.getElementById( 'blocker' );
	let instructions = document.getElementById( 'instructions' );
	instructions.addEventListener( 'click', function () {controls.lock();}, false );
	controls.addEventListener( 'lock', function () {instructions.style.display = 'none'; blocker.style.display = 'none'; sound.play();} );
	controls.addEventListener( 'unlock', function () {blocker.style.display = 'block'; instructions.style.display = ''; sound.pause();} );
	scene.add( controls.getObject() );

}

//Graphics
function setupGraphics(){
	//create clock for timing
	clock = new THREE.Clock();

	//create the scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xbfd1e5 );

	//create camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.y = 2;
	camera.position.z = 10;

	//create raycaster
	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );

	//Add hemisphere light
	let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 );
	hemiLight.color.setHSL( 0.6, 0.6, 0.6 );
	hemiLight.groundColor.setHSL( 0.1, 1, 0.4 );
	hemiLight.position.set( 0, 50, 0 );
	scene.add( hemiLight );

	//Add directional light
	let dirLight = new THREE.DirectionalLight( 0xffffff , 1);
	dirLight.color.setHSL( 0.1, 1, 0.95 );
	dirLight.position.set( -1, 1.75, 1 );
	dirLight.position.multiplyScalar( 100 );
	scene.add( dirLight );

	dirLight.castShadow = true;

	dirLight.shadow.mapSize.width = 2048;
	dirLight.shadow.mapSize.height = 2048;

	dirLight.shadow.camera.left = -50;
	dirLight.shadow.camera.right = 50;
	dirLight.shadow.camera.top = 50;
	dirLight.shadow.camera.bottom = -50;

	dirLight.shadow.camera.far = 13500;

	//Setup the renderer
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setClearColor( 0xbfd1e5 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	renderer.shadowMap.enabled = true;
}

function createPlayer(){
	//var pos = {x: 0, y: 2, z: 3};
	let pos = {x: 20, y: 30, z: 0};
	let radius = 2;
	let quat = {x: 0 , y: 0, z: 0, w: 1};
	let mass = 1;

	player = new THREE.Mesh(new THREE.SphereBufferGeometry(radius), new THREE.MeshPhongMaterial({color: 0xff0505}));

	player.position.set(pos.x, pos.y, pos.z);

	player.castShadow = true;
	player.receiveShadow = true;

	scene.add(player);

	let transform = new Ammo.btTransform();
	transform.setIdentity();
	transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
	transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
	let motionState = new Ammo.btDefaultMotionState( transform );

	let colShape = new Ammo.btSphereShape( radius );
	colShape.setMargin( 0.05 );

	let localInertia = new Ammo.btVector3( 0, 0, 0 );
	colShape.calculateLocalInertia( mass, localInertia );

	let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
	let body = new Ammo.btRigidBody( rbInfo );

	body.setFriction(4);
	body.setRollingFriction(10);


	physicsWorld.addRigidBody( body );

	player.userData.physicsBody = body;


	rigidBodies.push(player);

}

function createGround(){
	let pos = {x: 0, y: 0, z: 0};
	let scale = {x: 1000, y: 2, z: 1000};
	let quat = {x: 0, y: 0, z: 0, w: 1};
	let mass = 0;

	//threeJS Section
	let groundMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/TexturesCom_Grass0197_1_seamless_S.jpg')});
	groundMaterial.map.wrapS = groundMaterial.map.wrapT = THREE.RepeatWrapping;
	groundMaterial.map.repeat.set( 8, 8 );
	let blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(), groundMaterial);

	blockPlane.position.set(pos.x, pos.y, pos.z);
	blockPlane.scale.set(scale.x, scale.y, scale.z);
	blockPlane.castShadow = true;
	blockPlane.receiveShadow = true;
	scene.add(blockPlane);


	//Ammojs Section
	let transform = new Ammo.btTransform();
	transform.setIdentity();
	transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
	transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
	let motionState = new Ammo.btDefaultMotionState( transform );
	let colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
	colShape.setMargin( 0.05 );
	let localInertia = new Ammo.btVector3( 0, 0, 0 );
	colShape.calculateLocalInertia( mass, localInertia );
	let rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
	let body = new Ammo.btRigidBody( rbInfo );
	body.setFriction(4);
	body.setRollingFriction(10);
	physicsWorld.addRigidBody( body );
}
//

//System
function setupPhysicsWorld(){
	let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
		dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
		overlappingPairCache    = new Ammo.btDbvtBroadphase(),
		solver                  = new Ammo.btSequentialImpulseConstraintSolver();

	physicsWorld  = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
	physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));
	physicsWorld.debugDrawWorld();

}

function initDebug() {
	this.debugDrawer = new THREE.AmmoDebugDrawer(scene, physicsWorld);
	this.debugDrawer.enable();
	this.debugDrawer.setDebugMode(1);

	setInterval(() => {
		var mode = (this.debugDrawer.getDebugMode() + 1) % 3;
		this.debugDrawer.setDebugMode(mode);
	}, 1000);
}

function showStats(){
	//stats display
	stats = new Stats();
	stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
	document.body.appendChild( stats.dom );
}

function updatePhysics( deltaTime ){
	// Step world
	physicsWorld.stepSimulation( deltaTime, 10 );

	// Update rigid bodies
	for ( let i = 0; i < rigidBodies.length; i++ ) {
		let objThree = rigidBodies[i];
		let objAmmo = objThree.userData.physicsBody;
		let ms = objAmmo.getMotionState();
		if ( ms ){
			ms.getWorldTransform( tmpTrans );
			let p = tmpTrans.getOrigin();
			let q = tmpTrans.getRotation();
			objThree.position.set( p.x(), p.y(), p.z() );
			objThree.quaternion.set( q.x(), q.y(), q.z(), q.w() );
		}
	}
}

function updateCamera(){
	camera.position.x = player.position.x;
	camera.position.y = player.position.y;
	camera.position.z = player.position.z;
}

function movePlayer(){
	let scalingFactor = 20; //move speed

	let moveX =  playerMoveDirection.right - playerMoveDirection.left;
	let moveZ =  playerMoveDirection.back - playerMoveDirection.forward;
	let moveY =  0;

	let vertex = new THREE.Vector3(moveX,moveY,moveZ);
	vertex.applyQuaternion(camera.quaternion);
	console.log(vertex);

	if( moveX == 0 && moveY == 0 && moveZ == 0) return;

	let resultantImpulse = new Ammo.btVector3( vertex.x, 0, vertex.z );
	resultantImpulse.op_mul(scalingFactor);

	let physicsBody = player.userData.physicsBody;
	physicsBody.setLinearVelocity ( resultantImpulse );
}

function loadSounds(loadBar){
	let listener = new THREE.AudioListener();
	camera.add( listener );

	// create a global audio source
	sound = new THREE.Audio( listener );

	// load a sound and set it as the Audio object's buffer
	let audioLoader = new THREE.AudioLoader();
	audioLoader.load( './sound/2019-12-11_-_Retro_Platforming_-_David_Fesliyan.mp3',
		function( buffer ) {
			sound.setBuffer( buffer );
			sound.setLoop( true );
			sound.setVolume( 0.25 );
			setupControls();//game can start with a click after external files are loaded in
			renderFrame();//stars the loop once the models are loaded
		},
		function(xhr){//onProgress
			loadBar.innerHTML = "<h2>Loading Sounds " + (xhr.loaded / xhr.total * 100) + "%...</h2>";//#bytes loaded, the header tags at the end maintain the style.
			if(xhr.loaded / xhr.total * 100 == 100){ //if done loading loads next loader
				document.getElementById("load").style.display = "none";

			}
		},
		function(err){//onError
			loadBar.innerHTML = "<h2>Error loading files.</h2>";//#bytes loaded, the header tags at the end maintain the style.
			console.log("error in loading enemy model");
		}
	);


}


function renderFrame(){
	let deltaTime = clock.getDelta();
	updatePhysics( deltaTime );
	stats.update();
	requestAnimationFrame( renderFrame );
	movePlayer();
	updateCamera();
	if (this.debugDrawer) this.debugDrawer.update();
	renderer.render( scene, camera );
}
//

//handlers
function setupEventHandlers(){
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onKeyDown (event ) {
	switch ( event.keyCode ) {
		case 87: // w
			playerMoveDirection.forward = 1;
			break;

		case 65: // a
			playerMoveDirection.left = 1;
			break;

		case 83: // s
			playerMoveDirection.back = 1;
			break;

		case 68: // d
			playerMoveDirection.right = 1;
			break;

		case 32: // space
			playerMoveDirection.forward = 0;
			playerMoveDirection.left = 0;
			playerMoveDirection.back = 0;
			playerMoveDirection.right = 0;
			console.log(jumping);
			let resultantImpulse = new Ammo.btVector3( 0, 5, 0 );
			resultantImpulse.op_mul(2);
			let physicsBody = player.userData.physicsBody;
			physicsBody.applyImpulse( resultantImpulse );
			break;

		case 16: // shift
			player.scale.set(1, 1, 1);
			break;
	}
}

function onKeyUp( event ) {
	switch ( event.keyCode ) {
		case 87: // w
			playerMoveDirection.forward = 0;
			break;

		case 65: // a
			playerMoveDirection.left = 0;
			break;

		case 83: // s
			playerMoveDirection.back = 0;
			break;

		case 68: // d
			playerMoveDirection.right = 0;
			break;

		case 16: // shift
			player.scale.set(2, 2, 2);
			break;

	}
}

//
