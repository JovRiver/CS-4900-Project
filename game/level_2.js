function createLevel2() {
    let jump = 55;
    let width = 10;
    let length = 23;
    let height = 8;

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

    const manager = new THREE.LoadingManager();
    manager.onLoad = init;
    const progressbarElem = document.getElementById('load');
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
        progressbarElem.style.width = `${itemsLoaded / itemsTotal * 100 | 0}%`;
    };
    const models = {
        platform:    { url: "objects/platform/Platform.gltf", gltf: null },
        gun:    { url: "objects/gun/gun.gltf", gltf: null },
        cat:    { url: "objects/cat/catGun.glb", gltf: null },
        portal:    { url: "objects/portal/portal.gltf", gltf: null },
        star:    { url: "objects/star/star.gltf", gltf: null },
        wall:    { url: "objects/wall/wall.gltf", gltf: null },
        cloud:    { url: "objects/cloud/cloud.gltf", gltf: null },

    };

    {
        const gltfLoader = new THREE.GLTFLoader(manager);
        for (const model of Object.values(models)) {
            gltfLoader.load(model.url, (gltf) => {
                model.gltf = gltf;

            });
        }
    }

    function init() {
        setupPhysicsWorld();
        //initDebug();
        gamePlay = true;
        createLights();
        createPlayer();
        createCrosshair();
        createReset();
        createSkyBox();
        loadLevel();
        createWalls();
        createHookBox();
        gun();
        portal();
        cat();
        cloud();
    }

    function createLights(){
        // add hemisphere light
        let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 );
        hemiLight.color.setHSL( 0.6, 0.6, 0.6 );
        hemiLight.groundColor.setHSL( 0.1, 1, 0.4 );
        hemiLight.position.set( 0, 50, 0 );

        scene.add( hemiLight );

        // add directional light
        let dirLight = new THREE.DirectionalLight( 0xffffff , 0.75);
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set( -1, 1.75, 1 );
        dirLight.position.multiplyScalar( 100 );

        dirLight.castShadow = true;

        dirLight.shadow.mapSize.width = 4096;
        dirLight.shadow.mapSize.height = 4096;

        dirLight.shadow.camera.left = -500;
        dirLight.shadow.camera.right = 500;
        dirLight.shadow.camera.top = 500;
        dirLight.shadow.camera.bottom = -500;

        dirLight.shadow.camera.far = 13500;

        var light = new THREE.AmbientLight( 0x404040 ); // soft white light
        scene.add( light );

        scene.add( dirLight );
    }

    function createSkyBox() {
        let base_Texture = [
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/skybox/bluecloud_right.jpg'), side: THREE.BackSide }),  //Right
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/skybox/bluecloud_left.jpg'), side: THREE.BackSide }),  //Left
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/skybox/bluecloud_up.jpg'), side: THREE.BackSide }),  //Top
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/skybox/bluecloud_down.jpg'), side: THREE.BackSide }),  //Bottom
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/skybox/bluecloud_back.jpg'), side: THREE.BackSide }),  //Back
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/skybox/bluecloud_front.jpg'), side: THREE.BackSide }),  //Front
        ];

        let box = new THREE.Mesh(new THREE.BoxBufferGeometry(), base_Texture);
        box.scale.set(10000, 10000, 10000);
        box.position.set(0, 0, 0);

        scene.add(box);
    }

    function gun(){
        let obj = models.gun.gltf.scene.clone();
        obj.name = "Gun";
        obj.scale.set( 1/60, 1/60, 1/60 );
        obj.rotation.y = Math.PI;
        obj.position.x = 0.5;
        obj.position.y = -0.25;
        obj.position.z = -0.5;
        camera.add(obj);
        after_Game_Menu(document.getElementById('load'));
        b = true;
    }

    function portal(){
        let obj = models.portal.gltf.scene.clone();
        let pos ={ x: 290, y: 114, z: -855};




        obj.name = "Flag";
        obj.position.set(pos.x, pos.y, pos.z);//moves the mesh
        obj.scale.set( 1/12,1/12,1/12 );

        let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
        let material = new THREE.MeshBasicMaterial( { color: 0xffff00} );
        let vect3 = new THREE.Vector3();
        let box = new THREE.Box3().setFromObject(obj).getSize(vect3);

        flag = new THREE.Mesh( geometry, material );
        flag.visible = false;

        scene.add(obj);
        scene.add( flag );

        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
        transform.setRotation( new Ammo.btQuaternion( 0, 0, 0, 1 ) );
        let motionState = new Ammo.btDefaultMotionState( transform );

        colShape = new Ammo.btBoxShape(new Ammo.btVector3(box.x/2, box.y/2, box.z/2));
        colShape.setMargin( 0.5 );

        let localInertia = new Ammo.btVector3( 0, 0, 0 );
        colShape.calculateLocalInertia( 1, localInertia );

        let rbInfo = new Ammo.btRigidBodyConstructionInfo( 0, motionState, colShape, localInertia );
        let flagBody = new Ammo.btRigidBody( rbInfo );

        flagBody.setFriction(4);
        flagBody.setRollingFriction(10);

        physicsWorld.addRigidBody( flagBody, flagGroup, ghostGroup );

        flag.userData.physicsBody = flagBody;

        rigidBodies.push(flag);
    }

    function cat(){
        let obj = models.cat.gltf;
         let arr = [-6, 6,
            6, 6,
            6, -6,
            -6, -6];
        catHandle = new catHandler();
        let c = new catObj(obj, arr);

        c.addMixer(new THREE.AnimationMixer(obj.scene.children[2]));//the mesh itself

        obj.name = "Enemy";
        let pos ={x: 5, y: 105, z: 0}; //was cat's position

        obj.scene.position.x = pos.x;
        obj.scene.position.y = pos.y;
        obj.scene.position.z = pos.z;
        obj.scene.rotation.y = -1.2;

        kitty = obj;
        obj.matrixAutoUpdate = true;//changed from false


        let vect3 = new THREE.Vector3();
        let box = new THREE.Box3().setFromObject(obj.scene).getSize(vect3);

        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
        transform.setRotation( new Ammo.btQuaternion( 0, -.5, 0, 1 ) );
        let motionState = new Ammo.btDefaultMotionState( transform );

        colShape = new Ammo.btBoxShape(new Ammo.btVector3(box.x/3.5, box.y/3.5, box.z/3.5));

        let localInertia = new Ammo.btVector3( 0, 0, 0 );
        colShape.calculateLocalInertia( 1, localInertia );

        let rbInfo = new Ammo.btRigidBodyConstructionInfo( 1, motionState, colShape, localInertia );
        let objBody = new Ammo.btRigidBody( rbInfo );

        objBody.setFriction(4);
        objBody.setRollingFriction(10);

        physicsWorld.addRigidBody( objBody, playerGroup, buildingGroup );

        obj.scene.userData.physicsBody = objBody;

        rigidBodies.push(obj.scene);

        enemies.push(kitty.scene);

        scene.add(obj.scene);
        catHandle.addCat(c);
        c.setUpMixer();
    }

    function cloud(){
        let cloud = models.cloud.gltf;
        let pos = {x: 290, y: 80, z: -630};
        let quat = {x: 1, y: 0, z: 0, w: 1};
        addCloud(cloud,pos,quat);

        pos = {x: 290, y: 80, z: -750};
        quat = {x: 1, y: 0, z: 0, w: 1};
        addCloud(cloud,pos,quat);
    }

    function createCrosshair() {
        let spriteMap = new THREE.TextureLoader().load( "./texture/sprite/crosshair.png" );
        addSprite(spriteMap, 50, 50);
    }

    function createReset(){
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Reset box
        let noiseTexture = new THREE.ImageUtils.loadTexture( 'texture/lava/cloud.png' );
        noiseTexture.wrapS = noiseTexture.wrapT = THREE.RepeatWrapping;

        let lavaTexture = new THREE.ImageUtils.loadTexture( 'texture/lava/lavatile.jpg' );
        lavaTexture.wrapS = lavaTexture.wrapT = THREE.RepeatWrapping;

        customUniforms = {
            baseTexture: 	{ type: "t", value: lavaTexture },
            baseSpeed: 		{ type: "f", value: 0.05 },
            noiseTexture: 	{ type: "t", value: noiseTexture },
            noiseScale:		{ type: "f", value: 0.5337 },
            alpha: 			{ type: "f", value: 1.0 },
            time: 			{ type: "f", value: 1.0 }
        };

        // create custom material from the shader code above
        //   that is within specially labeled script tags
        let customMaterial = new THREE.ShaderMaterial(
            {
                uniforms: customUniforms,
                vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
                fragmentShader: document.getElementById( 'fragmentShader' ).textContent
            }   );

        lava = new THREE.Mesh( new THREE.BoxBufferGeometry(), customMaterial );
        lava.scale.set(800, 0.5, 1250);
        lava.position.set(0, 80, -560);
        scene.add( lava );

        texture = new THREE.MeshLambertMaterial({visible: false});
        let resetBox = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
        resetBox.scale.set(400, 0.5, 625);
        resetBox.position.set(0, 80, -560);
        resetBox.name ="Reset_Box";
        scene.add(resetBox);

        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(0, 80, -560)); //set to middle of map
        transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
        let motionState = new Ammo.btDefaultMotionState(transform);
        let colShape = new Ammo.btBoxShape(new Ammo.btVector3(400, 0.5, 625));
        let localInertia = new Ammo.btVector3(0, 0, 0);
        colShape.calculateLocalInertia(0, localInertia);
        let rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, colShape, localInertia);
        let body = new Ammo.btRigidBody(rbInfo);
        body.setFriction(4);
        body.setRollingFriction(10);
        resetBox.userData.physicsBody = body;
        physicsWorld.addRigidBody(body, ghostGroup, playerGroup);    // ensures player object and buildings will collide, stopping movement
        resetPlatform.push(resetBox);
    }

    function createPlayer(){
        let pos = {x: 0, y: 105, z: 0}; // start point
        resetPos = {x: 0, y: 105, z: 0}; //beginning of level

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

        body.setActivationState(STATE.DISABLE_DEACTIVATION);

        physicsWorld.addRigidBody( body, playerGroup, buildingGroup );

        player.userData.physicsBody = body;
        player.userData.physicsBody.set

        rigidBodies.push(player);
        a = true;
    }

    function createWalls(){
        let wall = models.wall.gltf;
        let pos = {x: -110, y: 100, z: 50};
        let quat = {x: 0, y: 1, z: 0, w: 1};
        addWall(wall, pos, 2, quat, true);

        pos = {x: 110, y: 100, z: 0};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addWall(wall, pos, 4, quat, true);

        pos = {x: 55, y: 100, z: 70};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addWall(wall, pos, 2, quat, false);

        pos = {x: 120, y: 100, z: -300};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addWall(wall, pos, 2, quat, false);

        pos = {x: -155, y: 100, z: -130};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addWall(wall, pos, 1, quat, false);

        pos = {x: -225, y: 100, z: -180};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addWall(wall, pos, 5, quat, true);

        pos = {x: -60, y: 100, z: -350};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addWall(wall, pos, 2, quat, true);

        pos = {x: 180, y: 100, z: -660};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addWall(wall, pos, 4, quat, false);

        pos = {x: 340, y: 100, z: -510};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addWall(wall, pos, 4, quat, false);

        pos = {x: 230, y: 100, z: -725};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addWall(wall, pos, 3, quat, true);

        pos = {x: 390, y: 100, z: -510};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addWall(wall, pos, 5, quat, true);

        pos = {x: 400, y: 100, z: -960};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addWall(wall, pos, 2, quat, false);


    }

    function createHookBox(){
        let box = models.star.gltf;
        let pos = {x: 5, y: 110, z: -135};
        let quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "1s");

        pos = {x: 5, y: 110, z: -165};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "2s");

        pos = {x: 5, y: 110, z: -195};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "2s");

        //Set 2
        pos = {x: -110, y: 130, z: -255};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "1s");

        pos = {x: -110, y: 130, z: -280};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "2s");

        pos = {x: -120, y: 130, z: -305};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "3s");

        //Set 3
        pos = {x: -120, y: 130, z: -350};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "1s");

        pos = {x: -110, y: 130, z: -375};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "2s");

        pos = {x: -110, y: 130, z: -400};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "3s");

        pos = {x: -110, y: 130, z: -470};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "3s");

        pos = {x: 80, y: 110, z: -560};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "3s");

        pos = {x: 110, y: 110, z: -560};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "3s");

        pos = {x: 140, y: 110, z: -560};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addStarGrapple(box, pos, quat, "3s");



    }

    function loadLevel(){
        let pos = {x: 5, y: 100, z: -10};
        let quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "1p", 2,2 );

        pos = {x: 5, y: 100, z: -80};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "2p", 2,2 );

        pos = {x: 5, y: 100, z: -240};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "3p", 2,2 );

        pos = {x: -20, y: 105, z: -220};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "4p", 1,1 );

        pos = {x: -45, y: 110, z: -220};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "5p", 1,1 );

        pos = {x: -70, y: 115, z: -220};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "5p", 1,1 );

        pos = {x: -100, y: 120, z: -220};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,1 );

        pos = {x: -150, y: 120, z: -320};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,1 );

        pos = {x: -170, y: 120, z: -320};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,1 );

        pos = {x: -110, y: 120, z: -435};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,1 );

        pos = {x: -110, y: 100, z: -550};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,2 );

        pos = {x: -75, y: 100, z: -590};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,1 );

        pos = {x: -35, y: 100, z: -560};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,2 );

        pos = {x: 0, y: 100, z: -600};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,1 );

        pos = {x: 40, y: 100, z: -560};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,1 );

        pos = {x: 215, y: 100, z: -560};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,2 );

        pos = {x: 240, y: 105, z: -560};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 1,1 );

        pos = {x: 265, y: 110, z: -560};
        quat = {x: 0, y: 0, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 1,1 );

        pos = {x: 290, y: 115, z: -560};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,2 );

        pos = {x: 290, y: 110, z: -840};
        quat = {x: 0, y: 1, z: 0, w: 1};
        addPlatform(models.platform.gltf, pos, quat, "6p", 2,2 );


     }

}