function fadeIn_all(div_id){ 
		var children = $(div_id).children();
		for(var i = 0; i < children.length; i++){
			//console.log(children[i]);
			$(children[i]).fadeIn();
		}
		$(div_id).fadeIn();
    }

function fadeOut_all(div_id){ 
	var children = $(div_id).children();
	for(var i = 0; i < children.length; i++){
		//console.log(children[i]);
		$(children[i]).fadeOut();
	}
	$(div_id).fadeOut();
}
