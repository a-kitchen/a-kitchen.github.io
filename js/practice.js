
let chosenHeartRateService = null;
uuid_tnnl = '00000000-0000-1000-8000-00805f9b34fb';
uuid_writ = '00000001-0000-1000-8000-00805f9b34fb';
uuid_down = '00000002-0000-1000-8000-00805f9b34fb';

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
    //  return Promise.all([
         service.getCharacteristic(uuid_down).then(characteristic => {
         characteristic.startNotifications()
  .then(characteristic => {
  //  characteristic.addEventListener('characteristicvaluechanged',handleCharacteristicValueChanged);
  });
         })
     // ]);
    }).catch(error => {
      console.log(error);
    });
}