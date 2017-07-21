
 let chosenHeartRateService = null;

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
			 return server.getPrimaryService('00000000-0000-1000-8000-00805f9b34fb');
			}).then(service => {
			 chosenHeartRateService = service;
			return Promise.all([
			      service.getCharacteristic('00000002-0000-1000-8000-00805f9b34fb').then(Notifications),
				  service.getCharacteristic('00000001-0000-1000-8000-00805f9b34fb').then(w),
				  service.getCharacteristic('00000003-0000-1000-8000-00805f9b34fb').then(read)
			]);
	
             }).catch(error => {
			document.getElementById("demo").innerHTML=error;
			});
}

function Notifications(characteristic){
	 characteristic.startNotifications();
}

function read(characteristic){
   
	return characteristic.readValue().then(sensorLocationData => {
		
		let sensorLocation = sensorLocationData.getUint8(1);
			document.getElementById("data").innerHTML="sensorLocation"+sensorLocation;
		
	});
	
}



function w(characteristic){

    let resetEnergyExpended = new Uint8Array.of(65,75);
    controlPoint.writeValue(resetEnergyExpended);
}




