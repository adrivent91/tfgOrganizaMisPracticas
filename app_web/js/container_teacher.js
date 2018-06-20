function go_home_teacher(){

	fadeOut_all('#confirm_edit');
	fadeOut_all('#edit_passw');
	fadeOut_all('#login_error');
	fadeOut_all('#error_generic');
	fadeOut_all('#edit_pass');
	fadeOut_all('#buttons_header_others_teacher');

	fadeOut_all('#personal_data');
	fadeOut_all('#list_completed_tch');
	fadeOut_all("#list_subjects_tch");
	fadeOut_all("#list_students_tch");
	fadeOut_all("#evaluate_dlv");
	fadeOut_all("#one_delivery_teacher");
	fadeOut_all("#one_delivery_compl_teacher");
	fadeOut_all('#edit_delivery_teacher');
	fadeOut_all('#create_delivery_teacher');
	fadeOut_all('#delete_delivery_teacher');
	fadeOut_all("#one_subject_tch");
	fadeOut_all("#one_student_tch");
	fadeOut_all("#one_evaluate_tch");
	fadeOut_all("#edit_evaluate_tch");
	fadeOut_all('#delete_evaluate_teacher');

	
	fadeIn_all('#homepage_teacher');
	fadeIn_all('#list_pending_tch');
}

function edit_passw_teacher(id_tch){
	clear();
	
	fadeOut_all('#homepage_teacher');
	fadeOut_all('#personal_data');
	
	fadeIn_all('#buttons_header_others_teacher');
	fadeIn_all('#confirm_edit');
	fadeIn_all('#edit_pass');
}

function personal_information(id_tch){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);

	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/personal_data.php',
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
	        	
	        	fadeOut_all('#homepage_teacher');
	        	
		  		fadeIn_all('#personal_data');
	        	fadeIn_all('#buttons_header_others_teacher');
	        	
	        	$("#personal_data").append(
        			"<div id='pers_data' class='page-header'> " +
        				"<h1>Datos personales</h1> " +
        			"</div>" +
        			"<div id='btn_edit_passw'>" +
	        			"<button class='btn pull-right' onclick='edit_passw_teacher(" + id_tch + ")'>" +
	        				"<span class='glyphicon glyphicon-list'></span> Editar contraseña" +
	        			"</button>" +
	        		"</div>" +
	        		"<table class='table table-hover table-responsive table-bordered'> " + 
        				"<tr> <th> Nombre </th> <td>" + json.name_tch + "</td></tr>" + 
        				"<tr> <th> Apellido </th> <td> " + json.last_name_tch + "</td></tr>" +
        				"<tr> <th> Correo </th> <td> " + json.mail + "</td></tr>" +
        				"<tr> <th> Despacho </th> <td> " + json.office + "</td> </tr>" +
        			"</table>"
        		);
        		
        		for(var i = 0; i<json.faculties.length; i++){
        			$("#personal_data table").append(
        				"<tr> <th> Facultad </th> <td> " + json.faculties[i].name_fac + "</td> </tr>"
        			);
        		}
	        }
        },
        error: function( jqXhr, textStatus, errorThrown ){
            console.log( errorThrown );
        }
    });	  	
}

