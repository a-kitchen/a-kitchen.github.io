
	  
 BluetoothRemoteGATTServer bltr;
  BluetoothRemoteGattCharacteristic crx,ctx;

function onClick(){
document.getElementById("demo").innerHTML="asd";
	o = document.getElementById("out");
	o.innerHTML = "Hi!";
	log('你好！');
	
}

function search(){
	document.getElementById("demo").innerHTML="My First JavaScript";
		let options = {};
	options.acceptAllDevices = true;
	navigator.bluetooth.requestDevice(options).then(device => {
			console.log('Got device:', device.name);
			console.log('id:', device.id);
			console.log('Connected:' + device.gatt.connected)
			var s device.name;
			
			document.write("<p>s</p>");
			
			bltr =device.gatt.connect()
		
			}).catch(error => {}
			document.getElementById("demo").innerHTML="My First JavaScript";
			);
	
}


//function getService(){
	//blegatt = bltr.getPrimaryService('00000000-0000-1000-8000-00805F9B34FB');
//}

function getServices(){
	ctx = bltr.getCharacteristic('00000001-0000-1000-8000-00805F9B34FB');
	crx = bltr.getCharacteristic('00000002-0000-1000-8000-00805F9B34FB');
}

function startNo(){
	crx.startNotifications();
}

function stopNo(){
	crx.stopNotifications();
}

function read(){
	DataView data = crx.readValue();
}

function write(){
	ctx.writeValue(BufferSource value);
}

