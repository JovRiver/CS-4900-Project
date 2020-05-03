//variable declaration section
let physicsWorld, renderer , moving, stats, down, controls, rigidBodies = [], platforms = [], resetPlatform = [], tmpTrans = null, playerBullets = [], enemies =[];
let player = null, flag = null, playerMoveDirection = { left: 0, right: 0, forward: 0, back: 0 }, tempPlayerMoveDirection = { left: 0, right: 0, forward: 0, back: 0 };
let ammoTmpPos = null, ammoTmpQuat = null;
let soundManager = [];
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
let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.01, 10000 );;

let prevTime = performance.now();
let direction = new THREE.Vector3();
let vertex = new THREE.Vector3();
let clock = new THREE.Clock();
let gameClock =  new THREE.Clock();
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2(), intersected_Object;
let startClock = true;
let gamePlay = false; // Set this value someone when game starts.


let renderFrameId;
let onBox = 0;

const sounds = {
	level1BGM:	{ url: './sound/level_1_Audio.mp3', loop: true, volume: 0.5},
	hook:    	{ url: './sound/hook.wav', loop: false, volume: 0.85 },
	jump:		{ url: './sound/jump.wav', loop: false, volume: 0.85 },
	shoot:		{ url: './sound/shoot.wav', loop: false, volume: 0.85 },
	enemyHit:   { url: './sound/hit.wav', loop: false, volume: 0.5 },
	walking:	{ url: './sound/walking.wav', loop: true, volume: 5 },
	playerHit:	{ url: './sound/playerHit.wav', loop: false, volume: 0.15 },
	menuBGM:	{ url: './sound/title_Audio.mp3', loop: true, volume: 0.5 },
};

let soundss = [];
soundss.push({ url: './sound/level_1_Audio.mp3', loop: true, volume: 0.5});
soundss.push({ url: './sound/hook.wav', loop: false, volume: 0.85 });
soundss.push({ url: './sound/jump.wav', loop: false, volume: 0.85 });
soundss.push({ url: './sound/shoot.wav', loop: false, volume: 0.85 });
soundss.push({ url: './sound/hit.wav', loop: false, volume: 0.5 });
soundss.push({ url: './sound/walking.wav', loop: true, volume: 5 });
soundss.push({ url: './sound/playerHit.wav', loop: false, volume: 0.15 });
soundss.push({ url: './sound/title_Audio.mp3', loop: true, volume: 0.5 });


const models = {
	enemy:	{ url: './objects/cat/catGun.glb' },
	flag:	{ url: './objects/flag/objFlag.obj' },
	gun:	{ url: './objects/gun/gun.obj' },
};

const STATE = {
	ACTIVE_TAG : 1,
	ISLAND_SLEEPING : 2,
	WANTS_DEACTIVATION : 3,
	DISABLE_DEACTIVATION : 4,
	DISABLE_SIMULATION : 5
}

let level = 1;	//set to 0 for main menu, 1 or higher for levels

let menu_Group;	// menu_Group to hold menu items for raycaster detection
let options_Group;
let options_Highlight = [];
let play_Music = true;
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
	loadSounds();
}

///////////////////////////////////////////////////////////////////////////////////////
//	LOADER MANAGER
///////////////////////////////////////////////////////////////////////////////////////

