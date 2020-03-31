let animationNum = 0,secondLoopBool = false, anims;

function createLevel1() {
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    //scene.fog = new THREE.Fog(0x6c7578, 150, 750);

    // add hemisphere light
    let hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.1 );
    hemiLight.color.setHSL( 0.6, 0.6, 0.6 );
    hemiLight.groundColor.setHSL( 0.1, 1, 0.4 );
    hemiLight.position.set( 0, 50, 0 );

    scene.add( hemiLight );

    var light = new THREE.AmbientLight( 0x404040, 0.7 ); // soft white light
    scene.add( light );

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
    //let helper = new THREE.CameraHelper( dirLight.shadow.camera );

    scene.add( dirLight );
    //scene.add( helper );


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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //  NOTE, THE PLAYER CAN JUMP 45 UNITS LONG AND 5 UNITS HIGH

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function createGround() {
        /*  let groundMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/city_Ground_1.jpg')});
        groundMaterial.map.wrapS = groundMaterial.map.wrapT = THREE.RepeatWrapping;
        groundMaterial.map.repeat.set(20, 20);
        let ground = new THREE.Mesh(new THREE.BoxBufferGeometry(), groundMaterial);
        ground.position.set(0, 0, 0);
        ground.scale.set(10000, 0.5, 10000);
        ground.receiveShadow = true;

        scene.add(ground);
        */
    }

    function create_Course() {
        let scale, pos, quat, texture, has_Boundary;

        //PLATFORMS DENOTED BY P#

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // START PLATFORM

        scale = {x: 20, y: 1, z: 20};
        pos = {x: 0, y: 99.5, z: 0};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P1

        scale = {x: 10, y: 1, z: 40};
        pos = {x: -5, y: 99.5, z: -60};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P2

        scale = {x: 5, y: 1, z: 20};
        pos = {x: -2.5, y: 103.5, z: -70};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P3

        scale = {x: 20, y: 1, z: 5};
        pos = {x: 0, y: 103.5, z: -112.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P4

        scale = {x: 20, y: 1, z: 5};
        pos = {x: 0, y: 101.5, z: -117.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P5

        scale = {x: 20, y: 1, z: 5};
        pos = {x: 0, y: 99.5, z: -122.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P6

        scale = {x: 20, y: 1, z: 5};
        pos = {x: 0, y: 97.5, z: -127.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P7

        scale = {x: 60, y: 1, z: 60};
        pos = {x: 0, y: 95.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P8

        scale = {x: 60, y: 1, z: 60};
        pos = {x: 0, y: 120.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P9

        scale = {x: 5, y: 1, z: 20};
        pos = {x: -32.5, y: 97.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P10

        scale = {x: 5, y: 1, z: 20};
        pos = {x: -37.5, y: 99.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P11

        scale = {x: 5, y: 1, z: 20};
        pos = {x: -42.5, y: 101.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P12

        scale = {x: 5, y: 1, z: 20};
        pos = {x: -47.5, y: 103.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P13

        scale = {x: 5, y: 1, z: 20};
        pos = {x: 32.5, y: 97.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P14

        scale = {x: 5, y: 1, z: 20};
        pos = {x: 37.5, y: 99.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P15

        scale = {x: 5, y: 1, z: 20};
        pos = {x: 42.5, y: 101.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P16

        scale = {x: 5, y: 1, z: 20};
        pos = {x: 47.5, y: 103.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P17

        scale = {x: 20, y: 1, z: 20};
        pos = {x: 60, y: 103.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P18

        scale = {x: 20, y: 1, z: 20};
        pos = {x: -60, y: 103.5, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P19

        scale = {x: 20, y: 1, z: 10};
        pos = {x: 0, y: 95.5, z: -345};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P20A

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 95.7, z: -351.15};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P20B

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 95.9, z: -353.65};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P21A

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 96.1, z: -356.15};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P21B

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 96.3, z: -358.65};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P22A

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 96.5, z: -361.15};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P22B

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 96.7, z: -363.65};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P23A

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 96.9, z: -366.15};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P23B

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 97.1, z: -368.65};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P24A

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 97.3, z: -371.15};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P24B

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 97.5, z: -373.65};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P25A

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 97.7, z: -376.15};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P25B

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 97.9, z: -378.65};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P26A

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 98.1, z: -381.15};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P26B

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 98.3, z: -383.65};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P27A

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 98.5, z: -386.15};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P27B

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 98.7, z: -388.65};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P28A

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 98.9, z: -391.15};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P28B

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 99.1, z: -393.65};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P29A

        scale = {x: 20, y: 1, z: 2.5};
        pos = {x: 0, y: 99.3, z: -396.15};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P29B

        scale = {x: 20, y: 1, z: 2.75};
        pos = {x: 0, y: 99.5, z: -398.65};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P30

        scale = {x: 20, y: 1, z: 40};
        pos = {x: 0, y: 99.5, z: -420};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    function create_Walls() {
        let scale, pos, quat, has_Boundary;

        // WALLS DENOTED BY W#

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W1A
        
        scale = {x: 50, y: 11, z: 1};
        pos = {x: -40.5, y: 114, z: -119.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W1B
        
        scale = {x: 50, y: 11, z: 1};
        pos = {x: -40.5, y: 100, z: -119.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W2A
        
        scale = {x: 50, y: 11, z: 1};
        pos = {x: 40.5, y: 114, z: -119.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W2B
        
        scale = {x: 50, y: 11, z: 1};
        pos = {x: 40.5, y: 100, z: -119.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W3A
        
        scale = {x: 1, y: 11, z: 60};
        pos = {x: -89.5, y: 100, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W3B
        
        scale = {x: 1, y: 11, z: 60};
        pos = {x: -89.5, y: 114, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W4A
        
        scale = {x: 1, y: 11, z: 60};
        pos = {x: 89.5, y: 100, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W4B
        
        scale = {x: 1, y: 11, z: 60};
        pos = {x: 89.5, y: 114, z: -160};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W5A
        
        scale = {x: 50, y: 11, z: 1};
        pos = {x: -40.5, y: 100, z: -200.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W5B
        
        scale = {x: 50, y: 11, z: 1};
        pos = {x: -40.5, y: 114, z: -200.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W6A
        
        scale = {x: 50, y: 11, z: 1};
        pos = {x: 40.5, y: 100, z: -200.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W6B
        
        scale = {x: 50, y: 11, z: 1};
        pos = {x: 40.5, y: 114, z: -200.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W7
        
        scale = {x: 1, y: 11, z: 60};
        pos = {x: -10.5, y: 100, z: -240};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W8
        
        scale = {x: 1, y: 11, z: 60};
        pos = {x: 10.5, y: 100, z: -290};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    function create_Columns() {
        let rTop, rBottom, height, pos, quat, texture;

        // COLUMNS DENOTED BY C#

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C1

        rTop = 2.5;
        rBottom = 2.5;
        height = 25;

        pos = {x: -25, y: 107.5, z: -135};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C2

        rTop = 2.5;
        rBottom = 2.5;
        height = 25;

        pos = {x: -25, y: 107.5, z: -185};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C3

        rTop = 2.5;
        rBottom = 2.5;
        height = 25;

        pos = {x: 25, y: 107.5, z: -185};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C2

        rTop = 2.5;
        rBottom = 2.5;
        height = 25;

        pos = {x: 25, y: 107.5, z: -135};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    function object_Loader(){//https://threejs.org/docs/#examples/en/loaders/OBJLoader
        let loadBar = document.getElementById('load');

        //enemy models
        let catLoader = new THREE.GLTFLoader();
        catLoader.load(
            "objects/cat/catGun.glb",
            function(obj) {//onLoad, obj is a GLTF
                theMixer = new THREE.AnimationMixer(obj.scene.children[2]);//the mesh itself
                obj.name = "Enemy";

                let pos ={ x: -5, y: 103, z: -5};

                obj.scene.position.x = pos.x;
                obj.scene.position.y = pos.y;
                obj.scene.position.z = pos.z;
                obj.scene.rotation.y = -1.2;

                scene.add(obj.scene);

                let vect3 = new THREE.Vector3();
                let box = new THREE.Box3().setFromObject(obj.scene).getSize(vect3);

                let transform = new Ammo.btTransform();
                transform.setIdentity();
                transform.setOrigin( new Ammo.btVector3( pos.x, pos.y, pos.z ) );
                transform.setRotation( new Ammo.btQuaternion( 0, -.5, 0, 1 ) );
                let motionState = new Ammo.btDefaultMotionState( transform );

                colShape = new Ammo.btBoxShape(new Ammo.btVector3(box.x/3.5, box.y/3.5, box.z/3.5));
                //colShape.setMargin( 0.5 );

                let localInertia = new Ammo.btVector3( 0, 0, 0 );
                colShape.calculateLocalInertia( 1, localInertia );

                let rbInfo = new Ammo.btRigidBodyConstructionInfo( 1, motionState, colShape, localInertia );
                let objBody = new Ammo.btRigidBody( rbInfo );

                objBody.setFriction(4);
                objBody.setRollingFriction(10);

                physicsWorld.addRigidBody( objBody, playerGroup, buildingGroup );

                obj.scene.userData.physicsBody = objBody;


                rigidBodies.push(obj.scene);

                //animation for catGun
                anims = obj.animations;

                anims.forEach(function(e){
                    theMixer.clipAction(e);
                });

                theMixer.clipAction(anims[0]).play();//"death" doesn't play for some reason

                theMixer.addEventListener('loop', catAnimations);//'finished' does not count a loop ending as finished,
                //setting amount of repetitions doesn't work either, fix soon





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
                console.log(err);
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
                let pos ={ x: 5, y: 125, z: -100};
                obj.name = "Flag";
                obj.position.set(pos.x, pos.y, pos.z);//moves the mesh
                obj.scale.set( .3, .3, .3 );

                let geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
                let material = new THREE.MeshBasicMaterial( { color: 0xffff00} );
                let vect3 = new THREE.Vector3();
                let box = new THREE.Box3().setFromObject(obj).getSize(vect3);

                flag = new THREE.Mesh( geometry, material );
                flag.visible = false;

                scene.add(obj);
                scene.add( flag );
                //flag.add(obj);




                //scene.add(obj);

                let transform = new Ammo.btTransform();
                transform.setIdentity();
                transform.setOrigin( new Ammo.btVector3( pos.x, pos.y+4, pos.z ) );
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
                    document.getElementById("instructions").style.display = "";
                    document.getElementById("load").style.display = "none";

                    setupControls();//game can start with a click after external files are loaded in
                    cancelAnimationFrame(renderFrameId);
                    renderFrame();//starts the loop once the models are loaded
                }
            },
            function(err){//onError
                loadBar.innerHTML = "<h2>Error loading files.</h2>";//#bytes loaded, the header tags at the end maintain the style.
                console.log("error in loading sound");
            }
        );
    }

    function createPlayer(){
        //let pos = {x: 0, y: 105, z: 0}; // actual start
        let pos = {x: 0, y: 98.3, z: -347.5}; // test start
        resetPos = {x: 0, y: 101, z: 0};
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

    function catAnimations(e){//e contains the type action and loopDelta
        //stop the current animation
        if (secondLoopBool){//if it's on the 2nd loop, adjust the animationMixer so that we don't have to do this later
            //e.action.stop();
            animationNum++;
            if (animationNum == anims.length)
                animationNum = 0;
            //if(e.action.clip.name == "")
            //start the next animation in the queue with crossFadeFrom, the previous action is faded out while the next one is faded in
            theMixer.clipAction(anims[animationNum]).reset();
            theMixer.clipAction(anims[animationNum]).play();
            e.action.crossFadeTo(theMixer.clipAction(anims[animationNum]), .4, false);

        }
        secondLoopBool ^= true;//^ is XOR, ^= is xor equals, so it flips the boolean each time instead of using an if-else statement
        //https://stackoverflow.com/questions/2479058/how-to-make-a-boolean-variable-switch-between-true-and-false-every-time-a-method

    }
    
    function createCrosshair() {
        let spriteMap = new THREE.TextureLoader().load( "./texture/sprite/crosshair.png" );
        addSprite(spriteMap, 50, 50);
    }

    function createReset(){
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Reset box
        /*


        var uniforms, mesh;
        var textureLoader = new THREE.TextureLoader();

				uniforms = {

					"fogDensity": { value: 0.45 },
					"fogColor": { value: new THREE.Vector3( 0, 0, 0 ) },
					"time": { value: 1.0 },
					"uvScale": { value: new THREE.Vector2( 3.0, 1.0 ) },
					"texture1": { value: textureLoader.load( 'texture/lava/cloud.png' ) },
					"texture2": { value: textureLoader.load( 'texture/lava/lavatile.jpg' ) }

				};

				uniforms[ "texture1" ].value.wrapS = uniforms[ "texture1" ].value.wrapT = THREE.RepeatWrapping;
				uniforms[ "texture2" ].value.wrapS = uniforms[ "texture2" ].value.wrapT = THREE.RepeatWrapping;
                var vertexShader = createShaderFromScriptElement(gl, "vertexShader");
                var fragmentShader = createShaderFromScriptElement(gl, "fragmentShader");
				var material = new THREE.ShaderMaterial( {

					uniforms: uniforms,
					vertexShader: vertexShader,
					fragmentShader: fragmentShader

				} );

				mesh = new THREE.Mesh( new THREE.BoxBufferGeometry(), material );
                mesh.scale.set(200, 1, 200);
                mesh.position.set(0, 80, 0);
				scene.add( mesh );



        */
        texture = new THREE.MeshLambertMaterial({visible: false});
        let resetBox = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
        resetBox.scale.set(200, 1, 200);
        resetBox.position.set(0, 80, 0);
        resetBox.name ="Reset_Box";
        scene.add(resetBox);

        let transform = new Ammo.btTransform();
        transform.setIdentity();
        transform.setOrigin(new Ammo.btVector3(0, 80, 0)); //set to middle of map
        transform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
        let motionState = new Ammo.btDefaultMotionState(transform);
        let colShape = new Ammo.btBoxShape(new Ammo.btVector3(300 * 0.5 + 0.8, 1  * 0.5 + 0.5, 1000  * 0.5 + 0.8));
        let localInertia = new Ammo.btVector3(0, 0, 0);
        colShape.calculateLocalInertia(0, localInertia);
        let rbInfo = new Ammo.btRigidBodyConstructionInfo(0, motionState, colShape, localInertia);
        let body = new Ammo.btRigidBody(rbInfo);
        body.setFriction(4);
        body.setRollingFriction(10);
        resetBox.userData.physicsBody = body;
        physicsWorld.addRigidBody(body, ghostGroup, playerGroup);    // ensures player object and buildings will collide, stopping movement
        resetPlatform.push(resetBox);
        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    setupPhysicsWorld();
    initDebug();
    gamePlay = true;
    createPlayer();
    createCrosshair();
    createReset();

    createSkyBox();
    //createGround();
    create_Course();
    create_Walls();
    create_Columns();
    after_Game_Menu();

    object_Loader();
}