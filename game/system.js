function setupPhysicsWorld(){
    let collisionConfiguration  = new Ammo.btDefaultCollisionConfiguration(),
        dispatcher              = new Ammo.btCollisionDispatcher(collisionConfiguration),
        overlappingPairCache    = new Ammo.btDbvtBroadphase(),
        solver                  = new Ammo.btSequentialImpulseConstraintSolver(),
        softBodySolver = new Ammo.btDefaultSoftBodySolver();

    physicsWorld  = new Ammo.btSoftRigidDynamicsWorld (dispatcher, overlappingPairCache, solver, collisionConfiguration, softBodySolver);
    physicsWorld.setGravity(new Ammo.btVector3(0, -10, 0));
    physicsWorld.debugDrawWorld();
}

function setupControls(){
    let tempStartTime;
    let tempOldTime;
    let tempElapsedTime;
    let tempRunning;
    let tempClock =  new THREE.Clock();
    //create controls
    controls = new THREE.PointerLockControls( camera, document.body );
    let blocker = document.getElementById( 'blocker' );
    let instructions = document.getElementById( 'instructions' );
    let timer = document.getElementById('clock');
    instructions.addEventListener( 'click', function () {controls.lock();}, false );
    controls.addEventListener( 'lock', function () {
        instructions.style.display = 'none';
        blocker.style.display = 'none';
        timer.style.display = 'block';
        if (play_Music === true) {
            soundManager[0].play();
        }
        if(startClock){
            gameClock.start();
            startClock = false;
        }
        if(!startClock){

            let deltaTime = tempClock.getDelta();
            tempClock.stop();
            gameClock.startTime = tempStartTime;
            gameClock.oldTime = tempOldTime;
            gameClock.elapsedTime = tempElapsedTime - deltaTime;
            gameClock.running = tempRunning;
        }
        } );
    controls.addEventListener( 'unlock', function () {
        if(gamePlay){
            tempClock =  new THREE.Clock();
            timer.style.display = 'none';
            blocker.style.display = 'block';
            tempStartTime = gameClock.startTime;
            tempOldTime = gameClock.oldTime;
            tempElapsedTime = gameClock.elapsedTime;
            tempRunning = gameClock.running;
            tempClock.start();
        }
        instructions.style.display = ''; soundManager[0].pause();} );

    scene.add( controls.getObject() );
}

function initDebug() {
    this.debugDrawer = new THREE.AmmoDebugDrawer(scene, physicsWorld);
    this.debugDrawer.enable();
    this.debugDrawer.setDebugMode(2);
}

function showStats(){
    //stats display
    stats = new Stats();
    stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
    document.body.appendChild( stats.dom );
}

function create_Box_Geometry(scale, pos, quat, texture, has_Boundary, isPlatform) {
    let base_Texture = new THREE.MeshLambertMaterial(texture);
    base_Texture.map.wrapS = base_Texture.map.wrapT = THREE.RepeatWrapping;
    base_Texture.map.repeat.set(5, 2);

    let box = new THREE.Mesh(new THREE.BoxBufferGeometry(), base_Texture);
    box.scale.set(scale.x, scale.y, scale.z);
    box.position.set(pos.x, pos.y, pos.z);

    box.castShadow = true;
    box.receiveShadow = true;

    scene.add(box);

    if (has_Boundary === true) {
        // ammo physics bounding box for each building
        let transform = new Ammo.btTransform();
        transform.setIdentity();
        // set origin using each objects x,y,z coordinates
        transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
        transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
        let motionState = new Ammo.btDefaultMotionState(transform);
        // set bounding box using each objects x,y,z scale
        let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5 +.01, scale.y * 0.5 +.5 , scale.z * 0.5+.01));
        let localInertia = new Ammo.btVector3(0, 0, 0);
        colShape.calculateLocalInertia(0, localInertia);
        let rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, colShape, localInertia);
        let body = new Ammo.btRigidBody(rbInfo);
        body.setFriction(4);
        body.setRollingFriction(10);
        box.userData.physicsBody = body;
        physicsWorld.addRigidBody(body, buildingGroup, playerGroup);    // ensures player object and buildings will collide, stopping movement
        if (isPlatform) {
            platforms.push(box);
        }
    }
}