function load_Manager() {
	document.getElementById("blocker").style.display = "block";
	document.getElementById("load").style.display = "";
	document.getElementById("instructions").style.display = "none";

	scene = new THREE.Scene();
	in_Game_Menu_Group = new THREE.Group();
	menu_Group = new THREE.Group();
	options_Group = new THREE.Group();
	rigidBodies = [];
	platforms = [];

	switch (level){
		case 0:
			create_Start_Menu();
			break;
		case 1:
			createLevel1();
			break;
		case 2:
			createLevel2();
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
		let gameTime =  Math.floor( gameClock.elapsedTime);
		let score =  Math.floor(10000 - (gameTime * (50/3)));
		if(score < 0){
			score = 0;
		}
		gameClock.stop();
		gameClock =  new THREE.Clock();
		startClock = true;
		gamePlay = false;
		controls.unlock();
		let timer = document.getElementById('clock');
		timer.style.display = 'none';

		scene.getObjectByName("background").visible = true;
		scene.getObjectByName("spotlight").visible = true;
		scene.getObjectByName("crosshair").visible = false;
		scene.getObjectByName("Gun").visible = false;
		in_Game_Menu_Group.visible = true;

		createScore(score);
		console.log(score);

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

		playerBullets.forEach(b => {
			b.translateZ(-300 * deltaTime); // move along the local z-axis
			if(b.position.distanceTo(player.position) > 50){
				for(var i = 0; i < playerBullets.length; i++) {
					if(playerBullets[i].uuid == b.uuid) {
						scene.remove(b);
						playerBullets.splice(i, 1);
						break;
					}
				}
			}



		});

		if(!startClock){
			let mins =  Math.floor(gameClock.getElapsedTime()/60);
			let secs;
			if( Math.floor(gameClock.getElapsedTime()%60) < 10){
				secs =  "0" + Math.floor(gameClock.getElapsedTime()%60);
			}else{
				secs =  Math.floor(gameClock.getElapsedTime()%60);
			}
			if(gamePlay) {
				let timer = document.getElementById('clock');
				timer.innerHTML = "<h1>" + mins + ":" + secs + "</h1>";
			}
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
		}
	}

	if (this.debugDrawer)
		this.debugDrawer.update();

	if(catHandle)
		catHandle.update(deltaTime, yukaDelta);//updates multiple things involving the cat object(s). (movement, vehicles, bullets)

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
	document.addEventListener('mousedown', options_Selections, false);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseDown(event){
	if(gamePlay){
		switch (event.which) {
			case 1:{
				let pBullet = new THREE.Mesh(new THREE.SphereGeometry(0.25, 4, 2), new THREE.MeshBasicMaterial({
					color: "aqua"
				}));
				let tempPos = new THREE.Vector3;
				scene.getObjectByName("Gun").getWorldPosition(tempPos)
				pBullet.position.copy(tempPos); // start position - the tip of the weapon

				pBullet.quaternion.copy(camera.quaternion); // apply camera's quaternion
				scene.add(pBullet);
				playerBullets.push(pBullet);

				let direction = new THREE.Vector3(0,0,0);
				let raycaster = new THREE.Raycaster(); // create once and reuse
				controls.getDirection( direction );
				raycaster.set( controls.getObject().position, direction );
				raycaster.near = 0.01;
				raycaster.far = 50;
				let intersects = raycaster.intersectObjects( enemies, true   );
				for ( let i = 0; i < intersects.length; i++ ) {
					if(soundManager[4].isPlaying){
						soundManager[4].stop();
						soundManager[4].play();
					}else{
						soundManager[4].play();
					}
					//to find which cat has been shot
					catHandle.handleShot(intersects[i].object.parent);
				}

				if(soundManager[3].isPlaying){
					soundManager[3].stop();
					soundManager[3].play();
				}else{
					soundManager[3].play();
				}


				break;
			}
			case 3:{
				let direction = new THREE.Vector3(0,0,0);
				let raycasterRope = new THREE.Raycaster(); // create once and reuse
				controls.getDirection( direction );
				raycasterRope.set( controls.getObject().position, direction );
				raycasterRope.near = 1;
				raycasterRope.far = 15;
				let intersects = raycasterRope.intersectObjects( platforms );
				for ( let i = 0; i < intersects.length; i++ ) {
					if(intersects.length === 1){
						createGrapplingHook(intersects[i].point);
						physicsWorld.setGravity(new Ammo.btVector3(0, -30, 0));
						soundManager[1].play();
					}
				}
				break;
			}
		}
	}
}

function onMouseUp(event){
	if(gamePlay) {
		switch (event.which) {
			case 1: {

				break;
			}
			case 3: {
				if (rope != null) {
					physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));
					physicsWorld.removeCollisionObject(rope.userData.physicsBody);
					scene.remove(rope);
					soundManager[1].stop();
				}
				if (scene.getObjectByName("Hook_Box") != null) {
					physicsWorld.removeCollisionObject(scene.getObjectByName("Hook_Box").userData.physicsBody);
					scene.remove(scene.getObjectByName("Hook_Box"));
				}
				break;
			}
		}
	}
}

