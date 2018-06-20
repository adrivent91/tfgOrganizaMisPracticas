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
	
	//teacher
	fadeOut_all('#homepage_teacher');
	fadeOut_all('#buttons_header_others_teacher');
	fadeOut_all('#personal_data');
	fadeOut_all('#list_completed_tch');
	fadeOut_all("#evaluate_dlv");
	fadeOut_all("#list_subjects_tch");
	fadeOut_all("#one_delivery_teacher");
	fadeOut_all("#one_delivery_compl_teacher");
	fadeOut_all('#edit_delivery_teacher');
	fadeOut_all('#create_delivery_teacher');
	fadeOut_all('#delete_delivery_teacher');
	fadeOut_all("#one_subject_tch");
	fadeOut_all("#list_students_tch");
	fadeOut_all("#one_student_tch");
	fadeOut_all("#one_evaluate_tch");
	fadeOut_all("#edit_evaluate_tch");
	fadeOut_all('#delete_evaluate_teacher');
	
	fadeIn_all('#login');	
}

//clean the divs to avoid duplications when reloading the page
function clear(){

	//common
	//$('#list_pending_tch').empty();
	$('#confirm_edit').empty();
	$('#list_completed_tch').empty();
	$("#evaluate_dlv").empty();
	$("#list_subjects_tch").empty();
	$("#list_students_tch").empty();
	$("#one_delivery_teacher").empty();
	$("#one_delivery_compl_teacher").empty();
	$("#one_subject_tch").empty();
	$("#one_student_tch").empty();
	$("#one_evaluate_tch").empty();
	$('#delete_evaluate_teacher').empty();
	
	
	fadeOut_all('#create_delivery_teacher');
	$('#error_create_dlv').empty();
	$('#confirm_create_dlv').empty();
	$('#td_subject_teacher').empty();
	
	fadeOut_all('#edit_delivery_teacher');
	$('#edit_delivery_form').empty();
	$('#error_edit_dlv').empty();
	$('#confirm_edit_dlv').empty();
	
	$('#delete_delivery_teacher').empty();
	
	fadeOut_all("#edit_evaluate_tch");
	$('#edit_evaluate_form').empty();
	$("#error_edit_note").empty();
    $("#confirm_edit_note").empty();
	
	
	/////////teacher
	$('#personal_data').empty();
	
	////////admin
	//read
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
	
	//read_one
	$('#one_faculty_admin').empty();
	$('#one_teacher_admin').empty();
	$('#one_student_admin').empty();
	$('#one_subject_admin').empty();
	$('#one_studies_admin').empty();
	$('#one_sbjStudent_admin').empty();
	$('#one_tchSubject_admin').empty();
	$('#one_tchFaculty_admin').empty();
	
	//create
	fadeOut_all('#create_faculty_admin');
	$('#error_create_fac').empty();
	$('#confirm_create_fac').empty();
	
	fadeOut_all('#create_teacher_admin');
	$('#error_create_tch').empty();
	$('#confirm_create_tch').empty();
	
	fadeOut_all('#create_studies_admin');
	$('#error_create_stds').empty();
	$('#confirm_create_stds').empty();
	$('#td_faculties_stds').empty();
	
	fadeOut_all('#create_student_admin');
	$('#error_create_stdnt').empty();
	$('#confirm_create_stdnt').empty();
	$('#td_studies_stdnt').empty();
	
	fadeOut_all('#create_subject_admin');
	$('#error_create_sbj').empty();
	$('#confirm_create_sbj').empty();
	$('#td_studies_sbj').empty();

	fadeOut_all('#create_sbjStudent_admin');
	$('#error_create_sbjStudent').empty();
	$('#confirm_create_sbjStudent').empty();
	$('#td_sbjStudent_sbj_create').empty();
	$('#td_sbjStudent_stdnt_create').empty();
	
	fadeOut_all('#create_tchSubject_admin');
	$('#error_create_tchSubject').empty();
	$('#confirm_create_tchSubject').empty();
	$('#td_tchSubject_tch_create').empty();
	$('#td_tchSubject_sbj_create').empty();
	
	fadeOut_all('#create_tchFaculty_admin');
	$('#error_create_tchFaculty').empty();
	$('#confirm_create_tchFaculty').empty();
	$('#td_tchFaculty_tch_create').empty();
	$('#td_tchFaculty_fac_create').empty();
	
	//edit
	fadeOut_all('#edit_faculty_admin');
	$('#edit_faculty_form').empty();
	$('#error_edit_fac').empty();
	$('#confirm_edit_fac').empty();
	
	fadeOut_all('#edit_teacher_admin');
	$('#edit_teacher_form').empty();
	$('#error_edit_tch').empty();
	$('#confirm_edit_tch').empty();
	
	fadeOut_all('#edit_studies_admin');
	$('#edit_studies_form').empty();
	$('#error_edit_stds').empty();
	$('#confirm_edit_stds').empty();
	
	fadeOut_all('#edit_student_admin');
	$('#edit_student_form').empty();
	$('#error_edit_stdnt').empty();
	$('#confirm_edit_stdnt').empty();
	
	fadeOut_all('#edit_subject_admin');
	$('#edit_subject_form').empty();
	$('#error_edit_sbj').empty();
	$('#confirm_edit_sbj').empty();
	
	fadeOut_all('#edit_sbjStudent_admin');
	$('#edit_sbjStudent_form').empty();
	$('#error_edit_sbjStudent').empty();
	$('#confirm_edit_sbjStudent').empty();
	
	fadeOut_all('#edit_tchSubject_admin');
	$('#edit_tchSubject_form').empty();
	$('#error_edit_tchSubject').empty();
	$('#confirm_edit_tchSubject').empty();
	
	fadeOut_all('#edit_tchFaculty_admin');
	$('#edit_tchFaculty_form').empty();
	$('#error_edit_tchFaculty').empty();
	$('#confirm_edit_tchFaculty').empty();
	
	//delete
	$('#delete_faculty_admin').empty();
	$('#delete_teacher_admin').empty();
	$('#delete_student_admin').empty();
	$('#delete_subject_admin').empty();
	$('#delete_studies_admin').empty();
	$('#delete_sbjStudent_admin').empty();
	$('#delete_tchSubject_admin').empty();
	$('#delete_tchFaculty_admin').empty();
}
