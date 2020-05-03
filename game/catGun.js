/* this makes objects for the catGun objects, mixers for animations, 
paths and vehicles for the cat objects, and bullets for the cat objects.
The cat's movement and shooting will be handled in function moveACat and shootBullet, 
and creating vehicles that move the cat's body will be handled in function makePathAndWaypoints.
*/

//reduce amount of global variables later

//variables for the catGun and bullets
let anims = null, shooterAnim, kitty, aimerVisible = true;
let x, y, z;
//variables for YUKA ai movements
let engine = null, followPath, onPath, yukaDelta, yukaVehicle, playerTarget;
let bump = true;
let catHandle = null, cats = [], i = 0;
let bulletFlag = false;

function shootBullet(classEnem){
    let enemy = classEnem.body;
    let bullet = classEnem.bullet;
    let body = enemy.scene.children[2];
    //set position of the bullet initially
    bullet.visible = true;

    //convert aimer position to world, while keeping the original position untouched.
    let temp = body.localToWorld(classEnem.catAimer.position.clone());

    //put bullet in the aimer position, then set the movement values
    //putting the bullet right in front of the cat, https://stackoverflow.com/questions/37641773/three-js-how-to-copy-object-direction-that-its-facing helped with this

    bullet.position.copy(temp);
    classEnem.bulletChange = new THREE.Vector3(body.position.x, body.position.y, body.position.z);

    classEnem.bulletChange.copy(body.localToWorld(classEnem.bulletChange.clone()));
    classEnem.bulletChange.copy(new THREE.Vector3(
        -(classEnem.bulletChange.x - temp.x),
        classEnem.bulletChange.y - temp.y,
        -(classEnem.bulletChange.z - temp.z)
        )
    );//the cat was aligned oddly in blender.

    classEnem.bulletChange.multiplyScalar(classEnem.bulletSpeed);

    //tell the main loop that there's a bullet active
    classEnem.bulletInScene = true;
    scene.add(bullet);
}



function moveACat(enem, vehicle, delta){
    let enemy = enem.body;
    //set values to set velocity
    let scalingFactor = 5;
    /*let vertex = new THREE.Vector3().copy(vehicle.steering.calculate(vehicle, vehicle.steering._steeringForce, delta));
    vertex.applyQuaternion(enemy.scene.quaternion);

    if(vertex.x == 0 && vertex.y == 0 && vertex.z == 0) return;
    */let resultantImpulse;
    let actualEnemy = enemy.scene.position;
    let actualCar = vehicle.position;
    //set velocity and rotation to userdata
    //if (bump == true){
    resultantImpulse = new Ammo.btVector3(actualCar.x - actualEnemy.x, actualCar.y - actualEnemy.y, actualCar.z - actualEnemy.z);
    /*    bump = false;
    }*/
    /*else{
        resultantImpulse = new Ammo.btVector3( vertex.x, vertex.y, vertex.z );
        bump = true;
    }*/

    resultantImpulse.op_mul(scalingFactor);

    let physicsBody = enemy.scene.userData.physicsBody;
    physicsBody.setLinearVelocity( resultantImpulse);
    //i++;
}



//https://github.com/Mugen87/yuka/blob/master/examples/ for yuka implementations
function makePathAndWaypoints(enem, arr){//start point for cat is : {x: 5, y: 105, z: 0}
    let enemy = enem.body;
//https://github.com/Mugen87/yuka/blob/master/examples/steering/followPath/index.html
    yukaVehicle = new YUKA.Vehicle();
    yukaVehicle.updateWorldMatrix();
    let yy = 104;
    let path = new YUKA.Path();
    for(let e = 0; e < arr.length; e += 2)
        path.add(new YUKA.Vector3(arr[e], yy, arr[e+1]));

    path.loop = true;

    yukaVehicle.position.copy(path.current());
    //set enemy to vehicle position
    //yukaVehicle.setRenderComponent(enemy, sync);
    enemy.scene.position.copy(yukaVehicle.position);//local position since it's a child to that object
    followPath = new YUKA.FollowPathBehavior(path, 1);//number is not the speed.
    onPath = new YUKA.OnPathBehavior(path, .1, 1);//1st number is the radius of the mesh, 2nd is the prediction

    //onPath and followPathBehavior for strict paths
    yukaVehicle.steering.add(followPath);
    yukaVehicle.steering.add(onPath);
    //yukaVehicle.weight = 10;//amount of weight for the object, doesn't seem to change speed

    //player-hunting behavior/pursuit
    playerTarget = new YUKA.MovingEntity();
    playerTarget.position.copy(new YUKA.Vector3(player.position.x, player.position.y, player.position.z));//puts the moving entity where the player should be.

    let pursuit = new YUKA.PursuitBehavior(playerTarget, 1);
    yukaVehicle.steering.add(pursuit);
    pursuit.weight = 20;

    /*update rotation and location for the entity so it moves the cat in the same way
    with the entity manager for YUKA
    *********There only needs to be 1 entityManager for all the vehicles.****/
    if(engine == null)
        engine = new YUKA.EntityManager();

    engine.add(yukaVehicle);
    yukaDelta = new YUKA.Time();
    enem.addVehicle(yukaVehicle);
}
//https://github.com/Mugen87/yuka/blob/master/examples/steering/followPath/index.html#L113
//line 52, these next 3 lines:
function sync( entity, renderComponent ) {
    renderComponent.matrix.copy( entity.worldMatrix );
}


