function createObstacles() {

    //object position variables
    var ledge1Pos = {x: 25, y: 10, z: 0};
    var ledge2Pos = {x: -5, y: 10, z: 0};
    var rampPos = {x: 25, y: 2.65, z: 16.2};
    var box1Pos = {x: 11, y: 3, z: 0};

    //object scale variables
    var ledgeScale = {x: 20, y: 1, z: 20};
    var rampScale = {x: 20, y: 1, z: 15};
    var boxScale = {x: 5, y: 5, z: 5};

    //object quaternion variables
    var quat = {x: 0, y: 0, z: 0, w: 1};
    var rampQuat = {x: Math.cos(45), y: 0, z: 0, w: 1};

    //object mass
    var mass = 0;

//three.js section

    //ledge1 creation
    var ledge1 = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xa0afa4 }));
    ledge1.position.set(ledge1Pos.x, ledge1Pos.y, ledge1Pos.z);
    ledge1.scale.set(ledgeScale.x, ledgeScale.y, ledgeScale.z);
    ledge1.castShadow = true;
    ledge1.receiveShadow = true;

    scene.add(ledge1);

    //ledge2 creation
    var ledge2 = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xa0afa4 }));
    ledge2.position.set(ledge2Pos.x, ledge2Pos.y, ledge2Pos.z);
    ledge2.scale.set(ledgeScale.x, ledgeScale.y, ledgeScale.z);
    ledge2.castShadow = true;
    ledge2.receiveShadow = true;

    scene.add(ledge2);

    //box1Test creation
    var box1Test = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xa0afa4 }));
    box1Test.position.set(box1Pos.x, box1Pos.y, box1Pos.z);
    box1Test.scale.set(boxScale.x, boxScale.y, boxScale.z);
    box1Test.castShadow = true;
    box1Test.receiveShadow = true;

    scene.add(box1Test);

    //ramp creation
    var ramp = new THREE.Mesh(new THREE.BoxBufferGeometry(), new THREE.MeshPhongMaterial({ color: 0xa0afa4 }));
    ramp.position.set(rampPos.x, rampPos.y, rampPos.z);
    ramp.scale.set(ledgeScale.x, ledgeScale.y, ledgeScale.z);
    ramp.castShadow = true;
    ramp.receiveShadow = true;
    ramp.rotation.x = Math.sin(45);

    scene.add(ramp);

//ammo.js section

    //ledge1 transform
    var ledge1Transform = new Ammo.btTransform();
    ledge1Transform.setIdentity();
    ledge1Transform.setOrigin( new Ammo.btVector3( ledge1Pos.x, ledge1Pos.y, ledge1Pos.z ) );
    ledge1Transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    var ledge1MotionState = new Ammo.btDefaultMotionState( ledge1Transform );
    var ledge1ColShape = new Ammo.btBoxShape( new Ammo.btVector3( ledgeScale.x * 0.5, ledgeScale.y * 0.5, ledgeScale.z * 0.5 ) );
    ledge1ColShape.setMargin( 0.05 );
    var ledge1LocalInertia = new Ammo.btVector3( 0, 0, 0 );
    ledge1ColShape.calculateLocalInertia( mass, ledge1LocalInertia );
    var ledge1RBInfo = new Ammo.btRigidBodyConstructionInfo( mass, ledge1MotionState, ledge1ColShape, ledge1LocalInertia );
    var ledge1Body = new Ammo.btRigidBody( ledge1RBInfo );
    ledge1Body.setFriction(4);
    ledge1Body.setRollingFriction(10);

    physicsWorld.addRigidBody( ledge1Body );

    //ledge2 transform
    var ledge2Transform = new Ammo.btTransform();
    ledge2Transform.setIdentity();
    ledge2Transform.setOrigin( new Ammo.btVector3( ledge2Pos.x, ledge2Pos.y, ledge2Pos.z ) );
    ledge2Transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    var ledge2MotionState = new Ammo.btDefaultMotionState( ledge2Transform );
    var ledge2ColShape = new Ammo.btBoxShape( new Ammo.btVector3( ledgeScale.x * 0.5, ledgeScale.y * 0.5, ledgeScale.z * 0.5 ) );
    ledge2ColShape.setMargin( 0.05 );
    var ledge2LocalInertia = new Ammo.btVector3( 0, 0, 0 );
    ledge2ColShape.calculateLocalInertia( mass, ledge2LocalInertia );
    var ledge2RBInfo = new Ammo.btRigidBodyConstructionInfo( mass, ledge2MotionState, ledge2ColShape, ledge2LocalInertia );
    var ledge2Body = new Ammo.btRigidBody( ledge2RBInfo );
    ledge2Body.setFriction(4);
    ledge2Body.setRollingFriction(10);

    physicsWorld.addRigidBody( ledge2Body );

    //box1Test transform
    var box1Transform = new Ammo.btTransform();
    box1Transform.setIdentity();
    box1Transform.setOrigin( new Ammo.btVector3( box1Pos.x, box1Pos.y, box1Pos.z ) );
    box1Transform.setRotation( new Ammo.btQuaternion( quat.x, quat.y, quat.z, quat.w ) );
    var box1MotionState = new Ammo.btDefaultMotionState( box1Transform );
    var box1ColShape = new Ammo.btBoxShape( new Ammo.btVector3( boxScale.x * 0.5, boxScale.y * 0.5, boxScale.z * 0.5 ) );
    box1ColShape.setMargin( 0.05 );
    var box1LocalInertia = new Ammo.btVector3( 0, 0, 0 );
    box1ColShape.calculateLocalInertia( mass, box1LocalInertia );
    var box1RBInfo = new Ammo.btRigidBodyConstructionInfo( mass, box1MotionState, box1ColShape, box1LocalInertia );
    var box1Body = new Ammo.btRigidBody( box1RBInfo );
    box1Body.setFriction(4);
    box1Body.setRollingFriction(10);

    physicsWorld.addRigidBody( box1Body );

    //ramp transform
    var rampTransform = new Ammo.btTransform();
    rampTransform.setIdentity();
    rampTransform.setOrigin( new Ammo.btVector3( rampPos.x, rampPos.y + 1, rampPos.z - 1 ) );
    rampTransform.setRotation( new Ammo.btQuaternion( rampQuat.x, rampQuat.y, rampQuat.z, rampQuat.w ) );
    var rampMotionState = new Ammo.btDefaultMotionState( rampTransform );
    var rampColShape = new Ammo.btBoxShape( new Ammo.btVector3( rampScale.x * 0.5, rampScale.y * 0.5, rampScale.z * 0.5 ) );
    rampColShape.setMargin( 0.05 );
    var rampLocalInertia = new Ammo.btVector3( 0, 0, 0 );
    rampColShape.calculateLocalInertia( mass, rampLocalInertia );
    var rampRBInfo = new Ammo.btRigidBodyConstructionInfo( mass, rampMotionState, rampColShape, rampLocalInertia );
    var rampBody = new Ammo.btRigidBody( rampRBInfo );
    rampBody.setFriction(1);
    rampBody.setRollingFriction(10);

    physicsWorld.addRigidBody( rampBody );

}