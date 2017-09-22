
let chosenHeartRateService = null;
uuid_tnnl = '00000000-0000-1000-8000-00805f9b34fb';
uuid_writ = '00000001-0000-1000-8000-00805f9b34fb';
uuid_down = '00000002-0000-1000-8000-00805f9b34fb';

function go(){
    navigator.bluetooth.requestDevice({filters:[{services: [uuid_tnnl]}]})
    .then(device => {
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


let rese= new Uint8Array(4);
function set(value){
	rese[0] = 0x2c;
	rese[1] = value;
	
	chosenHeartRateService.getCharacteristic(uuid_writ).then(characteristic =>{
    characteristic.writeValue(rese);
     });
   console.log(rese);
}


var vList = ['mv/1.mp4', 'mv/2.mp4', 'mv/3.mp4'];
var curr = 0; 

var __lis = [{"power":0,"time":0,"text":"将炒锅洗净擦干放在炉面上"}, 
			{"power":9,"time":5000,"text":"向锅内加入一茶植物油"}, 
			{"power":7,"time":10000,"text":"放入01腌制好的鸡翅"},
			{"power":7,"time":10000,"text":"逐个鸡翅翻面"},
			{"power":9,"time":5000,"text":"晃动锅子使鸡翅滑动"},
			{"power":9,"time":15000,"text":"加入02青椒和红椒"},
			{"power":9,"time":5000,"text":"晃动锅子"},
			{"power":9,"time":15000, "text":"加入03混合好的调味汁（糖，米酒，金兰酱油，麻油，金兰油膏，水）"},
			{"power":0,"time":0, "text":"盛出鸡翅和青红椒备用"},
			{"power":0,"time":0, "text":"将炒锅洗净擦干，放在炉面上"},
			{"power":9,"time":5000, "text":"向锅内加入2汤匙植物油"},
			{"power":6,"time":10000, "text":"加入04干葱头，大蒜，生姜"},
			{"power":9,"time":8000, "text":"加入炒好的鸡翅和青红椒"},
			{"power":6,"time":6000, "text":"加入0520克九层塔"},
			{ "end":9999, "text":"烹饪完成"}];

var __eul = document.getElementById("lrc");
var  _lineno = 0; 

var __freq = 20; 
var __fraction = 2/5; 
	  var down= document.getElementById("down");

function xia(){
	go();
	
  curr++;
   if(curr>2){
   curr = 0;
   }
   
  var playe= document.getElementById("playe");
  playe.src =  vList[curr];
  
  set(__lis[_lineno].power);

    _lineno++;
	var time = __lis[_lineno].time;
	  setTimeout("wait()",time);
	  
	  if(time > 0){
		  down.disabled = "true";
		  
	var destime=(time-1000)/1000;
	var  timer=setInterval(function() {
		down.value ="等待"+destime+"秒下一步"
		if(destime == 0){
			clearInterval(timer); 
			down.value="下一步"
		}
		destime--;
    console.log(destime);
     }, 1000);
	  }
	
	
	__eul.children[_lineno-1].setAttribute("class", "");
	var _ep = __eul.children[_lineno];
	_ep.setAttribute("class", "z-crt");
	var zhText = __lis[_lineno].text;
    responsiveVoice.speak(zhText, "Chinese Female", {rate: 1.0});
	
	 if(__lis[_lineno].end == 9999){	
        alert("烹饪完成");   
        javascript :history.back(-1);
	 }
	
	var _scrollTop;
	if (_ep.offsetTop < __eul.clientHeight*__fraction){
		_scrollTop = 0;
	} else if (_ep.offsetTop > (__eul.scrollHeight - __eul.clientHeight*(1-__fraction))){
		_scrollTop = __eul.scrollHeight - __eul.clientHeight;
	} else {
		_scrollTop = _ep.offsetTop - __eul.clientHeight*__fraction;
	}

	if (__eul.scrollTop > (_scrollTop + __eul.clientHeight*__fraction)
		|| (__eul.scrollTop + __eul.clientHeight*__fraction) < _scrollTop){
		__eul.scrollTop = _scrollTop;
	} else {
		var _step = Math.ceil(Math.abs(__eul.scrollTop - _scrollTop)/(__freq));
		__scroll(__eul.scrollTop, _scrollTop, _step);		
	}
}

function wait(){
	  down.disabled = false;
	  console.log("wait");
}

__scroll = function(_crt, _dst, _step){
	if(Math.abs(_crt - _dst) < _step){
		return;
	}
	if(_crt < _dst){
		__eul.scrollTop += _step;
		_crt += _step;
	} else {
		__eul.scrollTop -= _step;
		_crt -= _step;
	}
	setTimeout(__scroll.bind(this, _crt, _dst, _step), __freq);
};


(function(){
(function(){
for (var i = 0; i < __lis.length; i++) {
	var eli = document.createElement("li");
	eli.innerText = __lis[i].text;
	__eul.appendChild(eli);
}
	
	var _ep = __eul.children[0];
	_ep.setAttribute("class", "z-crt");
	
   var zhText = __lis[0].text;
   responsiveVoice.speak(zhText, "Chinese Female", {rate: 1.0});
   
})();

})();

