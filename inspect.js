function onClick(){
	o = document.getElementById("out");
	o.innerHTML = "Hi!";
	
	
	let options = {};
	options.acceptAllDevices = true;
	navigator.bluetooth.requestDevice(options).then(device => {
			console.log('Got device:', device.name); 
			console.log('id:', device.id);  
			console.log('Connected:' + device.gatt.connected)});


}
