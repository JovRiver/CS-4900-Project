//variable declaration section
let physicsWorld, renderer, stats, sound, controls, rigidBodies = [], platforms = [], resetPlatform = [], tmpTrans = null;
let player = null, flag = null, playerMoveDirection = { left: 0, right: 0, forward: 0, back: 0 }, tempPlayerMoveDirection = { left: 0, right: 0, forward: 0, back: 0 };
let ammoTmpPos = null, ammoTmpQuat = null;

// collision group and detection variables
let playerGroup = 1, flagGroup = 2, buildingGroup = 3, ghostGroup = 4;
let a = false;
let b = false;
let flagCallBack = null;
let movementCallBack = null;
let resetCallBack = null;
let canJump = true;
let canMove = true;
let landing = false;
let rope = null;
let resetPos = {x: 0, y: 0, z: 0};

let customUniforms, lava;

let scene;
let camera;

let theMixer;// = new THREE.AnimationMixer();
let prevTime = performance.now();
let direction = new THREE.Vector3();
let vertex = new THREE.Vector3();
let clock = new THREE.Clock();
let gameClock =  new THREE.Clock();
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(), intersected_Object;
let startClock = true;
let gamePlay = false; // Set this value someone when game starts.

let timer = document.getElementById('clock');

let renderFrameId;
let onBox = 0;

const STATE = {
	ACTIVE_TAG : 1,
	ISLAND_SLEEPING : 2,
	WANTS_DEACTIVATION : 3,
	DISABLE_DEACTIVATION : 4,
	DISABLE_SIMULATION : 5
}

let level = 1;	//set to 0 for main menu, 1 or higher for levels

let menu_Group;	// menu_Group to hold menu items for raycaster detection
let in_Game_Menu_Group; // in_Game_Menu_Group to hold menu items for raycaster detection

//Ammojs Initialization
Ammo().then(start);

///////////////////////////////////////////////////////////////////////////////////////
//	INITIALIZATION
///////////////////////////////////////////////////////////////////////////////////////

function start (){
	tmpTrans = new Ammo.btTransform();
	ammoTmpPos = new Ammo.btVector3();
	ammoTmpQuat = new Ammo.btQuaternion();
	flagCallBack = new Ammo.ConcreteContactResultCallback();
	movementCallBack = new Ammo.ConcreteContactResultCallback();
	resetCallBack = new Ammo.ConcreteContactResultCallback();

	//Setup the renderer
	renderer = new THREE.WebGLRenderer( { antialias: false } );
	renderer.setClearColor( 0xbfd1e5 );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );

	renderer.shadowMap.enabled = true;

	setupEventHandlers();
	showStats();
	load_Manager();
}

///////////////////////////////////////////////////////////////////////////////////////
//	LOADER MANAGER
///////////////////////////////////////////////////////////////////////////////////////

function load_Manager() {
	document.getElementById("blocker").style.display = "block";
	document.getElementById("load").style.display = "none";
	document.getElementById("instructions").style.display = "none";

	scene = new THREE.Scene();
	in_Game_Menu_Group = new THREE.Group();
	menu_Group = new THREE.Group();
	rigidBodies = [];
	platforms = [];

	switch (level){
		case 0:
			document.getElementById("load").style.display = "";
			create_Start_Menu();
			break;
		case 1:
			document.getElementById("load").style.display = "";
			createLevel1();
			break;
		case 2:
			document.getElementById("instructions").style.display = "";
			createLevel2();
			break;
		case 3:
			createLevel1();
			break;
		case 4:
			createLevel1();
			break;
		case 5:
			createLevel1();
			break;
	}
}

///////////////////////////////////////////////////////////////////////////////////////
//	SYSTEM
///////////////////////////////////////////////////////////////////////////////////////

