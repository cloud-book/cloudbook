function Perro(){
	this.ladrido = "guau";
};

Perro.prototype.saluda = function() {
	console.log(this.ladrido);
	saluda("esto es una prueba");
};
mod.exports = Perro;