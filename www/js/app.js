var History = ko.observableArray([]);
var Current = '';
var sigCapture = null;

function AppViewModel() {
	//Variables
    var self = this;
    self.data = new Data();
    self.new_claims = ko.observableArray([]);
    self.open_claims = ko.observableArray([]);
    self.saved_payment_requests = ko.observableArray([]);
    self.selectedClaim = ko.observable();
    self.adjuster = {
		first_name:ko.observable('John'),
		last_name:ko.observable('Smith'),
		fc_num:ko.observable('1234556789'),  
		phone:ko.observable('(806)553-5252'),
		email:ko.observable('info@threeleaf.net'),
    };
    
        


	//CRON JOBS / SYSTEM FUNCTIONS
		//3 MINUTE CRON JOB
		setInterval(function(){
			//console.log('3Minutes');
		},(3*60*1000));
		
		var intCount = 0;
		
		//20 MINUTE CRON JOB
		setInterval(function(){
			//console.log('20Minutes');
		},(20*60*1000));
		
		//INITIAL DATA PULL
		setTimeout(function() {
			self.initialize();
		}, 0);
		
		self.initialize = function() {
			self.new_claims(self.data.loadClaims());
		}
		
		//UPDATE AFTER BEING IN THE BACKGROUND
		self.resume = function() {
			
		}
		
		self.getPhoto1 = function() {
			navigator.camera.getPicture(self.processPicture1,null,{quality:60,targetHeight:300,targetWidth:300});
		}
		
		self.processPicture1 = function(data) {
			$('#photo1').attr('src',data);
		}
		
		self.getPhoto2 = function() {
			navigator.camera.getPicture(self.processPicture2,null,{quality:60,targetHeight:300,targetWidth:300});
		}
		
		self.processPicture2 = function(data) {
			$('#photo2').attr('src',data);
		}
		
		self.getPhoto3 = function() {
			navigator.camera.getPicture(self.processPicture3,null,{quality:60,targetHeight:300,targetWidth:300});
		}
		
		self.processPicture3 = function(data) {
			$('#photo3').attr('src',data);
		}
		
		self.getPhoto4 = function() {
			navigator.camera.getPicture(self.processPicture4,null,{quality:60,targetHeight:300,targetWidth:300});
		}
		
		self.processPicture4 = function(data) {
			$('#photo4').attr('src',data);
		}
		
		self.getPhoto5 = function() {
			navigator.camera.getPicture(self.processPicture5,null,{quality:60,targetHeight:300,targetWidth:300});
		}
		
		self.processPicture5 = function(data) {
			$('#photo5').attr('src',data);
		}
		
		self.getPhoto6 = function() {
			navigator.camera.getPicture(self.processPicture6,null,{quality:60,targetHeight:300,targetWidth:300});
		}
		
		self.processPicture6 = function(data) {
			$('#photo6').attr('src',data);
		}
		
		self.getPhoto7 = function() {
			navigator.camera.getPicture(self.processPicture7,null,{quality:60,targetHeight:300,targetWidth:300});
		}
		
		self.processPicture7 = function(data) {
			$('#photo7').attr('src',data);
		}
		
		self.getPhoto8 = function() {
			navigator.camera.getPicture(self.processPicture8,null,{quality:60,targetHeight:300,targetWidth:300});
		}
		
		self.processPicture8 = function(data) {
			$('#photo8').attr('src',data);
		}
		
		self.getPhoto9 = function() {
			navigator.camera.getPicture(self.processPicture9,null,{quality:60,targetHeight:300,targetWidth:300});
		}
		
		self.processPicture9 = function(data) {
			$('#photo9').attr('src',data);
		}
		
		self.getPhoto10 = function() {
			navigator.camera.getPicture(self.processPicture10,null,{quality:60,targetHeight:300,targetWidth:300});
		}
		
		self.processPicture10 = function(data) {
			$('#photo10').attr('src',data);
		}


	//NAVIGATION
		self.loadReports = function() { loadPage('reports'); }
		self.loadReport = function(claim) {
			self.open(claim);
			loadPage('report'); 
		}
		self.loadEngineer = function(claim) {
			self.open(claim);
			loadPage('engineer'); 
		}
		self.loadLogin = function() { loadPage('login'); }
		self.loadUpload = function() { loadPage('upload'); }
		self.loadSettings = function() { loadPage('settings'); }
		self.loadAdvanced = function(claim) {
			self.open(claim);
			loadPage('advanced',null,self.setupAdvanced);
		}
		
        self.setupAdvanced = function() {
            sigCapture = new SignatureCapture( "signature" );
        }
        
		self.back = function() {
			var href = History.pop();
			loadPage(href, true);
		}
		
		self.open = function(claim) {
			if(self.new_claims.indexOf(claim) >= 0) {
				self.open_claims.push(claim);
				self.new_claims.remove(claim);
			}
		}
		
	//CLAIMS
		self.getClaim = function(claim) {
			self.selectedClaim(claim);
		}
}

