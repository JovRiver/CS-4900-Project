//variable declaration section
let physicsWorld, scene, camera, clock, stats, sound, controls, renderer, rigidBodies = [], tmpTrans = null;
let player = null, flag = null, playerMoveDirection = { left: 0, right: 0, forward: 0, back: 0 };
let ammoTmpPos = null, ammoTmpQuat = null;
let playerGroup = 1, flagGroup = 2, buildingGroup = 3, ghostGroup = 4;
let a = false;
let b = false;
let callback = null;

let objects = [];
let canJump = false;
let prevTime = performance.now();
let direction = new THREE.Vector3();
let vertex = new THREE.Vector3();
//let color = new THREE.Color();	//I don't see this being used anywhere rs
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(), intersected_Object;
let jumping = false;

//Testing variables
let playing = false;	//set to true for level creation
let level_1 = false;	//set to true for level creation

//document.getElementById("load_Menu").style.display = "none";	//used to immediately go to level 1

let level_Select_Objects = [];
let menu_Group;

//Ammojs Initialization
Ammo().then(start);

///////////////////////////////////////////////////////////////////////////////////////
//	INITIALIZATION
///////////////////////////////////////////////////////////////////////////////////////

function start (){
	tmpTrans = new Ammo.btTransform();
	ammoTmpPos = new Ammo.btVector3();
	ammoTmpQuat = new Ammo.btQuaternion();
	callback = new Ammo.ConcreteContactResultCallback();

	setupPhysicsWorld();
	setupGraphics();
	create_Start_Menu();	//comment out for level creation
	//load_Manager();	//uncomment for level creation

	setupEventHandlers();
	showStats();
}

///////////////////////////////////////////////////////////////////////////////////////
//	LOADERS
///////////////////////////////////////////////////////////////////////////////////////

function load_Manager() {	
	scene = new THREE.Scene();
	scene.dispose();

	document.getElementById("blocker").style.display = "block";
	document.getElementById("load").style.display = "";
	document.getElementById("instructions").style.display = "";

	if (level_1) {
		object_Loader();
		createLevel1();
		createPlayer();
	}
}

function object_Loader(){//https://threejs.org/docs/#examples/en/loaders/OBJLoader
	let loadBar = document.getElementById('load');

	//enemy models
	let catLoader = new THREE.OBJLoader(THREE.DefaultLoadingManager);
	catLoader.load(
		"objects/cat/catGun.obj",
		function(obj) {//onLoad, obj is an Object3D provided by load()
		    let tex = new THREE.TextureLoader().load("objects/cat/catGun.png");//possibly 2 quick?
//https://stackoverflow.com/questions/33809423/how-to-apply-texture-on-an-object-loaded-by-objloader
            obj.traverse(function (child) {
                if (child instanceof THREE.Mesh)
                    child.material.map = tex;
            });

			obj.name = "Enemy";
			obj.position.set(5, 105, -14);//moves the mesh
            obj.rotateX(.3);
            obj.rotateY(-.8);
            obj.rotateZ(.4);
			scene.add(obj);
			loadBar.innerHTML = "";
		},
		function(xhr){//onProgress
			loadBar.innerHTML = "<h2>Loading Models " + (xhr.loaded / xhr.total * 100).toFixed() + "%...</h2>";//#bytes loaded, the header tags at the end maintain the style.
			if(xhr.loaded / xhr.total * 100 == 100){ //if done loading loads next loader
				flag_Loader(loadBar);

			}

		},
		function(err){//onError
			loadBar.innerHTML = "<h2>Error loading files.</h2>";//#bytes loaded, the header tags at the end maintain the style.
			console.log("error in loading enemy model");
		}
	);
}

