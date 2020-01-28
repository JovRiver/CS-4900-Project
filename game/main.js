//variable declaration section
var physicsWorld, scene, camera, stats, sound, controls, raycaster, moveSpeed, renderer, rigidBodies = [], tmpTrans = null
var player = null, playerMoveDirection = { left: 0, right: 0, forward: 0, back: 0 }, tmpPos = new THREE.Vector3(), tmpQuat = new THREE.Quaternion();
var ammoTmpPos = null, ammoTmpQuat = null;

var objects = [];
var codeFinished = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var mass = 100.0;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();
var vertex = new THREE.Vector3();
var color = new THREE.Color();

const STATE = { DISABLE_DEACTIVATION : 4 }

const FLAGS = { CF_KINEMATIC_OBJECT: 2 }

//Ammojs Initialization
Ammo().then(start)

function start (){
	tmpTrans = new Ammo.btTransform();
	ammoTmpPos = new Ammo.btVector3();
	ammoTmpQuat = new Ammo.btQuaternion();

	setupPhysicsWorld();
	setupGraphics();
	playSounds();
	createGround();
    //createGameStage(); //function call from gamestage.js file / creates level objects / rs
    createTestGround(); //function call to create test ground
    createStartPoint(); //function call to create a torus
	createPlayer();
	setupControls();
	setupEventHandlers();
	showStats();
	renderFrame();
}

function setupControls(){
	//create controls
	controls = new THREE.PointerLockControls( camera, document.body );
	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );
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
	var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 );
	hemiLight.color.setHSL( 0.6, 0.6, 0.6 );
	hemiLight.groundColor.setHSL( 0.1, 1, 0.4 );
	hemiLight.position.set( 0, 50, 0 );
	scene.add( hemiLight );

	//Add directional light
	var dirLight = new THREE.DirectionalLight( 0xffffff , 1);
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
	renderer = new THREE.WebGLRenderer( { antialias: true } );
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
	var pos = {x: 0, y: 0, z: 0};
	var scale = {x: 1000, y: 2, z: 1000};
	var quat = {x: 0, y: 0, z: 0, w: 1};
	var mass = 0;

	//threeJS Section
	var groundMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/TexturesCom_Grass0197_1_seamless_S.jpg')});
	groundMaterial.map.wrapS = groundMaterial.map.wrapT = THREE.RepeatWrapping;
	groundMaterial.map.repeat.set( 8, 8 );
	var blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(), groundMaterial);

	blockPlane.position.set(pos.x, pos.y, pos.z);
	blockPlane.scale.set(scale.x, scale.y, scale.z);
	blockPlane.castShadow = true;
	blockPlane.receiveShadow = true;
	scene.add(blockPlane);


	//Ammojs Section
	var transform = new Ammo.btTransform();
	transform.setIdentity();
	transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
	transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
	var motionState = new Ammo.btDefaultMotionState( transform );
	var colShape = new Ammo.btBoxShape( new Ammo.btVector3( scale.x * 0.5, scale.y * 0.5, scale.z * 0.5 ) );
	colShape.setMargin( 0.05 );
	var localInertia = new Ammo.btVector3( 0, 0, 0 );
	colShape.calculateLocalInertia( mass, localInertia );
	var rbInfo = new Ammo.btRigidBodyConstructionInfo( mass, motionState, colShape, localInertia );
	var body = new Ammo.btRigidBody( rbInfo );
	body.setFriction(4);
	body.setRollingFriction(10);
	physicsWorld.addRigidBody( body );
}
//

//System
function setupPhysicsWorld(){
	var collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
		dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
		overlappingPairCache    = new Ammo.btDbvtBroadphase(),
		solver                  = new Ammo.btSequentialImpulseConstraintSolver();

	physicsWorld           = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
	physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));
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
	for ( var i = 0; i < rigidBodies.length; i++ ) {
		var objThree = rigidBodies[ i ];
		var objAmmo = objThree.userData.physicsBody;
		var ms = objAmmo.getMotionState();
		if ( ms ){
			ms.getWorldTransform( tmpTrans );
			var p = tmpTrans.getOrigin();
			var q = tmpTrans.getRotation();
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

	if( moveX == 0 && moveY == 0 && moveZ == 0) return;

	let resultantImpulse = new Ammo.btVector3( moveX, moveY, moveZ )
	resultantImpulse.op_mul(scalingFactor);

	let physicsBody = player.userData.physicsBody;
	physicsBody.setLinearVelocity ( resultantImpulse );
}

function playSounds(){
	var listener = new THREE.AudioListener();
	camera.add( listener );

	// create a global audio source
	sound = new THREE.Audio( listener );

	// load a sound and set it as the Audio object's buffer
	var audioLoader = new THREE.AudioLoader();
	audioLoader.load( './sound/2019-12-11_-_Retro_Platforming_-_David_Fesliyan.mp3', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setLoop( true );
		sound.setVolume( 0.25 );
	});


}


function renderFrame(){
	var deltaTime = clock.getDelta();
	updatePhysics( deltaTime );


	stats.update();

	requestAnimationFrame( renderFrame );

	if ( controls.isLocked === true ) {
		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;

		var intersections = raycaster.intersectObjects( objects );
		var onObject = intersections.length > 0;
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;

		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;

		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveRight ) - Number( moveLeft );
		direction.normalize(); // this ensures consistent movements in all directions

		if ( moveForward || moveBackward ){
			velocity.z -= direction.z * moveSpeed * delta;
			if(moveSpeed < 1000){
				moveSpeed++;
			}
		}else{
			moveSpeed = 400;

		}

		if ( moveLeft || moveRight ){
			velocity.x -= direction.x * moveSpeed * delta;
		}
		/*
		if ( onObject === true ) {
			velocity.y = Math.max( 0, velocity.y );
			canJump = true;
		}
		*/

		controls.moveRight( - velocity.x * delta );

		controls.moveForward( - velocity.z * delta );

		prevTime = time;
	}

	//moveKinematic();

	movePlayer();
	updateCamera();
  
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
			moveForward = true;
			break;

		case 65: // a
			moveLeft = true;
			break;

		case 83: // s
			moveBackward = true;
			break;

		case 68: // d
			moveRight = true;
			break;

		case 38: // up
			playerMoveDirection.forward = 1;
			break;

		case 37: // left
			playerMoveDirection.left = 1;
			break;

		case 40: // down
			playerMoveDirection.back = 1;
			break;

		case 39: // right
			playerMoveDirection.right = 1;
			break;

		case 32: // space
			if ( canJump === true ) velocity.y += 350;
			canJump = false;
			break;

		case 16: // shift
			player.scale.set(1, 1, 1);
			break;
	}
}

function onKeyUp( event ) {
	switch ( event.keyCode ) {
		case 87: // w
			moveForward = false;
			break;

		case 65: // a
			moveLeft = false;
			break;

		case 83: // s
			moveBackward = false;
			break;

		case 68: // d
			moveRight = false;
			break;

		case 38: // up
			playerMoveDirection.forward = 0;
			break;

		case 37: // left
			playerMoveDirection.left = 0;
			break;

		case 40: // down
			playerMoveDirection.back = 0;
			break;

		case 39: // right
			playerMoveDirection.right = 0;
			break;

		case 16: // shift
			player.scale.set(2, 2, 2);
			break;

	}
}

//
