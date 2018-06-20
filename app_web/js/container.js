//COMMON
//hides all divs, except "login"
function exit_web(){
	//common
	fadeOut_all('#confirm_edit');
	fadeOut_all('#edit_passw');
	fadeOut_all('#login_error');
	fadeOut_all('#error_generic');
	fadeOut_all('#edit_pass');
	//admin
	fadeOut_all('#homepage_admin');
	fadeOut_all('#buttons_header_others_admin');
	fadeOut_all('#list_faculty_admin');
	fadeOut_all('#list_teacher_admin');
	fadeOut_all('#list_student_admin');
	fadeOut_all('#list_subject_admin');
	fadeOut_all('#list_studies_admin');
	fadeOut_all('#list_sbjStudent_admin');
	fadeOut_all('#list_tchSubject_admin');
	fadeOut_all('#list_tchFaculty_admin');
	fadeOut_all('#list_tchStudent_admin');
	fadeOut_all('#list_facStudent_admin');
	fadeOut_all('#one_faculty_admin');
	fadeOut_all('#one_teacher_admin');
	fadeOut_all('#one_student_admin');
	fadeOut_all('#one_subject_admin');
	fadeOut_all('#one_studies_admin');
	fadeOut_all('#one_sbjStudent_admin');
	fadeOut_all('#one_tchSubject_admin');
	fadeOut_all('#one_tchFaculty_admin');
	
	fadeOut_all('#create_faculty_admin');
	fadeOut_all('#error_create_fac');
	fadeOut_all('#confirm_create_fac');
	
	fadeOut_all('#edit_faculty_admin');
	fadeOut_all('#error_edit_fac');
	fadeOut_all('#confirm_edit_fac');
	
	fadeOut_all('#create_teacher_admin');
	fadeOut_all('#error_create_tch');
	fadeOut_all('#confirm_create_tch');
	
	fadeOut_all('#edit_teacher_admin');
	fadeOut_all('#error_edit_tch');
	fadeOut_all('#confirm_edit_tch');
		
	fadeOut_all('#create_student_admin');
	fadeOut_all('#error_create_stdnt');
	fadeOut_all('#confirm_create_stdnt');
	
	fadeOut_all('#create_subject_admin');
	fadeOut_all('#error_create_sbj');
	fadeOut_all('#confirm_create_sbj');
	
	fadeOut_all('#create_studies_admin');
	fadeOut_all('#error_create_stds');
	fadeOut_all('#confirm_create_stds');
	
	fadeOut_all('#create_sbjStudent_admin');
	fadeOut_all('#error_create_sbjStudent');
	fadeOut_all('#confirm_create_sbjStudent');
	
	fadeOut_all('#create_tchSubject_admin');
	fadeOut_all('#error_create_tchSubject');
	fadeOut_all('#confirm_create_tchSubject');
	
	fadeOut_all('#create_tchFaculty_admin');
	fadeOut_all('#error_create_tchFaculty');
	fadeOut_all('#confirm_create_tchFaculty');
	//teacher
	fadeOut_all('#homepage_tch');
	fadeOut_all('#buttons_header_others_teacher');
	fadeOut_all('#list_completed_tch');
	fadeOut_all('#evaluate_dlv');
	
	fadeIn_all('#login');	
}

//clean the divs to avoid duplications when reloading the page
function clear(){
	$('#confirm_edit').empty();
	//admin
	$('#list_faculty_admin').empty();
	$('#list_teacher_admin').empty();
	$('#list_student_admin').empty();
	$('#list_subject_admin').empty();
	$('#list_studies_admin').empty();
	$('#list_sbjStudent_admin').empty();
	$('#list_tchSubject_admin').empty();
	$('#list_tchFaculty_admin').empty();
	$('#list_tchStudent_admin').empty();
	$('#list_facStudent_admin').empty();
	$('#list_tchStudent_admin').empty();
	$('#list_facStudent_admin').empty();
	$('#one_faculty_admin').empty();
	$('#one_teacher_admin').empty();
	$('#one_student_admin').empty();
	$('#one_subject_admin').empty();
	$('#one_studies_admin').empty();
	$('#one_sbjStudent_admin').empty();
	$('#one_tchSubject_admin').empty();
	$('#one_tchFaculty_admin').empty();
	
	fadeOut_all('#create_faculty_admin');
	$('#error_create_fac').empty();
	$('#confirm_create_fac').empty();
	fadeOut_all('#edit_faculty_admin');
	$('#edit_faculty_form').empty();
	fadeOut_all('#error_edit_fac');
	fadeOut_all('#confirm_edit_fac');
	
	fadeOut_all('#create_teacher_admin');
	$('#error_create_tch').empty();
	$('#confirm_create_tch').empty();
	fadeOut_all('#edit_teacher_admin');
	$('#edit_teacher_form').empty();
	fadeOut_all('#error_edit_tch');
	fadeOut_all('#confirm_edit_tch');
		
	fadeOut_all('#create_student_admin');
	$('#error_create_stdnt').empty();
	$('#confirm_create_stdnt').empty();
	$('#td_studies_stdnt').empty();
	fadeOut_all('#create_subject_admin');
	$('#error_create_sbj').empty();
	$('#confirm_create_sbj').empty();
	$('#td_studies_sbj').empty();
	fadeOut_all('#create_studies_admin');
	$('#error_create_stds').empty();
	$('#confirm_create_stds').empty();
	$('#td_faculties_stds').empty();
	fadeOut_all('#create_sbjStudent_admin');
	$('#error_create_sbjStudent').empty();
	$('#confirm_create_sbjStudent').empty();
	$('#td_sbjStudent_sbj').empty();
	$('#td_sbjStudent_stdnt').empty();
	fadeOut_all('#create_tchSubject_admin');
	$('#error_create_tchSubject').empty();
	$('#confirm_create_tchSubject').empty();
	$('#td_tchSubject_tch').empty();
	$('#td_tchSubject_sbj').empty();
	fadeOut_all('#create_tchFaculty_admin');
	$('#error_create_tchFaculty').empty();
	$('#confirm_create_tchFaculty').empty();
	$('#td_tchFaculty_tch').empty();
	$('#td_tchFaculty_fac').empty();
	fadeOut_all('#homepage_admin');
	//teacher
	$('#homepage_tch').empty();
	$('#list_completed_tch').empty();
	$('#evaluate_dlv').empty();
}