function flag_Loader(loadBar){
	let listener = new THREE.AudioListener();
	camera.add( listener );

	// create a global audio source
	sound = new THREE.Audio( listener );


	// load a sound and set it as the Audio object's buffer
	let loader = new THREE.OBJLoader(THREE.DefaultLoadingManager);
	loader.load(
		"objects/flag/objFlag.obj",
		function(obj) {//onLoad, obj is an Object3D provided by load()
			//let tex = new THREE.TextureLoader().load("objects/flag/objFlag.png");//possibly 2 quick?
			//https://stackoverflow.com/questions/33809423/how-to-apply-texture-on-an-object-loaded-by-objloader
			//obj.traverse(function (child) {
			//	if (child instanceof THREE.Mesh)
			//		child.material.map = tex;
			//});

			obj.name = "Flag";
			obj.position.set(0, 95, -100);//moves the mesh
			obj.scale.set( .3, .3, .3 );

			let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
			let material = new THREE.MeshBasicMaterial( { color: 0xffff00} );
			flag = new THREE.Mesh( geometry, material );
			flag.visible = false;

			scene.add(obj);
			scene.add( flag );
			//flag.add(obj);




			//scene.add(obj);

			let transform = new Ammo.btTransform();
			transform.setIdentity();
			transform.setOrigin( new Ammo.btVector3( 0, 98, -100 ) );
			transform.setRotation( new Ammo.btQuaternion( 0, 0, 0, 1 ) );
			let motionState = new Ammo.btDefaultMotionState( transform );

			colShape = new Ammo.btBoxShape(new Ammo.btVector3(3, 3, 3));
			colShape.setMargin( 0.05 );

			let localInertia = new Ammo.btVector3( 0, 0, 0 );
			colShape.calculateLocalInertia( 1, localInertia );

			let rbInfo = new Ammo.btRigidBodyConstructionInfo( 0, motionState, colShape, localInertia );
			let flagBody = new Ammo.btRigidBody( rbInfo );

			flagBody.setFriction(4);
			flagBody.setRollingFriction(10);

			physicsWorld.addRigidBody( flagBody, flagGroup, ghostGroup );

			flag.userData.physicsBody = flagBody;


			rigidBodies.push(flag);



			loadBar.innerHTML = "";
		},
		function(xhr){//onProgress
			loadBar.innerHTML = "<h2>Loading flag " + (xhr.loaded / xhr.total * 100).toFixed() + "%...</h2>";//#bytes loaded, the header tags at the end maintain the style.
			if(xhr.loaded / xhr.total * 100 == 100){ //if done loading loads next loader
				document.getElementById("blocker").style.display = "block";
				sound_Loader(loadBar);
				b = true;
			}
		},
		function(err){//onError
			loadBar.innerHTML = "<h2>Error loading files.</h2>";//#bytes loaded, the header tags at the end maintain the style.
			console.log("error in loading sound");
		}
	);
}

function sound_Loader(loadBar){
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
		},
		function(xhr){//onProgress
			loadBar.innerHTML = "<h2>Loading Sounds " + (xhr.loaded / xhr.total * 100).toFixed() + "%...</h2>";//#bytes loaded, the header tags at the end maintain the style.
			if(xhr.loaded / xhr.total * 100 == 100){ //if done loading loads next loader
				document.getElementById("blocker").style.display = "block";
				document.getElementById("load").style.display = "none";

				setupControls();//game can start with a click after external files are loaded in
				renderFrame();//starts the loop once the models are loaded
				playing = true;
			}
		},
		function(err){//onError
			loadBar.innerHTML = "<h2>Error loading files.</h2>";//#bytes loaded, the header tags at the end maintain the style.
			console.log("error in loading sound");
		}
	);
}

///////////////////////////////////////////////////////////////////////////////////////
//	GRAPHICS
///////////////////////////////////////////////////////////////////////////////////////

function setupGraphics(){
	clock = new THREE.Clock();

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f0f);

    //create camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
	camera.position.set(0,-10,50)
	camera.lookAt(0,0,0);
	
	//setup point light for the scene
    let pointLight = new THREE.PointLight(0xffffff, 1.5); 
		pointLight.position.set(0, -30, 100); 
		scene.add(pointLight); 
		pointLight.color.setHSL(.2, 1, 0.5);
        
    //Setup the renderer
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setClearColor( 0xbfd1e5 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	renderer.shadowMap.enabled = true;
}

///////////////////////////////////////////////////////////////////////////////////////
//	PLAYER
///////////////////////////////////////////////////////////////////////////////////////

function createPlayer(){
	//var pos = {x: 0, y: 2, z: 3};
	let pos = {x: 0, y: 105, z: 0};
	let radius = 1;
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


	physicsWorld.addRigidBody( body, playerGroup, buildingGroup );

	player.userData.physicsBody = body;
	player.userData.physicsBody.set



	rigidBodies.push(player);
	a = true;

}

function movePlayer(){
	let scalingFactor = 20; //move speed

	let moveX =  playerMoveDirection.right - playerMoveDirection.left;
	let moveZ =  playerMoveDirection.back - playerMoveDirection.forward;
	let moveY =  0;

	let vertex = new THREE.Vector3(moveX,moveY,moveZ);
	vertex.applyQuaternion(camera.quaternion);

	if( moveX == 0 && moveY == 0 && moveZ == 0) return;

	let resultantImpulse = new Ammo.btVector3( vertex.x, 0, vertex.z );
	resultantImpulse.op_mul(scalingFactor);

	let physicsBody = player.userData.physicsBody;
	physicsBody.setLinearVelocity ( resultantImpulse );
}

