//hides all divs, except "page_login"
function exit_app(){
	fadeOut_all('#confirm_edit');
	fadeOut_all('#edit_passw');
	fadeOut_all('#login_error');
	fadeOut_all('#error_generic');
	fadeOut_all('#deliveries_pending');
	fadeOut_all('#buttons_header_others');
	fadeOut_all('#deliveries_completed');
	fadeOut_all('#one_dlv_pending');
	fadeOut_all('#one_sbj');
	fadeOut_all('#one_tch');
	fadeOut_all('#list_subjects');
	fadeOut_all('#list_teachers');
	fadeOut_all('#personal_data');
	fadeOut_all('#edit_password');
	fadeOut_all('#one_dlv_completed');
	fadeOut_all('#confirm_edit');
	fadeIn_all('#page_login');	
}

//hides all divs, except "deliveries_pending" and redirects to the main page
function go_home(){
	fadeOut_all('#confirm_edit');
	fadeOut_all('#edit_passw');
	fadeOut_all('#page_login');	
	fadeOut_all('#login_error');
	fadeOut_all('#error_generic');
	fadeOut_all('#buttons_header_others');
	fadeOut_all('#deliveries_completed');
	fadeOut_all('#one_dlv_pending');
	fadeOut_all('#one_sbj');
	fadeOut_all('#one_tch');
	fadeOut_all('#list_subjects');
	fadeOut_all('#list_teachers');
	fadeOut_all('#personal_data');
	fadeOut_all('#edit_password');
	fadeOut_all('#one_dlv_completed');
	fadeOut_all('#confirm_edit');
	fadeIn_all('#deliveries_pending');
	
	read_deliveries(id_stdnt);
}

//clean the divs to avoid duplications when reloading the page
function clear(){
	$('#container_p').empty();
	$('#one_dlv_pending').empty();
	$('#one_sbj').empty();
	$('#one_tch').empty();
	$('#list_subjects').empty();
	$('#list_teachers').empty();
	$('#personal_data').empty();
	$('#confirm_edit').empty();
	$('#container_c').empty();
	$('#one_dlv_completed').empty();
}

/*hides all divs, except:
 * "buttons_header_others" -> buttons header page
 * "confirm_edit" -> confirmation message
 * "edit_password" -> form edit
 */
function edit_passw(id_stdnt){
	
	clear();
	
	fadeOut_all('#page_login');
	fadeOut_all('#deliveries_pending');
	fadeOut_all('#error_generic');
	fadeOut_all('#deliveries_completed');
	fadeOut_all('#one_sbj');
	fadeOut_all('#one_tch');
	fadeOut_all('#list_subjects');
	fadeOut_all('#list_teachers');
	fadeOut_all('#personal_data');
	fadeOut_all('#one_dlv_completed');
	fadeOut_all('#one_dlv_pending');
	fadeIn_all('#confirm_edit');
	fadeIn_all('#edit_password');
	fadeIn_all('#buttons_header_others');
}


//function to show the side menu
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
}

//function to hide the side menu
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

