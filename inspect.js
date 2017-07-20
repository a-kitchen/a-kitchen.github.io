
function search(){
	document.getElementById("demo").innerHTML="My First JavaScript";
	let options = {
	optionalServices:['00000000-0000-1000-8000-00805f9b34fb']
	};
	let filters = [];
	let filterName = document.querySelector('#name').value;
    if (filterName) {
    filters.push({name: filterName});
	 options.filters = filters;
    }else{
     options.acceptAllDevices = true;
    }
  
	navigator.bluetooth.requestDevice(options).then(device => {
	return	device.gatt.connect();
	
		       }).then(server => {
				document.getElementById("service").innerHTML="trurservcice";
			
			 return server.getPrimaryService('00000000-0000-1000-8000-00805f9b34fb');
			}).then(service => {
			
			return Promise.all([
	              service.getCharacteristic('00000002-0000-1000-8000-00805f9b34fb').then(write),
				  service.getCharacteristic('00000003-0000-1000-8000-00805f9b34fb').then(read)
			]);
	
             }).catch(error => {
			document.getElementById("demo").innerHTML=error;
			});
}

function read(characteristic){
     characteristic.startNotifications();
 
	
	return characteristic.readValue().then(sensorLocationData => {
		
		let sensorLocation = sensorLocationData.getUint8(1);
			document.getElementById("sensorLocation").innerHTML="sensorLocation"+sensorLocation;
		
	});
	
}

function write(characteristic){
	let resetEnergyExpended = new Uint8Array([1]);
	characteristic.writeValue(resetEnergyExpended);
	document.getElementById("service").innerHTML="write";
}



