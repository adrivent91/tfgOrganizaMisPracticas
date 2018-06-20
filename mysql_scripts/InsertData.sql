INSERT INTO  ORGANIZ_PRACTICAS.Faculty ( id_fac , address , phone , postal_code , name_fac ) VALUES
(1,'Calle facultad_1', 900000001, 28001,'Facultad_1'),
(2,'Calle facultad_2', 900000002, 28002,'Facultad_2'),
(3,'C/ Prof. José García Santesmases, 9', 913947501, 28040, 'Facultad de informatica');

INSERT INTO  ORGANIZ_PRACTICAS.Teacher ( id_tch , name_tch , last_name_tch , mail ,passw, office) VALUES
(1, 'Admin', 'Admin' , 'admin@ucm.es', '$2y$10$5VYjnkG4rVR79mM5GipGrOiDPzHsVvioGX57..nwe3R05nWh4hoy2', 000),
(2,'n_prof1','ap_prof1','prof1@ucm.es','$2y$10$xgPlZS21dyUDQlmvgU1Yx.LJ1FcOM9sGyQvHDPaSKODOtINlfmGcm', 101),
(3,'n_prof2','ap_prof2','prof2@ucm.es','$2y$10$xLPDpHOThUJt2rTSKS1ri.agt/oqHOuFyOVUriVIzQXaLKJUOLLSO', 102),
(4,'n_prof3','ap_prof3','prof3@ucm.es','$2y$10$19Gyuqcb2bK/DM3p5NOqgeZTL4ckwKdpSttN4vFTL5USPyj0cMI9G', 103),
(5,'Juan', 'Rodriguez', 'profRodriguez@ucm.es','$2y$10$xgPlZS21dyUDQlmvgU1Yx.LJ1FcOM9sGyQvHDPaSKODOtINlfmGcm', 104),
(6,'Ruben','Fernandez','profFernandez@ucm.es','$2y$10$xLPDpHOThUJt2rTSKS1ri.agt/oqHOuFyOVUriVIzQXaLKJUOLLSO', 105),
(7,'Alicia','Sanchez','profSanchez@ucm.es','$2y$10$19Gyuqcb2bK/DM3p5NOqgeZTL4ckwKdpSttN4vFTL5USPyj0cMI9G', 106);

INSERT INTO ORGANIZ_PRACTICAS.Studies (id_stds, abbrev_stds, name_stds, fac, type_stds, itinerary) VALUES
(1,'G_f1_1','estudio_f1_1', 1,'grado','itinerario_g1'),
(2,'G_f1_2','estudio_f1_2', 1,'master', NULL),
(3,'G_f2_1','estudio_f2_1', 2,'grado', NULL),
(4,'GII', 'ingenieria informatica', 3, 'grado', 'computacion');

INSERT INTO ORGANIZ_PRACTICAS.Student (id_stdnt, name_stdnt, last_name_stdnt, mail, passw, stds) VALUES
(1,'n_alum1','ap_alum1','alum1@ucm.es','$2y$10$h/wT8E0fmFQ4nAWhuBB5HOhUiB73wBwP3U.juRNE57.tqQ0DH..Jy', 1),
(2,'n_alum2','ap_alum2','alum2@ucm.es','$2y$10$BLevxxaT6qHkL0.4Wi04Uuub9BJuFtfd2lZQjBYdZMiIl6gfsBaRC', 1),
(3,'n_alum3','ap_alum3','alum3@ucm.es','$2y$10$/K07i34CodHQkU/ZyFt7mu6/yBnmbZWFnHumN4VbsgeeCXxtZ1sY2', 2),
(4,'n_alum4','ap_alum4','alum4@ucm.es','$2y$10$Ps2ob827syh4yEtBPDfYg.dmHXlsBE8Q8rpSJeAzZNb5Jdo1PUCCC', 2),
(5,'n_alum5','ap_alum5','alum5@ucm.es','$2y$10$H9AW.W9AHBLyGJcnMwPVIutDhPQjoYy84rpiZFD8SMF7t5i0AGeTK', 3),
(6,'Adriana', 'Ventura', 'adrianaVent@ucm.es', '$2y$10$nQhE02T4VqEt/AjAkMr0S.rN1gtdC3gCqbQBrk5lqsWdw1i4LfoSK', 4);