//function to show all deliveries that have not finished
function read_deliveries(id_stdnt){
	
	var data = new FormData();
	data.append('id_stdnt', id_stdnt);
	data.append('token', token);
	
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/api/list_pending.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	var deliveries = json.deliveries;
	        	var cont_exam = 0;
	        	var cont_proy = 0;
	        	var cont_pract = 0;
	        	var cont_exerc = 0;
	        	
	        	for(var i = 0; i< deliveries.length; i++){
	        		var dlv = deliveries[i];
	 
	        		var dlv_date_obj = new Date(dlv.deliver_date);
	        		
	        		var current_date = new Date();
	        		if ( dlv_date_obj >= current_date){
	        			
	        			var dif_date = ((dlv_date_obj- current_date)/86400)/1000
	        			
	        			var ok_p = false;
	        			for(var j = 0; j< i; j++){
	        				var old = deliveries[j];
	        				
	        				var old_date_obj = new Date(old.deliver_date);
	        				if ( old_date_obj >= current_date) {
		        				if(old.type_dlv == dlv.type_dlv){
		        						ok_p = true;
		        				}
	        				}
	        			}
	        			
	        			if(ok_p == false){
	        				if(dlv.type_dlv == "examen"){
	        					cont_exam++;
		        				 $('#container_p').append("<div id='exams_p'>" +
	        						 "<h2>Ex&aacute;menes" +
	        						 "</h2>" +
		        						"<div id='dlv_p_" + dlv.type_dlv + "'>" +
		        							"<div type='button' onclick='readOne_dlv_pending(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #e28ec2; border-radius: 5px; color: white; margin-bottom:5px;'> " +
		        							"</div>" +
		        						"</div> " +
		        					"</div>"); 
		        			}
	        				else if(dlv.type_dlv == "proyecto"){
	        					cont_proy++;
		        				$('#container_p').append("<div id='proyects_p'>" +
	        						"<h2>Proyectos</h2>" +
	        						"<div id='dlv_p_" + dlv.type_dlv + "' >" +
	        							"<div type='button' onclick='readOne_dlv_pending(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #8e98e2; border-radius: 5px; color: white; margin-bottom:5px;'> " +
	        							"</div>" +
	        						"</div> " +
	        					"</div>");
		        			}
	        				else if(dlv.type_dlv == 'practica'){
	        					cont_pract++;
		        				$('#container_p').append("<div id='big_exercices_p'>" +
	        						"<h2>Practicas</h2>" +
	        						"<div id='dlv_p_" + dlv.type_dlv + "'>" +
	        							"<div type='button' onclick='readOne_dlv_pending(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #e0c898; border-radius: 5px; color: white; margin-bottom:5px;'> " +
	        							"</div>" +
	        						"</div> " +
	        					"</div>");
		        			}
		        			else if(dlv.type_dlv == 'ejercicio'){
		        				cont_exerc++;
		        				$('#container_p').append("<div id='exercices_p'>" +
	        						"<h2>Ejercicios</h2>" +
	        						"<div id='dlv_p_" + dlv.type_dlv + "'>" +
	        							"<div type='button' onclick='readOne_dlv_pending(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #a8dbad; border-radius: 5px; color: white; margin-bottom:5px;'> " +
	        							"</div>" +
	        						"</div> " +
	        					"</div>");
		        			}
		        			else{
		        				fadeIn_all('#error_generic');
		        			}
	        			}
	        			else{
	        				if(dlv.type_dlv == "examen"){
	        					cont_exam++;
		        				$('#dlv_p_' + dlv.type_dlv).append("<div type='button' onclick='readOne_dlv_pending(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #e28ec2; border-radius: 5px; color: white; margin-bottom:5px;'> " +
    							"</div>");
		        			}
	        				else if(dlv.type_dlv == "proyecto"){
	        					cont_proy++;
		        				$('#dlv_p_' + dlv.type_dlv).append("<div type='button' onclick='readOne_dlv_pending(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #8e98e2; border-radius: 5px; color: white; margin-bottom:5px;'> " +
    							"</div>");
		        			}
	        				else if(dlv.type_dlv == 'practica'){
	        					cont_pract++;
		        				$('#dlv_p_' + dlv.type_dlv).append("<div type='button' onclick='readOne_dlv_pending(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #e0c898; border-radius: 5px; color: white; margin-bottom:5px;'> " +
	        					"</div>");
		        			}
		        			else if(dlv.type_dlv == 'ejercicio'){
		        				cont_exerc++;
		        				$('#dlv_p_' + dlv.type_dlv).append("<div type='button' onclick='readOne_dlv_pending(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #a8dbad; border-radius: 5px; color: white; margin-bottom:5px;'> " +
    							"</div>");
		        			} 
		        			else{
		        				fadeIn_all('#error_generic');
		        			}
        				}
	        			
	        			var date = new Date(dlv.deliver_date);
	        			var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	        			
	        			$("#dlv_" + dlv.sbj + "_" + dlv.id_dlv).append(
	        				"<div id='information'>" +
	        					"<div id='abbrev_pend'><p>" + dlv.abbrev_sbj + "</p></div>" +
	        					 "<h3 style='text-decoration: underline;'>" + dlv.name_sbj + "</h3> " +
	        					 "<h4>" + dlv.name_dlv + "</h4> " +
		        				 "<p>" + date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear() + " "  + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + "</p>" +
		   				 	"</div>"
				       	);
				       	
				       	if(dif_date <= 3){
	        				$("#dlv_" + dlv.sbj + "_" + dlv.id_dlv).append("<div id='notif_red'></div>");
	        			}
	        			else if(dif_date <= 7){
	        				$("#dlv_" + dlv.sbj + "_" + dlv.id_dlv).append("<div id='notif_yellow'></div>");
	        			}
	        			else{
	        				$("#dlv_" + dlv.sbj + "_" + dlv.id_dlv).append("<div id='notif_green'></div>");
	        			}
	        			
	        		
	        		}
	        		else if ( dlv_date_obj < current_date) {
	        			//SE MUESTRA EN OTRA SECCION
	        		}
	        		else{
	        			fadeIn_all('#error_generic');
	        		}
	        	}
	        	
	        	if(cont_exam == 0){
	        		$('#container_p').append("<div  class='alert' id='notif_cont_exam'>No hay <strong>exámenes</strong> pendientes</div>");	
	        	}
	        			
	        	if(cont_proy == 0){
	        		$('#container_p').append("<div  class='alert' id='notif_cont_proy'>No hay <strong>proyectos</strong> pendientes</div>");
	        	}
	        			
	        	if(cont_pract == 0){
	        		$('#container_p').append("<div  class='alert' id='notif_cont_pract'>No hay <strong>prácticas</strong> pendientes</div>");
	        	}
	        			
	        	if(cont_exerc == 0){
	        		$('#container_p').append("<div  class='alert' id='notif_cont_exerc'>No hay <strong>ejercicios</strong> pendientes</div>");
	        	}
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

//function to show a task that has not finished
function readOne_dlv_pending(id_stdnt, id_dlv, sbj){
	var data = new FormData();
	data.append('id_stdnt', id_stdnt);
	data.append('id_dlv', id_dlv);
	data.append('token', token);
	data.append('sbj' , sbj);
	
	$.ajax({
        url:  server_addr + 'organizaMisPracticas/api/one_pending.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all('#page_login');
	        	fadeOut_all('#deliveries_pending');
	        	fadeOut_all('#error_generic');
	        	fadeOut_all('#deliveries_completed');
	        	fadeOut_all('#one_sbj');
	        	fadeOut_all('#one_tch');
	        	fadeOut_all('#list_subjects');
	        	fadeOut_all('#list_teachers');
	        	fadeOut_all('#personal_data');
	        	fadeOut_all('#edit_password');
	        	fadeOut_all('#one_dlv_completed');
	        	fadeOut_all('#confirm_edit');
		  		fadeIn_all('#one_dlv_pending');
	        	fadeIn_all('#buttons_header_others');
	        	
	        	var dlv_date_obj = new Date(json.deliver_date);
	        	var current_date = new Date();
	        	var dif_date = ((dlv_date_obj- current_date)/86400)/1000
	        	
	        	$("#one_dlv_pending").append(
		        	"<div id='one_pending' class='page-header'> " +
		        		"<div id='buttons_header_others'>" +
        					"<div id='home' class='btn btn-default pull-left' onclick='go_home()'>" +
								"<span class='glyphicon glyphicon-home'></span>" +
							"</div>" +
			
							"<div id='img-right'>" + 
								"<img id='logo-right' src='img/UCM_Logo.png' alt='UCM'>" +
							"</div>" + 
						"</div>" +
		        		"<h1>Ver tarea pendiente</h1>" +
		        	"</div>" +
		        	"<div id='div_o' class='container'>" +
		        	"</div>"
		        );
				
	        	if(dif_date <= 3){
    				$("#one_dlv_pending #div_o").append("<div id='notif_red'></div>");
    			}
    			else if(dif_date <= 7){
    				$("#one_dlv_pending #div_o").append("<div id='notif_yellow'></div>");
    			}
    			else{
    				$("#one_dlv_pending #div_o").append("<div id='notif_green'></div>");
    			}
	        	
	        	
	        	
	        	if( json.type_dlv == "examen"){
	        		$("#one_dlv_pending #div_o").append(
	        			"<table class='table table-hover table-responsive table-bordered'> " +
	        				"<tr> <th> Nombre </th> <td class='td_exam'>" + json.name_dlv + "</td></tr>"
	        		);
	        	}
	        	else if( json.type_dlv == "practica"){
	        		$("#one_dlv_pending #div_o").append(
	        			"<table class='table table-hover table-responsive table-bordered'> " +
	        				"<tr> <th> Nombre </th> <td class='td_big_e'>" + json.name_dlv + "</td></tr>"
	        		);
	        	}
	        	else if(json.type_dlv == "proyecto"){
	        		$("#one_dlv_pending #div_o").append(
	        			"<table class='table table-hover table-responsive table-bordered'> " +
	        				"<tr> <th> Nombre </th> <td class='td_proy'>" + json.name_dlv + "</td></tr>"
	        		);
	        	}
	        	else{
	        		$("#one_dlv_pending #div_o").append(
	        			"<table class='table table-hover table-responsive table-bordered'> " +
	        				"<tr> <th> Nombre </th> <td class='td_exer'>" + json.name_dlv + "</td></tr>"
	        		);
	        	}
	        	
	        	var date_d = new Date(json.deliver_date);
	        	var date_r = new Date(json.rise_date);
	        	var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	     
	        	$("#one_dlv_pending #div_o table").append(
        				"<tr> <th> Fecha de inicio </th> <td> " +  date_r.getDate() + " de " + months[date_r.getMonth()] + " de " + date_r.getFullYear() 
        					+ " "  + date_r.getHours() + ":" + (date_r.getMinutes()<10?'0':'') + date_r.getMinutes() + "</td></tr>" +
        				"<tr> <th> Fecha limite </th> <td> " +  date_d.getDate() + " de " + months[date_d.getMonth()] + " de " + date_d.getFullYear() 
        					+ " "  + date_d.getHours() + ":" + (date_d.getMinutes()<10?'0':'') + date_d.getMinutes() +  "</td></tr>" +
        				"<tr> <th> Tipo de entrega </th> <td> " + json.type_dlv + "</td> </tr>" +
        				"<tr> <th> Porcentaje </th> <td> " + json.percent + "</td> </tr>"
    			);
    			
    			if(json.tch_comment != null){
    				$("#one_dlv_pending #div_o table").append(
    					"<tr> <th> Comentario profesor </th> <td> " + json.tch_comment + "</td> </tr>"
    				);
    			}
    			
    			$("#one_dlv_pending #div_o table").append(
        				"<tr> <th> Asignatura </th> <td> " + json.abbrev_sbj + "</td> </tr>" +
        			"</table>"
        			
        		);
        		$("#one_dlv_pending").append(
	        		"<div id='subj_teach'>" +
		        		"<button id='subject_t' type='button' class='btn btn-primary' onclick='readOne_sbj(" + id_stdnt + "," + sbj + ")'> " +
					 		"<span class='glyphicon glyphicon-book'></span> Asignatura" +	
					 	"</button>" +
					 	"<button id='s_teacher' type='button' class='btn btn-primary' onclick='readOne_tch(" + id_stdnt  + "," + sbj + ")'> " +
	    				 	"<span class='glyphicon glyphicon-user'></span> Profesor " +	
	   				 	"</button>" +
	   				"</div>"
	        	);
		    }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
     
	});
}