//WEB TEACHER

function edit_passw_teach(id_tch){
	
	clear();
	
	fadeIn_all('#confirm_edit');
	fadeIn_all('#edit_pass');
	fadeIn_all('#buttons_header_others_teacher');
}

//hides all divs, except "homepage_teacher" and redirects to the main page
function go_home_tch(id_tch){
	fadeOut_all('#confirm_edit');
	fadeOut_all('#edit_passw');
	fadeOut_all('#login');
	fadeOut_all('#buttons_header_others_teacher');
	fadeOut_all('#list_completed_tch');
	fadeOut_all('#evaluate_dlv');
	fadeIn_all('#homepage_tch');
	
	read_pending(id_tch);
}

function read_pending(id_tch){
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
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	var deliveries = json.deliveries;
	        	
	        	$("#list_pending_tch").append(
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
								"<button id='subject_t' type='button' class='btn btn-primary pull-left' onclick='read_pending(" + id_tch + "," + dlv.id_dlv + ")'> " +
					 				"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 			"</button>" +
					 			"<button id='s_teacher' type='button' class='btn btn-info' onclick='edit_pending(" + id_tch  + "," + dlv.id_dlv + ")'> " +
	    				 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   				 			"</button>" +
	   				 			"<button onclick='delete_pending(" + id_tch  + "," + dlv.id_dlv + ")' class='btn btn-danger pull-right'>" +
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


function read_deliveries_completed(id_tch){
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
	        	fadeOut_all("#homepage_tch");
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
	        				"<td width='30%' align='center'>" +
								"<button id='subject_t' type='button' class='btn btn-primary pull-left' onclick='read_pending(" + id_tch + "," + dlv.id_dlv + ")'> " +
					 				"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 			"</button>" +
					 			"<button id='s_teacher' type='button' class='btn btn-info' onclick='eval_pending(" + id_tch  + "," + dlv.id_dlv + ")'> " +
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
	        	
	        	$("#list_completd_tch").append(
	        		"</table>"
	        	);
	        	
	        }
	        
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function eval_pending(id_tch , id_dlv){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_dlv', id_dlv);
	
	
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
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	fadeOut_all("#homepage_tch");
	        	fadeOut_all("#list_completed_tch");
	        	fadeIn_all("#buttons_header_others_teacher");
	        	fadeIn_all("#evaluate_dlv");
	        	
	        	var deliveries = json.deliveries;
	        	
	        	$("#evaluate_dlv").append(
	        		"<div class='page-header'>" +
						"<h1>Evaluar tarea</h1>" +
					"</div>" +
					"<div>" +
						"<h3>" + deliveries[0].name_dlv + " [ "+ deliveries[0].abbrev_sbj +" ]</h3>" +
					"</div>" +
	        		 "<table id='t_eval' class='table table-hover table-responsive table-bordered'>" +
	        		 	"<tr>" +
	        		 	"<th>Nombre</th>" +
	        		 	"<th>Nota</th>" +
	        		 	"<th>Comentario</th>" +
	        		 	"<th>Acciones</th>" +
	        		 	"</tr>"
	        	);	
	        	
	        	
	        	for(var i = 0; i< deliveries.length; i++){
	        		var dlv = deliveries[i];
	        		
	        		$("#evaluate_dlv  #t_eval").append(
	        			"<tr id='" + dlv.name_stdnt + "_" + i + "'>" +
	        			"<td>" + dlv.name_stdnt + " " + dlv.last_name_stdnt + "</td>" 
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
								"<button id='subject_t' type='button' class='btn btn-primary pull-left' onclick='read_eval(" + id_tch + "," + dlv.id_dlv + "," + dlv.id_stdnt + ")'> " +
					 				"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 			"</button>" +
					 			"<button id='s_teacher' type='button' class='btn btn-info' onclick='edit_eval(" + id_tch  + "," + dlv.id_dlv + "," + dlv.id_stdnt + ")'> " +
	    				 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   				 			"</button>" +
	   				 			"<button onclick='delete_eval(" + id_tch  + "," + dlv.id_dlv + "," + dlv.id_stdnt + ")' class='btn btn-danger pull-right'>" +
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


function delete_pending(id_tch, id_dlv) {
		/*if (confirm("Seguro que quieres borrar este elemento?")){
			location.href='../../deleter/delete_faculty_client.php?id_fac=<?php echo $id_fac?>';
		}*/
}