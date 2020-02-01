function createLevel1() {
    
    function createGround() {

        let groundMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/city_Ground_1.jpg')});
            groundMaterial.map.wrapS = groundMaterial.map.wrapT = THREE.RepeatWrapping;
            groundMaterial.map.repeat.set(100, 100);
        let ground = new THREE.Mesh(new THREE.BoxBufferGeometry(), groundMaterial);
            ground.position.set(0, 0, 0);
            ground.scale.set(1000, 0.5, 1000);
            ground.receiveShadow = true;

            scene.add(ground);
    }

    function createStartPlatform() {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        var mass = 0;

        //create base of starter platform
        let base_Texture = [
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/building_Type_3.jpg')}), //right
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/building_Type_3.jpg')}), //left
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/building_Rooftop_1.jpg')}), //up
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/building_Type_3.jpg')}), //down
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/building_Type_3.jpg')}), //back
            new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('texture/building_Type_3.jpg')}) //front
        ];

        let base_Material = new THREE.MeshFaceMaterial(base_Texture);
        let startPlatformBox = new THREE.Mesh(new THREE.BoxBufferGeometry(), base_Material);
            startPlatformBox.position.set(0, 25, 0);
            startPlatformBox.scale.set(25, 50, 25);
            startPlatformBox.receiveShadow = true;

            scene.add(startPlatformBox);

        //physics for base
        var starterBoxTransform = new Ammo.btTransform();
            starterBoxTransform.setIdentity();
            starterBoxTransform.setOrigin(new Ammo.btVector3(0, 0, 0));
            starterBoxTransform.setRotation(new Ammo.btQuaternion(0, 0, 0, 1));
        var starterBoxMotionState = new Ammo.btDefaultMotionState(starterBoxTransform);
        var starterBoxColShape = new Ammo.btBoxShape(new Ammo.btVector3(14, 51, 14));
            starterBoxColShape.setMargin(0.05);
        var starterBoxLocalInertia = new Ammo.btVector3(0, 0, 0);
            starterBoxColShape.calculateLocalInertia(mass, starterBoxLocalInertia);
        var starterBoxRbInfo = new Ammo.btRigidBodyConstructionInfo(mass, starterBoxMotionState, starterBoxColShape, starterBoxLocalInertia);
        var starterBoxBody = new Ammo.btRigidBody(starterBoxRbInfo);
            starterBoxBody.setFriction(4);
            starterBoxBody.setRollingFriction(10);
            physicsWorld.addRigidBody(starterBoxBody);

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    createGround();
    createStartPlatform();
}
