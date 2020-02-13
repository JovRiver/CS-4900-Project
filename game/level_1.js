function createLevel1() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
    
    scene.fog = new THREE.Fog(0x6c7578, 150, 750);



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

	dirLight.shadow.mapSize.width = 4096;
	dirLight.shadow.mapSize.height = 4096;

	dirLight.shadow.camera.left = -500;
	dirLight.shadow.camera.right = 500;
	dirLight.shadow.camera.top = 500;
	dirLight.shadow.camera.bottom = -500;

    dirLight.shadow.camera.far = 13500;
    
    let helper = new THREE.CameraHelper( dirLight.shadow.camera );
    scene.add( helper );

    function createSkyBox() {
    scene.background = new THREE.CubeTextureLoader().setPath( './texture/skybox/' ).load(
        [
		    'bluecloud_right.jpg',
		    'bluecloud_left.jpg',
		    'bluecloud_up.jpg',
		    'bluecloud_down.jpg',
		    'bluecloud_back.jpg',
		    'bluecloud_front.jpg'
	    ]);
    }

    function createGround() {



        let groundMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/city_Ground_1.jpg')});
            groundMaterial.map.wrapS = groundMaterial.map.wrapT = THREE.RepeatWrapping;
            groundMaterial.map.repeat.set(10, 10);
        let ground = new THREE.Mesh(new THREE.BoxBufferGeometry(), groundMaterial);
            ground.position.set(0, 0, 0);
            ground.scale.set(10000, 0.5, 10000);
            ground.receiveShadow = true;

            scene.add(ground);
    }

    function createStartPlatform() {
        let pos = {x: 0, y: 50, z: 0};
        let scale = {x: 15, y: 100, z: 15};

        let mass = 0;

        //create base of starter platform
        //let base_Texture = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg')})
        let base_Texture = [
            new THREE.MeshLambertMaterial({
                map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg'),
                side: THREE.FrontSide
            }),  //Right
            new THREE.MeshLambertMaterial({
                map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg'),
                side: THREE.FrontSide
            }),  //Left
            new THREE.MeshLambertMaterial({
                map: new THREE.TextureLoader().load('texture/buildings/base_Texture.jpg'),
                side: THREE.FrontSide
            }),  //Top
            new THREE.MeshLambertMaterial({
                map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg'),
                side: THREE.FrontSide
            }),  //Bottom
            new THREE.MeshLambertMaterial({
                map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg'),
                side: THREE.FrontSide
            }),  //Front
            new THREE.MeshLambertMaterial({
                map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg'),
                side: THREE.FrontSide
            }),  //Back
        ];

        base_Texture.map.wrapS = base_Texture.map.wrapT = THREE.RepeatWrapping;
        //base_Texture.map.repeat.set(5, 5);
        let startPlatformBox = new THREE.Mesh(new THREE.BoxBufferGeometry(), base_Texture);
        startPlatformBox.position.set(pos.x, pos.y, pos.z);
        startPlatformBox.scale.set(scale.x, scale.y, scale.z);

        startPlatformBox.castShadow = true;
        startPlatformBox.receiveShadow = true;

        scene.add(startPlatformBox);

        //physics for base
        let starterBoxTransform = new Ammo.btTransform();
        starterBoxTransform.setIdentity();
        starterBoxTransform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
        starterBoxTransform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
        let starterBoxMotionState = new Ammo.btDefaultMotionState(starterBoxTransform);
        let starterBoxColShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5 + 1, scale.y * 0.5 + 0.5, scale.z * 0.5 + 1));
        starterBoxColShape.setMargin(0.05);
        let starterBoxLocalInertia = new Ammo.btVector3(0, 0, 0);
        starterBoxColShape.calculateLocalInertia(mass, starterBoxLocalInertia);
        let starterBoxRbInfo = new Ammo.btRigidBodyConstructionInfo(mass, starterBoxMotionState, starterBoxColShape, starterBoxLocalInertia);
        let starterBoxBody = new Ammo.btRigidBody(starterBoxRbInfo);
        starterBoxBody.setFriction(4);
        starterBoxBody.setRollingFriction(10);

        physicsWorld.addRigidBody(starterBoxBody, buildingGroup, playerGroup);
    }
    function createCityScape() {
        let pos = {x: 0, y: 45, z: -75};
        let scale = {x: 40, y: 90, z: 60};

        let mass = 0;

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUILDING 1

        //let building_Texture = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/building_Type_8.jpg')})
        let building_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});    
            //building_Texture.map.wrapS = building_Texture.map.wrapT = THREE.RepeatWrapping;
            //building_Texture.map.repeat.set(5, 5);
        let building = new THREE.Mesh(new THREE.BoxBufferGeometry(), building_Texture);
            building.position.set(pos.x, pos.y, pos.z);
            building.scale.set(scale.x, scale.y, scale.z);


            building.castShadow = true;
            building.receiveShadow = true;

            scene.add(building);

        //physics for base
        let building_Transform = new Ammo.btTransform();
            building_Transform.setIdentity();
            building_Transform.setOrigin(new Ammo.btVector3(pos.x, pos.y, pos.z));
            building_Transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
        let building_MotionState = new Ammo.btDefaultMotionState(building_Transform);
        let building_ColShape = new Ammo.btBoxShape(new Ammo.btVector3(scale.x * 0.5 + 1, scale.y * 0.5 + 0.5, scale.z * 0.5 + 1));
            building_ColShape.setMargin(0.05);
        let building_LocalInertia = new Ammo.btVector3(0, 0, 0);
            building_ColShape.calculateLocalInertia(mass, building_LocalInertia);
        let building_RbInfo = new Ammo.btRigidBodyConstructionInfo(mass, building_MotionState, building_ColShape, building_LocalInertia);
        let building_Body = new Ammo.btRigidBody(building_RbInfo);
            building_Body.setFriction(4);
            building_Body.setRollingFriction(10);
            physicsWorld.addRigidBody(building_Body, buildingGroup, playerGroup);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUILDING 2

        //let building_Texture = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/building_Type_8.jpg')})
        let building_Texture2 = new THREE.MeshLambertMaterial({color: 0xcbd1d1});    
            //building_Texture.map.wrapS = building_Texture.map.wrapT = THREE.RepeatWrapping;
            //building_Texture.map.repeat.set(5, 5);
        let building2 = new THREE.Mesh(new THREE.BoxBufferGeometry(), building_Texture2);
            building2.position.set(-42, 50, pos.z - 10);
            building2.scale.set(40, 100, 80);

            scene.add(building2);

        let building_Transform2 = new Ammo.btTransform();
            building_Transform2.setIdentity();
            building_Transform2.setOrigin(new Ammo.btVector3(-42, 50, pos.z - 10));
            building_Transform2.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
        let building_MotionState2 = new Ammo.btDefaultMotionState(building_Transform2);
        let building_ColShape2 = new Ammo.btBoxShape(new Ammo.btVector3(40 * 0.5 + 1, 100 * 0.5 + 0.5, 80 * 0.5 + 1));
            building_ColShape2.setMargin(0.05);
        let building_LocalInertia2 = new Ammo.btVector3(0, 0, 0);
            building_ColShape2.calculateLocalInertia(mass, building_LocalInertia2);
        let building_RbInfo2 = new Ammo.btRigidBodyConstructionInfo(mass, building_MotionState2, building_ColShape2, building_LocalInertia2);
        let building_Body2 = new Ammo.btRigidBody(building_RbInfo2);
            building_Body2.setFriction(4);
            building_Body2.setRollingFriction(10);
            physicsWorld.addRigidBody(building_Body2, buildingGroup, playerGroup);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUILDING 3

        let building_Texture3 = new THREE.MeshLambertMaterial({color: 0xcbd1d1});    
            //building_Texture.map.wrapS = building_Texture.map.wrapT = THREE.RepeatWrapping;
            //building_Texture.map.repeat.set(5, 5);
        let building3 = new THREE.Mesh(new THREE.BoxBufferGeometry(), building_Texture3);
            building3.position.set(-5, 90, pos.z - 20);
            building3.scale.set(30, 10, 20);

            scene.add(building3);

        let building_Transform3 = new Ammo.btTransform();
            building_Transform3.setIdentity();
            building_Transform3.setOrigin(new Ammo.btVector3(-5, 90, pos.z - 20));
            building_Transform3.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
        let building_MotionState3 = new Ammo.btDefaultMotionState(building_Transform3);
        let building_ColShape3 = new Ammo.btBoxShape(new Ammo.btVector3(30 * 0.5 + 1, 10 * 0.5 + 0.5, 20 * 0.5 + 1));
            building_ColShape3.setMargin(0.05);
        let building_LocalInertia3 = new Ammo.btVector3(0, 0, 0);
            building_ColShape3.calculateLocalInertia(mass, building_LocalInertia3);
        let building_RbInfo3 = new Ammo.btRigidBodyConstructionInfo(mass, building_MotionState3, building_ColShape3, building_LocalInertia3);
        let building_Body3 = new Ammo.btRigidBody(building_RbInfo3);
            building_Body3.setFriction(4);
            building_Body3.setRollingFriction(10);
            physicsWorld.addRigidBody(building_Body3, buildingGroup, playerGroup);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BUILDING 4

        let building_Texture4 = new THREE.MeshLambertMaterial({color: 0xcbd1d1});    
        let building4 = new THREE.Mesh(new THREE.BoxBufferGeometry(), building_Texture4);
        building4.position.set(50, 60, pos.z);
        building4.scale.set(50, 120, 60);

        scene.add(building4);

        let building_Transform4 = new Ammo.btTransform();
            building_Transform4.setIdentity();
            building_Transform4.setOrigin(new Ammo.btVector3(50, 60, pos.z));
            building_Transform4.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
        let building_MotionState4 = new Ammo.btDefaultMotionState(building_Transform4);
        let building_ColShape4 = new Ammo.btBoxShape(new Ammo.btVector3(50 * 0.5 + 1, 120 * 0.5 + 0.5, 60 * 0.5 + 1));
            building_ColShape4.setMargin(0.05);
        let building_LocalInertia4 = new Ammo.btVector3(0, 0, 0);
            building_ColShape4.calculateLocalInertia(mass, building_LocalInertia4);
        let building_RbInfo4 = new Ammo.btRigidBodyConstructionInfo(mass, building_MotionState4, building_ColShape4, building_LocalInertia4);
        let building_Body4 = new Ammo.btRigidBody(building_RbInfo4);
            building_Body4.setFriction(4);
            building_Body4.setRollingFriction(10);
            physicsWorld.addRigidBody(building_Body4, buildingGroup, playerGroup);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
    }

    setupPhysicsWorld();
    initDebug();
    
    createSkyBox();
    createGround();
    createStartPlatform();
    createCityScape();
}
