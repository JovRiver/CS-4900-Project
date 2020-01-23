//variable declaration section
var physicsWorld, scene, camera, controls, raycaster, moveSpeed, renderer, rigidBodies = [], tmpTrans = null
var player = null, playerMoveDirection = { left: 0, right: 0, forward: 0, back: 0 }, tmpPos = new THREE.Vector3(), tmpQuat = new THREE.Quaternion();
var ammoTmpPos = null, ammoTmpQuat = null;

var objects = [];
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
	createGround();
    createObstacles(); // Added for player movement testing
	createPlayer();
	setupControls();
	setupEventHandlers();
	renderFrame();
}

function setupControls(){
	//create controls
	controls = new THREE.PointerLockControls( camera, document.body );
	var blocker = document.getElementById( 'blocker' );
	var instructions = document.getElementById( 'instructions' );
	instructions.addEventListener( 'click', function () {controls.lock();}, false );
	controls.addEventListener( 'lock', function () {instructions.style.display = 'none'; blocker.style.display = 'none';} );
	controls.addEventListener( 'unlock', function () {blocker.style.display = 'block'; instructions.style.display = '';} );
	scene.add( controls.getObject() );
	//player.add(camera);

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
	camera.position.y = 5;
	//camera.position.z = 3;
	
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
	var pos = {x: 20, y: 200, z: 0};
	var scale = {x: 2, y: 5, z: 2};
	var quat = {x: 0, y: 0, z: 0, w: 1};
	var mass = 1;

	//threeJS Section
	player = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({color: 0x30ab78}));
	player.position.set(pos.x, pos.y, pos.z);
	player.scale.set(scale.x, scale.y, scale.z);
	player.castShadow = true;
	player.receiveShadow = true;
	scene.add(player);
	player.add(camera);
	

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
	body.setActivationState( STATE.DISABLE_DEACTIVATION );
	physicsWorld.addRigidBody( body );
	player.userData.physicsBody = body;
	rigidBodies.push(player);
}



function createGround(){
	var pos = {x: 0, y: 0, z: 0};
	var scale = {x: 100, y: 2, z: 100};
	var quat = {x: 0, y: 0, z: 0, w: 1};
	var mass = 0;

	//threeJS Section
	var blockPlane = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({color: 0xa0afa4}));
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

function createObstacles() {
    
    //ledge variables
    var pos = {x: 25, y: 10, z: 0};
    var pos2 = {x: 11, y: 3, z: 0};
    var pos3 = {x: -5, y: 10, z: 0};
    
	var scale = {x: 20, y: 1, z: 20};
    var scale2 = {x: 5, y: 5, z: 5};
	
    var quat = {x: 0, y: 0, z: 0, w: 1};
	var mass = 0;
    
    //ramp variables
    var r1Pos = {x: 25, y: 4.5, z: 14.58};
    var r2Pos = {x: 25, y: 5.2, z: -15.4};
	var rScale = {x: 20, y: 1, z: 15};
    
//three.js section
    
    //ledge creation
    var ledge = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xa0afa4 }));
        ledge.position.set(pos.x, pos.y, pos.z);
        ledge.scale.set(scale.x, scale.y, scale.z);
        ledge.castShadow = true;
        ledge.receiveShadow = true;
        scene.add(ledge);
    
    //ledge2 creation
    var ledge2 = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xa0afa4 }));
        ledge2.position.set(pos3.x, pos3.y, pos3.z);
        ledge2.scale.set(scale.x, scale.y, scale.z);
        ledge2.castShadow = true;
        ledge2.receiveShadow = true;
        scene.add(ledge2);
    
    //stepUpLedge creation
    var stepUpLedge = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xa0afa4 }));
        stepUpLedge.position.set(pos2.x, pos2.y, pos2.z);
        stepUpLedge.scale.set(scale2.x, scale2.y, scale2.z);
        stepUpLedge.castShadow = true;
        stepUpLedge.receiveShadow = true;
        scene.add(stepUpLedge);
    
    //ramp1 creation
    var ramp1 = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xa0afa4 }));
        ramp1.position.set(r1Pos.x, r1Pos.y, r1Pos.z);
        ramp1.scale.set(rScale.x, rScale.y, rScale.z);
        ramp1.castShadow = true;
        ramp1.receiveShadow = true;
        ramp1.rotation.x = Math.sin(45);
        scene.add(ramp1);
    
    //ramp2 creation
    var ramp2 = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xa0afa4 }));
        ramp2.position.set(r2Pos.x, r2Pos.y, r2Pos.z);
        ramp2.scale.set(rScale.x, rScale.y, rScale.z);
        ramp2.castShadow = true;
        ramp2.receiveShadow = true;
        ramp2.rotation.x = Math.cos( 3 * Math.PI / 4);
        scene.add(ramp2);
    
