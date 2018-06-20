function go_home_admin(){

	fadeOut_all('#confirm_edit');
	fadeOut_all('#edit_passw');
	fadeOut_all('#login_error');
	fadeOut_all('#error_generic');
	fadeOut_all('#edit_pass');
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
	fadeOut_all('#create_teacher_admin');
	fadeOut_all('#create_student_admin');
	fadeOut_all('#create_subject_admin');
	fadeOut_all('#create_studies_admin');
	fadeOut_all('#create_sbjStudent_admin');
	fadeOut_all('#create_tchSubject_admin');
	fadeOut_all('#create_tchFaculty_admin');
			
	fadeOut_all('#edit_faculty_admin');
	fadeOut_all('#edit_teacher_admin');
	fadeOut_all('#edit_student_admin');
	fadeOut_all('#edit_subject_admin');
	fadeOut_all('#edit_studies_admin');
	fadeOut_all('#edit_sbjStudent_admin');
	fadeOut_all('#edit_tchSubject_admin');
	fadeOut_all('#edit_tchFaculty_admin');
	
	fadeOut_all('#delete_faculty_admin');
	fadeOut_all('#delete_teacher_admin');
	fadeOut_all('#delete_student_admin');
	fadeOut_all('#delete_subject_admin');
	fadeOut_all('#delete_studies_admin');
	fadeOut_all('#delete_sbjStudent_admin');
	fadeOut_all('#delete_tchSubject_admin');
	fadeOut_all('#delete_tchFaculty_admin');
	
	
	
	fadeIn_all('#homepage_admin');
}

function edit_passw_admin(id_tch){
	clear();
	
	fadeOut_all('#homepage_admin');
	
	fadeIn_all('#buttons_header_others_admin');
	fadeIn_all('#confirm_edit');
	fadeIn_all('#edit_pass');
}

//STUDENT
function read_student(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	//console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_student.php',
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
	        	var students = json.students;
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all("#list_student_admin");
	        	
	        	$('#list_student_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver alumnos</h1>" +
					"</div>" +
					"<div>" +
						"<button id='create_stdnt' class='btn btn-default pull-right' onclick='create_student()'>" +
							"Crear alumno" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr>" +
					"<th>Nombre</th>" +
					"<th>Apellido</th>" +
					"<th>Correo</th>" +
					"<th>Estudios</th>" +
					"<th>Acciones</th>" +
					"</tr>"
				);
				
				for(var i = 0; i< students.length; i++){
	        		var stdent = students[i];
	        		
	        		$("#list_student_admin table").append(
	        			"<tr>" +
						"<td>" + stdent.name_stdnt + "</td>" +
						"<td>" + stdent.last_name_stdnt + "</td>" +
						"<td>" + stdent.mail + "</td>" +
						"<td>" + stdent.abbrev_stds + "</td>" +
						"<td width='30%' align='center'>" +
							"<button id='student_one' type='button' class='btn btn-primary pull-left' onclick='readOne_student(" + id_tch + "," + stdent.id_stdnt + ")'> " +
					 			"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 		"</button>" +
							"<button id='faculty_edit' type='button' class='btn btn-info' onclick='edit_student(" + id_tch  + "," + stdent.id_stdnt + "," + stdent.stds + ")'> " +
	    			 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   			 			"</button>" +
	   			 			"<button onclick='student_delete(" + id_tch  + "," + stdent.id_stdnt + ")' class='btn btn-danger pull-right'>" +
								"<span class='glyphicon glyphicon-remove'></span> Borrar" +
							"</button>" +
						"</td>" +
						"</tr>"
	        			);	
	        	}
	        	
	        	$('#list_student_admin').append(
	        		"</table>"
	        	);
	        
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}

function readOne_student(id_tch , id_stdnt){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_stdnt', id_stdnt);

	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_student.php',
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
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeOut_all("#list_student_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all('#one_student_admin');
	        	
	        	$('#one_student_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver un alumno</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_student()'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver alumnos" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Nombre</td><td>" + json.name_stdnt + "</td></tr>" +
					"<tr><td>Apellido</td><td>" + json.last_name_stdnt + "</td></tr>" +
					"<tr><td>Correo</td><td>" + json.mail + "</td></tr>" +
					"<tr><td>Estudios</td><td>" + "<a onclick='readOne_studies(" + id_tch + "," + json.stds +")'>" + json.abbrev_stds + "</a></td></tr>" +
					"</table>"
				);
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function create_student(){

	clear();
	
	fadeOut_all('#list_student_admin');
	
	fadeIn_all('#buttons_header_others_admin');
	fadeIn_all('#create_student_admin');
	
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_studies.php',
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
				$('#create_student_form table tr #td_studies_stdnt').append(
					"<select class='form-control' id='stds_stdnt_create' name='stds_stdnt_create'>" +
						"<option>Seleccionar estudio...</option>"
				);
	
				for(var i = 0; i<json.studies.length; i++){
					$('#create_student_form table tr #td_studies_stdnt select').append(
						"<option value='" + json.studies[i].id_stds + "'>" + json.studies[i].abbrev_stds + "</option>"
					);
				}
	
				$('#create_student_form table tr #td_studies_stdnt').append(					 
					"</select>"
				);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
		
}

function edit_student(id_tch , id_stdnt, stds_old){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_stdnt', id_stdnt);
	data.append('stds_old', stds_old);

	////console.log(id_tch, token, id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_student.php',
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
        	
        	fadeOut_all('#list_student_admin');
        	fadeOut_all('#error_edit_stdnt');
			fadeOut_all('#confirm_edit_stdnt');
	
			fadeIn_all('#buttons_header_others_admin');
			fadeIn_all('#edit_student_admin');
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	$('#edit_student_admin #edit_student_form').append(
			 			"<table class='table table-hover table-responsive table-bordered'>" +
	 
	 					"<tr style='display:none;'><td>Id</td>" +
	            			"<td><input type='text' id='id_stdnt_ed' name='id_stdnt_ed' value='" + id_stdnt +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	 					"<tr><td>Nombre</td>" +
	            			"<td><input type='text' id='name_stdnt_ed' name='name_stdnt_ed' value='" + json.name_stdnt +"' class='form-control' /></td>" +
	        			"</tr>" +
	        
	        			"<tr><td>Apellido</td>" +
	            			"<td><input type='text' id='last_name_stdnt_ed' name='last_name_stdnt_ed' value='" + json.last_name_stdnt +"' class='form-control' /></td>" +
	       				"</tr>" +
	 
	       				"<tr><td>Correo</td>" +
	            			"<td><input type='email' id='mail_stdnt_ed' name='mail_stdnt_ed' value='" + json.mail +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	        			"<tr><td>Contrase&ntilde;a</td>"+
	        				"<td ><input type='passw' id='passw_stdnt_ed' name='passw_stdnt_ed' value='" + json.passw +"' class='form-control' readonly /></td>" +
	        			"</tr>" +
	        			
	        			"<tr><td>Estudio</td>" +
	        			"<td>" +
	        				"<select id='select_studies_stdnt_edit' class='form-control' id='stds_stdnt_ed' name='stds_stdnt_ed'>" +
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
	data_aux.append('stds_old', stds_old);
	$.ajax({
       	url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_studies.php',
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
        		for(var j = 0; j<json_aux.studies.length; j++){
        			if(json_aux.studies[j].id_stds == stds_old){
        				$('#select_studies_stdnt_edit').append(								
							"<option value='" + json_aux.studies[j].id_stds + "'>" + json_aux.studies[j].abbrev_stds +"</option>"
						);
        			}
        		}
				
				
				for(var i = 0; i<json_aux.studies.length; i++){
					$('#select_studies_stdnt_edit').append(								
						"<option value='" + json_aux.studies[i].id_stds + "'>" + json_aux.studies[i].abbrev_stds +"</option>"
					);
				}
				
				$('#select_studies_stdnt_edit').append(								
					"</select>"
				);

			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	    	console.log( errorThrown );
	    }
	});	 
}

function student_delete(id_tch, id_stdnt) {
	if(confirm("Seguro que quieres borrar este elemento?")){
		var data = new FormData();
		data.append('id_tch', id_tch);
		data.append('token', token);
		data.append('id_stdnt', id_stdnt);

		//console.log(id_tch, token, id_sbj);
	
		$.ajax({
      	 	url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_student.php',
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
	        	
	        		fadeOut_all("#homepage_admin");
	        		fadeOut_all("#list_student_admin");
	        		fadeOut_all("#buttons_header_others_admin");
	        		fadeIn_all('#delete_student_admin');
	        	
	        		$('#delete_student_admin').append(
	        			"<div class='page-header'>" +
							"<h1>Borrar alumno</h1>" +
						"</div>" +
						"<table class='table table-hover table-responsive table-bordered'>" +
							"<tr><td>Nombre</td><td>" + json.name_stdnt + "</td></tr>" +
							"<tr><td>Apellido</td><td>" + json.last_name_stdnt + "</td></tr>" +
							"<tr><td>Correo</td><td>" + json.mail + "</td></tr>" +
							"<tr><td>Estudios</td><td>" + json.abbrev_stds + "</td></tr>" +
						"</table>" +
						"<button id='delete' type='submit' class='btn btn-default' onclick='delete_student(" + id_tch + "," + id_stdnt + ")'>" +
							"<span class='glyphicon glyphicon-remove'></span> Borrar" +
						"</button>"
					);
	       	 	}
        	},
	    	error: function( jqXhr, textStatus, errorThrown ){
	        	console.log( errorThrown );
	    	}
		
		});
	}
}