function createCylinderGeometry(rTop, rBottom, height, pos, quat, texture) {
    let cylinder_Geometry = new THREE.CylinderBufferGeometry(rTop, rBottom, height, 32);
    let cylinder_Texture = new THREE.MeshLambertMaterial(texture);
    cylinder_Texture.map.wrapS = cylinder_Texture.map.wrapT = THREE.RepeatWrapping;
    cylinder_Texture.map.repeat.set(2, 5);
    let cylinder = new THREE.Mesh(cylinder_Geometry, cylinder_Texture);
    cylinder.position.set(pos.x, pos.y, pos.z);

    scene.add(cylinder);

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    // set origin using each objects x,y,z coordinates
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    let motionState = new Ammo.btDefaultMotionState(transform);
    // set bounding box using each objects x,y,z scale
    let colShape = new Ammo.btBoxShape(new Ammo.btVector3(rTop * 0.8 + 1.5, height * 0.5 + 0.5, rTop * 0.8 + 1.5));
    let localInertia = new Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(0, localInertia);
    let rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, colShape, localInertia);
    let body = new Ammo.btRigidBody(rbInfo);
    body.setFriction(4);
    body.setRollingFriction(10);
    cylinder.userData.physicsBody = body;
    physicsWorld.addRigidBody(body, buildingGroup, playerGroup);    // ensures player object and buildings will collide, stopping movement
    platforms.push(cylinder);
}

function createBoundingBox(pos, scale, quat) {
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    // set origin using each objects x,y,z coordinates
    transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
    transform.setRotation(new Ammo.btQuaternion(quat.x, quat.y, quat.z, quat.w));
    let motionState = new Ammo.btDefaultMotionState(transform);
    // set bounding box using each objects x,y,z scale
    let colShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5 + 0.8, scale.y * 0.5 + 0.5, scale.z * 0.5 + 0.8));
    let localInertia = new Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(0, localInertia);
    let rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, colShape, localInertia);
    let body = new Ammo.btRigidBody(rbInfo);
    body.setFriction(4);
    body.setRollingFriction(10);
    physicsWorld.addRigidBody(body, buildingGroup, playerGroup);
}

function createGrapplingHook(vect){
    // The rope
    // Rope graphic object
    let ropeNumSegments = 10;
    let ropeLength = 10;
    let ropeMass = 0.5;
    let ropePos = player.position.clone();
    ropePos.y += 1;

    let segmentLength = ropeLength / ropeNumSegments;
    let ropeGeometry = new THREE.BufferGeometry();
    let ropeMaterial = new THREE.LineBasicMaterial( { color: 0x000000 } );
    let ropePositions = [];
    let ropeIndices = [];

    for ( let i = 0; i < ropeNumSegments + 1; i++ ) {
        ropePositions.push( ropePos.x, ropePos.y + i * segmentLength, ropePos.z );
    }

    for ( let i = 0; i < ropeNumSegments; i++ ) {
        ropeIndices.push( i, i + 1 );
    }

    ropeGeometry.setIndex( new THREE.BufferAttribute( new Uint16Array( ropeIndices ), 1 ) );
    ropeGeometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( ropePositions ), 3 ) );
    ropeGeometry.computeBoundingSphere();
    rope = new THREE.LineSegments( ropeGeometry, ropeMaterial );
    rope.castShadow = true;
    rope.receiveShadow = true;
    scene.add( rope );

    // Rope physic object
    let softBodyHelpers = new Ammo.btSoftBodyHelpers();
    let ropeStart = new Ammo.btVector3( ropePos.x, ropePos.y, ropePos.z );
    let ropeEnd = new Ammo.btVector3( vect.x, vect.y , vect.z );
    let ropeSoftBody = softBodyHelpers.CreateRope( physicsWorld.getWorldInfo(), ropeStart, ropeEnd, ropeNumSegments - 1, 0 );
    let sbConfig = ropeSoftBody.get_m_cfg();
    sbConfig.set_viterations( 10 );
    sbConfig.set_piterations( 10 );
    ropeSoftBody.setTotalMass( ropeMass, false )
    Ammo.castObject( ropeSoftBody, Ammo.btCollisionObject ).getCollisionShape().setMargin( 0 * 3 );
    physicsWorld.addSoftBody( ropeSoftBody, 1, -1 );
    rope.userData.physicsBody = ropeSoftBody;
    // Disable deactivation
    ropeSoftBody.setActivationState( STATE.DISABLE_DEACTIVATION );

    //Create temp physics object at raycast position
    let texture = new THREE.MeshLambertMaterial();
    let hookBox = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
    hookBox.scale.set(1, 1, 1);
    hookBox.position.set(vect.x, vect.y, vect.z);
    hookBox.name = "Hook_Box"
    scene.add(hookBox);

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(new Ammo.btVector3(vect.x, vect.y, vect.z));
    transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
    let motionState = new Ammo.btDefaultMotionState(transform);
    let colShape = new Ammo.btBoxShape(new Ammo.btVector3(1 * 0.5, 1 * 0.5, 1 * 0.5));
    let localInertia = new Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(0, localInertia);
    let rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, colShape, localInertia);
    let hookBoxBody = new Ammo.btRigidBody(rbInfo);
    hookBoxBody.setFriction(4);
    hookBoxBody.setRollingFriction(10);
    hookBox.userData.physicsBody = hookBoxBody;
    physicsWorld.addRigidBody(hookBoxBody, buildingGroup, playerGroup);    // ensures player object and buildings will collide, stopping movement

    // Glue the rope extremes to the ball and the arm
    let influence = 1;
    ropeSoftBody.appendAnchor( 0, player.userData.physicsBody, true, influence );
    ropeSoftBody.appendAnchor( ropeNumSegments, hookBox.userData.physicsBody, true, influence );

    let moveX =  playerMoveDirection.right - playerMoveDirection.left;
    let moveZ =  playerMoveDirection.back - playerMoveDirection.forward;
    let vertex = new THREE.Vector3(moveX,0,moveZ);
    vertex.applyQuaternion(camera.quaternion);

    let resultantImpulse = new Ammo.btVector3( vertex.x, 0, vertex.z );
    resultantImpulse.op_mul(100);

    let physicsBody = player.userData.physicsBody;
    physicsBody.setLinearVelocity ( resultantImpulse );
}

