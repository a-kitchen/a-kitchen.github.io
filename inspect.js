
 let chosenHeartRateService = null;
 
 uuid_tnnl = '00000000-0000-1000-8000-00805f9b34fb';
 uuid_writ = '00000001-0000-1000-8000-00805f9b34fb';
 uuid_down = '00000002-0000-1000-8000-00805f9b34fb';

function search(){
	document.getElementById("demo").innerHTML="My First JavaScript";
	let options = {
		optionalServices:[uuid_tnnl]
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
			 return server.getPrimaryService(uuid_tnnl);
			}).then(service => {
			 chosenHeartRateService = service;
			return Promise.all([
			
				// service.getCharacteristic(uuid_writ).then(w),
				  service.getCharacteristic(uuid_down).then(read)
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

function onHeartRateChanged(event) {
     var value = event.target.value;
  	document.getElementById("data").innerHTML="Received"+value;
	//tmp_count ++ ;
	//document.getElementById("data").innerHTML='aaaaaaaa';
}

function w(characteristic){
	if(characteristic == null){
	document.getElementById("w").innerHTML="w";
	characteristic = chosenHeartRateService.getCharacteristic(uuid_writ);
	 let resetEnergyExpended = new Uint8Array([34,8,35,7]);
    characteristic.writeValue(resetEnergyExpended);
	document.getElementById("w").innerHTML="wr";
	}else{
    let resetEnergyExpended = new Uint8Array([34,8,35,7]);
    characteristic.writeValue(resetEnergyExpended);
	document.getElementById("w").innerHTML="write";}
}




