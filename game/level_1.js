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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 1 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 1 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 2 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P31

        scale = {x: 25, y: 2.5, z: 5.5};
        pos = {x: 0, y: 107.5, z: -420};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P32

        scale = {x: 20, y: 11, z: 4.5};
        pos = {x: 0, y: 93.5, z: -420};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P33

        scale = {x: 20, y: 11, z: 10};
        pos = {x: 0, y: 93.5, z: -435};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P34

        scale = {x: 120, y: 1, z: 30};
        pos = {x: 0, y: 91.5, z: -435};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P35A

        scale = {x: 30, y: 1, z: 80};
        pos = {x: -45, y: 91.5, z: -490};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P35B

        scale = {x: 30, y: 1, z: 80};
        pos = {x: -45, y: 91.5, z: -570};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P36A

        scale = {x: 30, y: 1, z: 80};
        pos = {x: 45, y: 91.5, z: -490};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P36B

        scale = {x: 30, y: 1, z: 80};
        pos = {x: 45, y: 91.5, z: -570};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P37

        scale = {x: 120, y: 1, z: 30};
        pos = {x: 0, y: 91.5, z: -625};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P38

        scale = {x: 10, y: 1, z: 30};
        pos = {x: 0, y: 91.5, z: -465};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P39

        scale = {x: 60, y: 1, z: 10};
        pos = {x: 0, y: 91.5, z: -485};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P40

        scale = {x: 10, y: 1, z: 30};
        pos = {x: 0, y: 91.5, z: -505};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P41

        scale = {x: 20, y: 1, z: 10};
        pos = {x: -20, y: 91.5, z: -530};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P42

        scale = {x: 20, y: 1, z: 10};
        pos = {x: 20, y: 91.5, z: -530};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P43

        scale = {x: 10, y: 1, z: 30};
        pos = {x: 0, y: 91.5, z: -555};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P44

        scale = {x: 60, y: 1, z: 10};
        pos = {x: 0, y: 91.5, z: -575};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P45

        scale = {x: 10, y: 1, z: 30};
        pos = {x: 0, y: 91.5, z: -595};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // G1

        scale = {x: 30, y: 0.8, z: 30};
        pos = {x: -15, y: 91.5, z: -465};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(2));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // G2

        scale = {x: 30, y: 0.8, z: 30};
        pos = {x: 15, y: 91.5, z: -465};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(2));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // G3

        scale = {x: 30, y: 0.8, z: 40};
        pos = {x: -15, y: 91.5, z: -510};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(2));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // G4

        scale = {x: 30, y: 0.8, z: 40};
        pos = {x: 15, y: 91.5, z: -510};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(2));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // G5

        scale = {x: 30, y: 0.8, z: 40};
        pos = {x: -15, y: 91.5, z: -550};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(2));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // G6

        scale = {x: 30, y: 0.8, z: 40};
        pos = {x: 15, y: 91.5, z: -550};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(2));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // G7

        scale = {x: 30, y: 0.8, z: 30};
        pos = {x: -15, y: 91.5, z: -595};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(2));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // G8

        scale = {x: 30, y: 0.8, z: 30};
        pos = {x: 15, y: 91.5, z: -595};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = false;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(2));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P46

        scale = {x: 30, y: 1, z: 20};
        pos = {x: 25, y: 99.6, z: -640};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P47

        scale = {x: 20, y: 2, z: 20};
        pos = {x: 25, y: 107.5, z: -640};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PB1

        scale = {x: 10, y: 1, z: 20};
        pos = {x: -25, y: 91.5, z: -680};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PB2

        scale = {x: 10, y: 1, z: 20};
        pos = {x: -25, y: 91.5, z: -720};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PB3

        scale = {x: 10, y: 1, z: 20};
        pos = {x: -35, y: 95.5, z: -740};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PB4

        scale = {x: 10, y: 1, z: 20};
        pos = {x: -25, y: 99.5, z: -760};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PB5

        scale = {x: 10, y: 1, z: 40};
        pos = {x: -25, y: 99.5, z: -810};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PB6

        scale = {x: 10, y: 1, z: 60};
        pos = {x: -35, y: 99.5, z: -850};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PB7

        scale = {x: 20, y: 1, z: 10};
        pos = {x: -20, y: 99.5, z: -875};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PB8

        scale = {x: 10, y: 1, z: 20};
        pos = {x: -5, y: 95.5, z: -850};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // PB9

        scale = {x: 10, y: 1, z: 170};
        pos = {x: 55, y: 95.5, z: -765};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P48

        // GRAPPLE BOX
        scale = {x: 2, y: 2, z: 2};
        pos = {x: 25, y: 111.5, z: -685};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P49

        // GRAPPLE BOX
        scale = {x: 2, y: 2, z: 2};
        pos = {x: 25, y: 111.5, z: -725};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P50

        // GRAPPLE BOX
        scale = {x: 2, y: 2, z: 2};
        pos = {x: 25, y: 111.5, z: -765};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P51

        // GRAPPLE BOX
        scale = {x: 2, y: 2, z: 2};
        pos = {x: 25, y: 111.5, z: -805};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P52

        // GRAPPLE BOX
        scale = {x: 2, y: 2, z: 2};
        pos = {x: 25, y: 111.5, z: -845};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // H1

        scale = {x: 35, y: 1, z: 2.5};
        pos = {x: 40, y: 112, z: -685};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // H2

        scale = {x: 35, y: 1, z: 2.5};
        pos = {x: 40, y: 112, z: -725};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // H3

        scale = {x: 35, y: 1, z: 2.5};
        pos = {x: 40, y: 112, z: -765};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // H4

        scale = {x: 35, y: 1, z: 2.5};
        pos = {x: 40, y: 112, z: -805};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // H5

        scale = {x: 35, y: 1, z: 2.5};
        pos = {x: 40, y: 112, z: -845};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P53

        scale = {x: 10, y: 1, z: 60};
        pos = {x: 5, y: 99.5, z: -900};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        pos = {x: 0, y: 91.5, z: -530};
        scale = {x: 120, y: 1, z: 220};
        quat = {x: 0, y: 0, z: 0, w: 1};

        createBoundingBox(pos, scale, quat); // bounding box for large area on page 2 of level 1

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 2 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 3 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P54

        scale = {x: 10, y: 1, z: 10};
        pos = {x: -15, y: 103.5, z: -945};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P55

        scale = {x: 10, y: 1, z: 10};
        pos = {x: 25, y: 103.5, z: -945};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P56-63

        scale = {x: 110, y: 1, z: 10};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        for (let i = 0; i < 8; i++) {
            pos = {x: 5, y: 107.5, z: -965 - (i * 40)};

            texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P64-74

        scale = {x: 10, y: 1, z: 30};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        for (let i = 0; i < 7; i++) {
            if (i % 2 == 0) {
                pos = {x: -25, y: 107.5, z: -985 - (i * 40)};

                texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

                create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

                pos = {x: 35, y: 107.5, z: -985 - (i * 40)};

                create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
            }
            else {
                pos = {x: 5, y: 111.5, z: -985 - (i * 40)};

                texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

                create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P75

        scale = {x: 10, y: 1, z: 10};
        pos = {x: 5, y: 103.5, z: -1285};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P76

        scale = {x: 20, y: 1, z: 20};
        pos = {x: 5, y: 103.5, z: -1330};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 3 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 4 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P77

        scale = {x: 10, y: 1, z: 20};
        pos = {x: 5, y: 103.5, z: -1380};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P78

        scale = {x: 10, y: 1, z: 40};
        pos = {x: 5, y: 99.5, z: -1430};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // S1-8

        scale = {x: 10, y: 1, z: 2.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        for (let i = 0; i < 8; i++) {
            pos = {x: 5, y: 103.5 - (i * 0.5), z: -1391.25 - (i * 2.5)};

            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P79

        scale = {x: 110, y: 1, z: 10};
        pos = {x: 5, y: 99.5, z: -1455};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P80-85

        scale = {x: 40, y: 1, z: 10};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        for (let i = 0; i < 3; i++) {
            pos = {x: -30, y: 99.5, z: -1515 - (i * 60)};

            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: 40, y: 99.5, z: -1515 - (i * 60)};

            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P86

        scale = {x: 110, y: 1, z: 10};
        pos = {x: 5, y: 99.5, z: -1685};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P87A

        scale = {x: 10, y: 1, z: 50};
        pos = {x: -35, y: 99.55, z: -1685};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P87B

        scale = {x: 10, y: 1, z: 50};
        pos = {x: -35, y: 99.55, z: -1735};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P88

        scale = {x: 50, y: 1, z: 10};
        pos = {x: -15, y: 99.5, z: -1755};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P89

        scale = {x: 10, y: 1, z: 60};
        pos = {x: 5, y: 99.55, z: -1780};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P90

        scale = {x: 30, y: 1, z: 10};
        pos = {x: 5, y: 103.5, z: -1485};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P91

        scale = {x: 10, y: 1, z: 30};
        pos = {x: -25, y: 103.5, z: -1485};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P92

        scale = {x: 10, y: 1, z: 30};
        pos = {x: 35, y: 103.5, z: -1485};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P93

        scale = {x: 30, y: 1, z: 10};
        pos = {x: 5, y: 103.5, z: -1595};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P94

        scale = {x: 10, y: 1, z: 30};
        pos = {x: -25, y: 103.5, z: -1595};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P95

        scale = {x: 10, y: 1, z: 30};
        pos = {x: 35, y: 103.5, z: -1595};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P96

        //GRAPPLE BOX
        scale = {x: 2, y: 1, z: 2};
        pos = {x: -30, y: 107.5, z: -1535};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P97

        //GRAPPLE BOX
        scale = {x: 2, y: 1, z: 2};
        pos = {x: 40, y: 107.5, z: -1535};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P98

        //GRAPPLE BOX
        scale = {x: 2, y: 1, z: 2};
        pos = {x: -30, y: 107.5, z: -1555};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P99

        //GRAPPLE BOX
        scale = {x: 2, y: 1, z: 2};
        pos = {x: 40, y: 107.5, z: -1555};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 4 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 5 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P100

        scale = {x: 50, y: 1, z: 10};
        pos = {x: 5, y: 99.5, z: -1815};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P101

        scale = {x: 90, y: 1, z: 30};
        pos = {x: 5, y: 99.5, z: -1835};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P102

        scale = {x: 210, y: 1, z: 300};
        pos = {x: 5, y: 111.5, z: -2120};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P103-150

        scale = {x: 60, y: 1, z: 2.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        for (let i = 0; i < 48; i++) {
            pos = {x: 5, y: 99.5 + (i * 0.25), z: -1851.25 - (i * 2.5)};

            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P151

        scale = {x: 150, y: 1, z: 20};
        pos = {x: 5, y: 119.5, z: -2010};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P152

        scale = {x: 150, y: 1, z: 20};
        pos = {x: 5, y: 119.5, z: -2230};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P153

        scale = {x: 20, y: 1, z: 200};
        pos = {x: -60, y: 119.5, z: -2120};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P154

        scale = {x: 20, y: 1, z: 200};
        pos = {x: 70, y: 119.5, z: -2120};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // P155 // FLAG BASE

        scale = {x: 30, y: 12, z: 20};
        pos = {x: 5, y: 117.5, z: -2170};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 5 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    function create_Walls() {
        let scale, pos, quat, has_Boundary;

        // WALLS DENOTED BY W#

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 1 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 1 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 2 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W9
        
        scale = {x: 50, y: 17.5, z: 4.5};
        pos = {x: -35, y: 100, z: -420};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W10
        
        scale = {x: 50, y: 17.5, z: 4.5};
        pos = {x: 35, y: 100, z: -420};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W11A
        
        scale = {x: 4.5, y: 17.5, z: 110};
        pos = {x: -57.75, y: 100, z: -475};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W11B
        
        scale = {x: 4.5, y: 17.5, z: 110};
        pos = {x: -57.75, y: 100, z: -585};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W12A
        
        scale = {x: 4.5, y: 17.5, z: 110};
        pos = {x: 57.75, y: 100, z: -475};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W12B
        
        scale = {x: 4.5, y: 17.5, z: 110};
        pos = {x: 57.75, y: 100, z: -585};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W13A
        
        scale = {x: 30, y: 17.5, z: 4.5};
        pos = {x: -45, y: 100, z: -640};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W13B
        
        scale = {x: 10, y: 9, z: 4.5};
        pos = {x: -25, y: 104.25, z: -640};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W14
        
        scale = {x: 40, y: 17.5, z: 4.5};
        pos = {x: 0, y: 100, z: -640};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W15A
        
        scale = {x: 30, y: 17.5, z: 4.5};
        pos = {x: 45, y: 100, z: -640};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W15B
        
        scale = {x: 20, y: 9, z: 5};
        pos = {x: 25, y: 95.5, z: -640};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 2 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 4 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W16
        
        scale = {x: 60, y: 20, z: 1};
        pos = {x: -40, y: 103.5, z: -1370.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W17
        
        scale = {x: 60, y: 20, z: 1};
        pos = {x: 50, y: 103.5, z: -1370.5};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W18-25
        
        scale = {x: 1, y: 25, z: 50};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        for (let i = 0; i < 4; i++) {
            pos = {x: -79.5, y: 103.5, z: -1410 - (i * 80)};

            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: 89.5, y: 103.5, z: -1400 - (i * 80)};

            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W26
        
        scale = {x: 60, y: 20, z: 1};
        pos = {x: 10, y: 103.5, z: -1720};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 4 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 5 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W27
        
        scale = {x: 60, y: 40, z: 1};
        pos = {x: -40, y: 131.5, z: -2000.4};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W28
        
        scale = {x: 60, y: 40, z: 1};
        pos = {x: 50, y: 131.5, z: -2000.4};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W29
        
        scale = {x: 1, y: 40, z: 240};
        pos = {x: -69.6, y: 131.5, z: -2120};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W30
        
        scale = {x: 1, y: 40, z: 240};
        pos = {x: 79.6, y: 131.5, z: -2120};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W31
        
        scale = {x: 150, y: 40, z: 1};
        pos = {x: 5, y: 131.5, z: -2239.6};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // W32
        
        scale = {x: 30, y: 32, z: 1};
        pos = {x: 5, y: 135.5, z: -2000.4};
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 5 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    function create_Columns() {
        let rTop, rBottom, height, pos, quat, texture;

        // COLUMNS DENOTED BY C#

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 1 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C1

        rTop = 2.5;
        rBottom = 2.5;
        height = 25;

        pos = {x: -25, y: 107.5, z: -135};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C2

        rTop = 2.5;
        rBottom = 2.5;
        height = 25;

        pos = {x: -25, y: 107.5, z: -185};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C3

        rTop = 2.5;
        rBottom = 2.5;
        height = 25;

        pos = {x: 25, y: 107.5, z: -185};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C4

        rTop = 2.5;
        rBottom = 2.5;
        height = 25;

        pos = {x: 25, y: 107.5, z: -135};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 1 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 2 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C5

        rTop = 2.5;
        rBottom = 2.5;
        height = 18;

        pos = {x: -45, y: 99.5, z: -435};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C6

        rTop = 2.5;
        rBottom = 2.5;
        height = 18;

        pos = {x: 45, y: 99.5, z: -435};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C7

        rTop = 2.5;
        rBottom = 2.5;
        height = 18;

        pos = {x: -45, y: 99.5, z: -495};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C8

        rTop = 2.5;
        rBottom = 2.5;
        height = 18;

        pos = {x: 45, y: 99.5, z: -495};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C9

        rTop = 2.5;
        rBottom = 2.5;
        height = 18;

        pos = {x: -45, y: 99.5, z: -565};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C10

        rTop = 2.5;
        rBottom = 2.5;
        height = 18;

        pos = {x: 45, y: 99.5, z: -565};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C11

        rTop = 2.5;
        rBottom = 2.5;
        height = 18;

        pos = {x: -45, y: 99.5, z: -625};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C12

        rTop = 2.5;
        rBottom = 2.5;
        height = 18;

        pos = {x: 45, y: 99.5, z: -625};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C13

        rTop = 20;
        rBottom = 20;
        height = 1.1;

        pos = {x: 0, y: 91.5, z: -530};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C14

        rTop = 2.5;
        rBottom = 2.5;
        height = 16;

        pos = {x: 55, y: 103.5, z: -685};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C15

        rTop = 2.5;
        rBottom = 2.5;
        height = 16;

        pos = {x: 55, y: 103.5, z: -725};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C16

        rTop = 2.5;
        rBottom = 2.5;
        height = 16;

        pos = {x: 55, y: 103.5, z: -765};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C17

        rTop = 2.5;
        rBottom = 2.5;
        height = 16;

        pos = {x: 55, y: 103.5, z: -805};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C18

        rTop = 2.5;
        rBottom = 2.5;
        height = 16;

        pos = {x: 55, y: 103.5, z: -845};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 2 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 3 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C19-34

        rTop = 2.5;
        rBottom = 2.5;
        height = 18;
        quat = {x: 0, y: 0, z: 0, w: 1};

        for (let i = 0; i < 8; i++) {
            pos = {x: -45, y: 116, z: -965 - (i * 40)};

            texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

            createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

            pos = {x: 55, y: 116, z: -965 - (i * 40)};

            createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 2 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 4 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C35-42

        rTop = 2.5;
        rBottom = 2.5;
        height = 20;
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        for (let i = 0; i < 4; i++) {
            pos = {x: -45, y: 109.5, z: -1455 - (i * 60)};

            createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

            pos = {x: 55, y: 109.5, z: -1455 - (i * 60)};

            createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C43

        rTop = 2.5;
        rBottom = 2.5;
        height = 20;

        pos = {x: -45, y: 109.5, z: -1685};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C44

        rTop = 2.5;
        rBottom = 2.5;
        height = 20;

        pos = {x: 55, y: 109.5, z: -1685};
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 4 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 5 BEGIN
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C45-48

        rTop = 2.5;
        rBottom = 2.5;
        height = 20;

        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        for (let i = 0; i < 2; i++) {
            pos = {x: -35, y: 109.5, z: -1825 - (i * 20)};

            createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

            pos = {x: 45, y: 109.5, z: -1825 - (i * 20)};

            createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C49-46

        rTop = 3;
        rBottom = 3;
        height = 40;
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        for (let i = 0; i < 8; i++) {
            if (i < 4)
                pos = {x: -90 + (i * 20), y: 131.5, z: -1980};
            else
                pos = {x: -90 + (i * 20) + 50, y: 131.5, z: -1980};

            createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C47-72

        rTop = 3;
        rBottom = 3;
        height = 40;
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        for (let i = 0; i < 13; i++) {
            pos = {x: -90, y: 131.5, z: -2000 - (i * 20)};

            createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);

            pos = {x: 100, y: 131.5, z: -2000 - (i * 20)};

            createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);
        }

        /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // C73-82

        rTop = 3;
        rBottom = 3;
        height = 40;
        quat = {x: 0, y: 0, z: 0, w: 1};

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        for (let i = 0; i < 10; i++) {
            if (i < 5)
                pos = {x: -90 + (i * 20), y: 131.5, z: -2260};
            else
                pos = {x: -90 + (i * 20) + 10, y: 131.5, z: -2260};

            createCylinderGeometry(rTop, rBottom, height, pos, quat, texture);
        }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  PAGE 5 END
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
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
                let pos ={ x: 5, y: 124, z: -2170};
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
        let pos = {x: 5, y: 115, z: -1980}; // test start
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
    create_Course();
    create_Walls();
    create_Columns();
    after_Game_Menu();

    object_Loader();
}