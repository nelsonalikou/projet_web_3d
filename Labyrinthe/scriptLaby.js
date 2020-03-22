// Place un mur avec la position en paramètre avec rotation de 0
function setWall1(_x, _z){
	el = document.createElement('a-box')
	el.setAttribute("position", _x+" -5 "+_z)
	el.setAttribute("depth", "0.2")
	el.setAttribute("width", "3")
	el.setAttribute("height", "3")
	el.setAttribute("src", "#wall")
	el.setAttribute("static-body", "")
	document.querySelector("a-scene").appendChild(el)
}

// Place un mur avec la position en paramètre avec rotation de 90
function setWall2(_x, _z){
	el = document.createElement('a-box')
	el.setAttribute("position", _x+" -5 "+_z)
	el.setAttribute("depth", "3")
	el.setAttribute("width", "0.2")
	el.setAttribute("height", "3")
	el.setAttribute("src", "#wall")
	el.setAttribute("static-body", "")
	document.querySelector("a-scene").appendChild(el)
}

// Génération d'une cellule
function generateCel(x, z, n, s, e, o){
	if (s){
		setWall1(x, z)
	}
	if (o){
		setWall2(x-1.5, z-1.5)
	}
	if (n){
		setWall1(x, z-3)
	}
	if (e){
		setWall2(x+1.5, z-1.5)
	}
}

// Générer le labyrinthe à partir de la matrice
function generateLab(matrice, taille){
	var x = 0
	var z = 0
	var j = 0

	for (var i = 0; i < matrice.length; i++){
		if (j == taille){
			j = 0
			z += 3
			x = 0
		}

		var n = matrice[i][0]
		var s = matrice[i][1]
		var e = matrice[i][2]
		var o = matrice[i][3]

		generateCel(x, z, n, s, e, o)
		x += 3
		j++
	}
}

// Récupération du fichier json et conversion en matrice

var request = new XMLHttpRequest()
var matrice = []

request.open('GET', "jsonLaby", true);

request.onreadystatechange = function(){
	if (request.readyState == 4 && request.status == 200){
		var res = request.response
		var taille = res["taille"]["x"]
		for (elem in res){
			var line = []
			for (i in res[elem]){
				if (res[elem][i] == true){
					line.push(true)
				}else{
					line.push(false)
				}
			}
			matrice.push(line)

		}
		generateLab(matrice, taille)
		console.log(matrice)
	}else if (request.status != 200){
		console.log("Erreur " + request.status)
	}
}

request.responseType = 'json';
request.send();
