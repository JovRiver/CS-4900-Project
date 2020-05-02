let fonts;
function create_Start_Menu() {
	let loader = new THREE.FontLoader();
	let loadBar = document.getElementById('load');

	scene.background = new THREE.Color(0x0f0f0f);

	//create camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 500 );
	camera.position.set(0, -160, 50);

	//setup point light for the scene
	let pointLight = new THREE.PointLight(0xffffff, 1.5);
		pointLight.position.set(0, -30, 100);
		pointLight.color.setHSL(.2, 1, 0.5);

	scene.add(pointLight);

	function load_Menu() {
		loader.load( "fonts/28 Days Later_Regular.json", function ( font ) {
			start_Menu(font);
			main_Menu(font);
			level_Select_Menu(font);
			options_Menu(font);
			fonts = font;
        }, 
        	function(xhr){//onProgress
				loadBar.innerHTML = "<h2>Loading Fonts " + (xhr.loaded / xhr.total * 100).toFixed() + "%...</h2>";//#bytes loaded, the header tags at the end maintain the style.
				if(xhr.loaded / xhr.total * 100 == 100){ //if done loading loads next loader
					document.getElementById("load").style.display = "none";
					document.getElementById("blocker").style.display = "none";
				}
			},
			function(err){//onError
				loadBar.innerHTML = "<h2>Error loading files.</h2>";//#bytes loaded, the header tags at the end maintain the style.
				console.log("error in loading fonts");
			}
		);
	}

	function start_Menu(font) {
		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Grappling_Game

		textGeo = new THREE.TextBufferGeometry( "Press Start", {

			font: font,
			size: 10,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.y = -165;

		mesh.rotation.x = THREE.Math.degToRad(-10);

		mesh.name = "Press_Start";

		menu_Group.add(mesh);

		scene.add(menu_Group);
	}

    function main_Menu(font) {
		let textGeo, centerOffset, textMaterial, mesh;

        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Grappling_Game

		textGeo = new THREE.TextBufferGeometry( "Kitty Kill", {

			font: font,
			size: 10,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.y = 10;

		mesh.rotation.x = THREE.Math.degToRad(10);

		scene.add(mesh);

	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Select_Level

		textGeo = new THREE.TextBufferGeometry( "Select Level", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: .5,
			bevelSize: .3,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

        centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.y = -5;
		mesh.rotation.x = THREE.Math.degToRad(-5);

		mesh.name = "Select_Level";

		menu_Group.add(mesh);

	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Options

		textGeo = new THREE.TextBufferGeometry( "Options", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: .5,
			bevelSize: .3,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

        centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.y = -15;
		mesh.rotation.x = THREE.Math.degToRad(-10);

		mesh.name = "Options";

		menu_Group.add(mesh);

		scene.add(menu_Group);
	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    function level_Select_Menu(font) {
		let textGeo, centerOffset, textMaterial, mesh;

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Back_Level

		textGeo = new THREE.TextBufferGeometry( "Back", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = -50;
		mesh.position.y += 110;

		mesh.rotation.x = THREE.Math.degToRad(30);
		mesh.rotation.y = THREE.Math.degToRad(20);

		mesh.name = "Back_Level";

		menu_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Level_1

		textGeo = new THREE.TextBufferGeometry( "Level 1", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = -45;
		mesh.position.y += 80;

		mesh.rotation.x = THREE.Math.degToRad(30);
		mesh.rotation.y = THREE.Math.degToRad(20);
		mesh.rotation.z = THREE.Math.degToRad(-8);

		mesh.name = "Level_1";

		menu_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Level_1_Cube

		let Level_1_Cube_Texture = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/building_Type_3.jpg')});
		Level_1_Cube_Texture.map.wrapS = Level_1_Cube_Texture.map.wrapT = THREE.RepeatWrapping;
		Level_1_Cube_Texture.map.repeat.set(1, 1);
        let	Level_1_Cube = new THREE.Mesh(new THREE.BoxBufferGeometry(), Level_1_Cube_Texture);
		Level_1_Cube.position.set(-38, 95, 0);
		Level_1_Cube.scale.set(10, 10, 10);
		Level_1_Cube.rotation.y = THREE.Math.degToRad(65);

		Level_1_Cube.name = "Level_1_Cube";

		menu_Group.add(Level_1_Cube);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Level_2

		textGeo = new THREE.TextBufferGeometry( "Level 2", {
	
			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});
	
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
	
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = -12;
		mesh.position.z = -5;
		mesh.position.y += 80.3;
	
		mesh.rotation.x = THREE.Math.degToRad(20);
	
		mesh.name = "Level_2";
	
		menu_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Level_2_Cube

		let Level_2_Cube_Texture = new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load('texture/buildings/building_Type_5.jpg')});
		Level_2_Cube_Texture.map.wrapS = Level_1_Cube_Texture.map.wrapT = THREE.RepeatWrapping;
		Level_2_Cube_Texture.map.repeat.set(1, 1);
        let	Level_2_Cube = new THREE.Mesh(new THREE.BoxBufferGeometry(), Level_2_Cube_Texture);
		Level_2_Cube.position.set(-1, 95, 0);
		Level_2_Cube.scale.set(10, 10, 10);
		Level_2_Cube.rotation.y = THREE.Math.degToRad(45);
		Level_2_Cube.rotation.x = THREE.Math.degToRad(5);

		Level_2_Cube.name = "Level_2_Cube";

		menu_Group.add(Level_2_Cube);
			
		scene.add(menu_Group);
	}

    function options_Menu(font) {
		let textGeo, centerOffset, textMaterial, mesh;

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Back_Options

		textGeo = new THREE.TextBufferGeometry( "Back", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x -= 50;
		mesh.position.y -= 50;

		mesh.rotation.x = THREE.Math.degToRad(30);
		mesh.rotation.y = THREE.Math.degToRad(20);

		mesh.name = "Back_Options";

		menu_Group.add(mesh);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// MASTER VOLUME

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Master Volume

		textGeo = new THREE.TextBufferGeometry( "Master Volume", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = -55;
		mesh.position.y -= 70;

		mesh.rotation.x = THREE.Math.degToRad(18);
		mesh.rotation.y = THREE.Math.degToRad(15);

		scene.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Master Volume 0

		textGeo = new THREE.TextBufferGeometry( "0", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 12;
		mesh.position.y -= 67;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "MV0";
		if (master_Volume === 0) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Master Volume Level 1

		textGeo = new THREE.TextBufferGeometry( "1", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 18;
		mesh.position.y -= 66.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "MV1";
		if (master_Volume === 1/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Master Volume Level 2

		textGeo = new THREE.TextBufferGeometry( "2", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 23.5;
		mesh.position.y -= 66.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "MV2";
		if (master_Volume === 2/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Master Volume Level 3

		textGeo = new THREE.TextBufferGeometry( "3", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 30;
		mesh.position.y -= 66.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "MV3";
		if (master_Volume === 3/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Master Volume Level 4

		textGeo = new THREE.TextBufferGeometry( "4", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 36;
		mesh.position.y -= 66.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-15);

		mesh.name = "MV4";
		if (master_Volume === 4/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Master Volume Level 5

		textGeo = new THREE.TextBufferGeometry( "5", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 42;
		mesh.position.y -= 66.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-15);

		mesh.name = "MV5";
		if (master_Volume === 1) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// BGM

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	BGM

		textGeo = new THREE.TextBufferGeometry( "BGM", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = -36;
		mesh.position.y -= 80;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(20);

		scene.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// BGM Volume 0

		textGeo = new THREE.TextBufferGeometry( "0", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 11.5;
		mesh.position.y -= 77;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "BGM0";
		if (bgm_Volume === 0) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// BGM Volume Level 1

		textGeo = new THREE.TextBufferGeometry( "1", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 17.5;
		mesh.position.y -= 76.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "BGM1";
		if (bgm_Volume === 1/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// BGM Volume Level 2

		textGeo = new THREE.TextBufferGeometry( "2", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 22.5;
		mesh.position.y -= 76.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "BGM2";
		if (bgm_Volume === 2/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// BGM Volume Level 3

		textGeo = new THREE.TextBufferGeometry( "3", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 29.5;
		mesh.position.y -= 76.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "BGM3";
		if (bgm_Volume === 3/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// BGM Volume Level 4

		textGeo = new THREE.TextBufferGeometry( "4", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 35.5;
		mesh.position.y -= 76.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-15);

		mesh.name = "BGM4";
		if (bgm_Volume === 4/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// BGM Volume Level 5

		textGeo = new THREE.TextBufferGeometry( "5", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 41.5;
		mesh.position.y -= 76.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(15);
		mesh.rotation.y = THREE.Math.degToRad(-15);

		mesh.name = "BGM5";
		if (bgm_Volume === 1) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

		// SOUND

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Sound

		textGeo = new THREE.TextBufferGeometry( "Sound", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = -37.5;
		mesh.position.y -= 90;

		mesh.rotation.x = THREE.Math.degToRad(8);
		mesh.rotation.y = THREE.Math.degToRad(20);

		scene.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Sound Volume 0

		textGeo = new THREE.TextBufferGeometry( "0", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 11.5;
		mesh.position.y -= 87;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(10);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "S0";
		if (sound_Volume === 0) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Sound Volume Level 1

		textGeo = new THREE.TextBufferGeometry( "1", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 17.5;
		mesh.position.y -= 86.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(10);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "S1";
		if (sound_Volume === 1/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Sound Volume Level 2

		textGeo = new THREE.TextBufferGeometry( "2", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 22.5;
		mesh.position.y -= 86.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(10);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "S2";
		if (sound_Volume === 2/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Sound Volume Level 3

		textGeo = new THREE.TextBufferGeometry( "3", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 29;
		mesh.position.y -= 86.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(10);
		mesh.rotation.y = THREE.Math.degToRad(-10);

		mesh.name = "S3";
		if (sound_Volume === 3/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Sound Volume Level 4

		textGeo = new THREE.TextBufferGeometry( "4", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 35;
		mesh.position.y -= 86.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(10);
		mesh.rotation.y = THREE.Math.degToRad(-15);

		mesh.name = "S4";
		if (sound_Volume === 4/5) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Sound Volume Level 5

		textGeo = new THREE.TextBufferGeometry( "5", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 41;
		mesh.position.y -= 86.5;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(10);
		mesh.rotation.y = THREE.Math.degToRad(-15);

		mesh.name = "S5";
		if (sound_Volume === 1) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		//ANTI-ALIASING

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Anti-Aliasing

		textGeo = new THREE.TextBufferGeometry( "Anti Aliasing", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = -48;
		mesh.position.y -= 100;

		mesh.rotation.x = THREE.Math.degToRad(0);
		mesh.rotation.y = THREE.Math.degToRad(18);

		scene.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Anti-Aliasing ON

		textGeo = new THREE.TextBufferGeometry( "ON", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 15;
		mesh.position.y -= 99;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(0);
		mesh.rotation.y = THREE.Math.degToRad(-15);

		mesh.name = "AA_ON";
		if (alias_Toggle === true) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Anti-Aliasing OFF

		textGeo = new THREE.TextBufferGeometry( "OFF", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: 1,
			bevelSize: .5,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.x = 28;
		mesh.position.y -= 99;
		mesh.position.z = -10;

		mesh.rotation.x = THREE.Math.degToRad(0);
		mesh.rotation.y = THREE.Math.degToRad(-23);

		mesh.name = "AA_OFF";
		if (alias_Toggle === false) {
			mesh.material.emissive.setHex(0xdde014);
			options_Highlight.push(mesh);
		}

		options_Group.add(mesh);
		scene.add(options_Group);
	}
	
	load_Menu();
	cancelAnimationFrame(renderFrameId);
	renderFrame();
}

function after_Game_Menu(loadBar) {
	let loader = new THREE.FontLoader();

	function load_In_Game_Menu(loadBar) {

		loader.load( "fonts/28 Days Later_Regular.json", function ( font ) {
			menu_Elements(font);
		}, 
			function(xhr){//onProgress
				loadBar.innerHTML = "<h2>Loading Fonts " + (xhr.loaded / xhr.total * 100).toFixed() + "%...</h2>";//#bytes loaded, the header tags at the end maintain the style.
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
				console.log("error in loading fonts");
			}
		);
	}

	function menu_Elements(font) {
		let textGeo, centerOffset, textMaterial, mesh;

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Congratulations

		textGeo = new THREE.TextBufferGeometry( "Congratulations", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: .5,
			bevelSize: .3,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.y = 220;
		mesh.position.z = -50;

		mesh.name = "Congratulations";
		scene.add(mesh);
		mesh.visible = false;

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Score

		textGeo = new THREE.TextBufferGeometry( "Score ", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: .5,
			bevelSize: .3,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset - 10;
		mesh.position.y = 210;
		mesh.position.z = -50;

		mesh.name = "Score";
		scene.add(mesh);
		mesh.visible = false;

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Main_Menu

		textGeo = new THREE.TextBufferGeometry( "Main Menu", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: .5,
			bevelSize: .3,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.y = 200;
		mesh.position.z = -50;

		mesh.name = "Main_Menu";
		in_Game_Menu_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Continue

		textGeo = new THREE.TextBufferGeometry( "Continue", {

			font: font,
			size: 5,
			height: 1,
			curveSegments: 12,
			bevelThickness: .5,
			bevelSize: .3,
			bevelEnabled: true
		});

		textGeo.computeBoundingBox();

		centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
		textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
		mesh = new THREE.Mesh( textGeo, textMaterial );
		mesh.position.x = centerOffset;
		mesh.position.y = 190;
		mesh.position.z = -50;

		mesh.name = "Continue";
		in_Game_Menu_Group.add(mesh);

		//////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Background / Spotlight

		let bMaterial = new THREE.MeshBasicMaterial({color: 0x000000});
		bMaterial.transparent = true;
		bMaterial.opacity = 0.25;
		let background = new THREE.Mesh(new THREE.BoxBufferGeometry(), bMaterial);
		background.scale.set(180, 120, 1);
		background.position.set(0, 205, -52);
		background.name = "background";
		background.receiveShadow = true;

		scene.add(background);
		scene.add(in_Game_Menu_Group);

		let spotLight = new THREE.SpotLight( 0xffffff, 1.5, 110);
		spotLight.position.set(0, 210, 0);
		spotLight.target.position.x = 0;
		spotLight.target.position.y = 200;
		spotLight.target.position.z = -50
		spotLight.name = "spotlight";
	
		spotLight.color.setHSL(.2, 1, 0.5);

		scene.add(spotLight.target);
		scene.add(spotLight);

		background.visible = false;
		in_Game_Menu_Group.visible = false;
		spotLight.visible = false;
	}

	load_In_Game_Menu(loadBar);
}

function createScore(score){
	//////////////////////////////////////////////////////////////////////////////////////////////////////////////
	//	Score

	textGeo = new THREE.TextBufferGeometry( score.toString(), {

		font: fonts,
		size: 5,
		height: 1,
		curveSegments: 12,
		bevelThickness: .5,
		bevelSize: .3,
		bevelEnabled: true
	});

	textGeo.computeBoundingBox();

	let centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );
	let textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );
	let mesh = new THREE.Mesh( textGeo, textMaterial );
	mesh.position.x = centerOffset + 10;
	mesh.position.y = 210;
	mesh.position.z = -50;

	mesh.name = "Points";
	scene.add(mesh);
}