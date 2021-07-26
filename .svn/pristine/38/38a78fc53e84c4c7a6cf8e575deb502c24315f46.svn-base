
var READER_TYPE = {
	_reader_type_contactLess:1,
	_reader_type_contact:2,
	_reader_type_keyBoard:3,
};

var FUNCIDS = {
	_fid_adaptReader:0,
	_fid_initialcom:1,
	_fid_exit:2,
	_fid_beep:3,
	_fid_GetDevSN:4,
	_fid_srd_eeprom:5,
	_fid_swr_eeprom:6,
	_fid_setBright:7,
	_fid_dispstr_ex:8,
	_fid_dispClear:9,
	_fid_passInReady:10,
	_fid_getPassPressed:11,
	_fid_getPassConfirmed:12,
	_fid_passInEnd:13,
	_fid_loadKey:30,
	_fid_findCard:31,
	_fid_findCardStr:32,
	_fid_findCardHex:33,
	_fid_authenClass:34,
	_fid_readAsStr:35,
	_fid_readAsHex:36,
	_fid_writeAsStr:37,
	_fid_writeAsHex:38,
	_fid_initVal:39,
	_fid_increment:40,
	_fid_decrement:41,
	_fid_readVal:42,
	_fid_transfer:43,
	_fid_changeKey:44,
	_fid_halt:45,
	_fid_resetRF:46,
	_fid_fcpuReset:50,
	_fid_fcpuAPDU:51,
	_fid_mifareProReset:52,
	_fid_mifareProAPDU:53,
	_fid_fmCosSelectApp:60,
	_fid_fmCosCreateMainApp:61,
	_fid_fmCosDeleteFileSys:62,
	_fid_fmCosVerifyKey:63,
	_fid_fmCosCreateDirectory:64,
	_fid_fmCosSelectDirectory:65,
	_fid_fmCosCreateKeyFile:66,
	_fid_fmCosAddKey:67,
	_fid_fmCosAddKeyEx:68,
	_fid_fmFWCosCreateBinaryFile:69,
	_fid_fmFWCosCreateRecordFile:70,
	_fid_fmCosCreateADF:71,
	_fid_fmCosActiveDirectory:72,
	_fid_fmCosReadBinaryFile:73,
	_fid_fmCosUpdateBinaryFile:74,
	_fid_fmCosAppendRecord:75,
	_fid_fmCosUpdateRecord:76,
	_fid_fmCosReadRecord:77,
	_fid_fmCosCredit:78,
	_fid_fmCosPurchase:79,
	_fid_fmCosGetBalance:80,
	_fid_fmCosUpdateKey:81,
	_fid_fmCosUpdatePin:82,
	_fid_fmCosPinReload:83,
	_fid_fmCosPinUnlock:84,
	_fid_icode_inventory:85,
	_fid_icode_select_uid:86,
	_fid_icode_readblockAsStr:87,
	_fid_icode_readblockAsHex:88,
	_fid_icode_writeblockAsStr:89,
	_fid_icode_writeblockAsHex:90,
	_fid_icode_lock_block:91,
	_fid_icode_get_systemInfo:92,
	_fid_request_b:150,
	_fid_CommandLink_at:151,
	_fid_config_card:399,
	_fid_getIDCardSN:400,
	_fid_strToHex:500,
	_fid_hexToStr:501,
};


