/* this makes objects for the catGun objects, mixers for animations, 
paths and vehicles for the cat objects, and bullets for the cat objects.
The cat's movement and shooting will be handled in function moveACat and shootBullet, 
and creating vehicles that move the cat's body will be handled in function makePathAndWaypoints.
*/

//reduce amount of global variables later

//variables for the catGun and bullets
let animationNum = 0, secondLoopBool = false, anims, shooterAnim, bullet, bulletInScene = false, kitty, bulletChange, bulletSpeed = 1, catAimer, aimerVisible = false;
let x, y, z;
//variables for YUKA ai movements
let engine = null, followPath, onPath, yukaDelta, yukaVehicle, testYuka = null, lastVehiclePosition;
let bump = true;

function shootBullet(){
    //set position of the bullet initially
    bullet.visible = true;
    //putting the bullet right in front of the cat, https://stackoverflow.com/questions/37641773/three-js-how-to-copy-object-direction-that-its-facing helped with this
    
    //put the aimer in place since it keeps moving for now
    //localToWorld may be destructive to the data, https://stackoverflow.com/questions/44676015/localtoworld-weird-behaviour
    
    //convert aimer position to world, while keeping the original position untouched.
    let temp = kitty.scene.children[2].localToWorld(catAimer.position.clone());

    //put bullet in the aimer position, then set the movement values
    bullet.position.copy(temp);
    bulletChange = new THREE.Vector3(
        kitty.scene.children[2].position.x,
        kitty.scene.children[2].position.y,
        kitty.scene.children[2].position.z);

    bulletChange.copy(kitty.scene.children[2].localToWorld(bulletChange.clone()));
    bulletChange.copy(new THREE.Vector3(
        -(bulletChange.x - temp.x),
        bulletChange.y - temp.y,
        -(bulletChange.z - temp.z)
    )
    );//the cat was aligned weird in blender i think
    
    bulletChange.multiplyScalar(bulletSpeed);
    
    //tell the main loop that there's a bullet active
    bulletInScene = true;
}



function moveACat(enemy, vehicle, delta){
    //set values to set velocity
    let scalingFactor = 5;
    let vertex = new THREE.Vector3().copy(vehicle.steering.calculate(vehicle, vehicle.steering._steeringForce, delta));
    vertex.applyQuaternion(enemy.scene.quaternion);

    if(vertex.x == 0 && vertex.y == 0 && vertex.z == 0) return;
    let resultantImpulse;
    //set velocity and rotation to userdata
    if (bump == true){
        resultantImpulse = new Ammo.btVector3( vertex.x, vertex.y+0.2, vertex.z );
        bump = false;
    }
    else{
        resultantImpulse = new Ammo.btVector3( vertex.x, vertex.y, vertex.z );
        bump = true;
    }

        resultantImpulse.op_mul(scalingFactor);

    let physicsBody = enemy.scene.userData.physicsBody;
    physicsBody.setLinearVelocity( resultantImpulse);
}



//https://github.com/Mugen87/yuka/blob/master/examples/ for yuka implementations
function makePathAndWaypoints(enemy){//start point for cat is : {x: 5, y: 105, z: 0}
//https://github.com/Mugen87/yuka/blob/master/examples/steering/followPath/index.html
yukaVehicle = new YUKA.Vehicle();
yukaVehicle.updateWorldMatrix();

let path = new YUKA.Path();
path.add(new YUKA.Vector3(-6, 102.5, 6));
path.add(new YUKA.Vector3(6, 102.5, 6));
path.add(new YUKA.Vector3(6, 102.5, -6));
path.add(new YUKA.Vector3(-6, 102.5, -6));
path.loop = true;

yukaVehicle.position.copy(path.current());
//test.position.copy(path.current());
//set enemy to vehicle position
yukaVehicle.setRenderComponent(enemy, sync);
//yukaVehicle.add(enemy);
enemy.position.copy(yukaVehicle.position);//local position since it's a child to that object
followPath = new YUKA.FollowPathBehavior(path, 1);//number is not the speed.
onPath = new YUKA.OnPathBehavior(path, .1, 1);//1st number is the radius of the mesh, 2nd is the prediction
//onPath and followPathBehavior for strict paths
yukaVehicle.steering.add(followPath);
yukaVehicle.steering.add(onPath);
yukaVehicle.weight = 10;//amount of weight for the object, doesn't seem to change speed


//update rotation and location for the entity so it moves the cat in the same way
//with the entity manager for YUKA  
engine = new YUKA.EntityManager();
//engine.add(enemy);
engine.add(yukaVehicle);
//scene.add(yukaVehicle);
yukaDelta = new YUKA.Time();
/*path.advance();
path.advance();
path.advance();*/
}
//https://github.com/Mugen87/yuka/blob/master/examples/steering/followPath/index.html#L113
//line 52, these next 3 lines:
function sync( entity, renderComponent ) {
renderComponent.matrix.copy( entity.worldMatrix );
}


////////////////// event handlers ////////////////////


function catAnimations(e){//e contains the type action and loopDelta
    //when this is called at the end of a loop, it checks if this is the second time the loop has run.
    //If not, then the

    if (secondLoopBool){//if it's on the 2nd loop, adjust the animationMixer so that we don't have to do this later
        //e.action.stop();
        animationNum++;
        if (animationNum == anims.length)
            animationNum = 0;
        //if(e.action.clip.name == "")
        //start the next animation in the queue with crossFadeFrom, the previous action is faded out while the next one is faded in
        theMixer.clipAction(anims[animationNum]).reset();
        theMixer.clipAction(anims[animationNum]).play();

        //shoot a bullet if the animation's the correct one, "Shoot"

        if(animationNum != shooterAnim){//bullet's not visible for now
        //scene.remove(scene.getObjectByName(bullet.name));
            bullet.visible = false;
            bulletInScene = false;
        }
        e.action.crossFadeTo(theMixer.clipAction(anims[animationNum]), .4, false);
    }
    if(animationNum == shooterAnim)//matches returns an array with matches or null if nothing's found.
        shootBullet();

    secondLoopBool ^= true;//^ is XOR, ^= is xor equals, so it flips the boolean each time instead of using an if-else statement
    //https://stackoverflow.com/questions/2479058/how-to-make-a-boolean-variable-switch-between-true-and-false-every-time-a-method
}