////////////////// event handlers ////////////////////

function catAniSetup(e){
    let enemy = catHandle.findCatByMixer(e.action.getMixer());
    setTimeout(catAnimations(e, enemy), 2000);
}

function catAnimations(e, enemy){//e contains the type action and loopDelta
    //when this is called at the end of a loop, it checks if this is the second time the loop has run.
    //If not, then the
    //if (secondLoopBool){//if it's on the 2nd loop, adjust the animationMixer so that we don't have to do this later
    //e.action.stop();
    enemy.animationNum += 1;
    if (enemy.animationNum == anims.length)
        enemy.animationNum = 0;
    //if(e.action.clip.name == "")
    //start the next animation in the queue with crossFadeFrom, the previous action is faded out while the next one is faded in
    let clipNext = e.action.getMixer().clipAction(anims[enemy.animationNum]);
    clipNext.reset();
    clipNext.play();
    e.action.crossFadeTo(clipNext, .2, false);
    //shoot a bullet if the animation's the correct one, "Shoot"
    //instead of removing the bullet each time a different animation plays, there'll be a timer for the bullets.
    /*if(animationNum != shooterAnim){//makes the bullet not visible, will replace with something time related
        //scene.remove(scene.getObjectByName(bullet.name));
        e.action.getMixer().getRoot().parent.bullet.visible = false;
        e.action.getMixer().getRoot().parent.bulletInScene = false;
    }*/
    if(enemy.animationNum == shooterAnim)//matches returns an array with matches or null if nothing's found.
        bulletFlag = true;
    //secondLoopBool ^= true;//^ is XOR, ^= is xor equals, so it flips the boolean each time instead of using an if-else statement
    //https://stackoverflow.com/questions/2479058/how-to-make-a-boolean-variable-switch-between-true-and-false-every-time-a-method


}



////////////////// classes ////////////////////
/*class that holds all cat objects in an array, and updates them all with their mixers, bounding box movement, 
animations, etc. */
class catHandler{
    //cats;
    constructor(){
        //this.cats = [];
    }

    /*getCats(){
        return cats;
    }*/
    addCat(cat){
        if(cats != null)
            cats.push(cat);
    }
    update(deltaTime, yukaDelta) {//don't use another function for it, it changes the scope and it can't reach variables anymore?
        if (player != null) {//so the ct can pursue the entity & the player
            playerTarget.position.x = player.position.x;
            playerTarget.position.y = player.position.y;
            playerTarget.position.z = player.position.z;
        }
        //for each cat:
        let i = 0;
        while(i < cats.length){
            //update the mixer
            cats[i].mixer.update(deltaTime);//using the deltaTime THREE.clock

            if(cats[i].bulletInScene)//animate a bullet
                cats[i].bullet.position.add(cats[i].bulletChange);

            i++;
        }

        if(engine){ //null would be false, updates the mixer for animating the catGun object, may need to expand it when there's
            //multiple cats

            //update movements for the cat(s) with yuka's AI
            let delt = yukaDelta.update().getDelta();
            for(let j = 0; j < cats.length; j++){//update vehicles per cat
                if(cats[j].vehicle == null)
                    continue;

                cats[j].vehicle.updateWorldMatrix(false, false);

                //try to get it to update with the entity directly instead
                //kitty.scene.position.copy(yukaVehicle.position);
                moveACat(cats[j], cats[j].vehicle, delt);
            }

            engine.update(delt);//update engine
            //lastVehiclePosition = yukaVehicle.position;
        }

        if(bulletFlag){
            bulletFlag = false;
            for(let r = 0; r < cats.length; r++){
                let e = cats[r].mixer.clipAction(anims[shooterAnim]);
                if(e.weight > .1){//weight of 0 = no influence on the cat. 1 = full influence
                    shootBullet(cats[r]);//wait a 1-3 seconds
                    stopBullet(cats[r]);//wait a 1-3 seconds
                }
            }
        }
    }
    findCatByMixer(mixer){
        for(let f = 0; f < cats.length; f++){
            if(cats[f].mixer == mixer)
                return cats[f];
        }
        return null;
    }

    handleShot(obj){//given an object, get its ID. If the ID matches a catObj, find the cat in the cats array then remove some health.
        if(obj) {
            let id = obj.id;
            let catFound = this.findCatByID(id);
            if (catFound)
                this.healthHit(catFound[0], catFound[1]);
        }
    }