var SmartReader={
    OBJ:function(){
		var reader={};
		var SocketOpen=false;
		var socket=null;
		var target=null;
		var adaptedID = READER_TYPE._reader_type_contactLess;

        reader.onResult=function(func){
            target.addEvent("Result", func);
        };
        
        var WSonOpen=function(){
			var pseudoName = "webReader";
			var curTime = new Date();
			var lTime = Date.parse(curTime);
			var ms = curTime.getMilliseconds();
			
			socket.send('0'+pseudoName+lTime+ms);
            SocketOpen=true;
			reader.adaptReader(adaptedID);
        };
        var WSonMessage=function(msg){
			var str = "";
			str = msg.data;

			var id  = str.substr(0, 1);
			var separator = str.indexOf("|");
			var funcid = "";
			var arg1 = "";

			if(separator != -1)
			{
				funcid = str.substr(1, separator-1);
				arg1 = str.substr(separator+1);
			}
			else
				funcid = str.substr(1);				
					
			//alert("id:" + id + ",funcid:" + funcid +",arg1:" + arg1); 
			
            var resultData = {
                type:"Result",
				FunctionID:parseInt(funcid),
				RePara_Int:parseInt( _getCmdResult(arg1)),
				RePara_Str:_getResultPara(arg1)
            };
			
			
            if(target!=null)
                target.fireEvent(resultData);
        };
        var WSonClose=function(){
            SocketOpen=false;
        };
        var WSonError=function(){
			document.querySelector('#status').innerHTML = '读卡器环境配置失败,请重新加载或重新安装环境'
			document.querySelector('#loadBtnCon').style.display = 'block'
        };
        reader.createSocket=function(){
            try{
                if ("WebSocket" in window){
                    socket = new WebSocket("ws://localhost:81/webReaderServer");
                }
                else if("MozWebSocket" in window){
                    socket = new MozWebSocket("ws://localhost:81/webReaderServer");
                }
                else{
                    alert("None");
                    return false;
                }
                socket.onopen= WSonOpen;
                socket.onmessage= WSonMessage;
                socket.onclose= WSonClose;
                socket.onerror= WSonError;
                target = new EventTarget();
                return true;
            }
            catch (ex){
                return false;
            }
        };
        reader.Disconnect=function(){
            if(socket!=null)
                socket.close();
        };

		reader.getOBJ = function(id){
			adaptedID = id;
			return reader;
		};

        var SendCmd=function(FuncName, FunctionID, ParamStr){
			var entryCmd;
			if(true == SocketOpen)
			{
				entryCmd = '1' + FunctionID + "|" + FuncName+"|"+ParamStr;
				socket.send(entryCmd);
			}
        };
		
		reader.adaptReader= function(readerType){SendCmd("adaptReader", FUNCIDS._fid_adaptReader, readerType);};
		reader.initialcom = function(portType, baud){SendCmd("initialcom",FUNCIDS._fid_initialcom,portType+","+ baud); };
		reader.exit = function(hdev){SendCmd("exit",FUNCIDS._fid_exit,hdev);};
		reader.beep = function(hdev, delay){SendCmd("beep",FUNCIDS._fid_beep,hdev+","+ delay); };
		reader.GetDevSN=function(hdev){SendCmd("GetDevSN", FUNCIDS._fid_GetDevSN, hdev);};
		reader.srd_eeprom = function(hdev,offset, length){SendCmd("srd_eeprom", FUNCIDS._fid_srd_eeprom, hdev+","+offset+","+length);};
		reader.swr_eeprom = function(hdev,offset,length,wData){SendCmd("swr_eeprom", FUNCIDS._fid_swr_eeprom, hdev+","+offset+","+length+","+wData);};
		reader.lcd_setBright=function(hdev,fBright){SendCmd("lcd_setBright",FUNCIDS._fid_setBright,hdev+","+fBright);};
		reader.lcd_dispstr_ex=function(hdev,str,line,offset,str_len,flag){SendCmd("lcd_dispstr_ex",FUNCIDS._fid_dispstr_ex,hdev+","+str+","+line+","+offset+","+str_len+","+flag);};
		reader.lcd_dispclear=function(hdev){SendCmd("lcd_dispclear",FUNCIDS._fid_dispClear,hdev);};
		reader.passInReady=function(hdev,waitTime){SendCmd("passInReady",FUNCIDS._fid_passInReady,hdev+","+waitTime);};
		reader.getPassPressed=function(hdev){SendCmd("getPassPressed",FUNCIDS._fid_getPassPressed, hdev);};
		reader.getPassConfirmed=function(hdev){SendCmd("getPassConfirmed",FUNCIDS._fid_getPassConfirmed, hdev);};
		reader.passInEnd=function(hdev){SendCmd("passInEnd",FUNCIDS._fid_passInEnd,hdev);};

		reader.loadkey = function(hdev, mode, sector, strKey){SendCmd("loadkey",FUNCIDS._fid_loadKey, hdev+","+mode+","+sector+","+strKey);};
		reader.findcard = function(hdev,mode){SendCmd("findcard",FUNCIDS._fid_findCard, hdev+","+mode);};
		reader.findcardStr=function(hdev,mode){SendCmd("findcardStr",FUNCIDS._fid_findCardStr,hdev+","+mode);};
		reader.findcardHex=function(hdev,mode){SendCmd("findcardHex",FUNCIDS._fid_findCardHex, hdev + ","+mode);};
		reader.authentication=function(hdev,mode, sector){SendCmd("authentication",FUNCIDS._fid_authenClass, hdev+","+mode+","+sector);};
		reader.read =function(hdev, block){SendCmd("read", FUNCIDS._fid_readAsStr, hdev+","+block);};
		reader.directRead=function(hdev,block){SendCmd("directRead",FUNCIDS._fid_readAsHex, hdev+","+block);};
		reader.write=function(hdev, block, wdata){SendCmd("write",FUNCIDS._fid_writeAsStr, hdev+","+block+","+wdata);};
		reader.directWrite=function(hdev,block,wdata){SendCmd("directWrite", FUNCIDS._fid_writeAsHex,hdev+","+block+","+wdata);};
		reader.initialval=function(hdev,block,value){SendCmd("initval",FUNCIDS._fid_initVal,hdev+","+block+","+value);};
		reader.increment=function(hdev,block,value){SendCmd("increment",FUNCIDS._fid_increment,hdev+","+block+","+value);};
		reader.decrement=function(hdev,block,value){SendCmd("decrement",FUNCIDS._fid_decrement,hdev+","+block+","+value);};
		reader.readval=function(hdev,block){SendCmd("readval",FUNCIDS._fid_readVal,hdev+","+block);};
		reader.transfer=function(hdev,block){SendCmd("transfer",FUNCIDS._fid_transfer, hdev+","+block);};
		reader.changkey=function(hdev,sector,strKeyA,strCtrlW,bk,strKeyB){SendCmd("changekey",FUNCIDS._fid_changeKey,hdev+","+sector+","+strKeyA+","+strCtrlW+","+bk+","+strKeyB);};
		reader.halt=function(hdev){SendCmd("halt",FUNCIDS._fid_halt,hdev);};
		reader.reset=function(hdev,ms){SendCmd("reset",FUNCIDS._fid_resetRF,hdev+","+ms);};
		reader.mifareproReset=function(hdev){SendCmd("mifareProReset",FUNCIDS._fid_mifareProReset, hdev);};
		reader.mifareproCommandlink=function(hdev, strCmd){SendCmd("mifareproCommandlink",FUNCIDS._fid_mifareProAPDU, hdev+","+strCmd);};
		reader.fcpureset=function(hdev,rlen){SendCmd("fcpureset", FUNCIDS._fid_fcpuReset, hdev+","+rlen);};
		reader.fcpuCommandlink=function(hdev,slen, strSendCmd,ftt,fFG){SendCmd("cpuCommand",FUNCIDS._fid_fcpuAPDU, hdev+","+slen+","+strSendCmd+","+ftt+","+fFG);};
		reader.GetIDCardSN=function(hdev){SendCmd("getIDCardSN", FUNCIDS._fid_getIDCardSN, hdev);};

		reader.FWCosSelecteApp=function(hdev){SendCmd("FMCosSelectApp",FUNCIDS._fid_fmCosSelectApp, hdev);};
		reader.FWCosCreateMainApp=function(hdev){SendCmd("FMCosCreateMainApp", FUNCIDS._fid_fmCosCreateMainApp,hdev);};
		reader.FWCosDeleteFileSys=function(hdev){SendCmd("FMCosDeleteFileSys", FUNCIDS._fid_fmCosDeleteFileSys, hdev);};
		reader.FWCosVerifyKey=function(hdev, pbKey, ulKeyType){SendCmd("FMCosVerifyKey",FUNCIDS._fid_fmCosVerifyKey,hdev+","+pbKey+","+ulKeyType);};
		reader.FWCosCreateDirectory=function(hdev,usDirFileID,usDirSize,ulCreateSec,ulDeleteSec){SendCmd("FMCosCreateDirectory",FUNCIDS._fid_fmCosCreateDirectory,
			hdev+","+usDirFileID+","+usDirSize+","+ulCreateSec+","+ulDeleteSec);};
		reader.FWCosSelectDirectory=function(hdev,usDirID){SendCmd("FMCosSelectDirectory",FUNCIDS._fid_fmCosSelectDirectory,hdev+","+usDirID);};
		reader.FWCosCreateKeyFile=function(hdev,usDirFileID,usFileID,uFileLen,ulGenSec){SendCmd("FMCosCreateKeyFile",FUNCIDS._fid_fmCosCreateKeyFile,
			hdev+","+usDirFileID+","+usFileID+","+uFileLen+","+ulGenSec);};
		reader.FWCosAddKey=function(hdev,bKeyType,pbKeyValue){SendCmd("FMCosAddKey",FUNCIDS._fid_fmCosAddKey,hdev+","+bKeyType+","+pbKeyValue);};
		reader.FWCosAddKeyEx=function(hdev,bKeyType,ucKeyID,pbKeyValue,ucSecUpdate,ucNextSt,ucMaxCntError,cryptType){SendCmd("FMCosAddKeyEx",FUNCIDS._fid_fmCosAddKeyEx,
			hdev+","+bKeyType+","+ucKeyID+","+pbKeyValue+","+ucSecUpdate+","+ucNextSt+","+ucMaxCntError+","+cryptType);};
		reader.FWCosCreateBinaryFile=function(hdev,usDirFileID,usFileID,usFileLen,cryptType,ulReadSec,ulUpdateSec,ulDeleteSec){SendCmd("FMCosCreateBinaryFile",
			FUNCIDS._fid_fmFWCosCreateBinaryFile,hdev+","+usDirFileID+","+usFileID+","+usFileLen+","+cryptType+","+ulReadSec+","+ulUpdateSec);};
		reader.FWCosCreateRecordFile=function(hdev,usDirFileID,ucFRecord,usFileID,bRecordNum,bRecordLen,cryptType,ulReadSec,ulUpdateSec,ulDeleteSec){
			SendCmd("FMCosCreateRecordFile",FUNCIDS._fid_fmFWCosCreateRecordFile,hdev+","+usDirFileID+","+ucFRecord+","+usFileID+","+bRecordNum+","+bRecordLen+","+
				cryptType+","+ulReadSec+","+ulUpdateSec+","+ulDeleteSec);};
		reader.FWCosCreateADF=function(hdev,usDirFileID,ulCreateSec,ulDeleteSec,pbDirName){SendCmd("FMCosCreateADF",FUNCIDS._fid_fmCosCreateADF,hdev+","+usDirFileID+","+ulCreateSec+","+ulDeleteSec+","+pbDirName);};
		reader.FWCosActiveDirectory=function(hdev,usDirFileID){SendCmd("FMCosActiveDirectory",FUNCIDS._fid_fmCosActiveDirectory,hdev+","+usDirFileID);};
		reader.FWCosReadBinaryFile=function(hdev,usFileID,usOffset,usReadLen,cryptType,pProKey){SendCmd("FMCosReadBinaryFile",FUNCIDS._fid_fmCosReadBinaryFile,
			hdev+","+usFileID+","+usOffset+","+usReadLen+","+cryptType+","+pProKey);};
		reader.FWCosUpdateBinaryFile=function(hdev,usFileID,usOffset,pbBinData,cryptType,pProKey){SendCmd("FMCosUpdateBinaryFile",FUNCIDS._fid_fmCosUpdateBinaryFile,
			hdev+","+usFileID+","+usOffset+","+pbBinData+","+cryptType+","+pProKey);};
		reader.FWCosAppendRecord=function(hdev,bRecordFileID,pbRecData,cryptType,pProKey){SendCmd("FMCosAppendRecord",FUNCIDS._fid_fmCosAppendRecord,
			hdev+","+bRecordFileID+","+pbRecData+","+cryptType+","+pProKey);};
		reader.FWCosUpdateRecord=function(hdev,ucRecord,bRecordFileID,bRecordNum,pbRecData,cryptType,pProKey){SendCmd("FMCosUpdateRecord",FUNCIDS._fid_fmCosUpdateRecord,
			hdev+","+ucRecord+","+bRecordFileID+","+bRecordNum+","+pbRecData+","+cryptType+","+pProKey);};
		reader.FWCosReadRecord=function(hdev,ucFRecord,bRecordFileID,bRecordNum,bRecordLen){SendCmd("FMCosReadRecord",FUNCIDS._fid_fmCosReadRecord,
			hdev+","+ucFRecord+","+bRecordFileID+","+bRecordNum+","+bRecordLen);};
		reader.FWCosCredit=function(hdev,ucKeyID,value,terminalID,pbCreditKey){SendCmd("FMCosCredit",FUNCIDS._fid_fmCosCredit,
			hdev+","+ucKeyID+","+value+","+terminalID+","+pbCreditKey);};
		reader.FWCosPurchase=function(hdev,ucKeyID,value,terminalID,pbPurchaseKey){SendCmd("FMCosPurchase",FUNCIDS._fid_fmCosPurchase,
			hdev+","+ucKeyID+","+value+","+terminalID+","+pbPurchaseKey);};
		reader.FWCosGetBalance=function(hdev){SendCmd("FMCosGetBalance",FUNCIDS._fid_fmCosGetBalance,hdev);};
		reader.FWCosUpdateKey=function(hdev,pbOldKey,pbNewKey,bKeyType){SendCmd("FMCosUpdateKey",FUNCIDS._fid_fmCosUpdateKey,
			hdev+","+pbOldKey+","+pbNewKey+","+bKeyType);};
		reader.FWCosUpdatePin=function(hdev,pbOldPin,pbNewPin){SendCmd("FMCosUpdatePin",FUNCIDS._fid_fmCosUpdatePin, 
			hdev+","+pbOldPin+","+pbNewPin);};
		reader.FWCosPinReload=function(hdev,pbNewPin,pbReloadKey){SendCmd("FMCosPinReload",FUNCIDS._fid_fmCosPinReload,
			hdev+","+pbNewPin+","+pbReloadKey);};
		reader.FWCosPinUnlock=function(hdev,pbPin,pbUnlockKey){SendCmd("FMCosPinUnlock",FUNCIDS._fid_fmCosPinUnlock,
			hdev+","+pbPin+","+pbUnlockKey);};
		reader.icode_inventory=function(hdev,findMode,AFI,maskLen){SendCmd("icode_inventory",FUNCIDS._fid_icode_inventory,
      hdev+","+findMode+","+AFI+","+maskLen);};
    reader.icode_select_uid=function(hdev,flags,UID){SendCmd("icode_select_uid",FUNCIDS._fid_icode_select_uid,
      hdev+","+flags+","+UID);};
    reader.icode_readblock=function(hdev,flags,startblock,blocknum,UID){SendCmd("icode_readblock",FUNCIDS._fid_icode_readblockAsStr,
      hdev+","+flags+","+startblock+","+blocknum+","+UID);};
    reader.icode_readblock_hex=function(hdev,flags,startblock,blocknum,UID){SendCmd("icode_readblock_hex",FUNCIDS._fid_icode_readblockAsHex,
      hdev+","+flags+","+startblock+","+blocknum+","+UID);};
    reader.icode_writeblock=function(hdev,flags,startblock,blocknum,UID,wbuffer){SendCmd("icode_writeblock",FUNCIDS._fid_icode_writeblockAsStr,
      hdev+","+flags+","+startblock+","+blocknum+","+UID+","+wbuffer);};
    reader.icode_writeblock_hex=function(hdev,flags,startblock,blocknum,UID,wbuffer){SendCmd("icode_writeblock_hex",FUNCIDS._fid_icode_writeblockAsHex,
      hdev+","+flags+","+startblock+","+blocknum+","+UID+","+wbuffer);};
    reader.icode_lock_block=function(hdev,flags,block,UID){SendCmd("icode_lock_block",FUNCIDS._fid_icode_lock_block,
      hdev+","+flags+","+block+","+UID);};
    reader.icode_get_systemInfo=function(hdev,flags,UID){SendCmd("icode_get_systemInfo",FUNCIDS._fid_icode_get_systemInfo,
      hdev+","+flags+","+UID);};
      
    reader.request_b=function(hdev,mode,aid,channalNum){SendCmd("request_b",FUNCIDS._fid_request_b, hdev + ","+mode+","+aid+","+channalNum);};
    reader.CommandLink_at=function(hdev,slen, strSendCmd){SendCmd("CommandLink_at",FUNCIDS._fid_CommandLink_at, hdev+","+slen+","+strSendCmd);};

		reader.config_card = function(hdev,cardType){SendCmd("config_card", FUNCIDS._fid_config_card,
      hdev+","+cardType);};

		reader.hexTochar=function(str,strLen){SendCmd("strToHex",FUNCIDS._fid_strToHex, str+","+strLen);};
		reader.charToHex=function(hex,hexLen){SendCmd("hexToStr",FUNCIDS._fid_hexToStr, hex+","+hexLen);};

        return reader;
    }
};

