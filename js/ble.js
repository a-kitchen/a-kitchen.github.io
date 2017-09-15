
let chosenHeartRateService = null;
uuid_tnnl = '00000000-0000-1000-8000-00805f9b34fb';
uuid_writ = '00000001-0000-1000-8000-00805f9b34fb';
uuid_down = '00000002-0000-1000-8000-00805f9b34fb';


function show_confirm()
{
var r=confirm("食材是否准备好！");
if (r==true)
  {
  go();
  }

}

function go(){
    navigator.bluetooth.requestDevice({filters:[{services: [uuid_tnnl]}]})
    .then(device => {
       rmot.innerHTML = device.name;
        console.log('device.gatt.connect');
        return device.gatt.connect();
   }).then(server => {
       console.log('server.getPrimaryService');
       return server.getPrimaryService(uuid_tnnl);
   }).then(service => {
   chosenHeartRateService = service;
     window.location.href="practice.html";
	 
  });
         };


function set(value){
    if(isByte(rese[0])){
	rese[1] = value;
	rese[2] = CMD_ID;
	rese[3] = 0;
	}else{
    var star = value/256;
    var dest = value%256;
    rese[1] = dest;
    rese[3] = star;
	}
	chosenHeartRateService.getCharacteristic(uuid_writ).then(characteristic =>{
    characteristic.writeValue(rese);
     });
   console.log(rese);
  document.getElementById("w").innerHTML=rese;

}