//function to show the information of a subject
function readOne_sbj(id_stdnt, sbj){

	//debugger;
	var data = new FormData();
	data.append('id_stdnt', id_stdnt);
	data.append('token', token);
	data.append('sbj', sbj);
	
	$.ajax({
        url:  server_addr + '/organizaMisPracticas/api/one_subject.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all('#page_login');
	        	fadeOut_all('#deliveries_pending');
	        	fadeOut_all('#error_generic');
	        	fadeOut_all('#deliveries_completed');
		  		fadeOut_all('#one_dlv_pending');
		  		fadeOut_all('#list_subjects');
		  		fadeOut_all('#list_teachers');
		  		fadeOut_all('#one_tch');
		  		fadeOut_all('#personal_data');
		  		fadeOut_all('#edit_password');
		  		fadeOut_all('#one_dlv_completed');
		  		fadeOut_all('#confirm_edit');
		  		fadeIn_all('#one_sbj');
	        	fadeIn_all('#buttons_header_others');
	        	
	        	$("#one_sbj").append(
	        		"<div id='one_subject' class='page-header'>" +	
	        			"<div id='buttons_header_others'>" +
        					"<div id='home' class='btn btn-default pull-left' onclick='go_home()'>" +
								"<span class='glyphicon glyphicon-home'></span>" +
							"</div>" +
			
							"<div id='img-right'>" + 
								"<img id='logo-right' src='img/UCM_Logo.png' alt='UCM'>" +
							"</div>" + 
						"</div>" +
	        			"<h1>Ver asignatura</h1>" +
	        		"</div>" +
	        		"<div id='btn_subjects'>" +
	        			"<button class='btn pull-right' onclick='read_subjects(" + id_stdnt + ")'>" +
	        				"<span class='glyphicon glyphicon-list'></span> Lista asignaturas" +
	        			"</button>" +
	        		"</div>" +
	        		"<div class='container'>" +
	        		"<table class='table table-hover table-responsive table-bordered'> " + 
        				"<tr> <th> Abreviatura </th> <td>" + json.abbrev_sbj + "</td></tr>" + 
        				"<tr> <th> Nombre </th> <td> " + json.name_sbj + "</td></tr>" +
        				"<tr> <th> Curso </th> <td> " + json.course + "</td></tr>" +
        				"<tr> <th> Grupo </th> <td> " + json.group_sbj + "</td> </tr>" +
        				"<tr> <th> Creditos </th> <td> " + json.credits + "</td> </tr>" +
        				"<tr> <th> Primera matricula </th> <td> " + json.regist_year + "</td> </tr>" +
        				"<tr> <th> Veces matriculado </th> <td> " + json.regist_num + "</td> </tr>" +
        			"</table>" +
	        		"<div id='list_notes_sbj'>"	+
	        		"</div>"
	        	);
	        	
	        	var notes = json.notes;
	        	if(notes.length > 0){
	        	
	        		$("#list_notes_sbj").append(
		        		"<table class='table table-hover table-responsive table-bordered'> " +
		        			"<tr> <th> Tarea </th> <th> Nota </th> <th> Porcentaje </th> </tr>"
		        	);
	        	
		        	for(var i = 0; i< notes.length; i++){
		        		var note_sbj = notes[i];
		        			$("#list_notes_sbj table").append(
        						"<tr> <td>" + note_sbj.name_dlv + "</td>" +
        						"<td>" + note_sbj.note + "</td>" +
        						"<td>" + note_sbj.percent + "</td> </tr>" 
		        		);
		        	}
		        	
		        	$("#list_notes_sbj").append(
		        		"</table>"
		        	);
		        	
		        	if(json.average >= 50){
		        		$("#one_sbj").append(
			        		"<p class='alert alert-success'>Media : " + json.average + "</p>"	
			        	);
		        	}
		        	else{
		        		$("#one_sbj").append(
			        		"<p class='alert alert-danger'>Media : " + json.average + "</p>"	
			        	);
		        	}
	        	}
	        	else{
	        		$("#list_notes_sbj").append(
	        			"<p class='alert alert-info'> Asignatura no evaluada </p>"
	        		);
	        	}
	        	
	        	$("#one_sbj").append(
		        	"<button type='button' class='btn btn-primary' onclick='readOne_tch(" + id_stdnt + "," + sbj + ")'> " +
				 		"<span class='glyphicon glyphicon-user'></span> Profesor " +	
				 	"</button>" +
				 	"</div>"
				 );
	        }
        			
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
	
}

//function to show the list of subjects
function read_subjects(id_stdnt){
	var data = new FormData();
	data.append('id_stdnt', id_stdnt);
	data.append('token', token);

	$.ajax({
        url: server_addr + 'organizaMisPracticas/api/list_subject.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	fadeOut_all('#page_login');
	        	fadeOut_all('#deliveries_pending');
	        	fadeOut_all('#error_generic');
	        	fadeOut_all('#deliveries_completed');
		  		fadeOut_all('#one_dlv_pending');
		  		fadeOut_all('#one_sbj');
		  		fadeOut_all('#one_tch');
		  		fadeOut_all('#list_teachers');
		  		fadeOut_all('#personal_data');
		  		fadeOut_all('#edit_password');
		  		fadeOut_all('#one_dlv_completed');
		  		fadeOut_all('#confirm_edit');
		  		fadeIn_all('#list_subjects');
	        	fadeIn_all('#buttons_header_others');
	        	
	        	$("#list_subjects").append(
        			"<div id='list_sbjs' class='page-header'> " +
        				"<div id='buttons_header_others'>" +
        					"<div id='home' class='btn btn-default pull-left' onclick='go_home()'>" +
								"<span class='glyphicon glyphicon-home'></span>" +
							"</div>" +
			
							"<div id='img-right'>" + 
								"<img id='logo-right' src='img/UCM_Logo.png' alt='UCM'>" +
							"</div>" + 
						"</div>" +
        				"<h1>Lista asignaturas</h1> " +
        			"</div>"
        		);
	        	
	        	var subjects = json.subjects;
	        	for(var i = 0; i< subjects.length; i++){
	        		var subject = subjects[i];
	        		$("#list_subjects").append(
	        			"<div type='button' onclick='readOne_sbj(" + id_stdnt + "," + subject.sbj + ")' id= 'sbj_" + id_stdnt + "_" + subject.sbj + "' style='border: 1px solid #B71234; margin:10px; border-radius: 5px;'>" +
	        					"<div id='abbrev_subj'><p>" + subject.abbrev_sbj + "</p></div>" +
	        					"<h3 style='text-decoration: underline;'>" + subject.name_sbj + "</h3> " +
	        					"<p> Curso: <strong>" + subject.course + "</strong></p>" +
	        					"<p style='margin-left:70px'> Grupo: <strong>" + subject.group_sbj + "</strong></p>"
	        				
	        		);
	        		
	        		if(subject.average != null){
			        		$("#sbj_" + id_stdnt + "_" + subject.sbj).append(
				        			"<p style='margin-left:70px'> Media: <strong>" + subject.average + "</strong></p>" +
				        		"</div>"
				        	);
	        		}
	        		else{
	        			$("#sbj_" + id_stdnt + "_" + subject.sbj).append(
				        		"<p style='margin-left:70px'> Sin evaluar </strong></p>" +
				        	"</div>"
				        );
	        		}
	        		
	        	}
	        }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

//function to show the information of a teacher
function readOne_tch(id_stdnt , id_sbj){
	var data = new FormData();
	data.append('id_stdnt', id_stdnt);
	data.append('token', token);
	data.append('id_sbj', id_sbj);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/api/one_teacher.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	var json = JSON.parse(data);
        	
        	if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all('#page_login');
	        	fadeOut_all('#deliveries_pending');
	        	fadeOut_all('#error_generic');
	        	fadeOut_all('#deliveries_completed');
		  		fadeOut_all('#one_dlv_pending');
		  		fadeOut_all('#list_subjects');
		  		fadeOut_all('#list_teachers');
		  		fadeOut_all('#one_sbj');
		  		fadeOut_all('#personal_data');
		  		fadeOut_all('#edit_password');
		  		fadeOut_all('#one_dlv_completed');
		  		fadeOut_all('#confirm_edit');
		  		fadeIn_all('#one_tch');
	        	fadeIn_all('#buttons_header_others');
	        	
	        	$("#one_tch").append(
		        		"<div id='one_teacher' class='page-header'>" +	
		        			"<div id='buttons_header_others'>" +
        					"<div id='home' class='btn btn-default pull-left' onclick='go_home()'>" +
								"<span class='glyphicon glyphicon-home'></span>" +
							"</div>" +
			
							"<div id='img-right'>" + 
								"<img id='logo-right' src='img/UCM_Logo.png' alt='UCM'>" +
							"</div>" + 
						"</div>" +
		        			"<h1>Ver profesor</h1>" +
		        		"</div>" +
		        		"<div id='btn_teachers'>" +
		        			"<button class='btn pull-right' onclick='read_teachers(" + id_stdnt + ")'>" +
		        				"<span class='glyphicon glyphicon-list'></span> Lista profesores" +
		        			"</button>" +
		        		"</div>" +
		        		"<div class='container'>" +
		        		"<table class='table table-hover table-responsive table-bordered'> " + 
        					"<tr> <th> Nombre </th> <td>" + json.name_tch + "</td></tr>" + 
        					"<tr> <th> Apellido </th> <td> " + json.last_name_tch + "</td></tr>" +
        					"<tr> <th> Correo </th> <td> " + json.mail + "</td></tr>" +
        					"<tr> <th> Despacho </th> <td> " + json.office + "</td> </tr>" +
        				"</table>" +
        				"</div>"
		        );
	        }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
   });     
}

