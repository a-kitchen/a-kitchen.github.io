
cind = document.getElementById('cind');
cmod = document.getElementById('cmod');
cpph = document.getElementById('cpph');
cpwr = document.getElementById('cpwr');
ctmp = document.getElementById('ctmp');
ctmr = document.getElementById('ctmr');
ctst = document.getElementById('ctst');
rbtn = document.getElementById('rbtn');
rclk = document.getElementById('rclk');
rcol = document.getElementById('rcol');
rcur = document.getElementById('rcur');
renv = document.getElementById('renv');
rerr = document.getElementById('rerr');
rknb = document.getElementById('rknb');
rmot = document.getElementById('rmot');
rpls = document.getElementById('rpls');
rsnk = document.getElementById('rsnk');
rtpr = document.getElementById('rtpr');
rtop = document.getElementById('rtop');
rtst = document.getElementById('rtst');
rver = document.getElementById('rver');
rvol = document.getElementById('rvol');

hclk = 0;
hcol = 0;
hcur = 0;
henv = 0;
herr = 0;
hknb = 0;
hpph = 0;
hpwr = 0;
hpls = 0;
hsnk = 0;
htmp = 0;
htmr = 0;
htpr = 0;
hver = 0;
hvol = 0;

lclk = 0;
lcol = 0;
lcur = 0;
lenv = 0;
lerr = 0;
lknb = 0;
lpph = 0;
lpwr = 0;
lpls = 0;
lsnk = 0;
ltmp = 0;
ltmr = 0;
ltpr = 0;
lver = 0;
lvol = 0;
 
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
			
				// service.getCharacteristic(uuid_writ).then(put),
				  service.getCharacteristic(uuid_down).then(read)
			]);
	
             }).catch(error => {
			          document.getElementById("demo").innerHTML=error;
			});
}

function put(characteristic){
	//if(characteristic == null){
	//document.getElementById("w").innerHTML="w";
	//characteristic = chosenHeartRateService.getCharacteristic(uuid_writ);
	// let resetEnergyExpended = new Uint8Array([34,8,35,7]);
    //characteristic.writeValue(resetEnergyExpended);
	//document.getElementById("w").innerHTML="wr";
//	}else{
    let resetEnergyExpended = new Uint8Array([34,8,35,7]);
    characteristic.writeValue(resetEnergyExpended);
	document.getElementById("w").innerHTML="write";
}


function read(characteristic){
  return characteristic.startNotifications()
  .then(characteristic => {
    characteristic.addEventListener('characteristicvaluechanged',onHeartRateChanged);
  });
	
}

function putText(){
	let  s = document.querySelector('#set').value;
	var j = parseInt(s);
	var star = j/256;
	var dest = j%256;
	let resetEnergyExpended = new Uint8Array([34,star,35,dest]);
	document.getElementById("w").innerHTML="w";
	characteristic = chosenHeartRateService.getCharacteristic(uuid_writ);
   characteristic.writeValue(resetEnergyExpended);
	document.getElementById("w").innerHTML="wr";
	
	
}

function onHeartRateChanged(event) {
    var s = event.target.value;
    var i, n = s.byteLength;
    for (i = 0; i < n;){
        var k = s.getInt8(i++);
        var v = s.getInt8(i++);
        switch(k){
        case 0x22:
            lpwr = v;
            cpwr.innerHTML = hpwr + lpwr;
            break;
        case 0x23:
            hpwr = v << 8;
            cpwr.innerHTML = hpwr + lpwr;
            break;
        case 0x24:
            lpph = v;
            cpph.innerHTML = hpph + lpph;
            break;
        case 0x25:
            hpph = v << 8;
            cpph.innerHTML = hpph + lpph;
            break;
        case 0x26:
            ctst.innerHTML = v;
            break;
        case 0x27:
            //ctst.innerHTML = v;
            break;
        case 0x28:
            ltmr = v;
            ctmr.innerHTML = htmr + ltmr;
            break;
        case 0x29:
            htmr = v << 8;
            ctmr.innerHTML = htmr + ltmr;
            break;
        case 0x2a:
            ltmp = v;
            ctmp.innerHTML = htmp + ltmp;
            break;
        case 0x2b:
            htmp = v << 8;
            ctmp.innerHTML = htmp + ltmp;
            break;
        case 0x2c:
            cind.innerHTML = v;
            break;
        case 0x2d:
            cmod.innerHTML = v;
            break;
        case 0x62:
            lerr = v;
            rerr.innerHTML = herr + lerr;
            break;
        case 0x63:
            herr = v << 8;
            rerr.innerHTML = herr + lerr;
            break;
        case 0x64:
            lvol = v;
            rvol.innerHTML = hvol + lvol;
            break;
        case 0x65:
            hvol = v << 8;
            rvol.innerHTML = hvol + lvol;
            break;
        case 0x66:
            lcur = v;
            rcur.innerHTML = hcur + lcur;
            break;
        case 0x67:
            hcur = v << 8;
            rcur.innerHTML = hcur + lcur;
            break;
        case 0x68:
            ltpr = v;
            rtpr.innerHTML = htpr + ltpr;
            break;
        case 0x69:
            htpr = v << 8;
            rtpr.innerHTML = htpr + ltpr;
            break;
        case 0x6a:
            rtst.innerHTML = v;
            break;
        case 0x6c:
            lsnk = v;
            rsnk.innerHTML = hsnk + lsnk;
            break;
        case 0x6d:
            hsnk = v << 8;
            rsnk.innerHTML = hsnk + lsnk;
            break;
        case 0x6e:
            lclk = v;
            rclk.innerHTML = hclk + lclk;
            break;
        case 0x6f:
            hclk = v << 8;
            rclk.innerHTML = hclk + lclk;
            break;
        case 0x70:
            lpls = v;
            rpls.innerHTML = hpls + lpls;
            break;
        case 0x71:
            hpls = v << 8;
            rpls.innerHTML = hpls + lpls;
            break;
        case 0x72:
            lcol = v;
            rcol.innerHTML = hcol + lcol;
            break;
        case 0x73:
            hcol = v << 8;
            rcol.innerHTML = hcol + lcol;
            break;
        case 0x74:
            rtop.innerHTML = v;
            break;
        case 0x76:
            lver = v;
            rver.innerHTML = hver + lver;
            break;
        case 0x77:
            hver = v << 8;
            rver.innerHTML = hver + lver;
            break;
        case 0x78:
            lenv = v;
            renv.innerHTML = henv + lenv;
            break;
        case 0x79:
            henv = v << 8;
            renv.innerHTML = henv + lenv;
            break;
        case 0x7e:
            rbtn.innerHTML = v;
            break;
        case 0x7f:
            rknb.innerHTML = v;
            break;
        default:
            console.log('k: ' + k + ', v: ' + v);
        }
    }
	
}