function delete_student(id_tch, id_stdnt){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_stdnt_del', id_stdnt);

	//console.log(id_tch, token, id_sbj);
	
	$.ajax({
  	 	url: server_addr + 'organizaMisPracticas/application/web/admin/deleter/delete_student.php',       	
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
	        	read_student();
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	});
}


//FACULTY
function read_faculty(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_faculty.php',
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
	        	var faculties = json.faculties;
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all("#list_faculty_admin");
	        	
	        	$('#list_faculty_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver facultades</h1>" +
					"</div>" +
					"<div>" +
						"<button id='create_fac' class='btn btn-default pull-right' onclick='create_faculty()'>" +
							"Crear facultad" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr>" +
					"<th>Nombre</th>" +
					"<th>Direccion</th>" +
					"<th>Telefono</th>" +
					"<th>Codigo Postal</th>" +
					"<th>Acciones</th>" +
					"</tr>"
				);
				
				for(var i = 0; i< faculties.length; i++){
	        		var fac = faculties[i];
	        		
	        		$("#list_faculty_admin table").append(
	        			"<tr>" +
						"<td>" + fac.name_fac + "</td>" +
						"<td>" + fac.address + "</td>" +
						"<td>" + fac.phone + "</td>" +
						"<td>" + fac.postal_code + "</td>" +
						"<td width='30%' align='center'>" +
							"<button id='faculty_one' type='button' class='btn btn-primary pull-left' onclick='readOne_faculty(" + id_tch + "," + fac.id_fac + ")'> " +
					 			"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 		"</button>" +
							"<button id='faculty_edit' type='button' class='btn btn-info' onclick='edit_faculty(" + id_tch  + "," + fac.id_fac + ")'> " +
	    			 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   			 			"</button>" +
	   			 			"<button onclick='faculty_delete(" + id_tch  + "," + fac.id_fac + ")' class='btn btn-danger pull-right'>" +
								"<span class='glyphicon glyphicon-remove'></span> Borrar" +
							"</button>" +
						"</td>" +
						"</tr>"
	        			);	
	        	}
	        	
	        	$('#list_faculty_admin').append(
	        		"</table>"
	        	);
	        
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}