function level_1_Textures(text) {
    switch (text) {
        case 1: return {map: new THREE.TextureLoader().load('texture/level1/stone_Walkway.jpg')};

        case 2: return {map: new THREE.TextureLoader().load('texture/level1/grass.jpg')};

        case 3: return {map: new THREE.TextureLoader().load('texture/level1/grappleBox.jpg')};
    }
}

function addSprite(spriteMap, xPercent, yPercent){
    let spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap, color: 0xff0000 } );
    let sprite = new THREE.Sprite( spriteMaterial );
    let crosshairPercentX = xPercent; //middle horizontally
    let crosshairPercentY = yPercent; //middle vertically
    let crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
    let crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;
    sprite.position.x = crosshairPositionX * camera.aspect;
    sprite.position.y = crosshairPositionY;
    sprite.position.z = -1.5;
    sprite.scale.set(.1, .1, .1)

    sprite.name = "crosshair";

    scene.add(sprite);
    camera.add( sprite );
}

function loadSounds(){
    let count = 0;
    let loadBar = document.getElementById('load');

    for(let i = 0; i< 8; i++){
        let listener = new THREE.AudioListener();
        camera.add( listener );
        // create a global audio source
        soundManager[i] = new THREE.Audio( listener );
        // load a sound and set it as the Audio object's buffer
        let audioLoader = new THREE.AudioLoader();
        audioLoader.load( soundss[i].url,
            function( buffer ) {
                soundManager[i].setBuffer( buffer );
                soundManager[i].setLoop( soundss[i].loop );
                soundManager[i].setVolume( soundss[i].volume );
                count ++;
            },
            function(xhr){//onProgress
                loadBar.innerHTML = "<h2>Loading Sounds " + ((xhr.loaded / xhr.total) * count / 8  * 100).toFixed() + "%...</h2>";//#bytes loaded, the header tags at the end maintain the style.
                if((xhr.loaded / xhr.total)/8 * 100 == 100){ //if done loading loads next loader
                }
            },
            function(err){//onError
                loadBar.innerHTML = "<h2>Error loading files.</h2>";//#bytes loaded, the header tags at the end maintain the style.
                console.log("error in loading sound");
            }
        );
    }
    loadModels();
}

function loadModels(){
    let count = 0;
    let loadBar = document.getElementById('load');

    load_Manager();
}