///////////////////////////////////////////////////////////////////////////////////////
//	SYSTEM
///////////////////////////////////////////////////////////////////////////////////////

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
	this.debugDrawer.setDebugMode(2);

	//setInterval(() => {
		//let mode = (this.debugDrawer.getDebugMode() + 1) % 3;
		//this.debugDrawer.setDebugMode(mode);
	//}, 1000);
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
	if(a && b){
		physicsWorld.contactPairTest(player.userData.physicsBody, flag.userData.physicsBody, callback );
	}

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

callback.addSingleResult = function () {
	console.log("COLLIDE");


};

function updateCamera(){
	camera.position.x = player.position.x;
	camera.position.y = player.position.y;
	camera.position.z = player.position.z;
}

function renderFrame(){
	let deltaTime = clock.getDelta();

	if (playing === true) {
		updatePhysics( deltaTime );
		stats.update();

		if ( controls.isLocked === true ) {
			raycaster.ray.origin.copy( controls.getObject().position );
			raycaster.ray.origin.y -= 10;
		}
	
		movePlayer();
		updateCamera();
	}
  
	if (this.debugDrawer) 
		this.debugDrawer.update();
	
	requestAnimationFrame( renderFrame );
	renderer.render(scene, camera);
}

///////////////////////////////////////////////////////////////////////////////////////
//	EVENT HANDLERS / CONTROLLERS
///////////////////////////////////////////////////////////////////////////////////////

function setupEventHandlers(){
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	window.addEventListener( 'mousemove', on_Mouse_Move, false );
	document.addEventListener('mousedown', menu_Selection, false);
}

function setupControls(){
	//create controls
	controls = new THREE.PointerLockControls( camera, document.body );
	let blocker = document.getElementById( 'blocker' );
	let instructions = document.getElementById( 'instructions' );
	instructions.addEventListener( 'click', function () {controls.lock();}, false );
	controls.addEventListener( 'lock', function () {instructions.style.display = 'none'; blocker.style.display = 'none'; sound.play();} );
	controls.addEventListener( 'unlock', function () {blocker.style.display = 'block'; instructions.style.display = ''; sound.pause();} );
	scene.add( controls.getObject() );
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

function menu_Selection(event) {
	if (playing === false) {
		event.preventDefault();
		raycaster.setFromCamera( mouse, camera );
		let intersects = raycaster.intersectObject(menu_Group, true);

		if (intersects.length > 0) {
			if (intersects[0].object.name === "Select_Level") {
				camera.position.y += 80;
			}

			if (intersects[0].object.name === "Level_1" || intersects[0].object.name === "Level_1_Cube") {
				level_1 = true;
				load_Manager();
			}

			if (intersects[0].object.name === "Options") {
				camera.position.y -= 80;
			}

			if (intersects[0].object.name === "Back_Level" || intersects[0].object.name === "Back_Options") {
				camera.position.set(0,-10,50);
				camera.lookAt(0, 0, 0);
			}

			if (intersects[0].object.name === "Exit_Game") {
				window.close();
			}
		}
	}
}

function on_Mouse_Move(event) {
	if (playing === false) {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster.setFromCamera( mouse, camera );
		let intersects = raycaster.intersectObject(menu_Group, true);

		if (intersects.length > 0) {
			if (intersects[0].object.name === "Grappling_Game") {
				if (intersected_Object)
					intersected_Object.material.emissive.setHex(intersected_Object.currentHex);

				intersected_Object = null;
			}

			else if (intersects[0].object.name === "Level_1_Cube") {
				level_Select_Objects[0].rotation.y += 0.01;
			}

			else if (intersected_Object != intersects[0].object) {
				if (intersected_Object)
					intersected_Object.material.emissive.setHex(intersected_Object.currentHex);

				intersected_Object = intersects[0].object;
				intersected_Object.currentHex = intersected_Object.material.emissive.getHex();
				intersected_Object.material.emissive.setHex(0xdde014);
			}
		} 
		else {
			if (intersected_Object) 
				intersected_Object.material.emissive.setHex(intersected_Object.currentHex);

			intersected_Object = null;
		}
	}
}