function read_pending_apT(id_tch){

	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/list_deliveries.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	
        	var json = JSON.parse(data);
        	
        	console.log(json);
        	
        	fadeIn_all('#homepage_teacher');
        	fadeOut_all('#buttons_header_others_teacher');
        	$("#list_pending_tch").empty();
        	
        
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	var deliveries = json.deliveries;
	        	
	        	$("#list_pending_tch").append(
	        		"<div>" +
						"<button id='list_completed' class='btn btn-default pull-left' onclick='read_deliveries_completed()'>" +
							"<span class='glyphicon glyphicon-list'></span> Lista terminadas" +
						"</button>" +
		
						"<button id='create_delivery' class='btn btn-default pull-right' onclick='create_delivery()'>" +
							"<span class='glyphicon glyphicon-edit'></span> Crear" +
						"</button>" +
					"</div>" +
	        		"<table class='table table-hover table-responsive table-bordered'>" +
	        		 	"<tr>" +
	        		 	"<th>Fecha de entrega</th>" +
	        		 	"<th>Nombre tarea</th>" +
	        		 	"<th>Tipo</th>" +
	        		 	"<th>Asignatura</th>" +
	        		 	"<th>Acciones</th>" +
	        		 	"</tr>"
	        	);
	        	
	        	for(var i = 0; i< deliveries.length; i++){
	        		var dlv = deliveries[i];
	        		
	        		var dlv_date_obj = new Date(dlv.deliver_date);
	        		
	        		var current_date = new Date();
	        		if ( dlv_date_obj >= current_date){
	        			
	        			var date = new Date(dlv.deliver_date);
	        			var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	        			
	        			$("#list_pending_tch table").append(
	        				"<tr>" +
							"<td>" + date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear() +
								 " "  + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + "</td>" +
							"<td>" + dlv.name_dlv + "</td>" +
							"<td>" + dlv.type_dlv + "</td>" +
							"<td>" + dlv.abbrev_sbj + "</td>" +
							"<td width='30%' align='center'>" +
								"<button id='one_deliv' type='button' class='btn btn-primary pull-left' onclick='readOne_delivery_pending(" + id_tch + "," + dlv.id_dlv + ")'> " +
					 				"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 			"</button>" +
					 			"<button id='edit_pend' type='button' class='btn btn-info' onclick='edit_delivery(" + id_tch  + "," + dlv.id_dlv +  "," + dlv.sbj +")'> " +
	    				 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   				 			"</button>" +
	   				 			"<button onclick='delivery_delete(" + id_tch  + "," + dlv.id_dlv + ")' class='btn btn-danger pull-right'>" +
									"<span class='glyphicon glyphicon-remove'></span> Borrar" +
								"</button>" +
							"</td>" +
							"</tr>"
	        			);
	        				
	        		}
	        		else if ( dlv_date_obj < current_date) {
	        			//SE MUESTRA EN OTRA SECCION
	        		}
	        		else{
	        			fadeIn_all('#error_generic');
	        		}
	        	}
	        	
	        	$("#list_pending_tch").append(
	        		"</table>"
	        	);
	        }
	        
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function read_deliveries_completed(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/list_deliv_compl.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	console.log(json);
        	
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	fadeOut_all("#homepage_teacher");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all("#list_completed_tch");
	        	
	        	var deliveries = json.deliveries;
	        	
	        	$("#list_completed_tch").append(
	        		"<div class='page-header'>" +
						"<h1>Lista tareas terminadas</h1>" +
					"</div>" +
	        		 "<table id='t_compl' class='table table-hover table-responsive table-bordered'>" +
	        		 	"<tr>" +
	        		 	"<th>Fecha de entrega</th>" +
	        		 	"<th>Nombre tarea</th>" +
	        		 	"<th>Tipo</th>" +
	        		 	"<th>Asignatura</th>" +
	        		 	"<th>Nota</th>" +
	        		 	"<th>Acciones</th>" +
	        		 	"</tr>"
	        	);
	        	
	        	for(var i = 0; i< deliveries.length; i++){
	        		var dlv = deliveries[i];
	        		
	        		var dlv_date_obj = new Date(dlv.deliver_date);
	        		
	        		var current_date = new Date();
	        		if ( dlv_date_obj >= current_date){
	        			//SE MUESTRA EN OTRA SECCION
	        		}
	        		else if ( dlv_date_obj < current_date) {
	        		
	        			var date = new Date(dlv.deliver_date);
	        			var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	        			
	        			$("#list_completed_tch  #t_compl").append(
	        				"<tr id='" + i + "'>" +
							"<td>" + date.getDate() + " de " + months[date.getMonth()] + " de " + date.getFullYear() +
								 " "  + date.getHours() + ":" + (date.getMinutes()<10?'0':'') + date.getMinutes() + "</td>" +
							"<td>" + dlv.name_dlv + "</td>" +
							"<td>" + dlv.type_dlv + "</td>" +
							"<td>" + dlv.abbrev_sbj + "</td>"
	        			);
	        			
	        			if(dlv.average==null){
	        				$("#list_completed_tch	#t_compl #" + i).append(
	        					"<td class='td_blue'> Sin evaluar </td>"
	        				);
	        			}
	        			else if(dlv.average >= 50){
	        				$("#list_completed_tch	#t_compl #" + i).append(
	        					"<td class='td_green'>" + dlv.average + "</td>"
	        				);
	        			}
	        			else{
	        				$("#list_completed_tch	#t_compl #" + i).append(
	        					"<td class='td_red'>" + dlv.average + "</td>"
	        				);
	        			}
	        			
	        			$("#list_completed_tch	#t_compl #" + i).append(
	        				"<td id='action_compl'>" +
								"<button id='one_dlv' type='button' class='btn btn-primary' onclick='readOne_delivery_completed(" + id_tch + "," + dlv.id_dlv + ")'> " +
					 				"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 			"</button>" +
					 			"<button id='eval_del' type='button' class='btn btn-info' onclick='eval_delivery(" + id_tch  + "," + dlv.id_dlv + ")'> " +
	    				 			"<span class='glyphicon glyphicon-edit'></span> Evaluar " +	
	   				 			"</button>" +
							"</td>" +
							"</tr>"
						);
	        		
	        		}
	        		else{
	        			fadeIn_all('#error_generic');
	        		}
	        	}
	        	
	        	$("#list_completed_tch").append(
	        		"</table>"
	        	);
	        	
	        }
	        
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function readOne_delivery_pending(id_tch , id_dlv){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_dlv', id_dlv);

	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/readOne_delivery_pending.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	//console.log(json);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all("#homepage_teacher");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all('#one_delivery_teacher');
	        	
	        	var date_d = new Date(json.deliver_date);
	        	var date_r = new Date(json.rise_date);
	        	var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	        			
	        	$('#one_delivery_teacher').append(
	        		"<div class='page-header'>" +
						"<h1>Ver un tarea pendiente</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_pending_apT(id_tch)'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver pendientes" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Nombre tarea</td><td>" + json.name_dlv + "</td></tr>" +
					"<tr><td>Asignatura</td><td><a onclick='readOne_subject_teacher(" + id_tch + "," + json.sbj +")'>" + json.abbrev_sbj + "</a></td></tr>" +
					"<tr><td>Tipo </td><td>" + json.type_dlv+ "</td></tr>" +
					"<tr><td>Fecha de subida</td><td>" + date_r.getDate() + " de " + months[date_r.getMonth()] + " de " + date_r.getFullYear() +
								 " "  + date_r.getHours() + ":" + (date_r.getMinutes()<10?'0':'') + date_r.getMinutes() + "</td></tr>" +
					"<tr><td>Fecha de entrega</td><td>" + date_d.getDate() + " de " + months[date_d.getMonth()] + " de " + date_d.getFullYear() +
								 " "  + date_d.getHours() + ":" + (date_d.getMinutes()<10?'0':'') + date_d.getMinutes() + "</td></tr>" +
					"<tr><td>Porcentaje</td><td>" + json.percent + "</td></tr>" +
					"</table>"
				);
				
				if(json.tch_comment == null){
					$('#one_delivery_teacher table').append(
						"<tr><td>Comentario del profesor<td></td></tr>"
					);
				}
				else{
					$('#one_delivery_teacher table').append(
						"<tr><td>Comentario del profesor</td><td>" + json.tch_comment + "</td></tr>" 
					);
				}
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function readOne_delivery_completed(id_tch , id_dlv){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_dlv', id_dlv);

	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/readOne_delivery_completed.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	//console.log(json);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all("#homepage_teacher");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all('#one_delivery_compl_teacher');
	        	
	        	var date_d = new Date(json.deliver_date);
	        	var date_r = new Date(json.rise_date);
	        	var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	        			
	        	$('#one_delivery_compl_teacher').append(
	        		"<div class='page-header'>" +
						"<h1>Ver un tarea terminada</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_deliveries_completed()'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver terminadas" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Nombre tarea</td><td>" + json.name_dlv + "</td></tr>" +
					"<tr><td>Asignatura</td><td><a onclick='readOne_subject_teacher(" + id_tch + "," + json.sbj +")'>" + json.abbrev_sbj + "</a></td></tr>" +
					"<tr><td>Tipo </td><td>" + json.type_dlv+ "</td></tr>" +
					"<tr><td>Fecha de subida</td><td>" + date_r.getDate() + " de " + months[date_r.getMonth()] + " de " + date_r.getFullYear() +
								 " "  + date_r.getHours() + ":" + (date_r.getMinutes()<10?'0':'') + date_r.getMinutes() + "</td></tr>" +
					"<tr><td>Fecha de entrega</td><td>" + date_d.getDate() + " de " + months[date_d.getMonth()] + " de " + date_d.getFullYear() +
								 " "  + date_d.getHours() + ":" + (date_d.getMinutes()<10?'0':'') + date_d.getMinutes() + "</td></tr>" +
					"<tr><td>Porcentaje</td><td>" + json.percent + "</td></tr>" +
					"</table>"
				);
				
				if(json.tch_comment == null){
					$('#one_delivery_compl_teacher table').append(
						"<tr><td>Comentario del profesor<td></td></tr>"
					);
				}
				else{
					$('#one_delivery_compl_teacher table').append(
						"<tr><td>Comentario del profesor</td><td>" + json.tch_comment + "</td></tr>" 
					);
				}
				
				if(json.average==null){
	        		$('#one_delivery_compl_teacher table').append(
	        			"<tr><td>Nota media</td><td class='td_blue'> Sin evaluar </td></tr>"
	        		);
	        	}
	        	else if(json.average >= 50){
	        		$('#one_delivery_compl_teacher table').append(
	        			"<tr><td>Nota media</td><td class='td_green'>" + json.average + "</td></tr>"
	        		);
	        	}
	        	else{
	        		$('#one_delivery_compl_teacher table').append(
	        			"<tr><td>Nota media</td><td class='td_red'>" + json.average + "</td></tr>"
	        		);
	        	}
				
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function create_delivery(){

	clear();
	
	fadeOut_all("#homepage_teacher");
	
	fadeIn_all("#buttons_header_others_teacher");
	fadeIn_all('#create_delivery_teacher');
	
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	////console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/list_subjects_t.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	var json = JSON.parse(data);
        	
        	if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
				$('#create_delivery_form table tr #td_subject_teacher').append(
					"<select class='form-control' id='subject_teacher_create' name='subject_teacher_create'>" +
						"<option>Seleccionar asignatura...</option>"
				);
	
				for(var i = 0; i<json.subjects.length; i++){
					$('#create_delivery_form table tr #td_subject_teacher select').append(
						"<option value='" + json.subjects[i].sbj + "'>" + json.subjects[i].abbrev_sbj +"</option>"
					);
				}
	
				$('#create_delivery_form table tr #td_subject_teacher').append(					 
					"</select>"
				);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
		
}

function edit_delivery(id_tch , id_dlv, sbj_old){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_dlv', id_dlv);
	data.append('sbj_old', sbj_old);

	////console.log(id_tch, token, id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/readOne_delivery_pending.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	////console.log(json);
        	
        	fadeOut_all("#homepage_teacher");
	
			fadeIn_all("#buttons_header_others_teacher");
			fadeIn_all('#edit_delivery_teacher');
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	$('#edit_delivery_teacher #edit_delivery_form').append(
			 			"<table class='table table-hover table-responsive table-bordered'>" +
	 
	 					"<tr style='display:none;'><td>Id</td>" +
	            			"<td><input type='text' id='id_dlv_ed' name='id_dlv_ed' value='" + id_dlv +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	        			"<tr><td>Nombre</td>" +
	          				"<td><input type='text' id='name_dlv_ed' name='name_dlv_ed' value='"+ json.name_dlv +"' class='form-control' /></td>" +
	        			"</tr>" +
	        
	        			"<tr><td>Tipo</td>" +
	            			"<td><select class='form-control' id='type_dlv_ed' name='type_dlv_ed'>" +
	            				"<option value='" + json.type_dlv + "'>" + json.type_dlv + "</option>" +
								"<option value='examen'> Examen</option>" +
								"<option value='proyecto'> Proyecto</option>" +
					 			"<option value='practica'> Practica</option>" +
					 			"<option value='ejercicio'> Ejercicio</option>" +
					 		"</select></td>" +
	       				"</tr>" +
	 
	       			 "<tr><td>Porcentaje</td>" +
	            			"<td><input type='number' id='percent_ed' name='percent_ed' value='" + json.percent + "' min='0' max='100' class='form-control' /></td>" +
	        		"</tr>" +
	        
	       			 "<tr><td>Fecha de subida</td>" +
	        			"<td><input type='datetime-local' id='rise_date_ed' name='rise_date_ed' value='"+ json.rise_date +"' class='form-control' /><p style='font-size:10px;'>" + json.rise_date+"</p></td>" +
	       			" </tr>" +
	       			
	       			"<tr><td>Fecha limite de entrega</td>" +
	        			"<td><input type='datetime-local' id='deliver_date_ed' name='deliver_date_ed' value='"+ json.deliver_date +"' class='form-control' /><p style='font-size:10px;'>" + json.deliver_date+"</p></td>" +
	       			" </tr>" 
	
	        		);
	        		
	        		if(json.tch_comment == null){
	        			$('#edit_delivery_teacher #edit_delivery_form table').append(
	        				"<tr><td>Comentario profesor</td>" +
	 							"<td><input type='text' id='tch_comment_create' name='tch_comment_create' class='form-control' /></td>" +
	 						"</tr>" 
	        			);
	        		}
	        		else{
	        			$('#edit_delivery_teacher #edit_delivery_form table').append(
	        				"<tr><td>Comentario profesor</td>" +
	 							"<td><input type='text' id='tch_comment_create' name='tch_comment_create' value='" + json.tch_comment + "' class='form-control' /></td>" +
	 						"</tr>" 
	 					);
	        		}
	        		
	        		$('#edit_delivery_teacher #edit_delivery_form table').append(
	        			"<tr><td>Asignatura</td>" +
	        				"<td>" +
	        					"<select id='select_subject_teacher_edit' class='form-control' id='subject_teacher_ed' name='subject_teacher_ed'>" +
	        				"</td>" +
	        			"</tr>" +
	        			
	        			"<tr><td></td><td><button type='submit' class='btn btn-primary'>Editar</button></td></tr>" +
	    				"</table>"
	    			);
			}  
	        
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});  
	
	var data_aux = new FormData();
	data_aux.append('id_tch', id_tch);
	data_aux.append('token', token);
	data_aux.append('sbj_old', sbj_old);
	$.ajax({
       	url: server_addr + 'organizaMisPracticas/application/web/teacher/list_subjects_t.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
       	processData: false,
        data: data_aux,
        success: function( data_aux, textStatus, jQxhr ){
        	var json_aux = JSON.parse(data_aux);
        					
        	//console.log(json_aux);
        	
        	if(json_aux.status == 'ERROR') {
	    		fadeIn_all('#error_generic');
        	}	       		 	
        	else {
        		for(var j = 0; j<json_aux.subjects.length; j++){
        			if(json_aux.subjects[j].sbj == sbj_old){
        				$('#select_subject_teacher_edit').append(								
							"<option value='" + json_aux.subjects[j].sbj + "'>" + json_aux.subjects[j].abbrev_sbj +"</option>"
						);
        			}
        		}
				
				
				for(var i = 0; i<json_aux.subjects.length; i++){
					$('#select_subject_teacher_edit').append(								
						"<option value='" + json_aux.subjects[i].sbj + "'>" + json_aux.subjects[i].abbrev_sbj +"</option>"
					);
				}
				
				$('#select_subject_teacher_edit').append(								
					"</select>"
				);

			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	    	console.log( errorThrown );
	    }
	});	 
}

