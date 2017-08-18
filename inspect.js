
 let chosenHeartRateService = null;
 

function search(){
	document.getElementById("demo").innerHTML="My First JavaScript";
	let options = {
		optionalServices:['00000000-0000-1000-8000-00805f9b34fb']
	};
	let filters = [];
	
	let  services = document.querySelector('#services').value;
	let  filterName = document.querySelector('#name').value;
	let  Prefix = document.querySelector('#Prefix').value;
	if(services || filterName || Prefix){
    if (filterName) {
    filters.push({name:filterName});
	}
	 if(services){
		 filters.push({services:[services]});
	 }
	 if(Prefix){
		  filters.push({namePrefix: Prefix});
	 }
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
			
				  //service.getCharacteristic('00000001-0000-1000-8000-00805f9b34fb').then(w),
				 // service.getCharacteristic('00000006-0000-1000-8000-00805f9b34fb').then(val),
				  service.getCharacteristic('00000002-0000-1000-8000-00805f9b34fb').then(read)
			]);
	
             }).catch(error => {
			          document.getElementById("demo").innerHTML=error;
			});
}

function val(characteristic){
return characteristic.readValue()
  .then(sensorLocationData => {
    let sensorLocation = sensorLocationData.getUint8(0);
	document.getElementById("data").innerHTML="+++"+sensorLocation;
  });
}

function read(characteristic){
  return characteristic.startNotifications()
  .then(characteristic => {
    characteristic.addEventListener('characteristicvaluechanged',onHeartRateChanged);
  });
	
}

//var tmp_count = 0 ;
function onHeartRateChanged(event) {
    // var value = event.target.value;
  	//document.getElementById("data").innerHTML="Received"+sensorLocation;
	//tmp_count ++ ;
		document.getElementById("data").innerHTML='aaaaaaaa';
}

function w(characteristic){
    let resetEnergyExpended = new Uint8Array([34,8,35,7]);
    characteristic.writeValue(resetEnergyExpended);
	document.getElementById("w").innerHTML="write";
}