//function to show the list of teachers
function read_teachers(id_stdnt){
	var data = new FormData();
	data.append('id_stdnt', id_stdnt);
	data.append('token', token);

	$.ajax({
        url: server_addr + 'organizaMisPracticas/api/list_teacher.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	fadeOut_all('#page_login');
	        	fadeOut_all('#deliveries_pending');
	        	fadeOut_all('#error_generic');
	        	fadeOut_all('#deliveries_completed');
		  		fadeOut_all('#one_dlv_pending');
		  		fadeOut_all('#one_sbj');
		  		fadeOut_all('#one_tch');
		  		fadeOut_all('#list_subjects');
		  		fadeOut_all('#personal_data');
		  		fadeOut_all('#edit_password');
		  		fadeOut_all('#one_dlv_completed');
		  		fadeOut_all('#confirm_edit');
		  		fadeIn_all('#list_teachers');
	        	//fadeIn_all('#buttons_header_others');
	        	
	        	$("#list_teachers").append(
        			"<div id='list_tchs' class='page-header'> " +
						"<div id='buttons_header_others'>" +
        					"<div id='home' class='btn btn-default pull-left' onclick='go_home()'>" +
								"<span class='glyphicon glyphicon-home'></span>" +
							"</div>" +
			
							"<div id='img-right'>" + 
								"<img id='logo-right' src='img/UCM_Logo.png' alt='UCM'>" +
							"</div>" + 
						"</div>" +
        				"<h1>Lista profesores</h1> " +
        			"</div>"
        		);
	        	
	        	var teachers = json.teachers;
	        	for(var i = 0; i< teachers.length; i++){
	        		var teacher = teachers[i];
	        		
        				$("#list_teachers").append(
    	        			"<div type='button' id='tch_" + id_stdnt + "_" + teacher.id_tch + "' style='border: 1px solid #B71234; margin:10px; border-radius:5px;' onclick='readOne_tch(" + id_stdnt + "," + teacher.id_sbj + ")'>" +
						 		"<div id='first_t'><p>" + teacher.name_tch[0] + "</p></div>" +
	        					"<h3 style='text-decoration: underline;'>" + teacher.name_tch + " " + teacher.last_name_tch + "</h3> " +
	        					"<p> Correo: <strong>" + teacher.mail + "</strong></p>" +
	        					"<p style='margin-left:70px'> Asignaturas: <strong>" + teacher.abbrev_sbj + "</strong></p>" +
							"</div>"
    	        		);
    	        }
	        }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });
}