function addPlatform(model, pos, quat, id, width, length){
    let w = 5;
    let l = 11;
    if(width === 1 && length === 1) {
        let obj = model.scene.clone();
        addPlatformHelper(pos.x,pos.y,pos.z,quat,id,obj);
    }

    if(width === 2 && length === 1) {
        let obj1 = model.scene.clone();
        let x = pos.x -w;
        addPlatformHelper(x,pos.y,pos.z,quat,id,obj1);

        let obj2 = model.scene.clone();
        x = pos.x + w;
        addPlatformHelper(x,pos.y,pos.z,quat,id,obj2);

    }

    if(width === 1 && length === 2) {
        let obj1 = model.scene.clone();
        let z = pos.z - l;
        addPlatformHelper(pos.x,pos.y,z,quat,id,obj1);

        let obj2 = model.scene.clone();
        z = pos.z + l;
        addPlatformHelper(pos.x,pos.y,z,quat,id,obj2);

    }
    if(width === 2 && length === 2) {
        let x1 = pos.x -w;
        let x2 = pos.x + w;
        let z1 = pos.z - l;
        let z2 = pos.z + l;

        let obj1 = model.scene.clone();
        addPlatformHelper(x1, pos.y, z1, quat, id, obj1);

        let obj2 = model.scene.clone();
        addPlatformHelper(x1, pos.y, z2, quat,id, obj2);

        let obj3 = model.scene.clone();
        addPlatformHelper(x2, pos.y, z1, quat,id, obj3);

        let obj4 = model.scene.clone();
        addPlatformHelper(x2, pos.y, z2, quat, id, obj4);
    }

}

function addPlatformHelper(x,y,z,quat,id,obj){
        obj.name = id;
        obj.position.x = x;
        obj.position.y = y;
        obj.position.z = z;
        obj.scale.set( 4, 4, 4 );
        scene.add(obj);

        let vect3 = new THREE.Vector3();
        let box = new THREE.Box3().setFromObject(obj).getSize(vect3);

        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin( new Ammo.btVector3( x, y, z ) );
        transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
        let motionState = new Ammo.btDefaultMotionState( transform );

        colShape = new Ammo.btBoxShape(new Ammo.btVector3(box.x/2, box.y/2, box.z/2));
        let localInertia = new Ammo.btVector3( 0, 0, 0 );
        colShape.calculateLocalInertia( 1, localInertia );
        let rbInfo = new Ammo.btRigidBodyConstructionInfo( 1, motionState, colShape, localInertia );
        let objBody = new Ammo.btRigidBody( rbInfo );
        objBody.setFriction(4);
        objBody.setRollingFriction(10);
        objBody.setActivationState( STATE.DISABLE_DEACTIVATION );
        objBody.setCollisionFlags( 2 );
        physicsWorld.addRigidBody( objBody, playerGroup, buildingGroup );
        obj.userData.physicsBody = objBody;
        rigidBodies.push(obj);
        platforms.push(obj);
    }

function addStarGrapple(model, pos, quat, id){
    let obj = model.scene.clone();
    obj.name = id;
    obj.position.x = pos.x;
    obj.position.y = pos.y;
    obj.position.z = pos.z;
    obj.scale.set( 5, 5, 5 );
    scene.add(obj);
    let vect3 = new THREE.Vector3();
    let box = new THREE.Box3().setFromObject(obj).getSize(vect3);

    let geometry = new THREE.BoxBufferGeometry( 4, 4, 2 );
    let material = new THREE.MeshBasicMaterial( { color: 0xffff00, visible: false} );
    let hook = new THREE.Mesh( geometry, material );
    hook.position.x = pos.x;
    hook.position.y = pos.y;
    hook.position.z = pos.z;

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape(new Ammo.btVector3(box.x/2, box.y/2, box.z/2));
    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( 1, localInertia );
    let rbInfo = new Ammo.btRigidBodyConstructionInfo( 1, motionState, colShape, localInertia );
    let objBody = new Ammo.btRigidBody( rbInfo );
    objBody.setFriction(4);
    objBody.setRollingFriction(10);
    objBody.setActivationState( STATE.DISABLE_DEACTIVATION );
    objBody.setCollisionFlags( 2 );
    physicsWorld.addRigidBody( objBody, playerGroup, buildingGroup );
    hook.userData.physicsBody = objBody;
    rigidBodies.push(hook);


    scene.add( hook );
    star.push(obj);

    hookSpot.push(hook);
}