INSERT INTO ORGANIZ_PRACTICAS.Subject (id_sbj, abbrev_sbj, name_sbj, credits, course, group_sbj, quarter, stds) VALUES
(1, 'a_1', 'n_asign1', 6, 1, 'A', 'primer', 1),
(2, 'a_2', 'n_asign2', 6, 4, 'A', 'primer', 1),
(3, 'a_3', 'n_asign3', 6, 3, 'A', 'segundo', 1),
(4, 'a_4', 'n_asign4', 12, 2, 'A', 'anual', 1),
(5, 'a_5', 'n_asign5', 9, 1, 'A', 'anual', 2),
(6, 'a_6', 'n_asign6', 6, 2, 'A', 'primer', 3),
(7, 'a_7', 'n_asign7', 6, 3, 'A', 'segundo', 3),
(8, 'a_8', 'n_asign8', 6, 3, 'A', 'segundo', 1),
(9, 'a_9', 'n_asign9', 6, 3, 'A', 'segundo', 1),
(10, 'PD', 'Programacion Declarativa', 6, 4, 'A', 'primer', 4),
(11, 'EC', 'Estructura de computadores', 6, 3, 'B', 'segundo', 4),
(12, 'IA', 'Inteligencia artificial', 12, 3, 'A', 'anual', 4),
(13, 'TFG', 'Trabajo de fin de grado', 12, 4, 'A', 'anual', 4);

INSERT INTO ORGANIZ_PRACTICAS.Delivery (id_dlv, name_dlv, percent, rise_date , deliver_date, type_dlv, tch_comment, sbj) VALUES
(1, 'n_entr_1_ex', 70, '2018-01-30 07:00:00', '2018-01-30 10:00:00', 'examen', NULL, 1),
(2, 'n_entr_2_pa', 30, '2017-11-01 07:00:00', '2017-11-15 22:00:00', 'practica', NULL, 1),
(3, 'n_entr_3_po', 90, '2017-10-20 06:00:00', '2018-01-30 22:00:00', 'proyecto', NULL, 2),
(4, 'n_entr_4_ej', 10, '2018-01-15 07:00:00', '2018-01-15 22:00:00', 'ejercicio', 'Ejercicio opcional: subida nota', 2),
(5, 'n_entr_5_pa', 15, '2018-02-14 07:00:00', '2018-03-01 07:00:00', 'practica', NULL, 3),
(6, 'n_entr_6_ex', 50, '2018-02-07 11:00:00', '2018-02-07 14:00:00', 'examen', NULL, 4),
(7, 'n_entr_7_ex', 50, '2018-06-01 06:00:00', '2018-06-01 10:00:00', 'examen', NULL, 4),
(8, 'n_entr_8_po', 65, '2017-11-15 07:00:00', '2018-06-01 06:00:00', 'proyecto', NULL, 5),
(9, 'n_entr_9_ex', 35, '2018-02-04 07:00:00', '2018-02-04 11:00:00', 'examen', 'Examen con apuntes', 5),
(10, 'n_entr_10_ex', 70, '2018-02-05 13:00:00', '2018-02-05 16:00:00', 'examen', NULL, 6),
(11, 'n_entr_11_pa', 30, '2017-12-20 07:00:00', '2018-01-05 22:00:00', 'practica', NULL, 6),
(12, 'n_entr_12_pa', 40, '2018-02-15 07:00:00', '2018-03-01 07:00:00', 'practica', NULL, 7),
(13, 'n_entr_13_ex', 40, '2018-06-20 10:00:00', '2018-06-20 13:00:00', 'examen', NULL, 8),
(14, 'n_entr_14_pa', 60, '2018-06-15 11:28:54', '2018-06-29 21:00:00', 'proyecto', NULL, 8),
(15, 'n_entr_15_po', 60, '2018-06-18 07:00:00', '2018-06-18 10:00:00', 'examen', 'Se permite el uso de apuntes', 9),
(16, 'n_entr_16_ej', 25, '2018-06-07 07:00:00', '2018-06-28 07:00:00', 'proyecto', NULL, 9),
(17, 'n_entr_17_pa', 15, '2018-05-28 07:00:00', '2018-06-01 21:00:00', 'ejercicio', NULL, 9),
(18, 'Ejercicio extra', 10, '2017-11-01 09:00:00', '2018-02-10 23:30:00', 'ejercicio', NULL, 10),
(19, 'Examen', 90, '2018-02-03 12:00:00', '2018-02-03 15:30:00', 'examen', 'Se permiten apuntes', 10),
(20, 'Ejercicio segmentacion', 10, '2018-04-01 09:00:00', '2018-04-03 23:30:00', 'ejercicio', NULL, 11),
(21, 'Ejercicio secuencia', 15, '2018-05-01 09:00:00', '2018-05-01 23:30:00', 'ejercicio', NULL, 11),
(22, 'Practica 1', 30, '2017-03-01 09:00:00', '2018-05-20 09:00:00', 'practica', NULL, 11),
(23, 'Examen final', 45, '2018-06-01 09:00:00', '2018-06-01 12:00:00', 'examen', NULL, 11),