//function to show the user information
function personal_information(id_stdnt){
	var data = new FormData();
	data.append('id_stdnt', id_stdnt);
	data.append('token', token);

	$.ajax({
        url: server_addr + 'organizaMisPracticas/api/personal_data.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all('#page_login');
	        	fadeOut_all('#deliveries_pending');
	        	fadeOut_all('#error_generic');
	        	fadeOut_all('#deliveries_completed');
		  		fadeOut_all('#one_dlv_pending');
		  		fadeOut_all('#list_subjects');
		  		fadeOut_all('#list_teachers');
		  		fadeOut_all('#one_tch');
		  		fadeOut_all('#one_sbj');
		  		fadeOut_all('#edit_password');
		  		fadeOut_all('#one_dlv_completed');
		  		fadeOut_all('#confirm_edit');
		  		fadeIn_all('#personal_data');
	        	fadeIn_all('#buttons_header_others');
	        	
	        	$("#personal_data").append(
        			"<div id='pers_data' class='page-header'> " +
        				"<div id='buttons_header_others'>" +
        					"<div id='home' class='btn btn-default pull-left' onclick='go_home()'>" +
								"<span class='glyphicon glyphicon-home'></span>" +
							"</div>" +
			
							"<div id='img-right'>" + 
								"<img id='logo-right' src='img/UCM_Logo.png' alt='UCM'>" +
							"</div>" + 
						"</div>" +
        				"<h1>Datos personales</h1> " +
        			"</div>" +
        			"<div id='btn_edit_passw'>" +
	        			"<button class='btn pull-right' onclick='edit_passw(" + id_stdnt + ")'>" +
	        				"<span class='glyphicon glyphicon-list'></span> Editar contraseña" +
	        			"</button>" +
	    			"</div>" +
	    			"<div class='container'>" +
	        		"<table class='table table-hover table-responsive table-bordered'> " + 
        				"<tr> <th> Nombre </th> <td>" + json.name_stdnt + "</td></tr>" + 
        				"<tr> <th> Apellido </th> <td> " + json.last_name_stdnt + "</td></tr>" +
        				"<tr> <th> Correo </th> <td> " + json.mail + "</td></tr>" +
        				"<tr> <th> Estudio </th> <td> " + json.info[0].abbrev_stds + "</td> </tr>" +
        				"<tr> <th> Facultad </th> <td>" + json.info[0].name_fac + "</td> </tr>" +
        			"</table>" +
        			"</div>"
        		);
	        }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });	  	
}