function addCloud(model, pos, quat){
    let obj = model.scene.clone();
    obj.position.x = pos.x;
    obj.position.y = pos.y;
    obj.position.z = pos.z;
    obj.scale.set( 7, 7, 7 );
    scene.add(obj);

    let vect3 = new THREE.Vector3();
    let box = new THREE.Box3().setFromObject(obj).getSize(vect3);

    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
    transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    let motionState = new Ammo.btDefaultMotionState( transform );

    let colShape = new Ammo.btBoxShape(new Ammo.btVector3(box.x/2, box.y/2, box.z/2));
    let localInertia = new Ammo.btVector3( 0, 0, 0 );
    colShape.calculateLocalInertia( 1, localInertia );
    let rbInfo = new Ammo.btRigidBodyConstructionInfo( 1, motionState, colShape, localInertia );
    let objBody = new Ammo.btRigidBody( rbInfo );
    objBody.setFriction(4);
    objBody.setRollingFriction(10);
    objBody.setActivationState( STATE.DISABLE_DEACTIVATION );
    objBody.setCollisionFlags( 2 );
    physicsWorld.addRigidBody( objBody, playerGroup, buildingGroup );
    obj.userData.physicsBody = objBody;
    rigidBodies.push(obj);

    clouds.push(obj);

}

function addWall(model, pos, length, quat, which){
    let left = 110;
    let right = 20;
    for(let i = 0; i < length; i++){
        if(which){
            let obj = model.scene.clone();
            obj.position.x = pos.x;
            obj.position.y = pos.y;
            obj.position.z = pos.z - ((left) * i);
            obj.scale.set( 60, 60, 60 );
            scene.add(obj);

            let vect3 = new THREE.Vector3();
            let box = new THREE.Box3().setFromObject(obj).getSize(vect3);

            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z -  ((left) * i) ) );
            transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
            let motionState = new Ammo.btDefaultMotionState( transform );

            let colShape = new Ammo.btBoxShape(new Ammo.btVector3(box.x/2, box.y/2, box.z/2));
            let localInertia = new Ammo.btVector3( 0, 0, 0 );
            colShape.calculateLocalInertia( 1, localInertia );
            let rbInfo = new Ammo.btRigidBodyConstructionInfo( 1, motionState, colShape, localInertia );
            let objBody = new Ammo.btRigidBody( rbInfo );
            objBody.setFriction(4);
            objBody.setRollingFriction(10);
            objBody.setActivationState( STATE.DISABLE_DEACTIVATION );
            objBody.setCollisionFlags( 2 );
            physicsWorld.addRigidBody( objBody, playerGroup, buildingGroup );
            obj.userData.physicsBody = objBody;
            rigidBodies.push(obj);
        }else{
            let obj = model.scene.clone();
            obj.position.x = pos.x - ((left) * i);
            obj.position.y = pos.y;
            obj.position.z = pos.z;
            obj.scale.set( 60, 60, 60 );
            scene.add(obj);

            let vect3 = new THREE.Vector3();
            let box = new THREE.Box3().setFromObject(obj).getSize(vect3);

            let transform = new Ammo.btTransform();
            transform.setIdentity();
            transform.setOrigin( new Ammo.btVector3( pos.x - ((left) * i), pos.y, pos.z ) );
            transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
            let motionState = new Ammo.btDefaultMotionState( transform );

            let colShape = new Ammo.btBoxShape(new Ammo.btVector3(box.x/2, box.y/2, box.z/2));
            let localInertia = new Ammo.btVector3( 0, 0, 0 );
            colShape.calculateLocalInertia( 1, localInertia );
            let rbInfo = new Ammo.btRigidBodyConstructionInfo( 1, motionState, colShape, localInertia );
            let objBody = new Ammo.btRigidBody( rbInfo );
            objBody.setFriction(4);
            objBody.setRollingFriction(10);
            objBody.setActivationState( STATE.DISABLE_DEACTIVATION );
            objBody.setCollisionFlags( 2 );
            physicsWorld.addRigidBody( objBody, playerGroup, buildingGroup );
            obj.userData.physicsBody = objBody;
            rigidBodies.push(obj);
        }
    }




}