function delivery_delete(id_tch, id_dlv) {
	if(confirm("Seguro que quieres borrar este elemento?")){
		var data = new FormData();
		data.append('id_tch', id_tch);
		data.append('token', token);
		data.append('id_dlv', id_dlv);

		//console.log(id_tch, token, id_sbj);
	
		$.ajax({
      	 	url: server_addr + 'organizaMisPracticas/application/web/teacher/readOne_delivery_pending.php',
        	type: 'post',
      	 	method: 'post',
        	cache: false,
        	contentType: false,
        	processData: false,
        	data: data,
        	success: function( data, textStatus, jQxhr ){
        		clear();
        	
        		var json = JSON.parse(data);
        	
        		//console.log(json);
        	
	        	if(json.status == 'ERROR') {
	        		fadeIn_all('#error_generic');
	        	}
	        	else {
	        	
	        		fadeOut_all("#homepage_teacher");
	
					fadeIn_all("#buttons_header_others_teacher");
					fadeIn_all('#delete_delivery_teacher');
					
	        	
	        		var date_d = new Date(json.deliver_date);
	        		var date_r = new Date(json.rise_date);
	        		var months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
	        			
	        		$('#delete_delivery_teacher').append(
	        			"<div class='page-header'>" +
							"<h1>Borrar tarea</h1>" +
						"</div>" +
						"<table class='table table-hover table-responsive table-bordered'>" +
							"<tr><td>Nombre tarea</td><td>" + json.name_dlv + "</td></tr>" +
							"<tr><td>Asignatura</td><td>" + json.abbrev_sbj + "</td></tr>" +
							"<tr><td>Tipo </td><td>" + json.type_dlv+ "</td></tr>" +
							"<tr><td>Fecha de subida</td><td>" + date_r.getDate() + " de " + months[date_r.getMonth()] + " de " + date_r.getFullYear() +
								 " "  + date_r.getHours() + ":" + (date_r.getMinutes()<10?'0':'') + date_r.getMinutes() + "</td></tr>" +
							"<tr><td>Fecha de entrega</td><td>" + date_d.getDate() + " de " + months[date_d.getMonth()] + " de " + date_d.getFullYear() +
								 " "  + date_d.getHours() + ":" + (date_d.getMinutes()<10?'0':'') + date_d.getMinutes() + "</td></tr>" +
						"<tr><td>Porcentaje</td><td>" + json.percent + "</td></tr>" +
						"</table>" +
						"<button id='delete' type='submit' class='btn btn-default' onclick='delete_delivery(" + id_tch + "," + id_dlv + ")'>" +
							"<span class='glyphicon glyphicon-remove'></span> Borrar" +
						"</button>"
						
					);
				
					if(json.tch_comment == null){
						$('#delete_delivery_teacher table').append(
							"<tr><td>Comentario del profesor<td></td></tr>"
						);
					}
					else{
						$('#delete_delivery_teacher table').append(
							"<tr><td>Comentario del profesor</td><td>" + json.tch_comment + "</td></tr>" 
						);
					}
				}
					
        	},
	    	error: function( jqXhr, textStatus, errorThrown ){
	        	console.log( errorThrown );
	    	}
		
		});
	}
}