//function to show the list of tasks that have finished
function read_deliveries_completed(id_stdnt){
	var data = new FormData();
	data.append('id_stdnt', id_stdnt);
	data.append('token', token);
	
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/api/list_completed.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all('#page_login');
	        	fadeOut_all('#deliveries_pending');
	        	fadeOut_all('#error_generic');
		  		fadeOut_all('#one_dlv_pending');
		  		fadeOut_all('#list_subjects');
		  		fadeOut_all('#list_teachers');
		  		fadeOut_all('#one_tch');
		  		fadeOut_all('#one_sbj');
		  		fadeOut_all('#edit_password');
		  		fadeOut_all('#personal_data');
		  		fadeOut_all('#one_dlv_completed');
		  		fadeOut_all('#confirm_edit');
		  		fadeIn_all('#deliveries_completed');
	        	fadeIn_all('#buttons_header_others');
	        	
	        	var deliveries = json.deliveries;
	        	var cont_exam = 0;
	        	var cont_proy = 0;
	        	var cont_pract = 0;
	        	var cont_exerc = 0;
	        	for(var i = 0; i< deliveries.length; i++){
	        		var dlv = deliveries[i];
	 
	        		var dlv_date_obj = new Date(dlv.deliver_date);
	        		
	        		var current_date = new Date();
	        		if ( dlv_date_obj >= current_date){
	        			//SE MUESTRA EN OTRA SECCION
	        		}
	        		else if ( dlv_date_obj < current_date) {
	        			
	        			var ok_p = false;
	        			for(var j = 0; j< i; j++){
	        				var old = deliveries[j];
	        				
		        			if(old.type_dlv == dlv.type_dlv){
		        				ok_p = true;
		        			}
	        			}
	        			
	        			if(ok_p == false){
	        			
		        			if(dlv.type_dlv == "examen"){
		        				cont_exam++;
		        				$('#container_c').append("<div id='exams_c'>" +
	       						 "<h2>Ex&aacute;menes" +
	       						 "</h2>" +
		        						"<div id='dlv_c_" + dlv.type_dlv + "'>" +
		        							"<div type='button' onclick='readOne_dlv_completed(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #e28ec2; border-radius: 5px; color: white; margin-bottom:5px;'> " +
		        							"</div>" +
		        						"</div> " +
		        					"</div>"); 
		        			}
		       				else if(dlv.type_dlv == "proyecto"){
		       					cont_proy++;
			        			$('#container_c').append("<div id='proyects_c'>" +
		       						"<h2>Proyectos</h2>" +
		       						"<div id='dlv_c_" + dlv.type_dlv + "' >" +
		       							"<div type='button' onclick='readOne_dlv_completed(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #8e98e2; border-radius: 5px; color: white; margin-bottom:5px;'> " +
		       							"</div>" +
		       						"</div> " +
		       					"</div>");
			        			}
		       				else if(dlv.type_dlv == 'practica'){
		       					cont_pract++;
			        			$('#container_c').append("<div id='big_exercices_c'>" +
		       						"<h2>Practicas</h2>" +
		       						"<div id='dlv_c_" + dlv.type_dlv + "'>" +
		       							"<div type='button' onclick='readOne_dlv_completed(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color:  #e0c898; border-radius: 5px; color: white; margin-bottom:5px;'> " +
		       							"</div>" +
		       						"</div> " +
		       					"</div>");
		        			}
		        			else if(dlv.type_dlv == 'ejercicio'){
		        				cont_exerc++;
		        				$('#container_c').append("<div id='exercices_c'>" +
	       						"<h2>Ejercicios</h2>" +
	       						"<div id='dlv_c_" + dlv.type_dlv + "'>" +
	       							"<div type='button' onclick='readOne_dlv_completed(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #a8dbad; border-radius: 5px; color: white; margin-bottom:5px;'> " +
	       							"</div>" +
	       						"</div> " +
	       					"</div>");
		        			}
		        			else{
		        				fadeIn_all('#error_generic');
		        			}
	        			}
	        			else{
	        				if(dlv.type_dlv == "examen"){
	        					cont_exam++;
		        				$('#dlv_c_' + dlv.type_dlv).append("<div type='button' onclick='readOne_dlv_completed(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #e28ec2; border-radius: 5px; color: white; margin-bottom:5px;'> " +
    							"</div>");
		        			}
	        				else if(dlv.type_dlv == "proyecto"){
	        					cont_proy++;
		        				$('#dlv_c_' + dlv.type_dlv).append("<div type='button' onclick='readOne_dlv_completed(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #8e98e2; border-radius: 5px; color: white; margin-bottom:5px;'> " +
    							"</div>");
		        			}
	        				else if(dlv.type_dlv == 'practica'){
	        					cont_pract++;
		        				$('#dlv_c_' + dlv.type_dlv).append("<div type='button' onclick='readOne_dlv_completed(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color:  #e0c898; border-radius: 5px; color: white; margin-bottom:5px;'> " +
	        					"</div>");
		        			}
		        			else if(dlv.type_dlv == 'ejercicio'){
		        				cont_exerc++;
		        				$('#dlv_c_' + dlv.type_dlv).append("<div type='button' onclick='readOne_dlv_completed(" + id_stdnt + "," + dlv.id_dlv + ","+ dlv.sbj + ")' id='dlv_" + dlv.sbj + "_" + dlv.id_dlv  + "' style='background-color: #a8dbad; border-radius: 5px; color: white; margin-bottom:5px;'> " +
		        				"</div>");
		        			} 
		        			else{
		        				fadeIn_all('#error_generic');
		        			}
	        			}
	        			
				       	
	        			$("#dlv_" + dlv.sbj + "_" + dlv.id_dlv).append(
	        				"<div id='information'>" +
	        					"<div id='abbrev_comp'><p>" + dlv.abbrev_sbj + "</p></div>" +
	        					"<h3 style='text-decoration: underline;'>" + dlv.name_sbj + "</h3> " +
	        					"<h4>" + dlv.name_dlv + "</h4> " +
	        				"</div>"
				       	);
				       	
				       	if( dlv.note_dlv[0].note != null){
				       		$("#dlv_" + dlv.sbj + "_" + dlv.id_dlv + " #information").append(
				       			 "<p> Nota: " + dlv.note_dlv[0].note + "</p> "
				       		);
				       	}
				       	
				       	if(dlv.note_dlv[0].note == null){
	        				$("#dlv_" + dlv.sbj + "_" + dlv.id_dlv).append("<div id='note_blue'></div>");
	        			}
	        			else if(dlv.note_dlv[0].note < 50){
	        				$("#dlv_" + dlv.sbj + "_" + dlv.id_dlv).append("<div id='note_red'></div>");
	        			}
	        			else{
	        				$("#dlv_" + dlv.sbj + "_" + dlv.id_dlv).append("<div id='note_green'></div>");
	        			}
	        		}
	        		else{
	        			fadeIn_all('#error_generic');
	        		}
	        	}
	        	
	        	if(cont_exam == 0){
	        		$('#container_p').append("<div  class='alert' id='notif_cont_exam'>No hay <strong>exámenes</strong> terminados</div>");	
	        	}
	        			
	        	if(cont_proy == 0){
	        		$('#container_p').append("<div  class='alert' id='notif_cont_proy'>No hay <strong>proyectos</strong> terminados</div>");
	        	}
	        			
	        	if(cont_pract == 0){
	        		$('#container_p').append("<div  class='alert' id='notif_cont_pract'>No hay <strong>prácticas</strong> terminadas</div>");
	        	}
	        			
	        	if(cont_exerc == 0){
	        		$('#container_p').append("<div  class='alert' id='notif_cont_exerc'>No hay <strong>ejercicios</strong> terminados</div>");
	        	}
	        	
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

//function to show the information of a task that has finished
function readOne_dlv_completed(id_stdnt, id_dlv, sbj){
	var data = new FormData();
	data.append('id_stdnt', id_stdnt);
	data.append('id_dlv', id_dlv);
	data.append('token', token);
	data.append('sbj' , sbj);
	
	$.ajax({
        url:  server_addr + 'organizaMisPracticas/api/one_completed.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	
        	if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all('#page_login');
	        	fadeOut_all('#deliveries_pending');
	        	fadeOut_all('#error_generic');
		  		fadeOut_all('#one_dlv_pending');
		  		fadeOut_all('#list_subjects');
		  		fadeOut_all('#list_teachers');
		  		fadeOut_all('#one_tch');
		  		fadeOut_all('#one_sbj');
		  		fadeOut_all('#edit_password');
		  		fadeOut_all('#personal_data');
		  		fadeOut_all('#deliveries_completed');
		  		fadeOut_all('#confirm_edit');
		  		fadeIn_all('#one_dlv_completed');
	        	fadeIn_all('#buttons_header_others');
	        	
	        	$("#one_dlv_completed").append(
		        	"<div id='one_completed' class='page-header'> " +
		        		"<div id='buttons_header_others'>" +
        					"<div id='home' class='btn btn-default pull-left' onclick='go_home()'>" +
								"<span class='glyphicon glyphicon-home'></span>" +
							"</div>" +
			
							"<div id='img-right'>" + 
								"<img id='logo-right' src='img/UCM_Logo.png' alt='UCM'>" +
							"</div>" + 
						"</div>" +
		        		"<h1>Ver tarea terminada</h1>" +
		        	"</div>"  +
		        	"<div id='btn_list_completed'>" +
	        			"<button class='btn pull-right' onclick='read_deliveries_completed(" + id_stdnt + ")'>" +
	        				"<span class='glyphicon glyphicon-list'></span> Lista terminadas" +
	        			"</button>" +
	        		"</div>" +
	        		"<div id='div_oc' class='container'>" +
	        		"</div>"
			     );
	        	
	        	if( json.type_dlv == "examen"){
	        		$("#one_dlv_completed #div_oc").append(
	        			"<table class='table table-hover table-responsive table-bordered'> " +
	        				"<tr> <th> Nombre </th> <td class='td_exam'>" + json.name_dlv + "</td></tr>"
	        		);
	        	}
	        	else if( json.type_dlv == "practica"){
	        		$("#one_dlv_completed #div_oc").append(
	        			"<table class='table table-hover table-responsive table-bordered'> " +
	        				"<tr> <th> Nombre </th> <td class='td_big_e'>" + json.name_dlv + "</td></tr>"
	        		);
	        	}
	        	else if(json.type_dlv == "proyecto"){
	        		$("#one_dlv_completed #div_oc").append(
	        			"<table class='table table-hover table-responsive table-bordered'> " +
	        				"<tr> <th> Nombre </th> <td class='td_proy'>" + json.name_dlv + "</td></tr>"
	        		);
	        	}
	        	else{
	        		$("#one_dlv_completed #div_oc").append(
	        			"<table class='table table-hover table-responsive table-bordered'> " +
	        				"<tr> <th> Nombre </th> <td class='td_exer'>" + json.name_dlv + "</td></tr>"
	        		);
	        	}
	        	
	        	var date_d = new Date(json.deliver_date);
	        	var date_r = new Date(json.rise_date);
	        	var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	     
	        	$("#one_dlv_completed #div_oc table").append(
        				"<tr> <th> Fecha de inicio </th> <td> " +  date_r.getDate() + " de " + months[date_r.getMonth()] + " de " + date_r.getFullYear() 
        					+ " "  + date_r.getHours() + ":" + (date_r.getMinutes()<10?'0':'') + date_r.getMinutes() + "</td></tr>" +
        				"<tr> <th> Fecha limite </th> <td> " +  date_d.getDate() + " de " + months[date_d.getMonth()] + " de " + date_d.getFullYear() 
        					+ " "  + date_d.getHours() + ":" + (date_d.getMinutes()<10?'0':'') + date_d.getMinutes() +  "</td></tr>" +
        				"<tr> <th> Tipo de entrega </th> <td> " + json.type_dlv + "</td> </tr>" +
        				"<tr> <th> Porcentaje </th> <td> " + json.percent + "</td> </tr>"
    			);
    			
    			if(json.tch_comment != null){
    				$("#one_dlv_completed #div_oc table").append(
    					"<tr> <th> Comentario profesor </th> <td> " + json.tch_comment + "</td> </tr>"
    				);
    			}
    			
    			$("#one_dlv_completed #div_oc table").append(
        				"<tr> <th> Asignatura </th> <td> " + json.abbrev_sbj + "</td> </tr>" 
        		);
        		
        		if(json.note_dlv[0].note == null){
					$("#one_dlv_completed #div_oc table").append("<tr> <th> Nota </th> <td  class='alert alert-info'> Tarea no evaluada </td> </tr>");
				}
				else if(json.note_dlv[0].note < 50){
					$("#one_dlv_completed #div_oc table").append("<tr> <th> Nota </th> <td class='alert alert-danger'>" + json.note_dlv[0].note + "</td> </tr>");
				}
				else{
					$("#one_dlv_completed #div_oc table").append("<tr> <th> Nota </th> <td class='alert alert-success'>" + json.note_dlv[0].note + "</td> </tr>");
				}
				
				if( json.note_dlv[0].tch_comment_note != null){
					$("#one_dlv_completed #div_oc table").append(
						"<tr> <th> Comentario nota </th> <td> " + json.note_dlv[0].tch_comment_note + "</td> </tr>" +
						"</table>"
					);
				}
				else{
					$("#one_dlv_completed #div_oc table").append("</table>");
				}
				
        		$("#one_dlv_completed").append(
	        		"<div id='subj_teach'>" +
		        		"<button id='subject_t' type='button' class='btn btn-primary' onclick='readOne_sbj(" + id_stdnt + "," + sbj + ")'> " +
					 		"<span class='glyphicon glyphicon-book'></span> Asignatura" +	
					 	"</button>" +
					 	"<button id='s_teacher' type='button' class='btn btn-primary' onclick='readOne_tch(" + id_stdnt  + "," + sbj + ")'> " +
	    				 	"<span class='glyphicon glyphicon-user'></span> Profesor " +	
	   				 	"</button>" +
	   				"</div>"
	        	);
	        	
		    }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
     
	});
	
}

