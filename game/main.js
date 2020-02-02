//variable declaration section
let physicsWorld, scene, camera, clock, stats, sound, controls, raycaster, renderer, rigidBodies = [], tmpTrans = null;
let player = null, playerMoveDirection = { left: 0, right: 0, forward: 0, back: 0 };
let ammoTmpPos = null, ammoTmpQuat = null;

let objects = [];
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;
let prevTime = performance.now();
let velocity = new THREE.Vector3();
let direction = new THREE.Vector3();
let vertex = new THREE.Vector3();
let color = new THREE.Color();

let level1 = true;

//Ammojs Initialization
Ammo().then(start);

function start (){
	tmpTrans = new Ammo.btTransform();
	ammoTmpPos = new Ammo.btVector3();
	ammoTmpQuat = new Ammo.btQuaternion();

	setupPhysicsWorld();
	setupGraphics();

	if (level1 === false) 
		start_Menu_Loader();
	else
		load_Manager();

	load_Manager();

	//setupControls(); //moved to load_Manager() children functions
	setupEventHandlers();
	showStats();
	//renderFrame(); //moved to load_Manager()
}

function start_Menu_Loader() {
	document.getElementById("load").style.display = "none";
	document.getElementById("blocker").style.display = "none";

	start_Menu();
	load_Manager();
}

function start_Menu() {
	var loader = new THREE.FontLoader();

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

		loader.load( "fonts/helvetiker_regular.typeface.json", function ( font ) {

			var textGeo = new THREE.TextBufferGeometry( "Grapple Game", {

				font: font,

				size: 10,
				height: 10,
				curveSegments: 12,

				bevelThickness: 1,
				bevelSize: .5,
				bevelEnabled: true

			} );

				textGeo.computeBoundingBox();
			var centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			var mesh = new THREE.Mesh( textGeo, textMaterial );
				mesh.position.x = centerOffset;
				mesh.position.y = 10;

				scene.add( mesh );
		} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

		loader.load( "fonts/helvetiker_regular.typeface.json", function ( font ) {

			var textGeo = new THREE.TextBufferGeometry( "Select Level", {

				font: font,

				size: 5,
				height: 5,
				curveSegments: 12,

				bevelThickness: .5,
				bevelSize: .3,
				bevelEnabled: true

			} );

				textGeo.computeBoundingBox();
			var centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			var mesh = new THREE.Mesh( textGeo, textMaterial );
				mesh.position.x = centerOffset;
				mesh.position.y = -5;
				mesh.rotation.x = THREE.Math.degToRad(-5);

				scene.add( mesh );
		} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

		loader.load( "fonts/helvetiker_regular.typeface.json", function ( font ) {

			var textGeo = new THREE.TextBufferGeometry( "Options", {

				font: font,

				size: 5,
				height: 5,
				curveSegments: 12,

				bevelThickness: .5,
				bevelSize: .3,
				bevelEnabled: true

			} );

				textGeo.computeBoundingBox();
			var centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			var mesh = new THREE.Mesh( textGeo, textMaterial );
				mesh.position.x = centerOffset;
				mesh.position.y = -15;
				mesh.rotation.x = THREE.Math.degToRad(-10);

				scene.add( mesh );
		} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////

		loader.load( "fonts/helvetiker_regular.typeface.json", function ( font ) {

			var textGeo = new THREE.TextBufferGeometry( "Exit Game", {

				font: font,

				size: 5,
				height: 5,
				curveSegments: 12,

				bevelThickness: .5,
				bevelSize: .3,
				bevelEnabled: true

			} );

				textGeo.computeBoundingBox();
			var centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			var textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			var mesh = new THREE.Mesh( textGeo, textMaterial );
				mesh.position.x = centerOffset;
				mesh.position.y = -25;
				mesh.rotation.x = THREE.Math.degToRad(-15);

				scene.add( mesh );
		} );

	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

function load_Manager() {

	if (level1 === true) {
		createLevel1();
		createPlayer();
		object_Loader();
	}
	
	else {
		renderFrame();
	}
}

function object_Loader(){//https://threejs.org/docs/#examples/en/loaders/OBJLoader
	let loadBar = document.getElementById('load');

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
				sound_Loader(loadBar);
			}

		},
		function(err){//onError
			loadBar.innerHTML = "<h2>Error loading files.</h2>";//#bytes loaded, the header tags at the end maintain the style.
			console.log("error in loading enemy model");
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
			loadBar.innerHTML = "<h2>Loading Sounds " + (xhr.loaded / xhr.total * 100) + "%...</h2>";//#bytes loaded, the header tags at the end maintain the style.
			if(xhr.loaded / xhr.total * 100 == 100){ //if done loading loads next loader
				document.getElementById("load").style.display = "none";
				setupControls();//game can start with a click after external files are loaded in
				renderFrame();//starts the loop once the models are loaded
			}
		},
		function(err){//onError
			loadBar.innerHTML = "<h2>Error loading files.</h2>";//#bytes loaded, the header tags at the end maintain the style.
			console.log("error in loading sound");
		}
	);
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

//Graphics
function setupGraphics(){
	//create clock for timing
	clock = new THREE.Clock();

	//create the scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xb0f0f0f );

	//create camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
	camera.position.set(0,-10,50)
	camera.lookAt(0,0,0);


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
	let pos = {x: 0, y: 65, z: 0};
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


	physicsWorld.addRigidBody( body );

	player.userData.physicsBody = body;

	rigidBodies.push(player);

}

//System
function setupPhysicsWorld(){
	let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
		dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
		overlappingPairCache    = new Ammo.btDbvtBroadphase(),
		solver                  = new Ammo.btSequentialImpulseConstraintSolver();

	physicsWorld  = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
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

	if( moveX == 0 && moveY == 0 && moveZ == 0) return;

	let resultantImpulse = new Ammo.btVector3( moveX, moveY, moveZ );
	resultantImpulse.op_mul(scalingFactor);

	let physicsBody = player.userData.physicsBody;
	physicsBody.setLinearVelocity ( resultantImpulse );
}

function renderFrame(){
	let deltaTime = clock.getDelta();

	if (level1 === true) {
		updatePhysics( deltaTime );
		stats.update();

		if ( controls.isLocked === true ) {
			raycaster.ray.origin.copy( controls.getObject().position );
			raycaster.ray.origin.y -= 10;
	
			let intersections = raycaster.intersectObjects( objects );
			let onObject = intersections.length > 0;
			let time = performance.now();
			let delta = ( time - prevTime ) / 1000;
	
	
			prevTime = time;
		}
	
		movePlayer();
		updateCamera();
	}

	requestAnimationFrame( renderFrame );
	/*
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


		controls.moveRight( - velocity.x * delta );

		controls.moveForward( - velocity.z * delta );

		prevTime = time;
	}
	*/
	renderer.render( scene, camera );
}

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
			playerMoveDirection.forward = 1;
			break;

		case 65: // a
			moveLeft = true;
			playerMoveDirection.left = 1;
			break;

		case 83: // s
			moveBackward = true;
			playerMoveDirection.back = 1;
			break;

		case 68: // d
			moveRight = true;
			playerMoveDirection.right = 1;
			break;

		case 32: // space
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
			moveForward = false;
			playerMoveDirection.forward = 0;

			break;

		case 65: // a
			moveLeft = false;
			playerMoveDirection.left = 0;
			break;

		case 83: // s
			moveBackward = false;
			playerMoveDirection.back = 0;
			break;

		case 68: // d
			moveRight = false;
			playerMoveDirection.right = 0;
			break;

		case 16: // shift
			player.scale.set(2, 2, 2);
			break;

	}
}