function delete_delivery(id_tch, id_dlv){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_dlv_del', id_dlv);

	//console.log(id_tch, token, id_sbj);
	
	$.ajax({
  	 	url: server_addr + 'organizaMisPracticas/application/web/teacher/delete_delivery.php',       	
  	 	type: 'post',
      	method: 'post',
    	cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	//console.log(json);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	    	}
	        else {
	        	read_pending_apT(id_tch);
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	});
}

function read_subjects_teacher(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/list_subjects_t.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	console.log(json);
        	
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	fadeOut_all("#homepage_teacher");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all("#list_subjects_tch");
	        	
	        	var subjects = json.subjects;
	        	
	        	$("#list_subjects_tch").append(
	        		"<div class='page-header'>" +
						"<h1>Lista asignaturas</h1>" +
					"</div>" +
	        		 "<table id='t_subj' class='table table-hover table-responsive table-bordered'>" +
	        		 	"<tr>" +
	        		 	"<th>Abreviatura</th>" +
	        		 	"<th>Curso</th>" +
	        		 	"<th>Grupo</th>" +
	        		 	"<th>Número de alumnos</th>" +
	        		 	"<th>Media</th>" +
	        		 	"<th>Acción</th>" +
	        		 	"</tr>"
	        	);
	        	
	        	for(var i = 0; i< subjects.length; i++){
	        		var subj = subjects[i];
	        	
	        			
	        		$("#list_subjects_tch  #t_subj").append(
	        			"<tr id='average_sbj_" + i + "'>" +
							"<td>" + subj.abbrev_sbj+ "</td>" +
							"<td>" + subj.course + "</td>" +
							"<td>" + subj.group_sbj + "</td>" +
							"<td>" + subj.num_stdnt + "</td>" +
						"</tr>"		
	        		);
	        		
	        		if(subj.average==null){
	        				$("#list_subjects_tch  #t_subj #average_sbj_" + i).append(
	        					"<td class='td_blue'> Sin evaluar </td>"
	        				);
	        		}
	        		else if(subj.average >= 50){
	        			$("#list_subjects_tch  #t_subj #average_sbj_" + i).append(
	        					"<td class='td_green'>" + subj.average + "</td>"
	        				);
	        		}
	        		else{
	        			$("#list_subjects_tch  #t_subj #average_sbj_" + i).append(
	        					"<td class='td_red'>" + subj.average + "</td>"
	        			);
	        		}
	        		
	        		$("#list_subjects_tch  #t_subj #average_sbj_" + i).append(
	        				"<td id='action_sbj'>" +
								"<button id='one_dlv' type='button' class='btn btn-primary' onclick='readOne_subject_teacher(" + id_tch + "," + subj.sbj + ")'> " +
					 				"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 			"</button>" +
							"</td>"	
	        		);
	        		
	        	}
	        	
	        	$("#list_subjects_tch").append(
	        		"</table>"
	        	);
	        	
	        }
	        
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function readOne_subject_teacher(id_tch , id_sbj){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_sbj', id_sbj);

	////console.log(id_tch, token, id_fac);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/readOne_subject_teacher.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	////console.log(json);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all("#list_subjects_tch");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all("#one_subject_tch");
	        	
	        	$('#one_subject_tch').append(
	        		"<div class='page-header'>" +
						"<h1>Ver una asignatura</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_subjects_teacher()'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver asignaturas" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Abreviatura</td><td>" + json.abbrev_sbj + "</td></tr>" +
					"<tr><td>Nombre</td><td>" + json.name_sbj + "</td></tr>" +
					"<tr><td>Creditos</td><td>" + json.credits + "</td></tr>" +
					"<tr><td>Curso</td><td>" + json.course + "</td></tr>" +
					"<tr><td>Grupo</td><td>" + json.group_sbj + "</td></tr>" +
					"<tr><td>Cuatrimestre</td><td>" + json.quarter + "</td></tr>" +
					"<tr><td>Estudios</td><td>" + json.abbrev_stds + "</td></tr>" +
					"<tr><td>Número de alumnos</td><td>" + json.num_stdnt + "</td></tr>" +
					"</table>"
				);
				
				if(json.average==null){
	        		$("#one_subject_tch table").append(
	        			"<tr><td>Media</td><td class='td_blue'> Sin evaluar </td></tr>"
	        		);
	        	}
	        	else if(json.average >= 50){
	        		$("#one_subject_tch table").append(
	        			"<tr><td>Media</td><td class='td_green'>" + json.average + "</td></tr>"
	        		);
	        	}
	        	else{
	        		$("#one_subject_tch table").append(
	        			"<tr><td>Media</td><td class='td_red'>" + json.average + "</td></tr>"
	        		);
	        	}
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function read_students_teacher(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/list_students_t.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	console.log(json);
        	
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	fadeOut_all("#homepage_teacher");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all("#list_students_tch");
	        	
	        	var students = json.students;
	        	
	        	$("#list_students_tch").append(
	        		"<div class='page-header'>" +
						"<h1>Lista alumnos</h1>" +
					"</div>" +
	        		 "<table id='t_stdnt' class='table table-hover table-responsive table-bordered'>" +
	        		 	"<tr>" +
	        		 	"<th>Nombre</th>" +
	        		 	"<th>Apellido</th>" +
	        		 	"<th>Correo</th>" +
	        		 	"<th>Estudio</th>" +
	        		 	"<th>Número de asignaturas</th>" +
	        		 	"<th>Acción</th>" +
	        		 	"</tr>"
	        	);
	        	
	        	for(var i = 0; i< students.length; i++){
	        		var stdnt = students[i];
	        	
	        			
	        		$("#list_students_tch  #t_stdnt").append(
	        			"<tr id='average_stdnt_" + i + "'>" +
							"<td>" + stdnt.name_stdnt+ "</td>" +
							"<td>" + stdnt.last_name_stdnt + "</td>" +
							"<td>" + stdnt.mail + "</td>" +
							"<td>" + stdnt.name_stds + "</td>" +
							"<td>" + stdnt.num_sbj + "</td>" +
							"<td id='action_stdnt'>" +
								"<button id='one_dlv' type='button' class='btn btn-primary' onclick='readOne_student_teacher(" + id_tch + "," + stdnt.stdnt + ")'> " +
					 				"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 			"</button>" +
							"</td>"	+
						"</tr>"		
	        		);
	        			
	        	}
	        	
	        	$("#list_students_tch").append(
	        		"</table>"
	        	);
	        	
	        }
	        
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function readOne_student_teacher(id_tch , id_stdnt){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_stdnt', id_stdnt);

	////console.log(id_tch, token, id_fac);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/readOne_student_teacher.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	////console.log(json);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all("#list_students_tch");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all("#one_student_tch");
	        	
	        	$('#one_student_tch').append(
	        		"<div class='page-header'>" +
						"<h1>Ver un alumno</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_students_teacher()'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver alumnos" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Nombre</td><td>" + json.name_stdnt + "</td></tr>" +
					"<tr><td>Apellido</td><td>" + json.last_name_stdnt + "</td></tr>" +
					"<tr><td>Correo</td><td>" + json.mail + "</td></tr>" +
					"<tr><td>Estudio</td><td>" + json.name_stds + "</td></tr>" +
					"<tr><td>Numero de asignaturas</td><td>" + json.num_sbj + "</td></tr>" +
					"</table>" +
					"<table id='table_aux' class='table table-hover table-responsive table-bordered' style='margin-top: 10px;'>" +
						"<tr>" +
	        		 	"<th>Nombre tarea</th>" +
	        		 	"<th>Asignatura</th>" +
	        		 	"<th>Porcentaje</th>" +
	        		 	"<th>Nota</th>" +
	        		 	"</tr>"
				);
			
				for(var i = 0; i<json.deliveries.length; i++){
					var delivery = json.deliveries[i];
					
					$('#one_student_tch #table_aux').append(
						"<tr id='dl_" + i +"' >"+
						"<td>" + delivery.name_dlv +"</td>" +
						"<td>" + delivery.abbrev_sbj+"</td>" +
						"<td>" + delivery.percent +"</td>" +
						"</tr>"
					);
					
					if(delivery.note == null){
	        			$('#one_student_tch #table_aux #dl_' + i).append(
	        				"<td class='td_blue'> Sin evaluar </td>"
	        			);
	        		}
	        		else if(delivery.note >= 50){
	        			$('#one_student_tch #table_aux #dl_' + i).append(
	        				"<td class='td_green'> " + delivery.note + "</td>"
	        			);
	        		}
	        		else{
	        			$('#one_student_tch #table_aux #dl_' + i).append(
	        				"<td class='td_red'> " + delivery.note + " </td>"
	        			);
	        		}
				}
				
				$('#one_student_tch #table_aux').append(
					"</table>"
				);
				
				
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function eval_delivery(id_tch , id_dlv){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_dlv', id_dlv);
	
	console.log(id_dlv);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/evaluate_delivery.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	console.log(json);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	fadeOut_all("#list_completed_teacher");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all("#evaluate_dlv");
	        	
	        	var deliveries = json.deliveries;
	        	
	        	$("#evaluate_dlv").append(
	        		"<div class='page-header'>" +
						"<h1>Evaluar tarea</h1>" +
					"</div>" +
					"<div>"  +
					"<button id='list_completed' class='btn btn-default pull-right' onclick='read_deliveries_completed()'>" +
						"<span class='glyphicon glyphicon-list'></span> Lista terminadas" +
					"</button>" +
					"</div>" +
					"<div id='h3_eval'>" +
					"</div>" +
	        		 "<table id='t_eval' class='table table-hover table-responsive table-bordered'>" +
	        		 	"<tr>" +
	        		 	"<th>Nombre</th>" +
	        		 	"<th>Asignatura</th>" +
	        		 	"<th>Nota</th>" +
	        		 	"<th>Comentario</th>" +
	        		 	"<th>Acciones</th>" +
	        		 	"</tr>"
	        	);	
	        	
	        	
	        	for(var i = 0; i< deliveries.length; i++){
	        		var dlv = deliveries[i];
	        		
	        		$("#evaluate_dlv #h3_eval h3").empty();
					$("#evaluate_dlv #h3_eval").append(
	        			"<h3 style='text-align:left;'> Nombre tarea: " + dlv.name_dlv + "</h3>"
	        		);
						
	        		
	        		$("#evaluate_dlv  #t_eval").append(
	        			"<tr id='" + dlv.name_stdnt + "_" + i + "'>" +
	        			"<td>" + dlv.name_stdnt + " " + dlv.last_name_stdnt + "</td>" +
	        			"<td>" + dlv.abbrev_sbj + "</td>"
	        		);
	        		
	        		if(dlv.note == null){
	        			$("#evaluate_dlv  #t_eval #" + dlv.name_stdnt + "_" + i ).append(
	        				"<td class='td_blue'></td>"
	        			);
	        		}
	        		else if(dlv.note >= 50){
	        			$("#evaluate_dlv  #t_eval #" + dlv.name_stdnt + "_" + i ).append(
	        				"<td class='td_green'>" + dlv.note + "</td>"
	        			);
	        		}
	        		else{
	        			$("#evaluate_dlv  #t_eval #" + dlv.name_stdnt + "_" + i ).append(
	        				"<td class='td_red'>" + dlv.note + "</td>"
	        			);
	        		}
	        		
	        		if(dlv.tch_comment_note == null){
	        			$("#evaluate_dlv  #t_eval #" + dlv.name_stdnt + "_" + i ).append(
	        				"<td></td>"
	        			);
	        		}
	        		else{
	        			$("#evaluate_dlv  #t_eval #" + dlv.name_stdnt + "_" + i ).append(
	        				"<td>" + dlv.tch_comment_note + "</td>"
	        			);
	        		}
	        		
	        		$("#evaluate_dlv  #t_eval #" + dlv.name_stdnt + "_" + i ).append(
	        			"<td width='30%' align='center'>" +
								"<button id='subject_t' type='button' class='btn btn-primary pull-left' onclick='readOne_eval(" + id_tch + "," + id_dlv + "," + dlv.id_stdnt + ")'> " +
					 				"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 			"</button>" +
					 			"<button id='s_teacher' type='button' class='btn btn-info' onclick='edit_eval(" + id_tch  + "," + id_dlv + "," + dlv.id_stdnt + ")'> " +
	    				 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   				 			"</button>" +
	   				 			"<button onclick='evaluate_delete(" + id_tch  + "," + id_dlv + "," + dlv.id_stdnt + ")' class='btn btn-danger pull-right'>" +
									"<span class='glyphicon glyphicon-remove'></span> Borrar" +
								"</button>" +
						"</td>" +
						"</tr>"
					);
	        	}
	        	
	        	$("#evaluate_dlv").append(
	        		"</table>"
	        	);
	        }
        
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function readOne_eval(id_tch, id_dlv , id_stdnt){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_dlv', id_dlv);
	data.append('id_stdnt', id_stdnt);

	//console.log("readOne: " + id_stdnt);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/readOne_evaluate_tch.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	////console.log(json);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	fadeOut_all("#evaluate_dlv");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all("#one_evaluate_tch");
	        	
	        	$('#one_evaluate_tch').append(
	        		"<div class='page-header'>" +
						"<h1>Ver evaluación de un alumno</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='eval_delivery(" + id_tch + "," + id_dlv + ")'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver evaluaciones" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Alumno</td><td><a onclick='readOne_student_teacher(" + id_tch + "," + id_stdnt +")'>" + json.mail + "</a></td></tr>" +
					"<tr><td>Asignatura</td><td><a onclick='readOne_subject_teacher(" + id_tch + "," + json.sbj +")'>" + json.abbrev_sbj + "</a></td></tr>" +
					"<tr><td>Nombre tarea</td><td>" + json.name_dlv + "</td></tr>" +
					"<tr><td>Tipo</td><td>" + json.type_dlv + "</td></tr>" +
					"<tr><td>Porcentaje</td><td>" + json.percent + "</td></tr>" +
					"</table>" 
				);
				
				if(json.note == null){
					$('#one_evaluate_tch table').append(
						"<tr><td>Nota</td><td></td></tr>"
					);
				}
				else{
					$('#one_evaluate_tch table').append(
						"<tr><td>Nota</td><td>" + json.note + "</td></tr>"
					);
				}
				if(json.tch_comment_note == null){
					$('#one_evaluate_tch table').append(
						"<tr><td>Comentario nota</td><td></td></tr>"
					);
				}
				else{
					$('#one_evaluate_tch table').append(
						"<tr><td>Comentario nota</td><td>" + json.tch_comment_note + "</td></tr>" 
					);
				}
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}

function edit_eval(id_tch, id_dlv , id_stdnt){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_dlv', id_dlv);
	data.append('id_stdnt', id_stdnt);
	
	console.log("inicio", id_dlv, id_stdnt);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/teacher/readOne_evaluate_tch.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	////console.log(json);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	var aux_dlv = id_dlv;
	        	
	        	//console.log("aux", aux_dlv);
	        	
	        	fadeOut_all("#evaluate_dlv");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all("#edit_evaluate_tch");
	        	$('#button_eval').empty();
	        	
	        	$('#edit_evaluate_tch #button_eval').append(
						"<button id='readAll' class='btn btn-default pull-right' onclick='readOne_eval(" + id_tch + "," + id_dlv + "," + id_stdnt+ ")'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver evaluaciones" +
						"</button>"
				);
				
				$('#edit_evaluate_form').append(
					"<table class='table table-hover table-responsive table-bordered'>" +
						"<tr><td>Alumno</td><td><a onclick='readOne_student_teacher(" + id_tch + "," + id_stdnt +")'>" + json.mail + "</a></td></tr>" +
						"<tr><td>Asignatura</td><td><a onclick='readOne_subject_teacher(" + id_tch + "," + json.sbj +")'>" + json.abbrev_sbj + "</a></td></tr>" +
						"<tr><td>Nombre tarea</td><td>" + json.name_dlv + "</td></tr>" +
						"<tr><td>Tipo</td><td>" + json.type_dlv + "</td></tr>" +
						"<tr><td>Porcentaje</td><td>" + json.percent + "</td></tr>" +
						"<tr style='display:none;'><td>Id_dlv</td>" +
	            			"<td><input type='number' id='id_one_dlv_ed' name='id_one_dlv_ed' value='" + aux_dlv +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			"<tr style='display:none;'><td>Id_stdnt</td>" +
	            			"<td><input type='number' id='id_one_stdnt_ed' name='id_one_stdnt_ed' value='" + id_stdnt +"' class='form-control' /></td>" +
	        			"</tr>" +
	 					
					"</table>"
				);
				
				if(json.note == null){
					$('#edit_evaluate_tch #edit_evaluate_form table').append(
						"<tr><td>Nota</td>" +
	 							"<td><input type='number' id='note_eval' name='note_eval' class='form-control' /></td>" +
	 					"</tr>"
	 				);
				}
				else{
					$('#edit_evaluate_tch #edit_evaluate_form table').append(
						"<tr><td>Nota</td>" +
	 						"<td><input type='number' id='note_eval' name='note_eval' value='"+ json.note +"' class='form-control' /></td>" +
	 					"</tr>"
	 				);
				}
				if(json.tch_comment_note == null){
					$('#edit_evaluate_tch #edit_evaluate_form table').append(
						"<tr><td>Comentario profesor</td>" +
	 							"<td><input type='text' id='tch_comment_eval' name='tch_comment_eval' class='form-control' /></td>" +
	 					"</tr>"
	 				);
				}
				else{
					$('#edit_evaluate_tch #edit_evaluate_form table').append(
						"<tr><td>Comentario profesor</td>" +
	 						"<td><input type='text' id='tch_comment_eval' name='tch_comment_eval' value='"+ json.tch_comment_note +"' class='form-control' /></td>" +
	 					"</tr>"
	 				);
				}
				
				//debugger;
				
				$('#edit_evaluate_tch #edit_evaluate_form table').append(
					"<tr><td></td><td><button type='submit' class='btn btn-primary'>Editar</button></td></tr>"
				);
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}


function evaluate_delete(id_tch, id_dlv, id_stdnt) {
	if(confirm("Seguro que quieres borrar este elemento?")){
		var data = new FormData();
		data.append('id_tch', id_tch);
		data.append('token', token);
		data.append('id_dlv', id_dlv);

		//console.log(id_tch, token, id_sbj);
	
		$.ajax({
      	 	url: server_addr + 'organizaMisPracticas/application/web/teacher/readOne_delivery_pending.php',
        	type: 'post',
      	 	method: 'post',
        	cache: false,
        	contentType: false,
        	processData: false,
        	data: data,
        	success: function( data, textStatus, jQxhr ){
        		clear();
        	
        		var json = JSON.parse(data);
        	
        		//console.log(json);
        	
	        	if(json.status == 'ERROR') {
	        		fadeIn_all('#error_generic');
	        	}
	        	else {
	        	
	        		fadeOut_all("#homepage_teacher");
	
					fadeIn_all("#buttons_header_others_teacher");
					fadeIn_all('#delete_evaluate_teacher');
					
	        
	        		$('#delete_evaluate_teacher').append(
	        			"<div class='page-header'>" +
							"<h1>Borrar tarea</h1>" +
						"</div>" +
						"<table class='table table-hover table-responsive table-bordered'>" +
							"<tr><td>Alumno</td><td>" + json.mail+ "</td></tr>" +
							"<tr><td>Asignatura</td><td>" + json.abbrev_sbj+ "</td></tr>" +
							"<tr><td>Nombre tarea</td><td>" + json.name_dlv + "</td></tr>" +
							"<tr><td>Tipo</td><td>" + json.type_dlv + "</td></tr>" +
							"<tr><td>Porcentaje</td><td>" + json.percent + "</td></tr>" +
						"</table>" +
						"<button id='delete' type='submit' class='btn btn-default' onclick='delete_evaluate(" + id_tch + "," + id_dlv + "," + id_stdnt +")'>" +
							"<span class='glyphicon glyphicon-remove'></span> Borrar" +
						"</button>"
						
					);
				
					if(json.note == null){
						$('#delete_evaluate_teacher table').append(
							"<tr><td>Nota<td></td></tr>"
						);
					}
					else{
						$('#delete_evaluate_teacher table').append(
							"<tr><td>Nota</td><td>" + json.note + "</td></tr>" 
						);
					}
					
					if(json.tch_comment_note == null){
						$('#delete_evaluate_teacher table').append(
							"<tr><td>Comentario nota<td></td></tr>"
						);
					}
					else{
						$('#delete_evaluate_teacher table').append(
							"<tr><td>Comentario nota</td><td>" + json.tch_comment_note + "</td></tr>" 
						);
					}
				}
					
        	},
	    	error: function( jqXhr, textStatus, errorThrown ){
	        	console.log( errorThrown );
	    	}
		
		});
	}
}

function delete_evaluate(id_tch, id_dlv, id_stdnt){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_dlv_del', id_dlv);
	data.append('id_stdnt_del', id_stdnt);

	//console.log(id_tch, token, id_sbj);
	
	$.ajax({
  	 	url: server_addr + 'organizaMisPracticas/application/web/teacher/delete_evaluate.php',       	
  	 	type: 'post',
      	method: 'post',
    	cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	//console.log(json);
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	    	}
	        else {
	        	eval_delivery(id_tch , id_dlv);
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	});
}