function onKeyDown (event ) {
	if (gamePlay) {
		switch (event.keyCode) {
			case 87: // w
				if (canMove) {
					playerMoveDirection.forward = 1;
					moving = true;
					if(soundManager[5].isPlaying){
					}else{
						soundManager[5].play();
					}
				}
				break;

			case 65: // a
				if (canMove) {
					playerMoveDirection.left = 1;
					moving = true;
					if(soundManager[5].isPlaying){
					}else{
						soundManager[5].play();
					}
				}
				break;

			case 83: // s
				if (canMove) {
					playerMoveDirection.back = 1;
					moving = true;
					if(soundManager[5].isPlaying){
					}else{
						soundManager[5].play();
					}
				}
				break;

			case 68: // d
				if (canMove) {
					playerMoveDirection.right = 1;
					moving = true;
					if(soundManager[5].isPlaying){
					}else{
						soundManager[5].play();
					}
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
					soundManager[2].play();
				}
				break;

			case 16: // shift
				resetPos.x = player.position.x;
				resetPos.y = player.position.y;
				resetPos.z = player.position.z;
				console.log(resetPos);
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
					resultantImpulse.op_mul(3);
					let physicsBody = player.userData.physicsBody;
					physicsBody.applyImpulse(resultantImpulse);
					soundManager[2].play();
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
					resultantImpulse.op_mul(3);
					let physicsBody = player.userData.physicsBody;
					physicsBody.applyImpulse(resultantImpulse);
					soundManager[2].play();
				}
				break;
		}
	}
}

function onKeyUp( event ) {
	switch ( event.keyCode ) {
		case 87: // w
			playerMoveDirection.forward = 0;
			moving = false;
			if(!moving){
				soundManager[5].stop();
			}
			tempPlayerMoveDirection = {left: playerMoveDirection.left, right: playerMoveDirection.right, forward: playerMoveDirection.forward, back: playerMoveDirection.back}
			break;

		case 65: // a
			playerMoveDirection.left = 0;
			moving = false;
			if(!moving){
				soundManager[5].stop();
			}
			tempPlayerMoveDirection = {left: playerMoveDirection.left, right: playerMoveDirection.right, forward: playerMoveDirection.forward, back: playerMoveDirection.back}
			break;

		case 83: // s
			playerMoveDirection.back = 0;
			moving = false;
			if(!moving){
				soundManager[5].stop();
			}
			tempPlayerMoveDirection = {left: playerMoveDirection.left, right: playerMoveDirection.right, forward: playerMoveDirection.forward, back: playerMoveDirection.back}
			break;

		case 68: // d
			playerMoveDirection.right = 0;
			moving = false;
			if(!moving){
				soundManager[5].stop();
			}
			tempPlayerMoveDirection = {left: playerMoveDirection.left, right: playerMoveDirection.right, forward: playerMoveDirection.forward, back: playerMoveDirection.back}
			break;

		case 16: // shift

			break;
	}
}