function EventTarget()
{
    this.handlers = {};
}

EventTarget.prototype = {
    constructor: EventTarget,addEvent: function(type, handler){
        if(typeof this.handlers[type] == 'undefined'){this.handlers[type] = [];}this.handlers[type].push(handler);
    },fireEvent: function(event){
        if(!event.target){
            event.target = this;
        }
        if(this.handlers[event.type] instanceof Array){
            var handlers = this.handlers[event.type];for(var i = 0; i < handlers.length; i++){
                handlers[i](event);
            }
        }},removeEvent: function(type, handler){
        if(this.handlers[type] instanceof Array){
            var handlers = this.handlers[type];
            for(var i = 0; i < handlers.length; i++){
                if(handlers[i] == handler){break;}
            }
            handlers.splice(i, 1);
        }
    }
};

function _getCmdResult(relPara)
{
	var iRel;
	var separator = relPara.indexOf(",");
	if(separator != -1)
	{
		iRel = relPara.substr(0, separator);
	}
	else
		iRel = relPara.substr(0);	

	return iRel;
}
function _getResultPara(relPara)
{
	var szPara="";
	var separator = relPara.indexOf(",");
	if(separator != -1)
	{
		szPara = relPara.substr(separator+1);
	}
	return szPara;
}

try
{
 var embed_reader = SmartReader.OBJ();
}
catch(e)
{
}

if(!embed_reader.createSocket())
{
}