function readOne_faculty(id_tch , id_fac){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_fac', id_fac);

	////console.log(id_tch, token, id_fac);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_faculty.php',
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
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeOut_all("#list_faculty_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all('#one_faculty_admin');
	        	
	        	$('#one_faculty_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver una facultad</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_faculty()'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver facultades" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Nombre</td><td>" + json.name_fac + "</td></tr>" +
					"<tr><td>Dirección</td><td>" + json.address + "</td></tr>" +
					"<tr><td>Telefono</td><td>" + json.phone + "</td></tr>" +
					"<tr><td>Código postal</td><td>" + json.postal_code + "</td></tr>" +
					"</table>"
				);
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function create_faculty(){

	clear();
	
	fadeOut_all('#list_faculty_admin');
	
	fadeIn_all('#buttons_header_others_admin');
	fadeIn_all('#create_faculty_admin');
}

function edit_faculty(id_tch , id_fac){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_fac', id_fac);

	////console.log(id_tch, token, id_fac);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_faculty.php',
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
        	
        	fadeOut_all('#list_faculty_admin');
        	fadeOut_all('#error_edit_fac');
			fadeOut_all('#confirm_edit_fac');
	
			fadeIn_all('#buttons_header_others_admin');
			fadeIn_all('#edit_faculty_admin');
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	var id_fac_ed = id_fac;
	        	
	        	$('#edit_faculty_admin #edit_faculty_form').append(
			 			"<table class='table table-hover table-responsive table-bordered'>" +
	 
	 					"<tr style='display:none;'><td>Id</td>" +
	            			"<td><input type='text' id='id_fac_ed' name='id_fac_ed' value='" + id_fac_ed +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	 					"<tr><td>Nombre</td>" +
	            			"<td><input type='text' id='name_fac_ed' name='name_fac_ed' value='" + json.name_fac +"' class='form-control' /></td>" +
	        			"</tr>" +
	        
	        			"<tr><td>Direccion</td>" +
	            			"<td><input type='text' id='address_ed' name='address_ed' value='" + json.address +"' class='form-control' /></td>" +
	       				"</tr>" +
	 
	       				"<tr><td>Telefono</td>" +
	            			"<td><input type='number' id='phone_ed' name='phone_ed' value='" + json.phone +"' class='form-control' /></td>" +
	        			"</tr>" +
	 
	       	 			"<tr><td>Codigo postal</td>" +
	            			"<td><input type='number' id='postal_code_ed' name='postal_code_ed' value='" + json.postal_code +"' class='form-control' /></td>" +
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
}

function faculty_delete(id_tch, id_fac) {
	if(confirm("Seguro que quieres borrar este elemento?")){
		var data = new FormData();
		data.append('id_tch', id_tch);
		data.append('token', token);
		data.append('id_fac', id_fac);

		//console.log(id_tch, token, id_fac);
	
		$.ajax({
      	 	url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_faculty.php',
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
	        	
	        		fadeOut_all("#homepage_admin");
	        		fadeOut_all("#list_faculty_admin");
	        		fadeOut_all("#buttons_header_others_admin");
	        		fadeIn_all('#delete_faculty_admin');
	        	
	        		$('#delete_faculty_admin').append(
	        			"<div class='page-header'>" +
							"<h1>Borrar facultad</h1>" +
						"</div>" +
						"<table class='table table-hover table-responsive table-bordered'>" +
							"<tr><td>Nombre</td><td>" + json.name_fac + "</td></tr>" +
							"<tr><td>Dirección</td><td>" + json.address + "</td></tr>" +
							"<tr><td>Telefono</td><td>" + json.phone + "</td></tr>" +
							"<tr><td>Código postal</td><td>" + json.postal_code + "</td></tr>" +
						"</table>" +
						"<button id='delete' type='submit' class='btn btn-default' onclick='delete_faculty(" + id_tch + "," + id_fac + ")'>" +
							"<span class='glyphicon glyphicon-remove'></span> Borrar" +
						"</button>"
					);
	       	 	}
        	},
	    	error: function( jqXhr, textStatus, errorThrown ){
	        	console.log( errorThrown );
	    	}
		
		});
	}
}

function delete_faculty(id_tch, id_fac){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_fac_del', id_fac);

	////console.log(id_tch, token, id_fac);
	
	$.ajax({
  	 	url: server_addr + 'organizaMisPracticas/application/web/admin/deleter/delete_faculty.php',       	
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
	        	read_faculty();
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	});
}


//TEACHER
function read_teacher(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_teacher.php',
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
	        	var teachers = json.teachers;
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all("#list_teacher_admin");
	        	
	        	$('#list_teacher_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver profesores</h1>" +
					"</div>" +
					"<div>" +
						"<button id='create_tch' class='btn btn-default pull-right' onclick='create_teacher()'>" +
							"Crear profesor" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr>" +
					"<th>Nombre</th>" +
					"<th>Apellido</th>" +
					"<th>Correo</th>" +
					"<th>Despacho</th>" +
					"<th>Acciones</th>" +
					"</tr>"
				);
				
				for(var i = 0; i< teachers.length; i++){
	        		var teach = teachers[i];
	        		
	        		$("#list_teacher_admin table").append(
	        			"<tr>" +
						"<td>" + teach.name_tch + "</td>" +
						"<td>" + teach.last_name_tch + "</td>" +
						"<td>" + teach.mail + "</td>" +
						"<td>" + teach.office + "</td>" +
						"<td width='30%' align='center'>" +
							"<button id='teacher_one' type='button' class='btn btn-primary pull-left' onclick='readOne_teacher(" + id_tch + "," + teach.id_teacher + ")'> " +
					 			"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 		"</button>" +
							"<button id='teacher_edit' type='button' class='btn btn-info' onclick='edit_teacher(" + id_tch  + "," + teach.id_teacher + ")'> " +
	    			 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   			 			"</button>" +
	   			 			"<button onclick='teacher_delete(" + id_tch  + "," + teach.id_teacher + ")' class='btn btn-danger pull-right'>" +
								"<span class='glyphicon glyphicon-remove'></span> Borrar" +
							"</button>" +
						"</td>" +
						"</tr>"
	        			);	
	        	}
	        	
	        	$('#list_teacher_admin').append(
	        		"</table>"
	        	);
	        
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}

function readOne_teacher(id_tch , tch){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('tch', tch);

	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_teacher.php',
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
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeOut_all("#list_teacher_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all('#one_teacher_admin');
	        	
	        	$('#one_teacher_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver un profesor</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_teacher()'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver profesores" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Nombre</td><td>" + json.name_tch + "</td></tr>" +
					"<tr><td>Apellido</td><td>" + json.last_name_tch + "</td></tr>" +
					"<tr><td>Correo</td><td>" + json.mail + "</td></tr>" +
					"<tr><td>Despacho</td><td>" + json.office + "</td></tr>" +
					"</table>"
				);
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function create_teacher(){

	clear();
	
	fadeOut_all('#list_teacher_admin');
	
	fadeIn_all('#buttons_header_others_admin');
	fadeIn_all('#create_teacher_admin');
}

function edit_teacher(id_tch , tch){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('tch', tch);

	////console.log(id_tch, token, id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_teacher.php',
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
        	
        	fadeOut_all('#list_teacher_admin');
        	fadeOut_all('#error_edit_tch');
			fadeOut_all('#confirm_edit_tch');
	
			fadeIn_all('#buttons_header_others_admin');
			fadeIn_all('#edit_teacher_admin');
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	$('#edit_teacher_admin #edit_teacher_form').append(
			 			"<table class='table table-hover table-responsive table-bordered'>" +
	 
	 					"<tr style='display:none;'><td>Id</td>" +
	            			"<td><input type='text' id='id_tch_ed' name='id_tch_ed' value='" + tch +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	 					"<tr><td>Nombre</td>" +
	            			"<td><input type='text' id='name_tch_ed' name='name_tch_ed' value='" + json.name_tch +"' class='form-control' /></td>" +
	        			"</tr>" +
	        
	        			"<tr><td>Apellido</td>" +
	            			"<td><input type='text' id='last_name_tch_ed' name='last_name_tch_ed' value='" + json.last_name_tch +"' class='form-control' /></td>" +
	       				"</tr>" +
	 
	       				"<tr><td>Correo</td>" +
	            			"<td><input type='email' id='mail_tch_ed' name='mail_tch_ed' value='" + json.mail +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	        			"<tr><td>Contrase&ntilde;a</td>"+
	        				"<td ><input type='passw' id='passw_tch_ed' name='passw_tch_ed' value='" + json.passw +"' class='form-control' readonly /></td>" +
	        			"</tr>" +
	 
	       	 			"<tr><td>Despacho</td>" +
	            			"<td><input type='number' id='office_tch_ed' name='office_tch_ed' value='" + json.office +"' class='form-control' /></td>" +
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
}

function teacher_delete(id_tch, tch) {
	if(confirm("Seguro que quieres borrar este elemento?")){
		var data = new FormData();
		data.append('id_tch', id_tch);
		data.append('token', token);
		data.append('tch', tch);

		////console.log(id_tch, token, tch);
	
		$.ajax({
      	 	url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_teacher.php',
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
	        	
	        		fadeOut_all("#homepage_admin");
	        		fadeOut_all("#list_teacher_admin");
	        		fadeOut_all("#buttons_header_others_admin");
	        		fadeIn_all('#delete_teacher_admin');
	        	
	        		$('#delete_teacher_admin').append(
	        			"<div class='page-header'>" +
							"<h1>Borrar profesor</h1>" +
						"</div>" +
						"<table class='table table-hover table-responsive table-bordered'>" +
							"<tr><td>Nombre</td><td>" + json.name_tch + "</td></tr>" +
							"<tr><td>Apellido</td><td>" + json.last_name_tch + "</td></tr>" +
							"<tr><td>Correo</td><td>" + json.mail + "</td></tr>" +
							"<tr><td>Despacho</td><td>" + json.office + "</td></tr>" +
						"</table>" +
						"<button id='delete' type='submit' class='btn btn-default' onclick='delete_teacher(" + id_tch + "," + tch + ")'>" +
							"<span class='glyphicon glyphicon-remove'></span> Borrar" +
						"</button>"
					);
	       	 	}
        	},
	    	error: function( jqXhr, textStatus, errorThrown ){
	        	console.log( errorThrown );
	    	}
		
		});
	}
}

function delete_teacher(id_tch, tch){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('tch_del', tch);

	////console.log(id_tch, token, tch);
	
	$.ajax({
  	 	url: server_addr + 'organizaMisPracticas/application/web/admin/deleter/delete_teacher.php',       	
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
	        	read_teacher();
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	});
}


//SUBJECT
function read_subject(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	////console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_subject.php',
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
	        	var subjects = json.subjects;
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all("#list_subject_admin");
	        	
	        	$('#list_subject_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver asignaturas</h1>" +
					"</div>" +
					"<div>" +
						"<button id='create_sbj' class='btn btn-default pull-right' onclick='create_subject()'>" +
							"Crear asignatura" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr>" +
					"<th>Abreviatura</th>" +
					"<th>Nombre</th>" +
					"<th>Creditos</th>" +
					"<th>Curso</th>" +
					"<th>Grupo</th>" +
					"<th>Cuatrimestre</th>" +
					"<th>Estudios</th>" +
					"<th>Acciones</th>" +
					"</tr>"
				);
				
				for(var i = 0; i< subjects.length; i++){
	        		var subj = subjects[i];
	        		
	        		$("#list_subject_admin table").append(
	        			"<tr>" +
						"<td>" + subj.abbrev_sbj + "</td>" +
						"<td>" + subj.name_sbj + "</td>" +
						"<td>" + subj.credits + "</td>" +
						"<td>" + subj.course + "</td>" +
						"<td>" + subj.group_sbj + "</td>" +
						"<td>" + subj.quarter + "</td>" +
						"<td>" + subj.abbrev_stds + "</td>" +
						"<td width='30%' align='center'>" +
							"<button id='subject_one' type='button' class='btn btn-primary pull-left' onclick='readOne_subject(" + id_tch + "," + subj.id_sbj + ")'> " +
					 			"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 		"</button>" +
							"<button id='subject_edit' type='button' class='btn btn-info' onclick='edit_subject(" + id_tch  + "," + subj.id_sbj + "," + subj.stds + ")'> " +
	    			 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   			 			"</button>" +
	   			 			"<button onclick='subject_delete(" + id_tch  + "," + subj.id_sbj + ")' class='btn btn-danger pull-right'>" +
								"<span class='glyphicon glyphicon-remove'></span> Borrar" +
							"</button>" +
						"</td>" +
						"</tr>"
	        			);	
	        	}
	        	
	        	$('#list_subject_admin').append(
	        		"</table>"
	        	);
	        
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}

function readOne_subject(id_tch , id_sbj){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_sbj', id_sbj);

	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_subject.php',
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
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeOut_all("#list_subject_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all('#one_subject_admin');
	        	
	        	$('#one_subject_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver una asignatura</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_subject()'>" +
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
					"<tr><td>Estudios</td><td>" + "<a onclick='readOne_studies(" + id_tch + "," + json.stds +")'>" + json.abbrev_stds + "</a></td></tr>" +
					"</table>"
				);
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function create_subject(){

	clear();
	
	fadeOut_all('#list_subject_admin');
	
	fadeIn_all('#buttons_header_others_admin');
	fadeIn_all('#create_subject_admin');
	
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	////console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_studies.php',
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
				$('#create_subject_form table tr #td_studies_sbj').append(
					"<select class='form-control' id='stds_sbj_create' name='stds_sbj_create'>" +
						"<option>Seleccionar estudio...</option>"
				);
	
				for(var i = 0; i<json.studies.length; i++){
					$('#create_subject_form table tr #td_studies_sbj select').append(
						"<option value='" + json.studies[i].id_stds + "'>" + json.studies[i].abbrev_stds +"</option>"
					);
				}
	
				$('#create_subject_form table tr #td_studies_sbj').append(					 
					"</select>"
				);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
		
}

function edit_subject(id_tch , id_sbj, stds_old){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_sbj', id_sbj);
	data.append('stds_old', stds_old);

	////console.log(id_tch, token, id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_subject.php',
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
        	
        	fadeOut_all('#list_subject_admin');
        	fadeOut_all('#error_edit_sbj');
			fadeOut_all('#confirm_edit_sbj');
	
			fadeIn_all('#buttons_header_others_admin');
			fadeIn_all('#edit_subject_admin');
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	$('#edit_subject_admin #edit_subject_form').append(
			 			"<table class='table table-hover table-responsive table-bordered'>" +
	 
	 					"<tr style='display:none;'><td>Id</td>" +
	            			"<td><input type='text' id='id_sbj_ed' name='id_sbj_ed' value='" + id_sbj +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	 					"<tr><td>Abreviatura</td>" +
	            			"<td><input type='text' id='abbrev_sbj_ed' name='abbrev_sbj_ed' value='" + json.abbrev_sbj +"' class='form-control' /></td>" +
	        			"</tr>" +
	        
	        			"<tr><td>Nombre</td>" +
	            			"<td><input type='text' id='name_sbj_ed' name='name_sbj_ed' value='" + json.name_sbj +"' class='form-control' /></td>" +
	       				"</tr>" +
	 
	       				"<tr><td>Creditos</td>" +
	            			"<td><input type='number' id='credits_ed' name='credits_ed' value='" + json.credits +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	        			"<tr><td>Curso</td>"+
	        				"<td><input type='number' id='course_ed' name='course_ed' value='" + json.course +"' class='form-control' /></td>" +
	        			"</tr>" +
	 
	       	 			"<tr><td>Grupo</td>" +
	            			"<td><input type='text' id='group_sbj_ed' name='group_sbj_ed' value='" + json.group_sbj +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	        			"<tr><td>Cuatrimestre</td>" +
	           				"<td><select class='form-control' id='quarter_ed' name='quarter_ed'>" +
							"<option value='" + json.quarter + "'>" + json.quarter + "</option>" +
							"<option value='primer'> Primer</option>" +
							"<option value='segundo'> Segundo</option>" +
					 		"<option value='anual'> Anual</option>" +
							"</select>" +
							"</td>" +
	        			"</tr>" +
	        			
	        			"<tr><td>Estudio</td>" +
	        			"<td>" +
	        				"<select id='select_studies_sbj_edit' class='form-control' id='stds_sbj_ed' name='stds_sbj_ed'>" +
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
	data_aux.append('stds_old', stds_old);
	$.ajax({
       	url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_studies.php',
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
        		for(var j = 0; j<json_aux.studies.length; j++){
        			if(json_aux.studies[j].id_stds == stds_old){
        				$('#select_studies_sbj_edit').append(								
							"<option value='" + json_aux.studies[j].id_stds + "'>" + json_aux.studies[j].abbrev_stds +"</option>"
						);
        			}
        		}
				
				
				for(var i = 0; i<json_aux.studies.length; i++){
					$('#select_studies_sbj_edit').append(								
						"<option value='" + json_aux.studies[i].id_stds + "'>" + json_aux.studies[i].abbrev_stds +"</option>"
					);
				}
				
				$('#select_studies_sbj_edit').append(								
					"</select>"
				);

			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	    	console.log( errorThrown );
	    }
	});	 
}

function subject_delete(id_tch, id_sbj) {
	if(confirm("Seguro que quieres borrar este elemento?")){
		var data = new FormData();
		data.append('id_tch', id_tch);
		data.append('token', token);
		data.append('id_sbj', id_sbj);

		//console.log(id_tch, token, id_sbj);
	
		$.ajax({
      	 	url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_subject.php',
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
	        	
	        		fadeOut_all("#homepage_admin");
	        		fadeOut_all("#list_subject_admin");
	        		fadeOut_all("#buttons_header_others_admin");
	        		fadeIn_all('#delete_subject_admin');
	        	
	        		$('#delete_subject_admin').append(
	        			"<div class='page-header'>" +
							"<h1>Borrar asignatura</h1>" +
						"</div>" +
						"<table class='table table-hover table-responsive table-bordered'>" +
							"<tr><td>Abreviatura</td><td>" + json.abbrev_sbj + "</td></tr>" +
							"<tr><td>Nombre</td><td>" + json.name_sbj + "</td></tr>" +
							"<tr><td>Creditos</td><td>" + json.credits + "</td></tr>" +
							"<tr><td>Curso</td><td>" + json.course + "</td></tr>" +
							"<tr><td>Grupo</td><td>" + json.group_sbj + "</td></tr>" +
							"<tr><td>Cuatrimestre</td><td>" + json.quarter + "</td></tr>" +
							"<tr><td>Estudios</td><td>" + json.abbrev_stds + "</td></tr>" +
						"</table>" +
						"<button id='delete' type='submit' class='btn btn-default' onclick='delete_subject(" + id_tch + "," + id_sbj + ")'>" +
							"<span class='glyphicon glyphicon-remove'></span> Borrar" +
						"</button>"
					);
	       	 	}
        	},
	    	error: function( jqXhr, textStatus, errorThrown ){
	        	console.log( errorThrown );
	    	}
		
		});
	}
}

function delete_subject(id_tch, id_sbj){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_sbj_del', id_sbj);

	//console.log(id_tch, token, id_sbj);
	
	$.ajax({
  	 	url: server_addr + 'organizaMisPracticas/application/web/admin/deleter/delete_subject.php',       	
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
	        	read_subject();
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	});
}


//STUDIES
function read_studies(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	//console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_studies.php',
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
	        	var studies = json.studies;
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all("#list_studies_admin");
	        	
	        	$('#list_studies_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver estudios</h1>" +
					"</div>" +
					"<div>" +
						"<button id='create_stds' class='btn btn-default pull-right' onclick='create_studies()'>" +
							"Crear estudio" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr>" +
					"<th>Abreviatura</th>" +
					"<th>Nombre</th>" +
					"<th>Tipo de estudio</th>" +
					"<th>Itineario</th>" +
					"<th>Facultad</td>" +
					"<th>Acciones</th>" +
					"</tr>"
				);
				
				for(var i = 0; i< studies.length; i++){
	        		var stud = studies[i];
	        		
	        		$("#list_studies_admin table").append(
	        			"<tr id='tr_stds_" + i + "'>" +
						"<td>" + stud.abbrev_stds + "</td>" +
						"<td>" + stud.name_stds + "</td>" +
						"<td>" + stud.type_stds + "</td>"
						
					);
					
					if(stud.itinerary == null){
						$("#tr_stds_" + i).append(
							"<td> </td>"
						);
					}
					else{
						$("#tr_stds_" + i).append(
							"<td>" + stud.itinerary + "</td>"
						);
					}
					
					$("#tr_stds_" + i).append(
						"<td>" + stud.name_fac + "</td>" +
						"<td width='30%' align='center'>" +
							"<button id='studies_one' type='button' class='btn btn-primary pull-left' onclick='readOne_studies(" + id_tch + "," + stud.id_stds + ")'> " +
					 			"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 		"</button>" +
							"<button id='studies_edit' type='button' class='btn btn-info' onclick='edit_studies(" + id_tch  + "," + stud.id_stds + ")'> " +
	    			 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   			 			"</button>" +
	   			 			"<button onclick='studies_delete(" + id_tch  + "," + stud.id_stds + ")' class='btn btn-danger pull-right'>" +
								"<span class='glyphicon glyphicon-remove'></span> Borrar" +
							"</button>" +
						"</td>" +
						"</tr>"
	        		);	
	        	}
	        	
	        	$('#list_studies_admin').append(
	        		"</table>"
	        	);
	        
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}

function readOne_studies(id_tch , id_stds){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_stds', id_stds);

	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_studies.php',
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
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeOut_all("#list_studies_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all('#one_studies_admin');
	        	
	        	$('#one_studies_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver un estudio</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_studies()'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver estudios" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Abreviatura</td><td>" + json.abbrev_stds + "</td></tr>" +
					"<tr><td>Nombre</td><td>" + json.name_stds + "</td></tr>" +
					"<tr><td>Tipo de estudio</td><td>" + json.type_stds + "</td></tr>" +
					"<tr><td>Itinerario</td><td>" + json.itinerary + "</td></tr>" +
					"<tr><td>Facultad</td><td>" + "<a onclick='readOne_faculty(" + id_tch + "," + json.fac +")'>" + json.name_fac + "</a></td></tr>" +
					"</table>"
				);
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function create_studies(){

	clear();
	
	fadeOut_all('#list_studies_admin');
	
	fadeIn_all('#buttons_header_others_admin');
	fadeIn_all('#create_studies_admin');
	
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_faculty.php',
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
				$('#create_studies_form table tr #td_faculties_stds').append(
					"<select class='form-control' id='fac_stds_create' name='fac_stds_create'>" +
						"<option>Seleccionar estudio...</option>"
				);
	
				for(var i = 0; i<json.faculties.length; i++){
					$('#create_studies_form table tr #td_faculties_stds select').append(
						"<option value='" + json.faculties[i].id_fac + "'>" + json.faculties[i].name_fac +"</option>"
					);
				}
	
				$('#create_studies_form table tr #td_faculties_stds').append(					 
					"</select>"
				);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
		
}

function edit_studies(id_tch , id_stds){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_stds', id_stds);

	////console.log(id_tch, token, id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_studies.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	
        	fadeOut_all('#list_studies_admin');
        	fadeOut_all('#error_edit_stds');
			fadeOut_all('#confirm_edit_stds');
	
			fadeIn_all('#buttons_header_others_admin');
			fadeIn_all('#edit_studies_admin');
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	$('#edit_studies_admin #edit_studies_form').append(
			 			"<table class='table table-hover table-responsive table-bordered'>" +
	 
	 					"<tr style='display:none;'><td>Id</td>" +
	            			"<td><input type='text' id='id_stds_ed' name='id_stds_ed' value='" + id_stds +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	 					"<tr><td>Abreviatura</td>" +
	            			"<td><input type='text' id='abbrev_stds_ed' name='abbrev_stds_ed' value='" + json.abbrev_stds +"' class='form-control' /></td>" +
	        			"</tr>" +
	        
	        			"<tr><td>Nombre</td>" +
	            			"<td><input type='text' id='name_stds_ed' name='name_stds_ed' value='" + json.name_stds +"' class='form-control' /></td>" +
	       				"</tr>" +
	 					
	       				"<tr><td>Tipo de estudio</td>" +
	       					"<td><select class='form-control' id='type_stds_ed' name='type_stds_ed'>" +
								"<option value='" + json.type_stds +"'>" + json.type_stds + "</option>" +
								"<option value='grado'> Grado </option>" +
					  			"<option value='master'> Master </option>" +
					  			"<option value='licenciatura'> Licenciatura </option>" +
							 "</select>" +
	            			"</td>" +
	        			"</tr>" +
	        			
	        			"<tr id='tr_fac_edit'><td>Facultad</td>" +
	        				"<td><select id='select_faculties_stds_edit' class='form-control' id='fac_stds_ed' name='fac_stds_ed'>" +
								"<option value='" + json.fac +"'>" + json.name_fac + "</option>" +
							 	"</select>" +
	            			"</td>" +
	        			"</tr>" +
	        			
	        			"<tr><td>Itinerario</td>"+
	        				"<td><input type='text' id='itinerary_ed' name='itinerary_ed' value='" + json.itinerary +"' class='form-control' /></td>" +
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
	
	$.ajax({
       	url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_faculty.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
       	processData: false,
        data: data_aux,
        success: function( data_aux, textStatus, jQxhr ){
        	var json_aux = JSON.parse(data_aux);
        
        	
        	if(json_aux.status == 'ERROR') {
	    		fadeIn_all('#error_generic');
        	}	       		 	
        	else {
				
				
				for(var i = 0; i<json_aux.faculties.length; i++){
					$('#tr_fac_edit #select_faculties_stds_edit').append(								
						"<option value='" + json_aux.faculties[i].id_fac + "'>" + json_aux.faculties[i].name_fac +"</option>"
					);
				}
				
				$('#tr_fac_edit #select_faculties_stds_edit').append(								
					"</select>"
				);

			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	    	console.log( errorThrown );
	    }
	});	
}

function studies_delete(id_tch, id_stds) {
	if(confirm("Seguro que quieres borrar este elemento?")){
		var data = new FormData();
		data.append('id_tch', id_tch);
		data.append('token', token);
		data.append('id_stds', id_stds);

		//console.log(id_tch, token, id_sbj);
	
		$.ajax({
      	 	url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_studies.php',
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
	        	
	        		fadeOut_all("#homepage_admin");
	        		fadeOut_all("#list_studies_admin");
	        		fadeOut_all("#buttons_header_others_admin");
	        		fadeIn_all('#delete_studies_admin');
	        	
	        		$('#delete_studies_admin').append(
	        			"<div class='page-header'>" +
							"<h1>Borrar estudio</h1>" +
						"</div>" +
						"<table class='table table-hover table-responsive table-bordered'>" +
							"<tr><td>Abreviatura</td><td>" + json.abbrev_stds + "</td></tr>" +
							"<tr><td>Nombre</td><td>" + json.name_stds + "</td></tr>" +
							"<tr><td>Tipo de estudio</td><td>" + json.type_stds + "</td></tr>" +
							"<tr><td>Itinerario</td><td>" + json.itinerary + "</td></tr>" +
							"<tr><td>Facultad</td><td>"+ json.name_fac +"</td></tr>" +
						"</table>" +
						"<button id='delete' type='submit' class='btn btn-default' onclick='delete_studies(" + id_tch + "," + id_stds + ")'>" +
							"<span class='glyphicon glyphicon-remove'></span> Borrar" +
						"</button>"
					);
	       	 	}
        	},
	    	error: function( jqXhr, textStatus, errorThrown ){
	        	console.log( errorThrown );
	    	}
		
		});
	}
}

function delete_studies(id_tch, id_stds){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_stds_del', id_stds);

	//console.log(id_tch, token, id_sbj);
	
	$.ajax({
  	 	url: server_addr + 'organizaMisPracticas/application/web/admin/deleter/delete_studies.php',       	
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
	        	read_studies();
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	});
}

//SUBJECT_STUDENT
function read_sbjStudent(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	//console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_sbjStudent.php',
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
	        	var contents = json.contents;
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all("#list_sbjStudent_admin");
	        	
	        	$('#list_sbjStudent_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver lista de alumnos en asignaturas</h1>" +
					"</div>" +
					"<div>" +
						"<button id='create_sbjStudent' class='btn btn-default pull-right' onclick='create_sbjStudent()'>" +
							"Matricular nuevo" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr>" +
					"<th>Numero matricula</th>" +
					"<th>Periodo matriculacion</th>" +
					"<th>Alumno</th>" +
					"<th>Asignatura</th>" +
					"<th>Acciones</th>" +
					"</tr>"
				);
				
				for(var i = 0; i< contents.length; i++){
	        		var cont = contents[i];
	        		
	        		$("#list_sbjStudent_admin table").append(
	        			"<tr>" +
						"<td>" + cont.regist_num + "</td>" +
						"<td>" + cont.regist_year + "</td>" +
						"<td>" + cont.mail + "</td>" +
						"<td>" + cont.abbrev_sbj + "</td>" +
						"<td width='30%' align='center'>" +
							"<button id='sbjStdnt_one' type='button' class='btn btn-primary pull-left' onclick='readOne_sbjStudent(" + id_tch + "," + cont.id + ")'> " +
					 			"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 		"</button>" +
							"<button id='sbjStdnt_edit' type='button' class='btn btn-info' onclick='edit_sbjStudent(" + id_tch  + "," + cont.id + ")'> " +
	    			 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   			 			"</button>" +
	   			 			"<button onclick='sbjStudent_delete(" + id_tch  + "," + cont.id + ")' class='btn btn-danger pull-right'>" +
								"<span class='glyphicon glyphicon-remove'></span> Borrar" +
							"</button>" +
						"</td>" +
						"</tr>"
	        			);	
	        	}
	        	
	        	$('#list_sbjStudent_admin').append(
	        		"</table>"
	        	);
	        
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}

function readOne_sbjStudent(id_tch , id){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id', id);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_sbjStudent.php',
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
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeOut_all("#list_sbjStudent_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all('#one_sbjStudent_admin');
	        	
	        	$('#one_sbjStudent_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver un alumno en una asignatura</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_sbjStudent()'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver lista" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Numero matricula</td><td>" + json.regist_num + "</td></tr>" +
					"<tr><td>Periodo matriculacion</td><td>" + json.regist_year + "</td></tr>" +
					"<tr><td>Alumno</td><td>" + "<a onclick='readOne_student(" + id_tch + "," + json.stdnt +")'>" + json.mail + "</a></td></tr>" +
					"<tr><td>Asignatura</td><td>" + "<a onclick='readOne_subject(" + id_tch + "," + json.sbj +")'>" + json.abbrev_sbj + "</a></td></tr>" +
					"</table>"
				);
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function create_sbjStudent(){

	clear();
	
	fadeOut_all('#list_sbjStudent_admin');
	
	fadeIn_all('#buttons_header_others_admin');
	fadeIn_all('#create_sbjStudent_admin');
	
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	//console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_student.php',
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
				$('#create_sbjStudent_form table tr #td_sbjStudent_stdnt').append(
					"<select class='form-control' id='sbjStudent_stdnt_create' name='sbjStudent_stdnt_create'>" +
						"<option>Seleccionar alumno...</option>"
				);
	
				for(var i = 0; i<json.students.length; i++){
					$('#create_sbjStudent_form table tr #td_sbjStudent_stdnt select').append(
						"<option value='" + json.students[i].id_stdnt + "'>" + json.students[i].mail +"</option>"
					);
				}
	
				$('#create_sbjStudent_form table tr #td_sbjStudent_stdnt').append(					 
					"</select>"
				);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_subject.php',
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
				$('#create_sbjStudent_form table tr #td_sbjStudent_sbj').append(
					"<select class='form-control' id='sbjStudent_sbj_create' name='sbjStudent_sbj_create'>" +
						"<option>Seleccionar asignatura...</option>"
				);
	
				for(var j = 0; j<json.subjects.length; j++){
					$('#create_sbjStudent_form table tr #td_sbjStudent_sbj select').append(
						"<option value='" + json.subjects[j].id_sbj + "'>" + json.subjects[j].abbrev_sbj +"</option>"
					);
				}
	
				$('#create_sbjStudent_form table tr #td_sbjStudent_sbj').append(					 
					"</select>"
				);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
		
}

function edit_sbjStudent(id_tch , id){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id', id);

	////console.log(id_tch, token, id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_sbjStudent.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	
        	fadeOut_all('#list_sbjStudent_admin');
        	fadeOut_all('#error_edit_sbjStudent');
			fadeOut_all('#confirm_edit_sbjStudent');
	
			fadeIn_all('#buttons_header_others_admin');
			fadeIn_all('#edit_sbjStudent_admin');
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	$('#edit_sbjStudent_admin #edit_sbjStudent_form').append(
			 			"<table class='table table-hover table-responsive table-bordered'>" +
	 
	 					"<tr style='display:none;'><td>Id</td>" +
	            			"<td><input type='text' id='id_sbjStudent_ed' name='id_sbjStudent_ed' value='" + id +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	 					"<tr><td>Numero de matricula</td>" +
	            			"<td><input type='number' id='regist_num_ed' name='regist_num_ed' value='" + json.regist_num +"' class='form-control' /></td>" +
	        			"</tr>" +
	        
	        			"<tr><td>Periodo de matriculacion</td>" +
	            			"<td><input type='number' id='regist_year_ed' name='regist_year_ed' value='" + json.regist_year +"' class='form-control' /></td>" +
	       				"</tr>" +
	        			
	        			"<tr id='tr_sbjStudent_stdnt_edit'><td>Alumno</td>" +
	        				"<td><select id='select_sbjStudent_stdnt_edit' class='form-control' id='sbjStudent_stdnt_ed' name='sbjStudent_stdnt_ed'>" +
								"<option value='" + json.stdnt +"'>" + json.mail + "</option>" +
							 	"</select>" +
	            			"</td>" +
	        			"</tr>" +
	        			
	        			"<tr id='tr_sbjStudent_sbj_edit'><td>Asignatura</td>" +
	        				"<td><select id='select_sbjStudent_sbj_edit' class='form-control' id='sbjStudent_sbj_ed' name='sbjStudent_sbj_ed'>" +
								"<option value='" + json.sbj +"'>" + json.abbrev_sbj + "</option>" +
							 	"</select>" +
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
	
	$.ajax({
       	url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_student.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
       	processData: false,
        data: data_aux,
        success: function( data_aux, textStatus, jQxhr ){
        	var json_aux = JSON.parse(data_aux);
        
        	
        	if(json_aux.status == 'ERROR') {
	    		fadeIn_all('#error_generic');
        	}	       		 	
        	else {
				
				
				for(var i = 0; i<json_aux.students.length; i++){
					$('#tr_sbjStudent_stdnt_edit #select_sbjStudent_stdnt_edit').append(								
						"<option value='" + json_aux.students[i].id_stdnt + "'>" + json_aux.students[i].mail +"</option>"
					);
				}
				
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	    	console.log( errorThrown );
	    }
	});	
	
	var data_aux_2 = new FormData();
	data_aux_2.append('id_tch', id_tch);
	data_aux_2.append('token', token);
	
	$.ajax({
       	url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_subject.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
       	processData: false,
        data: data_aux_2,
        success: function( data_aux_2, textStatus, jQxhr ){
        	var json_aux_2 = JSON.parse(data_aux_2);
        
        	
        	if(json_aux_2.status == 'ERROR') {
	    		fadeIn_all('#error_generic');
        	}	       		 	
        	else {
				
				
				for(var i = 0; i<json_aux_2.subjects.length; i++){
					$('#tr_sbjStudent_sbj_edit #select_sbjStudent_sbj_edit').append(								
						"<option value='" + json_aux_2.subjects[i].id_sbj + "'>" + json_aux_2.subjects[i].abbrev_sbj +"</option>"
					);
				}

			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	    	console.log( errorThrown );
	    }
	});	
}

function sbjStudent_delete(id_tch, id) {
	if(confirm("Seguro que quieres borrar este elemento?")){
		var data = new FormData();
		data.append('id_tch', id_tch);
		data.append('token', token);
		data.append('id', id);

		//console.log(id_tch, token, id_sbj);
	
		$.ajax({
      	 	url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_sbjStudent.php',
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
	        	
	        		fadeOut_all("#homepage_admin");
	        		fadeOut_all("#list_sbjStudent_admin");
	        		fadeOut_all("#buttons_header_others_admin");
	        		fadeIn_all('#delete_sbjStudent_admin');
	        	
	        		$('#delete_sbjStudent_admin').append(
	        			"<div class='page-header'>" +
							"<h1>Borrar un alumno en una asignatura</h1>" +
						"</div>" +
						"<table class='table table-hover table-responsive table-bordered'>" +
							"<tr><td>Número matricula</td><td>" + json.regist_num + "</td></tr>" +
							"<tr><td>Periodo matriculacion</td><td>" + json.regist_year + "</td></tr>" +
							"<tr><td>Alumno</td><td>" + json.mail + "</td></tr>" +
							"<tr><td>Asignatura</td><td>" + json.abbrev_sbj + "</td></tr>" +
						"</table>" +
						"<button id='delete' type='submit' class='btn btn-default' onclick='delete_sbjStudent(" + id_tch + "," + id + ")'>" +
							"<span class='glyphicon glyphicon-remove'></span> Borrar" +
						"</button>"
					);
	       	 	}
        	},
	    	error: function( jqXhr, textStatus, errorThrown ){
	        	console.log( errorThrown );
	    	}
		
		});
	}
}

function delete_sbjStudent(id_tch, id){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_sbjStudent_del', id);

	//console.log(id_tch, token, id_sbj);
	
	$.ajax({
  	 	url: server_addr + 'organizaMisPracticas/application/web/admin/deleter/delete_sbjStudent.php',       	
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
	        	read_sbjStudent();
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	});
}

//TEACHER_SUBJECT
function read_tchSubject(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	//console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_tchSubject.php',
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
	        	var contents = json.contents;
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all("#list_tchSubject_admin");
	        	
	        	$('#list_tchSubject_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver lista de profesores en asignaturas</h1>" +
					"</div>" +
					"<div>" +
						"<button id='create_tchSbj' class='btn btn-default pull-right' onclick='create_tchSubject()'>" +
							"Agregar nuevo" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr>" +
					"<th>Profesor</th>" +
					"<th>Asignatura</th>" +
					"<th>Acciones</th>" +
					"</tr>"
				);
				
				for(var i = 0; i< contents.length; i++){
	        		var cont = contents[i];
	        		
	        		$("#list_tchSubject_admin table").append(
	        			"<tr>" +
						"<td>" + cont.mail + "</td>" +
						"<td>" + cont.abbrev_sbj + "</td>" +
						"<td width='30%' align='center'>" +
							"<button id='tchSubject_one' type='button' class='btn btn-primary pull-left' onclick='readOne_tchSubject(" + id_tch + "," + cont.id + ")'> " +
					 			"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 		"</button>" +
							"<button id='tchSubject_edit' type='button' class='btn btn-info' onclick='edit_tchSubject(" + id_tch  + "," + cont.id + ")'> " +
	    			 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   			 			"</button>" +
	   			 			"<button onclick='tchSubject_delete(" + id_tch  + "," + cont.id + ")' class='btn btn-danger pull-right'>" +
								"<span class='glyphicon glyphicon-remove'></span> Borrar" +
							"</button>" +
						"</td>" +
						"</tr>"
	        			);	
	        	}
	        	
	        	$('#list_tchSubject_admin').append(
	        		"</table>"
	        	);
	        
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}

function readOne_tchSubject(id_tch , id){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id', id);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_tchSubject.php',
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
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeOut_all("#list_tchSubject_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all('#one_tchSubject_admin');
	        	
	        	$('#one_tchSubject_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver un profesor en una asignatura</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_tchSubject()'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver lista" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Profesor</td><td>" + "<a onclick='readOne_teacher(" + id_tch + "," + json.tch +")'>" + json.mail + "</a></td></tr>" +
					"<tr><td>Asignatura</td><td>" + "<a onclick='readOne_subject(" + id_tch + "," + json.sbj +")'>" + json.abbrev_sbj + "</a></td></tr>" +
					"</table>"
				);
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function create_tchSubject(){

	clear();
	
	fadeOut_all('#list_tchSubject_admin');
	
	fadeIn_all('#buttons_header_others_admin');
	fadeIn_all('#create_tchSubject_admin');
	
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_teacher.php',
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
				$('#create_tchSubject_form table tr #td_tchSubject_tch_create').append(
					"<select class='form-control' id='tchSubject_tch_create' name='tchSubject_tch_create'>" +
						"<option>Seleccionar profesor...</option>"
				);
	
				for(var i = 0; i<json.teachers.length; i++){
					$('#create_tchSubject_form table tr #td_tchSubject_tch_create select').append(
						"<option value='" + json.teachers[i].id_teacher + "'>" + json.teachers[i].mail +"</option>"
					);
				}
	
				$('#create_tchSubject_form table tr #td_tchSubject_tch_create').append(					 
					"</select>"
				);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_subject.php',
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
				$('#create_tchSubject_form table tr #td_tchSubject_sbj_create').append(
					"<select class='form-control' id='tchSubject_sbj_create' name='tchSubject_sbj_create'>" +
						"<option>Seleccionar asignatura...</option>"
				);
	
				for(var j = 0; j<json.subjects.length; j++){
					$('#create_tchSubject_form table tr #td_tchSubject_sbj_create select').append(
						"<option value='" + json.subjects[j].id_sbj + "'>" + json.subjects[j].abbrev_sbj +"</option>"
					);
				}
	
				$('#create_tchSubject_form table tr #td_tchSubject_sbj_create').append(					 
					"</select>"
				);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
		
}

function edit_tchSubject(id_tch , id){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id', id);

	////console.log(id_tch, token, id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_tchSubject.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	
        	fadeOut_all('#list_tchSubject_admin');
        	fadeOut_all('#error_edit_tchSubject');
			fadeOut_all('#confirm_edit_tchSubject');
	
			fadeIn_all('#buttons_header_others_admin');
			fadeIn_all('#edit_tchSubject_admin');
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	$('#edit_tchSubject_admin #edit_tchSubject_form').append(
			 			"<table class='table table-hover table-responsive table-bordered'>" +
	 
	 					"<tr style='display:none;'><td>Id</td>" +
	            			"<td><input type='text' id='id_tchSubject_ed' name='id_tchSubject_ed' value='" + id +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	        			"<tr id='tr_tchSubject_tch_edit'><td>Profesor</td>" +
	        				"<td id='td_tch_edit_tchSubject'><select id='select_tchSubject_tch_edit' class='form-control' id='tchSubject_tch_ed' name='tchSubject_tch_ed'>" +
								"<option value='" + json.tch +"'>" + json.mail + "</option>" +
							 	"</select>" +
	            			"</td>" +
	        			"</tr>" +
	        			
	        			"<tr id='tr_tchSubject_sbj_edit'><td>Asignatura</td>" +
	        				"<td><select id='select_tchSubject_sbj_edit' class='form-control' id='tchSubject_sbj_ed' name='tchSubject_sbj_ed'>" +
								"<option value='" + json.sbj +"'>" + json.abbrev_sbj + "</option>" +
							 	"</select>" +
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
	

	
	$.ajax({
       	url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_teacher.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
       	processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	var json = JSON.parse(data);
        
        	console.log(json.teachers);
        	
        	if(json.status == 'ERROR') {
	    		fadeIn_all('#error_generic');
        	}	       		 	
        	else {
				
				for(var i = 0; i<json.teachers.length; i++){
					$('#tr_tchSubject_tch_edit #td_tch_edit_tchSubject #select_tchSubject_tch_edit').append(								
						"<option value='" + json.teachers[i].id_teacher + "'>" + json.teachers[i].mail +"</option>"
					);
				}
				
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	    	console.log( errorThrown );
	    }
	});	
	
	
	
	$.ajax({
       	url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_subject.php',
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
				
				console.log(json.subjects);
				
				for(var j = 0; j<json.subjects.length; j++){
					$('#tr_tchSubject_sbj_edit #select_tchSubject_sbj_edit').append(								
						"<option value='" + json.subjects[j].id_sbj + "'>" + json.subjects[j].abbrev_sbj +"</option>"
					);
				}

			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	    	console.log( errorThrown );
	    }
	});	
}

function tchSubject_delete(id_tch, id) {
	if(confirm("Seguro que quieres borrar este elemento?")){
		var data = new FormData();
		data.append('id_tch', id_tch);
		data.append('token', token);
		data.append('id', id);

		//console.log(id_tch, token, id_sbj);
	
		$.ajax({
      	 	url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_tchSubject.php',
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
	        	
	        		fadeOut_all("#homepage_admin");
	        		fadeOut_all("#list_tchSubject_admin");
	        		fadeOut_all("#buttons_header_others_admin");
	        		fadeIn_all('#delete_tchSubject_admin');
	        	
	        		$('#delete_tchSubject_admin').append(
	        			"<div class='page-header'>" +
							"<h1>Borrar un profesor en una asignatura</h1>" +
						"</div>" +
						"<table class='table table-hover table-responsive table-bordered'>" +
							"<tr><td>Profesor</td><td>" + json.mail + "</td></tr>" +
							"<tr><td>Asignatura</td><td>" + json.abbrev_sbj + "</td></tr>" +
						"</table>" +
						"<button id='delete' type='submit' class='btn btn-default' onclick='delete_tchSubject(" + id_tch + "," + id + ")'>" +
							"<span class='glyphicon glyphicon-remove'></span> Borrar" +
						"</button>"
					);
	       	 	}
        	},
	    	error: function( jqXhr, textStatus, errorThrown ){
	        	console.log( errorThrown );
	    	}
		
		});
	}
}

function delete_tchSubject(id_tch, id){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_tchSubject_del', id);

	//console.log(id_tch, token, id_sbj);
	
	$.ajax({
  	 	url: server_addr + 'organizaMisPracticas/application/web/admin/deleter/delete_tchSubject.php',       	
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
	        	read_tchSubject();
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	});
}

//TEACHER_FACULTY
function read_tchFaculty(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	//console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_tchFaculty.php',
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
	        	var contents = json.contents;
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all("#list_tchFaculty_admin");
	        	
	        	$('#list_tchFaculty_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver lista de profesores en facultades</h1>" +
					"</div>" +
					"<div>" +
						"<button id='create_tchFac' class='btn btn-default pull-right' onclick='create_tchFaculty()'>" +
							"Agregar nuevo" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr>" +
					"<th>Facultad</th>" +
					"<th>Profesor</th>" +
					"<th>Acciones</th>" +
					"</tr>"
				);
				
				for(var i = 0; i< contents.length; i++){
	        		var cont = contents[i];
	        		
	        		$("#list_tchFaculty_admin table").append(
	        			"<tr>" +
						"<td>" + cont.name_fac + "</td>" +
						"<td>" + cont.mail + "</td>" +
						"<td width='30%' align='center'>" +
							"<button id='tchFaculty_one' type='button' class='btn btn-primary pull-left' onclick='readOne_tchFaculty(" + id_tch + "," + cont.id + ")'> " +
					 			"<span class='glyphicon glyphicon-eye-open'></span> Ver" +	
					 		"</button>" +
							"<button id='tchFaculty_edit' type='button' class='btn btn-info' onclick='edit_tchFaculty(" + id_tch  + "," + cont.id + ")'> " +
	    			 			"<span class='glyphicon glyphicon-edit'></span> Editar " +	
	   			 			"</button>" +
	   			 			"<button onclick='tchFaculty_delete(" + id_tch  + "," + cont.id + ")' class='btn btn-danger pull-right'>" +
								"<span class='glyphicon glyphicon-remove'></span> Borrar" +
							"</button>" +
						"</td>" +
						"</tr>"
	        			);	
	        	}
	        	
	        	$('#list_tchFaculty_admin').append(
	        		"</table>"
	        	);
	        
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}

function readOne_tchFaculty(id_tch , id){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id', id);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_tchFaculty.php',
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
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeOut_all("#list_tchFaculty_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all('#one_tchFaculty_admin');
	        	
	        	$('#one_tchFaculty_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver un profesor en una facultad</h1>" +
					"</div>" +
					"<div>" +
						"<button id='readAll' class='btn btn-default pull-right' onclick='read_tchFaculty()'>" +
							"<span class='glyphicon glyphicon-list'></span> Ver lista" +
						"</button>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr><td>Profesor</td><td>" + "<a onclick='readOne_teacher(" + id_tch + "," + json.tch +")'>" + json.mail + "</a></td></tr>" +
					"<tr><td>Facultad</td><td>" + "<a onclick='readOne_faculty(" + id_tch + "," + json.fac +")'>" + json.name_fac + "</a></td></tr>" +
					"</table>"
				);
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
}

function create_tchFaculty(){

	clear();
	
	fadeOut_all('#list_tchFaculty_admin');
	
	fadeIn_all('#buttons_header_others_admin');
	fadeIn_all('#create_tchFaculty_admin');
	
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_teacher.php',
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
				$('#create_tchFaculty_form table tr #td_tchFaculty_tch_create').append(
					"<select class='form-control' id='tchFaculty_tch_create' name='tchFaculty_tch_create'>" +
						"<option>Seleccionar profesor...</option>"
				);
	
				for(var i = 0; i<json.teachers.length; i++){
					$('#create_tchFaculty_form table tr #td_tchFaculty_tch_create select').append(
						"<option value='" + json.teachers[i].id_teacher + "'>" + json.teachers[i].mail +"</option>"
					);
				}
	
				$('#create_tchFaculty_form table tr #td_tchFaculty_tch_create').append(					 
					"</select>"
				);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_faculty.php',
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
				$('#create_tchFaculty_form table tr #td_tchFaculty_fac_create').append(
					"<select class='form-control' id='tchFaculty_fac_create' name='tchFaculty_fac_create'>" +
						"<option>Seleccionar facultad...</option>"
				);
	
				for(var j = 0; j<json.faculties.length; j++){
					$('#create_tchFaculty_form table tr #td_tchFaculty_fac_create select').append(
						"<option value='" + json.faculties[j].id_fac + "'>" + json.faculties[j].name_fac +"</option>"
					);
				}
	
				$('#create_tchFaculty_form table tr #td_tchFaculty_fac_create').append(					 
					"</select>"
				);
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});
		
}

function edit_tchFaculty(id_tch , id){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id', id);

	////console.log(id_tch, token, id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_tchFaculty.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
        processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	clear();
        	
        	var json = JSON.parse(data);
        	
        	
        	fadeOut_all('#list_tchFaculty_admin');
        	fadeOut_all('#error_edit_tchFaculty');
			fadeOut_all('#confirm_edit_tchFaculty');
	
			fadeIn_all('#buttons_header_others_admin');
			fadeIn_all('#edit_tchFaculty_admin');
        	
	        if(json.status == 'ERROR') {
	        	fadeIn_all('#error_generic');
	        }
	        else {
	        	
	        	$('#edit_tchFaculty_admin #edit_tchFaculty_form').append(
			 			"<table class='table table-hover table-responsive table-bordered'>" +
	 
	 					"<tr style='display:none;'><td>Id</td>" +
	            			"<td><input type='text' id='id_tchFaculty_ed' name='id_tchFaculty_ed' value='" + id +"' class='form-control' /></td>" +
	        			"</tr>" +
	        			
	        			"<tr id='tr_tchFaculty_tch_edit'><td>Profesor</td>" +
	        				"<td><select id='select_tchFaculty_tch_edit' class='form-control' id='tchFaculty_tch_ed' name='tchFaculty_tch_ed'>" +
								"<option value='" + json.tch +"'>" + json.mail + "</option>" +
							 	"</select>" +
	            			"</td>" +
	        			"</tr>" +
	        			
	        			"<tr id='tr_tchFaculty_fac_edit'><td>Facultad</td>" +
	        				"<td><select id='select_tchFaculty_fac_edit' class='form-control' id='tchFaculty_fac_ed' name='tchFaculty_fac_ed'>" +
								"<option value='" + json.fac +"'>" + json.name_fac + "</option>" +
							 	"</select>" +
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
	

	
	$.ajax({
       	url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_teacher.php',
        type: 'post',
        method: 'post',
        cache: false,
        contentType: false,
       	processData: false,
        data: data,
        success: function( data, textStatus, jQxhr ){
        	var json = JSON.parse(data);
        
        	console.log(json.teachers);
        	
        	if(json.status == 'ERROR') {
	    		fadeIn_all('#error_generic');
        	}	       		 	
        	else {
				
				for(var i = 0; i<json.teachers.length; i++){
					$('#tr_tchFaculty_tch_edit #select_tchFaculty_tch_edit').append(								
						"<option value='" + json.teachers[i].id_teacher + "'>" + json.teachers[i].mail +"</option>"
					);
				}
				
			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	    	console.log( errorThrown );
	    }
	});	
	
	
	
	$.ajax({
       	url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_faculty.php',
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
				
				console.log(json.subjects);
				
				for(var j = 0; j<json.faculties.length; j++){
					$('#tr_tchFaculty_fac_edit #select_tchFaculty_fac_edit').append(								
						"<option value='" + json.faculties[j].id_fac + "'>" + json.faculties[j].name_fac +"</option>"
					);
				}

			}
		},
		error: function( jqXhr, textStatus, errorThrown ){
	    	console.log( errorThrown );
	    }
	});	
}

function tchFaculty_delete(id_tch, id) {
	if(confirm("Seguro que quieres borrar este elemento?")){
		var data = new FormData();
		data.append('id_tch', id_tch);
		data.append('token', token);
		data.append('id', id);

		//console.log(id_tch, token, id_sbj);
	
		$.ajax({
      	 	url: server_addr + 'organizaMisPracticas/application/web/admin/read_one/readOne_tchFaculty.php',
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
	        	
	        		fadeOut_all("#homepage_admin");
	        		fadeOut_all("#list_tchFaculty_admin");
	        		fadeOut_all("#buttons_header_others_admin");
	        		fadeIn_all('#delete_tchFaculty_admin');
	        	
	        		$('#delete_tchFaculty_admin').append(
	        			"<div class='page-header'>" +
							"<h1>Borrar un profesor en una facultad</h1>" +
						"</div>" +
						"<table class='table table-hover table-responsive table-bordered'>" +
							"<tr><td>Profesor</td><td>" + json.mail + "</td></tr>" +
							"<tr><td>Facultad</td><td>" + json.name_fac + "</td></tr>" +
						"</table>" +
						"<button id='delete' type='submit' class='btn btn-default' onclick='delete_tchFaculty(" + id_tch + "," + id + ")'>" +
							"<span class='glyphicon glyphicon-remove'></span> Borrar" +
						"</button>"
					);
	       	 	}
        	},
	    	error: function( jqXhr, textStatus, errorThrown ){
	        	console.log( errorThrown );
	    	}
		
		});
	}
}

function delete_tchFaculty(id_tch, id){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	data.append('id_tchFaculty_del', id);

	//console.log(id_tch, token, id_sbj);
	
	$.ajax({
  	 	url: server_addr + 'organizaMisPracticas/application/web/admin/deleter/delete_tchFaculty.php',       	
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
	        	read_tchFaculty();
	        }
	    },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
		
	});
}

//FACULTY_STUDENT
function read_facStudent(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	//console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_facStudent.php',
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
	        	var contents = json.contents;
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all("#list_facStudent_admin");
	        	
	        	$('#list_facStudent_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver lista de alumnos en facultades</h1>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr>" +
					"<th>Facultad</th>" +
					"<th>Alumno</th>" +
					"<th>Estudio</th>" +
					"</tr>"
				);
				
				for(var i = 0; i< contents.length; i++){
	        		var cont = contents[i];
	        		
	        		$("#list_facStudent_admin table").append(
	        			"<tr>" +
						"<td>" + cont.name_fac + "</td>" +
						"<td>" + cont.mail + "</td>" +
						"<td>" + cont.abbrev_stds+ "</td>" +
						"</tr>"
	        			);	
	        	}
	        	
	        	$('#list_facStudent_admin').append(
	        		"</table>"
	        	);
	        
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}

//TEACHER_STUDENT
function read_tchStudent(){
	var data = new FormData();
	data.append('id_tch', id_tch);
	data.append('token', token);
	
	//console.log(id_tch);
	
	$.ajax({
        url: server_addr + 'organizaMisPracticas/application/web/admin/read_all/read_tchStudent.php',
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
	        	var contents = json.contents;
	        	
	        	fadeOut_all("#homepage_admin");
	        	fadeIn_all("#buttons_header_others_admin");
	        	fadeIn_all("#list_tchStudent_admin");
	        	
	        	$('#list_tchStudent_admin').append(
	        		"<div class='page-header'>" +
						"<h1>Ver lista de alumnos y sus profesores</h1>" +
					"</div>" +
					"<table class='table table-hover table-responsive table-bordered'>" +
					"<tr>" +
					"<th>Profesor</th>" +
					"<th>Alumno</th>" +
					"<th>Asignatura</th>" +
					"</tr>"
				);
				
				for(var i = 0; i< contents.length; i++){
	        		var cont = contents[i];
	        		
	        		$("#list_tchStudent_admin table").append(
	        			"<tr>" +
						"<td>" + cont.mail_tch + "</td>" +
						"<td>" + cont.mail_stdnt + "</td>" +
						"<td>" + cont.subjects[0].abbrev_sbj+ "</td>" +
						"</tr>"
	        			);	
	        	}
	        	
	        	$('#list_tchStudent_admin').append(
	        		"</table>"
	        	);
	        
	        }
        },
	    error: function( jqXhr, textStatus, errorThrown ){
	        console.log( errorThrown );
	    }
	});

}


