export const NOTIF_WISHLIST_CHANGED = "notif_wishlist_changed";

let instance=null;
var observers = {};

class NotificationService{
	constructor(){
		if(!instance){
			instance = this;
		}
		
		return instance;
	}
	
	postNotification = (notificationName, data) => {
		let obs = observers[notificationName];
		for(var x=0; x < obs.length; x++){
			var obj = obs[x];
			obj.callBack(data);
		}
	}
	
	addObserver = (notificationName, observer, callBack) => {
		let obs = observers[notificationName];
		
		if(!obs){
			observers[notificationName] = [];
		}
		
		let obj = {observer: observer, callBack: callBack};
		observers[notificationName].push(obj);
		
	}
	
	removeObserver = (observer, notificationName) => {
		var obs = observers[notificationName];
		
		if(obs){
			for(var x =0 ; x < obs.length ; x++){
				if(observer === obs[x].observe){
					obs.splice(x,1);
					observers[notificationName] = obs;
					break;
				}
			}
		}		
	}	
	
}

export default NotificationService;