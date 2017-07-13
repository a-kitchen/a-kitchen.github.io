
	  
 BluetoothRemoteGATTServer bltr;
  BluetoothRemoteGattCharacteristic crx,ctx;


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

