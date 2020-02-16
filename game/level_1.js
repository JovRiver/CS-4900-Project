function createLevel1() {
    // sets load_Menu to be invisible, and all other css styles to be visible
    document.getElementById("load_Menu").style.display = "none";
	document.getElementById("blocker").style.display = "block";
	document.getElementById("load").style.display = "";
    document.getElementById("instructions").style.display = "";
    
    // interactable array to hold interactable buildings
    let interactable = [];

    // non_Interactable array to hold non-interactable buildings
    //let non_Interactable = [];

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    scene.fog = new THREE.Fog(0x6c7578, 150, 750);

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

    // helper for directional light
    let helper = new THREE.CameraHelper( dirLight.shadow.camera );

    scene.add( dirLight );
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
            groundMaterial.map.repeat.set(20, 20);
        let ground = new THREE.Mesh(new THREE.BoxBufferGeometry(), groundMaterial);
            ground.position.set(0, 0, 0);
            ground.scale.set(10000, 0.5, 10000);
            ground.receiveShadow = true;

            scene.add(ground);
    }

    function create_Interactable_City_Scape() {

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // START BUILDING
        //let base_Texture = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/building_Type_3.jpg')})
        let base_Texture = [
            new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg'), side: THREE.FrontSide }),  //Right
            new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg'), side: THREE.FrontSide }),  //Left
            new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/base_Texture.jpg'), side: THREE.FrontSide }),  //Top
            new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg'), side: THREE.FrontSide }),  //Bottom
            new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg'), side: THREE.FrontSide }),  //Front
            new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg'), side: THREE.FrontSide }),  //Back
        ];
            base_Texture.map.wrapS = base_Texture.map.wrapT = THREE.RepeatWrapping;
          //base_Texture.map.repeat.set(5, 5);
        let start_Building = new THREE.Mesh(new THREE.BoxBufferGeometry(), base_Texture);
            start_Building.scale.set(60, 100, 20);
            start_Building.position.set(0, start_Building.scale.y / 2, 0);

            start_Building.castShadow = true;
            start_Building.receiveShadow = true;

        interactable.push(start_Building);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STARTER 1

        let s1_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let s1 = new THREE.Mesh(new THREE.BoxBufferGeometry(), s1_Texture);
            s1.scale.set(120, 120, 60);
            s1.position.set(0, s1.scale.y / 2, 40);

            s1.castShadow = true;
            s1.receiveShadow = true;

        interactable.push(s1);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STARTER 2

        let s2_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let s2 = new THREE.Mesh(new THREE.BoxBufferGeometry(), s2_Texture);
            s2.scale.set(80, 130, 80);
            s2.position.set(-100, s2.scale.y / 2, 30);

            s2.castShadow = true;
            s2.receiveShadow = true;

        interactable.push(s2);
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // STARTER 3

        let s3_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let s3 = new THREE.Mesh(new THREE.BoxBufferGeometry(), s3_Texture);
            s3.scale.set(40, 140, 80);
            s3.position.set(80, s3.scale.y / 2, 30);

            s3.castShadow = true;
            s3.receiveShadow = true;

        interactable.push(s3);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 1A

      //let building_Texture = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/building_Type_8.jpg')})
        let b1A_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});    
          //building_Texture.map.wrapS = building_Texture.map.wrapT = THREE.RepeatWrapping;
          //building_Texture.map.repeat.set(5, 5);
        let b1A = new THREE.Mesh(new THREE.BoxBufferGeometry(), b1A_Texture);
            b1A.scale.set(40, 90, 60);
            b1A.position.set(0, b1A.scale.y / 2, -70);

            b1A.castShadow = true;
            b1A.receiveShadow = true;

        interactable.push(b1A);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 1B

        //let building_Texture = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/building_Type_8.jpg')})
        let b1B_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b1B = new THREE.Mesh(new THREE.BoxBufferGeometry(), b1B_Texture);
            b1B.scale.set(30, 5, 20);
            b1B.position.set(-5, 92, -90);

            b1B.castShadow = true;
            b1B.receiveShadow = true;

        interactable.push(b1B);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 2

        let b2_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1}); 
        let b2 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b2_Texture);
            b2.scale.set(40, 100, 80);
            b2.position.set(-42, b2.scale.y / 2, -80);

            b2.castShadow = true;
            b2.receiveShadow = true;

        interactable.push(b2);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 3

        let b3_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1}); 
        let b3 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b3_Texture);
            b3.scale.set(60, 120, 60);
            b3.position.set(52, b3.scale.y / 2, -70);

            b3.castShadow = true;
            b3.receiveShadow = true;

        interactable.push(b3);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 4

        let b4_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});    
        let b4 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b4_Texture);
            b4.scale.set(40, 140, 40);
            b4.position.set(-100, b4.scale.y / 2, -60);

            b3.castShadow = true;
            b3.receiveShadow = true;

        interactable.push(b4);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 5

        let b5_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b5 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b5_Texture);
            b5.scale.set(40, 135, 40);
            b5.position.set(-100, b5.scale.y / 2, -102);

            b5.castShadow = true;
            b5.receiveShadow = true;

        interactable.push(b5);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 6

        let b6_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b6 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b6_Texture);
            b6.scale.set(60, 170, 40);
            b6.position.set(-92, b6.scale.y / 2, -150);

            b6.castShadow = true;
            b6.receiveShadow = true;

        interactable.push(b6);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 7

        let b7_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b7 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b7_Texture);
            b7.scale.set(40, 145, 40);
            b7.position.set(-82, b7.scale.y / 2, -190);

            b7.castShadow = true;
            b7.receiveShadow = true;

    interactable.push(b7);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 8

        let b8_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b8 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b8_Texture);
            b8.scale.set(10, 90, 40);
            b8.position.set(-57, b8.scale.y / 2,  -170);

            b8.castShadow = true;
            b8.receiveShadow = true;

        interactable.push(b8);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 9

        let b9_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b9 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b9_Texture);
            b9.scale.set(40, 110, 40);
            b9.position.set(-70, b9.scale.y / 2, -240);

            b9.castShadow = true;
            b9.receiveShadow = true;

        interactable.push(b9);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 10

        let b10_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b10 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b10_Texture);
            b10.scale.set(40, 100, 40);
            b10.position.set(-120, b10.scale.y / 2, -240);

            b10.castShadow = true;
            b10.receiveShadow = true;

        interactable.push(b10);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 11

        let b11_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b11 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b11_Texture);
            b11.position.set();
            b11.scale.set();

        interactable.push(b11);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 12

        let b12_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b12 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b12_Texture);
            b12.position.set();
            b12.scale.set();

        interactable.push(b12);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 13

        let b13_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b13 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b13_Texture);
            b13.position.set();
            b13.scale.set();

        interactable.push(b13);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 14

        let b14_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b14 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b14_Texture);
            b14.position.set();
            b14.scale.set();

        interactable.push(b14);
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 15

        let b15_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b15 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b15_Texture);
            b15.position.set();
            b15.scale.set();

        interactable.push(b15);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 16

        let b16_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b16 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b16_Texture);
            b16.position.set();
            b16.scale.set();

        interactable.push(b16);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 17

        let b17_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b17 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b17_Texture);
            b17.position.set();
            b17.scale.set();

        interactable.push(b17);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 18

        let b18_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b18 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b18_Texture);
            b18.position.set();
            b18.scale.set();

        interactable.push(b18);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 19
    
        let b19_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b19 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b19_Texture);
            b19.position.set();
            b19.scale.set();

        interactable.push(b19);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 20

        let b20_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b20 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b20_Texture);
            b20.position.set();
            b20.scale.set();

        interactable.push(b20);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 21

        let b21_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b21 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b21_Texture);
            b21.position.set();
            b21.scale.set();

        interactable.push(b21);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 22

        let b22_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b22 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b22_Texture);
            b22.position.set();
            b22.scale.set();

        interactable.push(b22);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 23

        let b23_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b23 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b23_Texture);
            b23.position.set();
            b23.scale.set();

        interactable.push(b23);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 24

        let b24_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b24 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b24_Texture);
            b24.position.set();
            b24.scale.set();

        interactable.push(b24);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 25

        let b25_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b25 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b25_Texture);
            b25.position.set();
            b25.scale.set();

        interactable.push(b25);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 26

        let b26_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b26 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b26_Texture);
            b26.position.set();
            b26.scale.set();

        interactable.push(b26);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 27

        let b27_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b27 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b27_Texture);
            b27.position.set();
            b27.scale.set();

        interactable.push(b27);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 28

        let b28_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b28 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b28_Texture);
            b28.position.set();
            b28.scale.set();

        interactable.push(b28);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 29

        let b29_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b29 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b29_Texture);
            b29.position.set();
            b29.scale.set();

        interactable.push(b29);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // BUILDING 30

        let b30_Texture = new THREE.MeshLambertMaterial({color: 0xcbd1d1});
        let b30 = new THREE.Mesh(new THREE.BoxBufferGeometry(), b30_Texture);
            b30.position.set();
            b30.scale.set();

        interactable.push(b30);

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  ADD ALL BUILDINGS TO SCENE
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      // for loop to loop through interactable array to add the interactable buildings to the scene and to create their corresponding bounding boxes
        for (let i = 0; i < interactable.length; i++) {
            scene.add(interactable[i]); // continuosly add interactable buildings to the scene
            
      // ammo physics bounding box for each building
        let transform = new Ammo.btTransform();
            transform.setIdentity();
            // set origin using each objects x,y,z coordinates
            transform.setOrigin(new Ammo.btVector3(interactable[i].position.x, interactable[i].position.y, interactable[i].position.z));
            transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
        let motionState = new Ammo.btDefaultMotionState(transform);
            // set bounding box using each objects x,y,z scale
        let colShape = new Ammo.btBoxShape(new Ammo.btVector3(interactable[i].scale.x * 0.5 + 0.8, interactable[i].scale.y * 0.5 + 0.5, interactable[i].scale.z * 0.5 + 0.8));
            colShape.setMargin(0.05);
        let localInertia = new Ammo.btVector3(0, 0, 0);
            colShape.calculateLocalInertia(0, localInertia);
        let rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, colShape, localInertia);
        let body = new Ammo.btRigidBody(rbInfo);
            body.setFriction(4);
            body.setRollingFriction(10);
            physicsWorld.addRigidBody(body, buildingGroup, playerGroup);    // ensures player object and buildings will collide, stopping movement
        }

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  FINISHED
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    function object_Loader(){//https://threejs.org/docs/#examples/en/loaders/OBJLoader
        //enemy models
        let loadBar = document.getElementById('load');

        //enemy models
        let catLoader = new THREE.GLTFLoader();
        catLoader.load(
            "objects/cat/catGun.glb",
            function(obj) {//onLoad, obj is a GLTF

                obj.name = "Enemy";

                obj.scene.position.y = 110;
                obj.scene.position.x = -10;
                obj.scene.position.z = -40;
                obj.scene.rotation.y = -1.2;
                /*obj.asset.position.set(5, 60, -14);//moves the mesh
                obj.asset.rotateX(.3);
                obj.asset.rotateY(-.8);
                obj.asset.rotateZ(.4);*/
                scene.add(obj.scene);
                //console.log("Made to onload");
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

    setupPhysicsWorld();
    initDebug();

    object_Loader();
    createPlayer();

    createSkyBox();
    createGround();
    create_Interactable_City_Scape();
}