var viewModel = new AppViewModel();


//Custom bindingHandlers
ko.bindingHandlers.dateString = {
	update: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		try {
			var value = valueAccessor();
			var valueUnwrapped = ko.utils.unwrapObservable(value);
			var dateParts = valueUnwrapped.match(/^(\d{4})-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/);
			var ampm = 'am';
			if(dateParts[4] > 12) {
				dateParts[4] = dateParts[4] - 12;
				ampm = 'pm';
			}
			$(element).text(parseInt(dateParts[2])+'/'+dateParts[3]+' - '+dateParts[4]+':'+dateParts[5]+ampm);
		} catch(e) {
			console.log(e)
		}
	}
}


ko.bindingHandlers.fastClick = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		new FastButton(element, function() {
			valueAccessor()(viewModel, event);
		});
	}
};

ko.bindingHandlers.tap = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
		var allBindings = allBindingsAccessor();
		if(isMobile) {
			$(element).bind('touchend', function() {
				if(myScroll.moved) {
					return false;
				}
				valueAccessor()(viewModel, event, element);
				return false;
			});
		} else {
			$(element).bind('click', function() {
				valueAccessor()(viewModel, event, element);
			});
		}
	}
}

ko.applyBindings(viewModel);

//JQUERY BINDINGS

//AJAX Frame Loader
var loadPage = function(href, isBack, callback) {	
    sigCapture = null;
	if(typeof isBack === 'undefined') {
		isBack = false;
	}
	
	var noTemplate = ['login'];

	if(noTemplate.indexOf(href) >= 0) {
		//$('#content_wrap').css({top:0});
		$('#header, #footer').hide();
	} else {
		//$('#content_wrap').css({top:'100px'});
		$('#header, #footer').show();
	}
	
	var timestamp = new Date().getTime();
	
	$.get('views/'+href+'.html?'+timestamp,function(data) {
		$('#content').html(data);
		ko.applyBindings(viewModel, $('#content').get(0));
		//scroll_refresh();
		//myScroll.scrollTo(0,0);
		window.scrollTo(0,0);
		Current = href;
		if(typeof callback !== 'undefined') {
			callback();
		}
	})
}

var request = function(url,callback,data,validation,loader,quiet) {
	if(typeof loader === 'undefined') {
		loader = false;
	}
	
	if(typeof quiet === 'undefined') {
		quiet = false;
	}
	
	if(loader) {
		$('#loading').show();
	} else {
		$('#activity').show();
	}
	
	var options = {
		url: DOMAIN+url,
		crossDomain: true,
		success: function (data) {
			if(data.status == 'SUCCESS') {
				callback(data.data);
			} else {
				switch(data.status) {
					case 'VALIDATION':
						validation(data.data);
						break;
					default:
						console.log(data);
						navigator.notification.alert('There was an error:' + data.message,null,'GroupPost');
						break;
				}
			}
		},
		complete: function(jqXHR, textStatus) {
			if((textStatus != 'success')&&(!quiet)) {
				navigator.notification.alert('There was a problem communicating with the server.',null,'GroupPost');
			}
			$('#loading').fadeOut();
			$('#activity').fadeOut();
		},
		dataType: 'json',
		async: true
	};
	
	if(typeof data === 'undefined') {
		options.type = 'GET';
	} else {
		options.type = 'POST';
		options.data = data;
	}

	$.ajax(options);
}

var scroll_refresh = function() {
	setTimeout(function () {myScroll.refresh();}, 0);
}

//STARTUP	
$(function() {
	setTimeout(function() {
		loadPage('login');
	}, 0);
	
	setTimeout(function() {
		//scroll_refresh();
	},1000);
	
	//LINKS
	$('#footer a:not(.noajax)').fastClick(function() {
		loadPage($(this).attr('href'));
		return false;
	});
	
	$('#menu_button').click(function() {
		$('#app').toggleClass('open');
		return false;
	});
});
	
	