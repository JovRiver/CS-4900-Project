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

    /////////////////////////////////////////////////////////////////////////////

    //  NOTE, THE PLAYER CAN JUMP 45 UNITS LONG AND 5 UNITS HIGH

    /////////////////////////////////////////////////////////////////////////////

    function createGround() {
    /*  
        let groundMaterial = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/city_Ground_1.jpg')});
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
        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;
        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        //PLATFORMS DENOTED BY P#

/////////////////////////////////////////////////////////////////////////////
//  PAGE 1 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // START PLATFORM

        scale = {x: 20, y: 1, z: 20};
        pos = {x: 0, y: 99.5, z: 0};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P1-2

        scale = {x: 10, y: 1, z: 40};
        pos = {x: -5, y: 99.5, z: -60};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 5, y: 1, z: 20};
        pos = {x: -2.5, y: 103.5, z: -70};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P3-14
        
        for (let i = 0; i < 4; i++) {
            scale = {x: 20, y: 1, z: 5};
            pos = {x: 0, y: 103.5 - (i * 2), z: -112.5 - (i * 5)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            scale = {x: 5, y: 1, z: 20};
            pos = {x: -47.5 + (i * 5), y: 103.5 - (i * 2), z: -160};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: 47.5 - (i * 5), y: 103.5 - (i * 2), z: -160};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P15-16

        scale = {x: 60, y: 1, z: 60};

        pos = {x: 0, y: 95.5, z: -160};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 0, y: 120.5, z: -160};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P17-18

        scale = {x: 20, y: 1, z: 20};

        pos = {x: 60, y: 103.5, z: -160};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: -60, y: 103.5, z: -160};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P19

        scale = {x: 20, y: 1, z: 10};
        pos = {x: 0, y: 95.5, z: -345};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P20-29 (A,B)

        scale = {x: 20, y: 1, z: 2.5};

        for (let i = 0; i < 20; i++) {
            pos = {x: 0, y: 95.7 + (i * 0.2), z: -351.15 - (i * 2.5)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P30

        scale = {x: 20, y: 1, z: 40.25};
        pos = {x: 0, y: 99.5, z: -420};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
    
/////////////////////////////////////////////////////////////////////////////
//  PAGE 1 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 2 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // P31-33

        scale = {x: 25, y: 2.5, z: 5.5};
        pos = {x: 0, y: 107.5, z: -420};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 20, y: 11, z: 4.5};
        pos = {x: 0, y: 93.5, z: -420};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 20, y: 11, z: 10};
        pos = {x: 0, y: 93.5, z: -435};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P34-35 // has_Boundary SET TO FALSE

        has_Boundary = false;
        scale = {x: 120, y: 1, z: 30};

        pos = {x: 0, y: 91.5, z: -435};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 0, y: 91.5, z: -625};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P36-37 (A,B)

        scale = {x: 30, y: 1, z: 80};

        for (let i = 0; i < 2; i++) {
            pos = {x: -45 + (i * 90), y: 91.5, z: -490};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: -45 + (i * 90), y: 91.5, z: -570};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P38-41

        scale = {x: 10, y: 1, z: 30};

        for (let i = 0; i < 4; i++) {
            if (i < 2) {
                pos = {x: 0, y: 91.5, z: -465 - (i * 40)};
            }
            else {
                pos = {x: 0, y: 91.5, z: -465 - (i * 40) - 10};
            }
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P42-43

        scale = {x: 60, y: 1, z: 10};

        pos = {x: 0, y: 91.5, z: -485};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 0, y: 91.5, z: -575};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P44-45

        scale = {x: 20, y: 1, z: 10};

        pos = {x: -20, y: 91.5, z: -530};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 20, y: 91.5, z: -530};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // G1-4 // TEXTURE CHANGED TO GRASS FOR NEXT TWO SECTIONS

        texture = new THREE.MeshLambertMaterial(level_1_Textures(2));
        scale = {x: 30, y: 0.8, z: 30};

        for (let i = 0; i < 2; i++) {
            pos = {x: -15, y: 91.5, z: -465 - (i * 130)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: 15, y: 91.5, z: -465 - (i * 130)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // G5-8

        scale = {x: 30, y: 0.8, z: 40};

        for (let i = 0; i < 2; i++) {
            pos = {x: -15, y: 91.5, z: -510 - (i * 40)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: 15, y: 91.5, z: -510 - (i * 40)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P46-47 // has_Boundary SET BACK TO TRUE // TEXTURE RETURNED TO STONE

        has_Boundary = true;
        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));
        scale = {x: 20, y: 1, z: 10};

        pos = {x: 0, y: 96.5, z: -465};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 0, y: 96.5, z: -595};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P48-52

        scale = {x: 10, y: 1, z: 10};

        for (let i = 0; i < 2; i++) {
            pos = {x: -20 + (i * 40), y: 96.6, z: -510};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        
            pos = {x: -20 + (i * 40), y: 96.6, z: -560};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }
        pos = {x: 0, y: 100.5, z: -530};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P53-54 // BALCONY

        scale = {x: 30, y: 1, z: 20};
        pos = {x: 25, y: 99.6, z: -640};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 20, y: 2, z: 20};
        pos = {x: 25, y: 107.5, z: -640};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P55-64

        for (let i = 0; i < 5; i++) {
            scale = {x: 10, y: 2, z: 20};
            if (i % 2 == 0) {
                pos = {x: -25, y: 91.5 + (i * 2), z: -680 - (i * 50)};
            }
            else {
                pos = {x: -15, y: 91.5 + (i * 2), z: -680 - (i * 50)};
            }
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            scale = {x: 20, y: 2, z: 10};
            pos = {x: -20, y: 87.5 + (i * 2), z: -655 - (i * 50)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P65

        scale = {x: 20, y: 1, z: 20};
        pos = {x: -20, y: 103.5, z: -900};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        
        /////////////////////////////////////////////////////////////////////
        // P66

        scale = {x: 10, y: 1, z: 170};
        pos = {x: 55, y: 95.5, z: -765};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P48-52 // GRAPPLE BOXES // TEXTURE CHANGED TO GREEN

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));
        scale = {x: 2, y: 2, z: 2};

        for (let i = 0; i < 5; i++) {
            pos = {x: 25, y: 111.5, z: -685 - (i * 40)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // 67-71 // TEXTURE RETURNED TO STONE

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));
        scale = {x: 35, y: 1, z: 2.5};

        for (let i = 0; i < 5; i++) {
            pos = {x: 40, y: 112, z: -685 - (i * 40)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P72

        scale = {x: 10, y: 1, z: 60};
        pos = {x: 5, y: 99.5, z: -900};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // BOUNDING BOX FOR AREA 2 GARDEN

        scale = {x: 120, y: 1, z: 220};
        pos = {x: 0, y: 91.5, z: -530};
        createBoundingBox(pos, scale, quat); // bounding box for large area on page 2 of level 1

/////////////////////////////////////////////////////////////////////////////
//  PAGE 2 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 3 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // P73-74

        scale = {x: 10, y: 1, z: 10};

        pos = {x: -15, y: 103.5, z: -945};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 25, y: 103.5, z: -945};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P75-82

        scale = {x: 110, y: 1, z: 10};

        for (let i = 0; i < 8; i++) {
            pos = {x: 5, y: 107.5, z: -965 - (i * 40)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P82-88

        scale = {x: 10, y: 1, z: 30};

        for (let i = 0; i < 7; i++) {
            if (i % 2 == 0) {
                pos = {x: -25, y: 107.5, z: -985 - (i * 40)};
                create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

                pos = {x: 35, y: 107.5, z: -985 - (i * 40)};
                create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
            }
            else {
                pos = {x: 5, y: 111.5, z: -985 - (i * 40)};
                create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
            }
        }

        /////////////////////////////////////////////////////////////////////
        // P89-90

        scale = {x: 10, y: 1, z: 10};
        pos = {x: 5, y: 103.5, z: -1285};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 20, y: 1, z: 20};
        pos = {x: 5, y: 103.5, z: -1330};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////
//  PAGE 3 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 4 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // P91-92

        scale = {x: 10, y: 1, z: 20};
        pos = {x: 5, y: 103.5, z: -1380};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 10, y: 1, z: 40};
        pos = {x: 5, y: 99.5, z: -1430};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P93-100

        scale = {x: 10, y: 1, z: 2.5};

        for (let i = 0; i < 8; i++) {
            pos = {x: 5, y: 103.5 - (i * 0.5), z: -1391.25 - (i * 2.5)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P101-102

        scale = {x: 110, y: 1, z: 10};

        pos = {x: 5, y: 99.5, z: -1455};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 5, y: 99.5, z: -1695};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P103-108

        scale = {x: 40, y: 1, z: 10};

        for (let i = 0; i < 3; i++) {
            pos = {x: -30, y: 99.5, z: -1515 - (i * 60)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: 40, y: 99.5, z: -1515 - (i * 60)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P109-110

        scale = {x: 10, y: 1, z: 40};

        pos = {x: -35, y: 99.55, z: -1690};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: -35, y: 99.5, z: -1730};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P111-112

        scale = {x: 50, y: 1, z: 10};
        pos = {x: -15, y: 99.5, z: -1755};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 10, y: 1, z: 60};
        pos = {x: 5, y: 99.55, z: -1780};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P113-114

        scale = {x: 30, y: 1, z: 10};

        pos = {x: 5, y: 103.5, z: -1485};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 5, y: 103.5, z: -1595};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P115-118

        scale = {x: 10, y: 1, z: 30};

        for (let i = 0; i < 2; i++) {
            pos = {x: -25 + (i * 60), y: 103.5, z: -1485};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: -25 + (i * 60), y: 103.5, z: -1595};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P119-122 // GRAPPLE BOXES // TEXTURE SET TO GREEN

        texture = new THREE.MeshLambertMaterial(level_1_Textures(3));
        scale = {x: 2, y: 1, z: 2};

        for (let i = 0; i < 2; i++) {
            pos = {x: -30 + (i * 70), y: 107.5, z: -1535};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: -30 + (i * 70), y: 107.5, z: -1555};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

/////////////////////////////////////////////////////////////////////////////
//  PAGE 4 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 5 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // P123-125 // TEXTURE RETURNED TO STONE

        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));
        scale = {x: 50, y: 1, z: 10};
        pos = {x: 5, y: 99.5, z: -1815};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 90, y: 1, z: 30};
        pos = {x: 5, y: 99.5, z: -1835};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 210, y: 1, z: 300};
        pos = {x: 5, y: 111.5, z: -2120};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P126-173

        scale = {x: 60, y: 1, z: 2.5};

        for (let i = 0; i < 48; i++) {
            pos = {x: 5, y: 99.5 + (i * 0.25), z: -1851.25 - (i * 2.5)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P174-175

        scale = {x: 150, y: 1, z: 20};

        pos = {x: 5, y: 119.5, z: -2010};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 5, y: 119.5, z: -2230};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P176-178

        scale = {x: 20, y: 1, z: 200};

        pos = {x: -60, y: 119.5, z: -2120};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 70, y: 119.5, z: -2120};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P179 // FLAG BASE

        scale = {x: 30, y: 20, z: 20};
        pos = {x: 5, y: 121.5, z: -2170};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // P180-198 // FLAG AREA PLATFORMS OUTER

        scale = {x: 2.5, y: 40, z: 20};

        for (let i = 0; i < 5; i++) {
            pos = {x: -51.249, y: 131.5, z: -2040 - (i * 40)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: 61.249, y: 131.5, z: -2040 - (i * 40)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        scale = {x: 20, y: 40, z: 2.5};

        for (let i = 0; i < 2; i++) {
            pos = {x: -30 + (i * 70), y: 131.5, z: -2018.751};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: -30 + (i * 70), y: 131.5, z: -2221.249};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        scale = {x: 200, y: 5, z: 7.5};
        pos = {x: 5, y: 154, z: -2040};

        for (let i = 0; i < 5; i++) {
            let beam = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            beam.position.set(pos.x, pos.y, pos.z - (i * 40));
            beam.scale.set(scale.x, scale.y, scale.z);

            scene.add(beam);
        }

        /////////////////////////////////////////////////////////////////////
        // P199-207 // FLAG AREA PLATORMS INNER

        scale = {x: 30, y: 1, z: 10};

        pos = {x: 5, y: 116.5, z: -2055};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 5, y: 116.5, z: -2095};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 5, y: 127.5, z: -2195};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 10, y: 1, z: 20};

        for (let i = 0; i < 3; i++) {
            pos = {x: -25, y: 119.5 + (i * 4), z: -2120 - (i * 40)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: 35, y: 119.5 + (i * 4), z: -2120 - (i * 40)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // P208-209 // TEMPLE ROOF

        scale = {x: 110, y: 5, z: 300};
        pos = {x: -47.5, y: 168, z: -2120};

        let roofL = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
        roofL.position.set(pos.x, pos.y, pos.z);
        roofL.scale.set(scale.x, scale.y, scale.z);
        roofL.rotation.z = THREE.Math.degToRad(15);

        pos = {x: 57.5, y: 168, z: -2120};

        let roofR = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
        roofR.position.set(pos.x, pos.y, pos.z);
        roofR.scale.set(scale.x, scale.y, scale.z);
        roofR.rotation.z = THREE.Math.degToRad(-15);

        scene.add(roofL);
        scene.add(roofR);

        /////////////////////////////////////////////////////////////////////
        // P210-211 // has_Boundary SET TO FALSE

        has_Boundary = false;
        scale = {x: 200, y: 5, z: 7.5};

        pos = {x: 5, y: 156, z: -1980};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 5, y: 156, z: -2260};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////
//  PAGE 5 END
/////////////////////////////////////////////////////////////////////////////
    }

    function create_Walls() {
        let scale, pos, quat, has_Boundary;

        quat = {x: 0, y: 0, z: 0, w: 1};
        has_Boundary = true;
        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        // WALLS DENOTED BY W#

/////////////////////////////////////////////////////////////////////////////
//  PAGE 1 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // W1-6 (A,B)

        for (let i = 0; i < 2; i++) {
            // FRONT FACING WALLS
            scale = {x: 50, y: 11, z: 1};

            // LEFT WALLS
            pos = {x: -45, y: 114, z: -119.5 - (i * 81)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: -45, y: 100, z: -119.5 - (i * 81)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            // RIGHT WALLS
            pos = {x: 45, y: 114, z: -119.5 - (i * 81)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: 45, y: 100, z: -119.5 - (i * 81)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            // SIDE FACING WALLS
            scale = {x: 1, y: 11, z: 60};

            pos = {x: -89.5 + (i * 179), y: 114, z: -160};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: -89.5 + (i * 179), y: 100, z: -160};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // W7-8 // WALL JUMP

        scale = {x: 1, y: 11, z: 60};

        pos = {x: -10.5, y: 100, z: -240};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 10.5, y: 100, z: -290};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////
//  PAGE 1 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 2 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // W9-10
        
        scale = {x: 50, y: 17.5, z: 4.5};

        pos = {x: -35, y: 100, z: -420};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 35, y: 100, z: -420};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // W11-12 (A,B)
        
        scale = {x: 4.5, y: 17.5, z: 110};

        for (let i = 0; i < 2; i++) {
            pos = {x: -57.75 + (i * 115.5), y: 100, z: -475};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: -57.75 + (i * 115.5), y: 100, z: -585};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // W13-17 // FAR WALL AREA 2

        scale = {x: 30, y: 17.5, z: 4.5};

        pos = {x: -45, y: 100, z: -640};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 45, y: 100, z: -640};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 10, y: 9, z: 4.5};
        pos = {x: -25, y: 104.25, z: -640};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 40, y: 17.5, z: 4.5};
        pos = {x: 0, y: 100, z: -640};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        scale = {x: 20, y: 9, z: 5};
        pos = {x: 25, y: 95.5, z: -640};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////
//  PAGE 2 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 4 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // W16-17
        
        scale = {x: 60, y: 20, z: 1};

        pos = {x: -40, y: 103.5, z: -1370.5};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 50, y: 103.5, z: -1370.5};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // W18-25
        
        scale = {x: 1, y: 25, z: 50};

        for (let i = 0; i < 4; i++) {
            pos = {x: -79.5, y: 103.5, z: -1410 - (i * 80)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

            pos = {x: 89.5, y: 103.5, z: -1400 - (i * 80)};
            create_Box_Geometry(scale, pos, quat, texture, has_Boundary);
        }

        /////////////////////////////////////////////////////////////////////
        // W26
        
        scale = {x: 60, y: 20, z: 1};
        pos = {x: 10, y: 103.5, z: -1720};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////
//  PAGE 4 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 5 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // W27-28 // FRONT WALLS OF TEMPLE
        
        scale = {x: 60, y: 40, z: 1};

        pos = {x: -40, y: 131.5, z: -2000.4};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 50, y: 131.5, z: -2000.4};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // W29-30 // SIDE WALLS OF TEMPLE
        
        scale = {x: 1, y: 40, z: 240};

        pos = {x: -69.6, y: 131.5, z: -2120};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        pos = {x: 79.6, y: 131.5, z: -2120};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // W31 // BACK WALL OF TEMPLE
        
        scale = {x: 150, y: 40, z: 1};
        pos = {x: 5, y: 131.5, z: -2239.6};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

        /////////////////////////////////////////////////////////////////////
        // W32 // FRONT CENTER WALL OF TEMPLE
        
        scale = {x: 30, y: 32, z: 1};
        pos = {x: 5, y: 135.5, z: -2000.4};
        create_Box_Geometry(scale, pos, quat, texture, has_Boundary);

/////////////////////////////////////////////////////////////////////////////
//  PAGE 5 END
/////////////////////////////////////////////////////////////////////////////
    }

    function create_Columns() {
        let radius, height, pos, quat, texture, pillarTop;
        quat = {x: 0, y: 0, z: 0, w: 1};
        texture = new THREE.MeshLambertMaterial(level_1_Textures(1));

        // COLUMNS DENOTED BY C#

/////////////////////////////////////////////////////////////////////////////
//  PAGE 1 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // C1-4

        radius = 2.5;
        height = 25;

        for (let i = 0; i < 2; i++) {
            pos = {x: -25, y: 107.5, z: -135 - (i * 50)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + (height / 2), pos.z);
            pillarTop.scale.set(7, 3, 7);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);

            pos = {x: 25, y: 107.5, z: -135 - (i * 50)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + (height / 2), pos.z);
            pillarTop.scale.set(7, 3, 7);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);
        }

/////////////////////////////////////////////////////////////////////////////
//  PAGE 1 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 2 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // C5-12

        height = 18;

        for (let i = 0; i < 4; i++) {
            if (i < 2) {
                pos = {x: -45, y: 99.5, z: -435 - (i * 60)};
            }
            else {
                pos = {x: -45, y: 99.5, z: -435 - (i * 60) - 10};
            }

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + (height / 2) + 1.5, pos.z);
            pillarTop.scale.set(7, 3, 7);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);

            if (i < 2) {
                pos = {x: 45, y: 99.5, z: -435 - (i * 60)};
            }
            else {
                pos = {x: 45, y: 99.5, z: -435 - (i * 60) - 10};
            }

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + (height / 2) + 1.5, pos.z);
            pillarTop.scale.set(7, 3, 7);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);
        }

        /////////////////////////////////////////////////////////////////////
        // C13  [CENTRAL FLOOR AREA]

        radius = 20;
        height = 1.1;

        pos = {x: 0, y: 91.5, z: -530};
        createCylinderGeometry(radius, radius, height, pos, quat, texture);

        /////////////////////////////////////////////////////////////////////
        // C14-18

        radius = 2.5;
        height = 16;

        for (let i = 0; i < 5; i++) {
            pos = {x: 55, y: 103.5, z: -685 - (i * 40)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + (height / 2) + 1.5, pos.z);
            pillarTop.scale.set(7, 3, 7);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);
        }

/////////////////////////////////////////////////////////////////////////////
//  PAGE 2 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 3 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // C19-34

        height = 18;

        for (let i = 0; i < 8; i++) {
            pos = {x: -45, y: 116, z: -965 - (i * 40)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + (height / 2) + 1.5, pos.z);
            pillarTop.scale.set(7, 3, 7);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);

            pos = {x: 55, y: 116, z: -965 - (i * 40)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + (height / 2) + 1.5, pos.z);
            pillarTop.scale.set(7, 3, 7);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);
        }

/////////////////////////////////////////////////////////////////////////////
//  PAGE 3 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 4 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // C35-42

        height = 20;

        for (let i = 0; i < 5; i++) {
            pos = {x: -45, y: 109.5, z: -1455 - (i * 60)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + (height / 2) + 1.5, pos.z);
            pillarTop.scale.set(7, 3, 7);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);

            pos = {x: 55, y: 109.5, z: -1455 - (i * 60)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + (height / 2) + 1.5, pos.z);
            pillarTop.scale.set(7, 3, 7);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);
        }

/////////////////////////////////////////////////////////////////////////////
//  PAGE 4 END
/////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////
//  PAGE 5 BEGIN
/////////////////////////////////////////////////////////////////////////////

        /////////////////////////////////////////////////////////////////////
        // C45-48

        for (let i = 0; i < 2; i++) {
            pos = {x: -35, y: 109.5, z: -1825 - (i * 20)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + 11.5, pos.z);
            pillarTop.scale.set(7.5, 3, 7.5);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);

            pos = {x: 45, y: 109.5, z: -1825 - (i * 20)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + 11.5, pos.z);
            pillarTop.scale.set(7.5, 3, 7.5);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);
        }

        /////////////////////////////////////////////////////////////////////
        // C49-46

        radius = 3;
        height = 40;

        for (let i = 0; i < 8; i++) {
            if (i < 4) {
                pos = {x: -90 + (i * 20), y: 131.5, z: -1980};
            }
            else {
                pos = {x: -90 + (i * 20) + 50, y: 131.5, z: -1980};
            }

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + 21.5, pos.z);
            pillarTop.scale.set(7.5, 3, 7.5);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);
        }

        /////////////////////////////////////////////////////////////////////
        // C47-72

        for (let i = 0; i < 13; i++) {
            pos = {x: -90, y: 131.5, z: -2000 - (i * 20)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + 21.5, pos.z);
            pillarTop.scale.set(7.5, 3, 7.5);

            scene.add(pillarTop);

            createCylinderGeometry(radius, radius, height, pos, quat, texture);

            pos = {x: 100, y: 131.5, z: -2000 - (i * 20)};

            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + 21.5, pos.z);
            pillarTop.scale.set(7.5, 3, 7.5);

            scene.add(pillarTop);

            createCylinderGeometry(radius, radius, height, pos, quat, texture);
        }

        /////////////////////////////////////////////////////////////////////
        // C73-82

        for (let i = 0; i < 10; i++) {
            if (i < 5) {
                pos = {x: -90 + (i * 20), y: 131.5, z: -2260};
            }
            else {
                pos = {x: -90 + (i * 20) + 10, y: 131.5, z: -2260};
            }
            
            pillarTop = new THREE.Mesh(new THREE.BoxBufferGeometry(), texture);
            pillarTop.position.set(pos.x, pos.y + 21.5, pos.z);
            pillarTop.scale.set(7.5, 3, 7.5);

            scene.add(pillarTop);
            createCylinderGeometry(radius, radius, height, pos, quat, texture);
        }

/////////////////////////////////////////////////////////////////////////////
//  PAGE 5 END
/////////////////////////////////////////////////////////////////////////////
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
                let pos ={ x: 5, y: 131.5, z: -2170};
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
        let pos = {x: 0, y: 105, z: 0}; // start point

        //resetPos = {x: 0, y: 101, z: 0};
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