    findCatByID(ID){//if it finds the ID in one of the catObjs (from the mesh of the cat), return that obj, otherwise return null.
        //cats[0].body.scene.children[2].id
        for(let y = 0; y < cats.length; y++){
            if(cats[y].ID === ID)
                return [cats[y], y];
        }
        return null;
    }

    /*findCatByIDNumber(ID){//if it finds the ID in one of the catObjs (from the mesh of the cat), return number, otherwise return 0.
        //cats[0].body.scene.children[2].id
        for(let y = 0; y < cats.length; y++){
            if(cats[y].ID === ID)
                return y;
        }
        return null;
    }*/

    healthHit(catOb, x){//lowers the health of the cat. if the health <=0, remove the cat from the cats, and remove the body
        // from the scene.
        //setTimeout(function(){//the objects might not be filled in yet
            catOb.health -= 20;
            if(catOb.health <= 0){
                //let x = this.findCatByID(catOb.ID)[1];//replace this function in the future with an array function
                //remove the cat from the array
                cats.splice(x, 1);
                scene.remove(catOb.body);//remove the cat from the scene
            }
        //}, 500);
    }
}


/*            e.action.getMixer().getRoot().parent.bullet.visible = false;
        e.action.getMixer().getRoot().parent.bulletInScene = false;
 */

function stopBullet(catOb){
    //go through the list and make the bullet invisible
    setTimeout(function(){
        catOb.bullet.visible = false;
        catOb.bulletInScene = false;
        scene.remove(catOb.bullet);}, 3000);
}



/*
Holds the cat object including the scene and everything, and the vehicle and bullet.
*/
class catObj{
    body;
    vehicle;
    mixer;
    bullet;
    bulletInScene;
    bulletChange;
    bulletSpeed;
    catAimer;
    health;
    ID;
    //bullet clock, old time and animationnumber
    animationNum;
    constructor(bod, arr){//arr carries x's and z's in alternating order, Y's will be added later in a way that takes the height 
        //in consideration
        this.body = bod;
        this.mixer = null;
        this.vehicle = null;
        makePathAndWaypoints(this, arr);
        this.bullet = null;
        this.bulletInScene = false;
        this.bulletChange = null;
        this.bulletSpeed = 1;
        this.catAimer = null;
        this.addBullet();
        this.animationNum = 0;
        //cats[0].body.scene.children[2].id = id of the mesh
        //put the ID in a variable to fetch it faster during searching.
        this.health = 100;
        this.ID = this.body.scene.children[2].id;
    }

    setUpMixer(){
        if(this.mixer == null)
            return null;

        if(anims == null)
            anims = this.body.animations;

        let i = 0;
        while(i < anims.length){
            this.mixer.clipAction(anims[i]);
            if(anims[i].name.match("Shoot") != null){//gets the index of anims that has the shoot clip
                shooterAnim = i;
                break;
            }
            i++;
        }

        this.mixer.clipAction(anims[0]).play();//"death" doesn't play for some reason

        this.mixer.addEventListener('loop', catAniSetup);//'finished' does not count a loop ending as finished,
        //setting amount of repetitions doesn't work either, fix soon
    }

    addVehicle(vehicle){
        this.body.matrixAutoUpdate = false;
        this.vehicle = vehicle;
    }
    addMixer(mix){
        this.mixer = mix;
    }
    addBullet(){
        //bullet aimer for the cat.
        let materialAimer = new THREE.MeshBasicMaterial({color: 0xC0F0F0});
        let geoAimer = new THREE.SphereGeometry(1, 10, 10);
        this.catAimer = new THREE.Mesh(geoAimer, materialAimer);
        this.catAimer.visible = aimerVisible;

        this.body.scene.children[2].add(this.catAimer);
        this.catAimer.position.copy(this.body.scene.children[2].position);
        this.catAimer.position.x += 1;//in local
        //catAimer.position.y += 2;//in local
        //catAimer.position.z += 1;//in local

        //bullet for catGun
        let meshMaterialBullet = new THREE.MeshBasicMaterial({color: 0xCFC669});
        let geoBullet = new THREE.SphereGeometry(.5, 10, 10);
        let bullet = new THREE.Mesh(geoBullet, meshMaterialBullet);
        bullet.name = "ABullet";
        this.bullet = bullet;
        //bullet variables for the cat set here

    }

}

/** to do:
 * check for the animation num in the update function, if it matches the shooteranim, shoot the bullet.
 * only shoot it like once, tho.
 *
 * also, removethat part from the animation thing.
 *
 * Maybe make a flag that lets the updater know that one cat's shooting instead of
 *         if(animationNum == shooterAnim)//matches returns an array with matches or null if nothing's found.
 shootBullet(e.action.getMixer().getRoot().parent);
 in that function, then the catupdate sets it to false after a loop of updates if it finds a few that are
 shooting.

 also, possibly set up the animations so they play by themselves without setting a loop for them.
 or set up so they find the next animation in line by themselves.
 */