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
    scene.background = new THREE.CubeTextureLoader().setPath( 'texture/skybox/' ).load(
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

        let groundMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/base_Texture.jpg')});
            groundMaterial.map.wrapS = groundMaterial.map.wrapT = THREE.RepeatWrapping;
            groundMaterial.map.repeat.set(10, 10);
        let ground = new THREE.Mesh(new THREE.BoxBufferGeometry(), groundMaterial);
            ground.position.set(0, 0, 0);
            ground.scale.set(10000, 0.5, 10000);
            ground.receiveShadow = true;

            scene.add(ground);
    }

    function createStartPlatform() {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        let pos = {x: 0, y: 50, z: 0};
        let scale = {x: 50, y: 100, z: 50};

        let mass = 0;

        //create base of starter platform
        let base_Texture = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/building_Type_3.jpg')})
            base_Texture.map.wrapS = base_Texture.map.wrapT = THREE.RepeatWrapping;
            base_Texture.map.repeat.set(5, 5);
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
            physicsWorld.addRigidBody(starterBoxBody);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    function createCityScape() {
        let pos = {x: -150, y: 75, z: -150};
        let scale = {x: 100, y: 150, z: 100};

        let mass = 0;

        //create base of starter platform
        let building_Texture = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/building_Type_8.jpg')})
            building_Texture.map.wrapS = building_Texture.map.wrapT = THREE.RepeatWrapping;
            building_Texture.map.repeat.set(5, 5);
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
            physicsWorld.addRigidBody(building_Body);
    }

    setupPhysicsWorld();
    initDebug();
    
    createSkyBox();
    createGround();
    createStartPlatform();
    createCityScape();
}