(24, 'Practica 1', 20, '2017-12-01 09:00:00', '2018-01-20 23:30:00', 'practica', NULL, 12),
(25, 'Examen parcial', 30, '2018-02-10 09:00:00', '2018-02-10 12:00:00', 'examen', NULL, 12),
(26, 'Practica 2', 20, '2018-04-27 09:00:00', '2018-06-01 23:30:00', 'practica', NULL, 12),
(27, 'Examen final', 30, '2018-06-27 09:00:00', '2018-06-27 12:00:00', 'examen', NULL, 12),
(28, 'Entrega memoria', 60, '2018-06-06 00:00:00', '2018-06-08 23:55:00', 'proyecto', 'Necesario autorización del profesor', 13),
(29, 'Presentación TFG', 40, '2018-06-22 09:30:00', '2018-06-22 12:00:00', 'proyecto', NULL, 13);


INSERT INTO ORGANIZ_PRACTICAS.Note_Delivery (id, note, tch_comment_note, dlv, stdnt) VALUES
(1, 35, 'Revision: proximo lunes a las 10 en mi despacho', 1, 1),
(2, 70, NULL, 1, 2),
(3, 85, NULL, 2, 1),
(4, 15, 'Revision: proximo lunes a las 10 en mi despacho', 2, 2),
(5, 70, NULL, 3, 1),
(6, 70, NULL, 3, 2),
(7, 90, NULL, 4, 1),
(8, 90, NULL, 4, 2),
(9, 100, 'Enhorabuena', 5, 2),
(10, 100, 'Enhorabuena', 6, 1),
(11, 15, 'Revision: proximo martes a las 12 en mi despacho', 6, 2),
(12, 25, 'Revision: proximo jueves a las 12 en mi despacho', 9, 3),
(13, 49, 'Revision: proximo jueves a las 12 en mi despacho', 9, 4),
(14, 60, NULL, 10, 5),
(15, 50, NULL, 11, 5),
(16, 40, NULL, 12, 5),
(17, 80, NULL, 18, 6),
(18, 50, NULL, 19, 6),
(19, 60, NULL, 20, 6),
(20, 95, NULL, 21, 6),
(21, 80, NULL, 22, 6),
(22, 50, NULL, 23, 6),
(23, 70, NULL, 24, 6),
(24, 30, 'Revision: proximo lunes a las 10 en mi despacho.', 25, 6),
(25, 85, NULL, 26, 6);


INSERT INTO ORGANIZ_PRACTICAS.Teacher_Subject (id, tch, sbj) VALUES
(1, 2, 1),
(2, 3, 2),
(3, 4, 3),
(4, 2, 4),
(5, 2, 5),
(6, 2, 6),
(7, 3, 7),
(8, 2, 8),
(9, 4, 9),
(10, 5, 10),
(11, 5, 12),
(12, 6, 13),
(13, 7, 11);


INSERT INTO ORGANIZ_PRACTICAS.Subject_Student (id, regist_num, regist_year, stdnt, sbj) VALUES
(1, 2, 2015, 1, 1),
(2, 2, 2016, 1, 2),
(3, 1, 2017, 1, 4),
(4, 1, 2017, 2, 1),
(5, 2, 2016, 2, 2),
(6, 3, 2014, 2, 3),
(7, 1, 2017, 2, 4),
(8, 1, 2017, 3, 5),
(9, 3, 2013, 4, 5),
(10, 2, 2016, 5, 6),
(11, 2, 2016, 5, 7),
(12, 1, 2017, 1, 8),
(13, 1, 2017, 1, 9),
(14, 1, 2017, 6, 10),
(15, 1, 2017, 6, 11),
(16, 2, 2016, 6, 12),
(17, 1, 2017, 6, 13);

INSERT INTO ORGANIZ_PRACTICAS.Teacher_Faculty(id, tch, fac) VALUES
(1, 2, 1), 
(2, 3, 1), 
(3, 4, 1), 
(4, 2, 2), 
(5, 3, 2),
(6, 5, 3),
(7, 6, 3),
(8, 7, 3);