function menu_Selection(event) {
	if (level === 0) {
		event.preventDefault();
		raycaster.setFromCamera( mouse, camera );
		let intersects = raycaster.intersectObject(menu_Group, true);

		if (intersects.length > 0) {
			if (intersects[0].object.name === "Press_Start") {
				camera.position.set(0,-10, 50);
				camera.lookAt(0,0,0);
				setTimeout(function () {soundManager[7].play();}, 500);
			}

			if (intersects[0].object.name === "Select_Level") {
				camera.position.y += 80;
			}

			if (intersects[0].object.name === "Level_1" || intersects[0].object.name === "Level_1_Cube") {
				level = 1;
				soundManager[7].stop();
				onBox = false;
				load_Manager();
			}

			if (intersects[0].object.name === "Level_2" || intersects[0].object.name === "Level_2_Cube") {
				level = 2;
				soundManager[7].stop();
				load_Manager();
			}

			if (intersects[0].object.name === "Options") {
				camera.position.y -= 80;
			}

			if (intersects[0].object.name === "Back_Level" || intersects[0].object.name === "Back_Options") {
				camera.position.set(0,-10,50);
				camera.lookAt(0, 0, 0);
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
				if (play_Music === true) {
					soundManager[7].play();
				}
				load_Manager();
			}

			if (intersects[0].object.name === "Continue") {
				level++;
				load_Manager();
			}
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
			if (intersects[0].object.name === "Congratulations" || intersects[0].object.name === "Time" || intersects[0].object.name === "Score") {
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

function options_Selections(event) {
	if (level === 0) {
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

		raycaster.setFromCamera( mouse, camera );
		let intersects = raycaster.intersectObject(options_Group, true);

		if (intersects.length > 0) {

			// MASTER VOLUME

			if (intersects[0].object.name === "MV0") {
				play_Music = false;
				soundManager[7].stop();

				for (let i = 0; i < 8; i++) {
					soundManager[i].setVolume(0.0);
				}

				options_Highlight[0].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[0] = intersects[0].object;
			}

			if (intersects[0].object.name === "MV1") {
				play_Music = true;
				if (!soundManager[7].isPlaying) {
					soundManager[7].play();
				}

				for (let i = 0; i < 8; i++) {
					if (intersects[0].object.name < options_Highlight[0].name) {
						let j = options_Highlight[0].name.charAt(2) - intersects[0].object.name.charAt(2);
						soundManager[i].setVolume(soundManager[i].getVolume() - j * (soundss[i].volume * 0.1));
					}
					else if (intersects[0].object.name > options_Highlight[0].name) {
						let j = intersects[0].object.name.charAt(2) - options_Highlight[0].name.charAt(2);
						soundManager[i].setVolume(soundManager[i].getVolume() + j * (soundss[i].volume * 0.1));
					}
				}
				options_Highlight[0].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[0] = intersects[0].object;
			}

			if (intersects[0].object.name === "MV2") {
				play_Music = true;
				if (!soundManager[7].isPlaying) {
					soundManager[7].play();
				}

				for (let i = 0; i < 8; i++) {
					if (intersects[0].object.name < options_Highlight[0].name) {
						let j = options_Highlight[0].name.charAt(2) - intersects[0].object.name.charAt(2);
						soundManager[i].setVolume(soundManager[i].getVolume() - j * (soundss[i].volume * 0.1));
					}
					else if (intersects[0].object.name > options_Highlight[0].name) {
						let j = intersects[0].object.name.charAt(2) - options_Highlight[0].name.charAt(2);
						soundManager[i].setVolume(soundManager[i].getVolume() + j * (soundss[i].volume * 0.1));
					}
				}
				options_Highlight[0].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[0] = intersects[0].object;
			}

			if (intersects[0].object.name === "MV3") {
				play_Music = true;
				if (!soundManager[7].isPlaying) {
					soundManager[7].play();
				}

				for (let i = 0; i < 8; i++) {
					if (intersects[0].object.name < options_Highlight[0].name) {
						let j = options_Highlight[0].name.charAt(2) - intersects[0].object.name.charAt(2);
						soundManager[i].setVolume(soundManager[i].getVolume() - j * (soundss[i].volume * 0.1));
					}
					else if (intersects[0].object.name > options_Highlight[0].name) {
						let j = intersects[0].object.name.charAt(2) - options_Highlight[0].name.charAt(2);
						soundManager[i].setVolume(soundManager[i].getVolume() + j * (soundss[i].volume * 0.1));
					}
				}
				options_Highlight[0].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[0] = intersects[0].object;
			}

			if (intersects[0].object.name === "MV4") {
				play_Music = true;
				if (!soundManager[7].isPlaying) {
					soundManager[7].play();
				}

				for (let i = 0; i < 8; i++) {
					if (intersects[0].object.name < options_Highlight[0].name) {
						let j = options_Highlight[0].name.charAt(2) - intersects[0].object.name.charAt(2);
						soundManager[i].setVolume(soundManager[i].getVolume() - j * (soundss[i].volume * 0.1));
					}
					else if (intersects[0].object.name > options_Highlight[0].name) {
						let j = intersects[0].object.name.charAt(2) - options_Highlight[0].name.charAt(2);
						soundManager[i].setVolume(soundManager[i].getVolume() + j * (soundss[i].volume * 0.1));
					}
				}
				options_Highlight[0].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[0] = intersects[0].object;
			}

			if (intersects[0].object.name === "MV5") {
				play_Music = true;
				if (!soundManager[7].isPlaying) {
					soundManager[7].play();
				}
				
				for (let i = 0; i < 8; i++) {
					if (intersects[0].object.name > options_Highlight[0].name) {
						let j = intersects[0].object.name.charAt(2) - options_Highlight[0].name.charAt(2);
						soundManager[i].setVolume(soundManager[i].getVolume() + j * (soundss[i].volume * 0.1));
					}
				}
				options_Highlight[0].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[0] = intersects[0].object;
			}

			////////////////////////////////////////////////////////////////////////////////////////////////////
			// BGM

			if (intersects[0].object.name === "BGM0") {
				play_Music = false;
				soundManager[7].stop();

				soundManager[0].setVolume(0.0);
				soundManager[7].setVolume(0.0);
				
				options_Highlight[1].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[1] = intersects[0].object;
			}

			if (intersects[0].object.name === "BGM1") {
				play_Music = true;
				if (!soundManager[7].isPlaying) {
					soundManager[7].play();
				}

				if (intersects[0].object.name < options_Highlight[1].name) {
					let j = options_Highlight[1].name.charAt(3) - intersects[0].object.name.charAt(3);
					soundManager[0].setVolume(soundManager[0].getVolume() - j * (soundss[0].volume * 0.1));
				}
				else if (intersects[0].object.name > options_Highlight[1].name) {
					let j = intersects[0].object.name.charAt(3) - options_Highlight[1].name.charAt(3);
					soundManager[0].setVolume(soundManager[0].getVolume() + j * (soundss[0].volume * 0.1));
				}

				if (intersects[0].object.name < options_Highlight[1].name) {
					let j = options_Highlight[1].name.charAt(3) - intersects[0].object.name.charAt(3);
					soundManager[7].setVolume(soundManager[7].getVolume() - j * (soundss[7].volume * 0.1));
				}
				else if (intersects[0].object.name > options_Highlight[1].name) {
					let j = intersects[0].object.name.charAt(3) - options_Highlight[1].name.charAt(3);
					soundManager[7].setVolume(soundManager[7].getVolume() + j * (soundss[7].volume * 0.1));
				}
				
				options_Highlight[1].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[1] = intersects[0].object;
			}

			if (intersects[0].object.name === "BGM2") {
				play_Music = true;
				if (!soundManager[7].isPlaying) {
					soundManager[7].play();
				}

				if (intersects[0].object.name < options_Highlight[1].name) {
					let j = options_Highlight[1].name.charAt(3) - intersects[0].object.name.charAt(3);
					soundManager[0].setVolume(soundManager[0].getVolume() - j * (soundss[0].volume * 0.1));
				}
				else if (intersects[0].object.name > options_Highlight[1].name) {
					let j = intersects[0].object.name.charAt(3) - options_Highlight[1].name.charAt(3);
					soundManager[0].setVolume(soundManager[0].getVolume() + j * (soundss[0].volume * 0.1));
				}

				if (intersects[0].object.name < options_Highlight[1].name) {
					let j = options_Highlight[1].name.charAt(3) - intersects[0].object.name.charAt(3);
					soundManager[7].setVolume(soundManager[7].getVolume() - j * (soundss[7].volume * 0.1));
				}
				else if (intersects[0].object.name > options_Highlight[1].name) {
					let j = intersects[0].object.name.charAt(3) - options_Highlight[1].name.charAt(3);
					soundManager[7].setVolume(soundManager[7].getVolume() + j * (soundss[7].volume * 0.1));
				}
				
				options_Highlight[1].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[1] = intersects[0].object;
			}

			if (intersects[0].object.name === "BGM3") {
				play_Music = true;
				if (!soundManager[7].isPlaying) {
					soundManager[7].play();
				}

				if (intersects[0].object.name < options_Highlight[1].name) {
					let j = options_Highlight[1].name.charAt(3) - intersects[0].object.name.charAt(3);
					soundManager[0].setVolume(soundManager[0].getVolume() - j * (soundss[0].volume * 0.1));
				}
				else if (intersects[0].object.name > options_Highlight[1].name) {
					let j = intersects[0].object.name.charAt(3) - options_Highlight[1].name.charAt(3);
					soundManager[0].setVolume(soundManager[0].getVolume() + j * (soundss[0].volume * 0.1));
				}

				if (intersects[0].object.name < options_Highlight[1].name) {
					let j = options_Highlight[1].name.charAt(3) - intersects[0].object.name.charAt(3);
					soundManager[7].setVolume(soundManager[7].getVolume() - j * (soundss[7].volume * 0.1));
				}
				else if (intersects[0].object.name > options_Highlight[1].name) {
					let j = intersects[0].object.name.charAt(3) - options_Highlight[1].name.charAt(3);
					soundManager[7].setVolume(soundManager[7].getVolume() + j * (soundss[7].volume * 0.1));
				}
				
				options_Highlight[1].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[1] = intersects[0].object;
			}

			if (intersects[0].object.name === "BGM4") {
				play_Music = true;
				if (!soundManager[7].isPlaying) {
					soundManager[7].play();
				}

				if (intersects[0].object.name < options_Highlight[1].name) {
					let j = options_Highlight[1].name.charAt(3) - intersects[0].object.name.charAt(3);
					soundManager[0].setVolume(soundManager[0].getVolume() - j * (soundss[0].volume * 0.1));
				}
				else if (intersects[0].object.name > options_Highlight[1].name) {
					let j = intersects[0].object.name.charAt(3) - options_Highlight[1].name.charAt(3);
					soundManager[0].setVolume(soundManager[0].getVolume() + j * (soundss[0].volume * 0.1));
				}

				if (intersects[0].object.name < options_Highlight[1].name) {
					let j = options_Highlight[1].name.charAt(3) - intersects[0].object.name.charAt(3);
					soundManager[7].setVolume(soundManager[7].getVolume() - j * (soundss[7].volume * 0.1));
				}
				else if (intersects[0].object.name > options_Highlight[1].name) {
					let j = intersects[0].object.name.charAt(3) - options_Highlight[1].name.charAt(3);
					soundManager[7].setVolume(soundManager[7].getVolume() + j * (soundss[7].volume * 0.1));
				}
				
				options_Highlight[1].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[1] = intersects[0].object;
			}

			if (intersects[0].object.name === "BGM5") {
				play_Music = true;
				if (!soundManager[7].isPlaying) {
					soundManager[7].play();
				}

				if (intersects[0].object.name > options_Highlight[1].name) {
					let j = intersects[0].object.name.charAt(3) - options_Highlight[1].name.charAt(3);
					soundManager[0].setVolume(soundManager[0].getVolume() + j * (soundss[0].volume * 0.1));
					soundManager[7].setVolume(soundManager[7].getVolume() + j * (soundss[7].volume * 0.1));
				}
				
				options_Highlight[1].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[1] = intersects[0].object;
			}

			/////////////////////////////////////////////////////////////////////////////////////////////////
			// SOUND VOLUME

			if (intersects[0].object.name === "S0") {
				for (let i = 1; i < 7; i++) {
					soundManager[i].setVolume(0.0);
				}

				options_Highlight[2].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[2] = intersects[0].object;
			}

			if (intersects[0].object.name === "S1") {
				for (let i = 1; i < 7; i++) {
					if (intersects[0].object.name < options_Highlight[2].name) {
						let j = options_Highlight[2].name.charAt(1) - intersects[0].object.name.charAt(1);
						soundManager[i].setVolume(soundManager[i].getVolume() - j * (soundss[i].volume * 0.2));
					}
					else if (intersects[0].object.name > options_Highlight[2].name) {
						let j = intersects[0].object.name.charAt(1) - options_Highlight[2].name.charAt(1);
						soundManager[i].setVolume(soundManager[i].getVolume() + j * (soundss[i].volume * 0.2));
					}
				}
				options_Highlight[2].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[2] = intersects[0].object;
			}

			if (intersects[0].object.name === "S2") {
				for (let i = 1; i < 7; i++) {
					if (intersects[0].object.name < options_Highlight[2].name) {
						let j = options_Highlight[2].name.charAt(1) - intersects[0].object.name.charAt(1);
						soundManager[i].setVolume(soundManager[i].getVolume() - j * (soundss[i].volume * 0.2));
					}
					else if (intersects[0].object.name > options_Highlight[2].name) {
						let j = intersects[0].object.name.charAt(1) - options_Highlight[2].name.charAt(1);
						soundManager[i].setVolume(soundManager[i].getVolume() + j * (soundss[i].volume * 0.2));
					}
				}
				options_Highlight[2].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[2] = intersects[0].object;
			}

			if (intersects[0].object.name === "S3") {
				for (let i = 1; i < 7; i++) {
					if (intersects[0].object.name < options_Highlight[2].name) {
						let j = options_Highlight[2].name.charAt(1) - intersects[0].object.name.charAt(1);
						soundManager[i].setVolume(soundManager[i].getVolume() - j * (soundss[i].volume * 0.2));
					}
					else if (intersects[0].object.name > options_Highlight[2].name) {
						let j = intersects[0].object.name.charAt(1) - options_Highlight[2].name.charAt(1);
						soundManager[i].setVolume(soundManager[i].getVolume() + j * (soundss[i].volume * 0.2));
					}
				}
				options_Highlight[2].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[2] = intersects[0].object;
			}

			if (intersects[0].object.name === "S4") {
				for (let i = 1; i < 7; i++) {
					if (intersects[0].object.name < options_Highlight[2].name) {
						let j = options_Highlight[2].name.charAt(1) - intersects[0].object.name.charAt(1);
						soundManager[i].setVolume(soundManager[i].getVolume() - j * (soundss[i].volume * 0.2));
					}
					else if (intersects[0].object.name > options_Highlight[2].name) {
						let j = intersects[0].object.name.charAt(1) - options_Highlight[2].name.charAt(1);
						soundManager[i].setVolume(soundManager[i].getVolume() + j * (soundss[i].volume * 0.2));
					}
				}
				options_Highlight[2].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[2] = intersects[0].object;
			}

			if (intersects[0].object.name === "S5") {
				for (let i = 1; i < 7; i++) {
					if (intersects[0].object.name > options_Highlight[2].name) {
						let j = intersects[0].object.name.charAt(2) - options_Highlight[2].name.charAt(2);
						soundManager[i].setVolume(soundManager[i].getVolume() + j * (soundss[i].volume * 0.2));
					}
				}
				options_Highlight[2].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[2] = intersects[0].object;
			}

			/////////////////////////////////////////////////////////////////////////////////////////////////////
			// ANTI ALIASING

			if (intersects[0].object.name === "AA_ON") {
				renderer.antialias = true;
				options_Highlight[3].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[3] = intersects[0].object;
			}

			if (intersects[0].object.name === "AA_OFF") {
				renderer.antialias = false;
				options_Highlight[3].material.emissive.setHex({ color: 0xff0000, specular: 0xffffff });
				intersects[0].object.material.emissive.setHex(0xdde014);
				options_Highlight[3] = intersects[0].object;
			}
		}
	}
}