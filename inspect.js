function onClick(){
	o = document.getElementById("out");
	o.innerHTML = "Hi!";
	console.log('你好！');
	
	let options = {};
	options.acceptAllDevices = true;
	navigator.bluetooth.requestDevice(options).then(device => {
			console.log('Got device:', device.name);
			console.log('id:', device.id);
			console.log('Connected:' + device.gatt.connected)
			
			 return device.gatt.connect();
			
			}).this (server =>{
				
				console.log('Getting Battery Service…');
	            return server.getPrimaryService('00000000-0000-1000-8000-00805F9B34FB');
				
			}).then(service => {
				
	            console.log('Getting Battery Characteristic…');
	            return service.getCharacteristic('00000002-0000-1000-8000-00805F9B34FB');
				
            }).then(characteristic => {
				  
	            console.log('Reading battery level…');
	            return characteristic.readValue();
				
            }).then(value => {
				
	           value = value.buffer ? value : new DataView(value);
	           console.log('Battery percentage:', value.getUint8(0));
			  
            }).catch(exception => {
				
	           console.log(exception);
			
            });


}