//ammo.js section
    
    //ledge transform
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
    
    //ramp1 transform
    var transform1 = new Ammo.btTransform();
        transform1.setIdentity();
        transform1.setOrigin( new Ammo.btVector3( r1Pos.x, r1Pos.y, r1Pos.z ) );
        transform1.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    var motionState1 = new Ammo.btDefaultMotionState( transform1 );
	var colShape1 = new Ammo.btBoxShape( new Ammo.btVector3( rScale.x * 0.5, rScale.y * 0.5, rScale.z * 0.5 ) );
        colShape1.setMargin( 0.05 );
    var localInertia1 = new Ammo.btVector3( 0, 0, 0 );
        colShape1.calculateLocalInertia( mass, localInertia1 );
    var rbInfo1 = new Ammo.btRigidBodyConstructionInfo( mass, motionState1, colShape1, localInertia1 );
    var body1 = new Ammo.btRigidBody( rbInfo1 );
        body1.setFriction(4);
        body1.setRollingFriction(10);
        physicsWorld.addRigidBody( body1 );
    
    //ramp2 transform
    var transform2 = new Ammo.btTransform();
        transform2.setIdentity();
        transform2.setOrigin( new Ammo.btVector3( r2Pos.x, r2Pos.y, r2Pos.z ) );
        transform2.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    var motionState2 = new Ammo.btDefaultMotionState( transform2 );
	var colShape2 = new Ammo.btBoxShape( new Ammo.btVector3( rScale.x * 0.5, rScale.y * 0.5, rScale.z * 0.5 ) );
        colShape2.setMargin( 0.05 );
    var localInertia2 = new Ammo.btVector3( 0, 0, 0 );
        colShape2.calculateLocalInertia( mass, localInertia2 );
    var rbInfo2 = new Ammo.btRigidBodyConstructionInfo( mass, motionState2, colShape2, localInertia2 );
    var body2 = new Ammo.btRigidBody( rbInfo2 );
        body2.setFriction(4);
        body2.setRollingFriction(10);
        physicsWorld.addRigidBody( body2 );
    
    //stepUpLedge transform
        //TODO
    
    //ledge2 creation
        //TODO
}

//System
function setupPhysicsWorld(){
	var collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
	dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
	overlappingPairCache    = new Ammo.btDbvtBroadphase(),
	solver                  = new Ammo.btSequentialImpulseConstraintSolver();

	physicsWorld           = new Ammo.btDiscreteDynamicsWorld(dispatcher, overlappingPairCache, solver, collisionConfiguration);
	physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));
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

function moveKinematic(){

                var scalingFactor = 0.3;

                var moveX =  playerMoveDirection.right - playerMoveDirection.left;
                var moveZ =  playerMoveDirection.back - playerMoveDirection.forward;
                var moveY =  0;


                var translateFactor = tmpPos.set(moveX, moveY, moveZ);

                translateFactor.multiplyScalar(scalingFactor);

                kObject.translateX(translateFactor.x);
                kObject.translateY(translateFactor.y);
                kObject.translateZ(translateFactor.z);
				
				kObject.getWorldPosition(tmpPos);
				kObject.getWorldQuaternion(tmpQuat);

                var physicsBody = kObject.userData.physicsBody;

                var ms = physicsBody.getMotionState();
                if ( ms ) {

                    ammoTmpPos.setValue(tmpPos.x, tmpPos.y, tmpPos.z);
                    ammoTmpQuat.setValue( tmpQuat.x, tmpQuat.y, tmpQuat.z, tmpQuat.w);

                    
                    tmpTrans.setIdentity();
                    tmpTrans.setOrigin( ammoTmpPos ); 
                    tmpTrans.setRotation( ammoTmpQuat ); 

                    ms.setWorldTransform(tmpTrans);

                }

            }

function renderFrame(){
	var deltaTime = clock.getDelta();
	updatePhysics( deltaTime );
	
	requestAnimationFrame( renderFrame );

	if ( controls.isLocked === true ) {
		raycaster.ray.origin.copy( controls.getObject().position );
		raycaster.ray.origin.y -= 10;

		//var intersections = raycaster.intersectObjects( objects );
		//var onObject = intersections.length > 0;
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
		case 38: // up
		case 87: // w
		moveForward = true;
		break;

		case 37: // left
		case 65: // a
		moveLeft = true;
		break;

		case 40: // down
		case 83: // s
		moveBackward = true;
		break;

		case 39: // right
		case 68: // d
		moveRight = true;
		break;

		case 32: // space
		if ( canJump === true ) velocity.y += 350;
		canJump = false;
		break;
	}
};

function onKeyUp( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
		moveForward = false;
		break;

		case 37: // left
		case 65: // a
		moveLeft = false;
		break;

		case 40: // down
		case 83: // s
		moveBackward = false;
		break;

		case 39: // right
		case 68: // d
		moveRight = false;
		break;
	}
};
//