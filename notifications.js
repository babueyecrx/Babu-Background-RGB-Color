$(document).ready(function() {
    	if(chrome.notifications){
    		chrome_notification_create();
    	}
    });
    
    
var chrome_notification_create = function() {
	
	// This is just for later usage not considered now
	
	var options = {
			type : "basic",
			title : "Notice",
			message: "We have changed our brand icon. Thank you for your kind long support. - Babu Background Color",
			iconUrl: "imgs/se/se128_green.png"
	}
	
	chrome.notifications.create(
			'id1',
			{
				type:'basic',
				iconUrl:chrome.runtime.getURL("imgs/se/se128_green.png"),
				title : "Notice",
				message: "We have changed our brand icon. Thank you for your kind long support. - Babu Background Color",
				priority:1,
				buttons:[{
					       title:'call'
						},
					{
						title:'send mail'
					}
				],
				isClickable: true
				
			},
			function() {
				console.log(chrome.runtime.lastError);
			}
		);
}