function updatePhysics( deltaTime ){
	// Step world
	physicsWorld.stepSimulation( deltaTime, 10 );
	if(a && b){
		physicsWorld.contactPairTest(player.userData.physicsBody, flag.userData.physicsBody, flagCallBack );
		physicsWorld.contactPairTest(player.userData.physicsBody, resetPlatform[0].userData.physicsBody, resetCallBack );

		let position = new THREE.Vector3();
		camera.getWorldPosition(position);
		let direction =  new THREE.Vector3(0,-1,0);
		let movementCaster = new THREE.Raycaster(); // create once and reuse
		movementCaster.set( position, direction );
		movementCaster.near = 1;
		movementCaster.far = 3;
		let intersects = movementCaster.intersectObjects( platforms );
		if(intersects.length < 1){
			canMove = false;
			canJump = false;
		}

		if(!canJump || !canMove){
			physicsWorld.contactTest(player.userData.physicsBody, movementCallBack);
		}

	}

	// Update rope
	if(rope != null){
		let softBody = rope.userData.physicsBody;
		let ropePositions = rope.geometry.attributes.position.array;
		let numVerts = ropePositions.length / 3;
		let nodes = softBody.get_m_nodes();
		let indexFloat = 0;
		for ( let i = 0; i < numVerts; i ++ ) {

			let node = nodes.at( i );
			let nodePos = node.get_m_x();
			ropePositions[ indexFloat++ ] = nodePos.x();
			ropePositions[ indexFloat++ ] = nodePos.y();
			ropePositions[ indexFloat++ ] = nodePos.z();

		}
		rope.geometry.attributes.position.needsUpdate = true;
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

movementCallBack.addSingleResult = function () {
	//todo Fix sliding off platform flying movement
	if(gamePlay){

			canMove = true;
			canJump = true;

		if(landing){
			playerMoveDirection = {left: tempPlayerMoveDirection.left, right: tempPlayerMoveDirection.right, forward: tempPlayerMoveDirection.forward, back: tempPlayerMoveDirection.back}
			landing = false;
		}

	}
}

resetCallBack.addSingleResult = function () {
	if(gamePlay){
		let velo = new Ammo.btVector3( 0, 0, 0 );
		player.userData.physicsBody.setLinearVelocity(velo);
		player.position.set(resetPos.x, resetPos.y, resetPos.z);
		let transform = new Ammo.btTransform();
		transform.setIdentity();
		transform.setOrigin(new Ammo.btVector3(resetPos.x, resetPos.y, resetPos.z));
		transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
		let motionState = new Ammo.btDefaultMotionState( transform );
		player.userData.physicsBody.setMotionState(motionState);

	}
}



flagCallBack.addSingleResult = function () {
	if(gamePlay){
		let gameTime = gameClock.getDelta();
		gamePlay = false;
		controls.unlock();

		scene.getObjectByName("background").visible = true;
		scene.getObjectByName("spotlight").visible = true;
		in_Game_Menu_Group.visible = true;


		//	ATTEMPT AT USING SPRITES

		/*
            let spriteMap = new THREE.TextureLoader().load( "texture/sprites/sprite.png" );
            let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xffffff } );
            sprite = new THREE.Sprite( spriteMaterial );

            sprite.position.set(camera.position.x, camera.position.y + 40, camera.position.z);
            sprite.center.set(0.5, 0.25);
            sprite.scale.set(50, 50, 1);
            sprite.name = "Continue";

            in_Game_Menu_Group.add(sprite);

            let spriteBackground = new THREE.TextureLoader().load("texture/sprites/background.png");
            let backgroundMaterial = new THREE.SpriteMaterial({map: spriteBackground, color: 0x000000});
            spriteB = new THREE.Sprite(backgroundMaterial);

            spriteB.position.set(camera.position.x, camera.position.y + 50, camera.position.z);
            spriteB.center.set(0.5, 0.5);
            spriteB.scale.set(150, 150, 1);

            camera.rotation.x = THREE.Math.degToRad(90);
            camera.position.y += 10;

            scene.add(in_Game_Menu_Group);
            scene.add(spriteB);
        */

	}
};

function movePlayer(){
	if(canMove){
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
}

function updateCamera(){
	camera.position.x = player.position.x;
	camera.position.y = player.position.y;
	camera.position.z = player.position.z;
}

function renderFrame(){
	let deltaTime = clock.getDelta();

	if (level > 0) {
		updatePhysics( deltaTime );
		stats.update();
		customUniforms.time.value += deltaTime;

		if(!startClock){
			let mins =  Math.floor(gameClock.getElapsedTime()/60);
			let secs;
			if( Math.floor(gameClock.getElapsedTime()%60) < 10){
				secs =  "0" + Math.floor(gameClock.getElapsedTime()%60);
			}else{
				secs =  Math.floor(gameClock.getElapsedTime()%60);
			}
			if(gamePlay)
				timer.innerHTML = "<h1>"+ mins +":" + secs + "</h1>";
		}

		if ( controls.isLocked === true ) {
			raycaster.ray.origin.copy( controls.getObject().position );
			raycaster.ray.origin.y -= 10;
		}

		if(gamePlay){
			movePlayer();
			updateCamera();
		}
		else {
			camera.position.set(0, 200, 0);
			camera.lookAt(0, 200, -80);
		}
	}
	else {
		switch(onBox) {
			case 1:
				menu_Group.getObjectByName("Level_1_Cube").rotation.y += 0.01;
				break;
			case 2:
				menu_Group.getObjectByName("Level_2_Cube").rotation.y += 0.01;
				break;
			//case 3:
			//menu_Group.getObjectByName("Level_1_Cube").rotation.y += 0.01;
			//break;
		}
	}

	if (this.debugDrawer)
		this.debugDrawer.update();

	if(theMixer && engine){ //null would be false, updates the mixer for animating the catGun object, may need to expand it when there's
		//multiple cats
		theMixer.update(deltaTime);//updates the time for the animations with the THREE.Clock object

		//update movements for the cat(s) with yuka's AI
		let delt = yukaDelta.update().getDelta();
		yukaVehicle.updateWorldMatrix(false, false);
		//let temp = followPath.calculate(yukaVehicle, new YUKA.Vector3(), delt).add(onPath.calculate(yukaVehicle, new YUKA.Vector3(), delt));
		//testYuka.position.add(temp);
		//testYuka.position.add(followPath.calculate(yukaVehicle, new YUKA.Vector3(), delt));
		//try to get it to update with the entity directly instead
		kitty.scene.position.copy(yukaVehicle.position);
		engine.update(delt);
	}

	if(bulletInScene)//animate a bullet, change to different bullets over time
		bullet.position.add(bulletChange);

	renderFrameId = requestAnimationFrame( renderFrame );

	renderer.render(scene, camera);

}

///////////////////////////////////////////////////////////////////////////////////////
//	EVENT HANDLERS / CONTROLLERS
///////////////////////////////////////////////////////////////////////////////////////

function setupEventHandlers(){
	window.addEventListener( 'resize', onWindowResize, false );
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
	document.addEventListener( 'mousedown', onMouseDown, false );
	document.addEventListener( 'mouseup', onMouseUp, false );
	window.addEventListener( 'mousemove', on_Mouse_Move, false );
	document.addEventListener('mousedown', menu_Selection, false);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseDown(event){
	if(event.which === 3){
		let direction = new THREE.Vector3(0,0,0);
		let raycasterRope = new THREE.Raycaster(); // create once and reuse
		controls.getDirection( direction );
		raycasterRope.set( controls.getObject().position, direction );
		raycasterRope.near = 1;
		raycasterRope.far = 12;
		let intersects = raycasterRope.intersectObjects( platforms );
		for ( let i = 0; i < intersects.length; i++ ) {
			if(intersects.length === 1){
				createGrapplingHook(intersects[i].point);
			}
		}
	}
}

function onMouseUp(event){
	if(event.which === 3){
		if(rope != null){
			physicsWorld.removeCollisionObject(rope.userData.physicsBody);
			scene.remove(rope);
		}
		if(scene.getObjectByName( "Hook_Box" ) != null){
			physicsWorld.removeCollisionObject(scene.getObjectByName( "Hook_Box" ).userData.physicsBody);
			scene.remove(scene.getObjectByName( "Hook_Box" ));
		}
	}
}

function onKeyDown (event ) {
	if (gamePlay) {
		switch (event.keyCode) {
			case 87: // w
				if (canMove) {
					playerMoveDirection.forward = 1;
				}
				break;

			case 65: // a
				if (canMove) {
					playerMoveDirection.left = 1;
				}
				break;

			case 83: // s
				if (canMove) {
					playerMoveDirection.back = 1;
				}
				break;

			case 68: // d
				if (canMove) {
					playerMoveDirection.right = 1;
				}
				break;

			case 32: // space
				if (canJump) {

					tempPlayerMoveDirection = {
						left: playerMoveDirection.left,
						right: playerMoveDirection.right,
						forward: playerMoveDirection.forward,
						back: playerMoveDirection.back
					}
					playerMoveDirection.forward = 0;
					playerMoveDirection.left = 0;
					playerMoveDirection.back = 0;
					playerMoveDirection.right = 0;
					canMove = false;
					canJump = false;
					landing = true;
					let resultantImpulse = new Ammo.btVector3(0, 5, 0);
					resultantImpulse.op_mul(2);
					let physicsBody = player.userData.physicsBody;
					physicsBody.applyImpulse(resultantImpulse);
				}
				break;

			case 16: // shift
				//player.scale.set(1, 1, 1);
				break;

			case 81: // q
				if (canJump) {
					tempPlayerMoveDirection = {
						left: playerMoveDirection.left,
						right: playerMoveDirection.right,
						forward: playerMoveDirection.forward,
						back: playerMoveDirection.back
					}
					playerMoveDirection.forward = 0;
					playerMoveDirection.left = 0;
					playerMoveDirection.back = 0;
					playerMoveDirection.right = 0;
					canMove = false;
					canJump = false;
					landing = true;
					let jump = new THREE.Vector3(-5, 5, 0);
					jump.applyQuaternion(camera.quaternion);
					let resultantImpulse = new Ammo.btVector3(jump.x, 5, jump.z);
					resultantImpulse.op_mul(2);
					let physicsBody = player.userData.physicsBody;
					physicsBody.applyImpulse(resultantImpulse);
				}
				break;

			case 69: // e
				if (canJump) {
					tempPlayerMoveDirection = {
						left: playerMoveDirection.left,
						right: playerMoveDirection.right,
						forward: playerMoveDirection.forward,
						back: playerMoveDirection.back
					}
					playerMoveDirection.forward = 0;
					playerMoveDirection.left = 0;
					playerMoveDirection.back = 0;
					playerMoveDirection.right = 0;
					canMove = false;
					canJump = false;
					landing = true;
					let jump = new THREE.Vector3(5, 5, 0);
					jump.applyQuaternion(camera.quaternion);
					let resultantImpulse = new Ammo.btVector3(jump.x, 5, jump.z);
					resultantImpulse.op_mul(2);
					let physicsBody = player.userData.physicsBody;
					physicsBody.applyImpulse(resultantImpulse);
				}
				break;
		}
	}
}

function onKeyUp( event ) {
	switch ( event.keyCode ) {
		case 87: // w
			playerMoveDirection.forward = 0;
			tempPlayerMoveDirection = {left: playerMoveDirection.left, right: playerMoveDirection.right, forward: playerMoveDirection.forward, back: playerMoveDirection.back}
			break;

		case 65: // a
			playerMoveDirection.left = 0;
			tempPlayerMoveDirection = {left: playerMoveDirection.left, right: playerMoveDirection.right, forward: playerMoveDirection.forward, back: playerMoveDirection.back}
			break;

		case 83: // s
			playerMoveDirection.back = 0;
			tempPlayerMoveDirection = {left: playerMoveDirection.left, right: playerMoveDirection.right, forward: playerMoveDirection.forward, back: playerMoveDirection.back}
			break;

		case 68: // d
			playerMoveDirection.right = 0;
			tempPlayerMoveDirection = {left: playerMoveDirection.left, right: playerMoveDirection.right, forward: playerMoveDirection.forward, back: playerMoveDirection.back}
			break;

		case 16: // shift
			player.scale.set(2, 2, 2);
			break;

	}
}

function menu_Selection(event) {
	if (level === 0) {
		event.preventDefault();
		raycaster.setFromCamera( mouse, camera );
		let intersects = raycaster.intersectObject(menu_Group, true);

		if (intersects.length > 0) {
			if (intersects[0].object.name === "Select_Level") {
				camera.position.y += 80;
			}

			if (intersects[0].object.name === "Level_1" || intersects[0].object.name === "Level_1_Cube") {
				level = 1;
				onBox = false;
				load_Manager();
			}

			if (intersects[0].object.name === "Level_2" || intersects[0].object.name === "Level_2_Cube") {
				level = 2;
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
				//window.close();
			}
		}
	}

	if (level > 0 && gamePlay === false) {
		event.preventDefault();
		raycaster.setFromCamera( mouse, camera );
		let intersects = raycaster.intersectObject(in_Game_Menu_Group, true);

		if (intersects.length > 0) {

			if (intersects[0].object.name === "Main_Menu") {
				level = 0;
				load_Manager();
			}

			if (intersects[0].object.name === "Continue") {
				level++;
				load_Manager();
			}

			//if (intersects[0].object.name === "Level_2" || intersects[0].object.name === "Level_2_Cube") {
			//	level = 2;
			//	load_Manager();
			//}
		}
	}
}

function on_Mouse_Move(event) {

	if (level === 0) {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster.setFromCamera( mouse, camera );
		let intersects = raycaster.intersectObject(menu_Group, true);

		if (intersects.length > 0) {
			if (intersects[0].object.name === "Level_1_Cube") {
				onBox = 1;
			}

			else if (intersects[0].object.name === "Level_2_Cube") {
				onBox = 2;
			}

			else if (intersected_Object != intersects[0].object) {
				if (intersected_Object){
					intersected_Object.material.emissive.setHex(intersected_Object.currentHex);
				}

				if (intersects[0].object.name === "Level_1"){
					onBox = 1;
				}
				else if (intersects[0].object.name === "Level_2"){
					onBox = 2;
				}
				intersected_Object = intersects[0].object;
				intersected_Object.currentHex = intersected_Object.material.emissive.getHex();
				intersected_Object.material.emissive.setHex(0xdde014);

			}
		}
		else {
			if (intersected_Object) {
				intersected_Object.material.emissive.setHex(intersected_Object.currentHex);
			}

			intersected_Object = null;
			onBox = false;
		}
	}

	if (level > 0 && gamePlay === false) {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster.setFromCamera( mouse, camera );
		let intersects = raycaster.intersectObject(in_Game_Menu_Group, true);

		if (intersects.length > 0) {
			if (intersects[0].object.name === "Congratulations" || intersects[0].object.name === "Time") {
				if (intersected_Object){
					intersected_Object.material.emissive.setHex(intersected_Object.currentHex);
				}
				intersected_Object = null;
			}

			else if (intersected_Object != intersects[0].object) {
				if (intersected_Object){
					intersected_Object.material.emissive.setHex(intersected_Object.currentHex);
				}

				intersected_Object = intersects[0].object;
				intersected_Object.currentHex = intersected_Object.material.emissive.getHex();
				intersected_Object.material.emissive.setHex(0xdde014);
			}
		}
		else {
			if (intersected_Object) {
				intersected_Object.material.emissive.setHex(intersected_Object.currentHex);
			}

			intersected_Object = null;
			onBox = false;
		}
	}
}