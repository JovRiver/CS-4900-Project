function create_Start_Menu() {
	let loader = new THREE.FontLoader();
    let loadBar = document.getElementById('load');

    function main_Menu() {
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Grappling_Game
		loader.load( "fonts/28 Days Later_Regular.json", function ( font ) {

			let textGeo = new THREE.TextBufferGeometry( "Grapple Game", {

				font: font,

				size: 10,
				height: 1,
				curveSegments: 12,

				bevelThickness: 1,
				bevelSize: .5,
				bevelEnabled: true

			} );

				textGeo.computeBoundingBox();
			let centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			let textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			let mesh = new THREE.Mesh( textGeo, textMaterial );
				mesh.position.x = centerOffset;
				mesh.position.y = 10;

				mesh.name = "Grappling_Game";

				scene.add( mesh );
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
			console.log("error in loading enemy model");
			}
		);

	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Select_Level
		loader.load( "fonts/28 Days Later_Regular.json", function ( font ) {

			let textGeo = new THREE.TextBufferGeometry( "Select Level", {

				font: font,

				size: 5,
				height: 1,
				curveSegments: 12,

				bevelThickness: .5,
				bevelSize: .3,
				bevelEnabled: true

			} );

				textGeo.computeBoundingBox();
            let centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			let textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			let mesh = new THREE.Mesh( textGeo, textMaterial );
				mesh.position.x = centerOffset;
				mesh.position.y = -5;
				mesh.rotation.x = THREE.Math.degToRad(-5);

				mesh.name = "Select_Level";

				scene.add( mesh );
        });

	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// Options
		loader.load( "fonts/28 Days Later_Regular.json", function ( font ) {

			let textGeo = new THREE.TextBufferGeometry( "Options", {

				font: font,

				size: 5,
				height: 1,
				curveSegments: 12,

				bevelThickness: .5,
				bevelSize: .3,
				bevelEnabled: true

			} );

				textGeo.computeBoundingBox();
            let centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			let textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			let mesh = new THREE.Mesh( textGeo, textMaterial );
				mesh.position.x = centerOffset;
				mesh.position.y = -15;
				mesh.rotation.x = THREE.Math.degToRad(-10);

				mesh.name = "Options";

				scene.add( mesh );
        });

	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
		//	Exit_Game
		loader.load( "fonts/28 Days Later_Regular.json", function ( font ) {

			let textGeo = new THREE.TextBufferGeometry( "Exit Game", {

				font: font,

				size: 5,
				height: 1,
				curveSegments: 12,

				bevelThickness: .5,
				bevelSize: .3,
				bevelEnabled: true

			} );

				textGeo.computeBoundingBox();
            let centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			let textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			let mesh = new THREE.Mesh( textGeo, textMaterial );
				mesh.position.x = centerOffset;
				mesh.position.y = -25;
				mesh.rotation.x = THREE.Math.degToRad(-15);

				mesh.name = "Exit Game";

				scene.add( mesh );
        });

	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    }

    function level_Select_Menu() {
		loader.load( "fonts/28 Days Later_Regular.json", function ( font ) {

			let textGeo = new THREE.TextBufferGeometry( "Back", {

				font: font,

				size: 5,
				height: 1,
				curveSegments: 12,

				bevelThickness: 1,
				bevelSize: .5,
				bevelEnabled: true

			} );

				textGeo.computeBoundingBox();
			//let centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			let textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			let mesh = new THREE.Mesh( textGeo, textMaterial );
				//mesh.position.x = centerOffset;
				mesh.position.x = -95;
				mesh.position.y = 10;
				mesh.position.z = 110;

				mesh.rotation.x = THREE.Math.degToRad(10);
				mesh.rotation.y = THREE.Math.degToRad(105);
				mesh.rotation.z = THREE.Math.degToRad(10);

				mesh.name = "Back_Level";

				scene.add( mesh );
		});
		
		
    }

    function options_Menu() {
		loader.load( "fonts/28 Days Later_Regular.json", function ( font ) {

			let textGeo = new THREE.TextBufferGeometry( "Back", {

				font: font,

				size: 5,
				height: 1,
				curveSegments: 12,

				bevelThickness: 1,
				bevelSize: .5,
				bevelEnabled: true

			} );

				textGeo.computeBoundingBox();
			//let centerOffset = - 0.5 * ( textGeo.boundingBox.max.x - textGeo.boundingBox.min.x );

			let textMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000, specular: 0xffffff } );

			let mesh = new THREE.Mesh( textGeo, textMaterial );
				//mesh.position.x = centerOffset;
				mesh.position.x = 95;
				mesh.position.y = 31;
				mesh.position.z = 2.5;

				mesh.rotation.x = THREE.Math.degToRad(10);
				mesh.rotation.y = THREE.Math.degToRad(-70);
				mesh.rotation.z = THREE.Math.degToRad(10);

				mesh.name = "Back_Options";

				scene.add( mesh );
        });
    }

    main_Menu();
    level_Select_Menu();
    options_Menu();
    renderFrame();
}