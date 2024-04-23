INSERT INTO users (id, first_name, last_name, phone, email, avatar_key)
VALUES 
  ('1', 'John', 'Doe', '0966984497', 'john.doe@example.com', 'avatar_1'),
  ('2', 'Jane', 'Smith', '0966984495', 'jane.smith@example.com', 'avatar_3'),
  ('3', 'Lara', 'Smith', '0966984496', 'lara.smith@example.com', 'avatar_2'),
  ('4', 'Sara', 'Connor', '0966984497', 'sara.connor@example.com', 'avatar_4');

INSERT INTO doctors (id, user_id, payrate, about)
VALUES 
  ('3', '1', 150, 'Experienced physician'),
  ('4', '2', 180, 'Specialized in cardiology');

INSERT INTO patients (id, user_id, weight, height, age, blood_type, gender, country, city, street)
VALUES 
  ('7', '3', 60, 165, 28, 'A_PLUS', 'FEMALE', 'USA', 'Los Angeles', 'Broadway Street'),
  ('8', '4', 60, 165, 28, 'A_PLUS', 'FEMALE', 'USA', 'Los Angeles', 'Broadway Street');

INSERT INTO hospitals (id, name, country, city, street)
VALUES 
  ('7', 'General Hospital', 'USA', 'Los Angeles', 'Sunset Boulevard');

INSERT INTO hospital_doctors (id, hospital_id, doctor_id)
VALUES 
  ('8', '7', '3'),
  ('9', '7', '4');

INSERT INTO appointments (id, patient_id, doctor_id, assigned_at, status, notes, payment_invoice_key, payment_receipt_key)
VALUES 
  ('10', '7', '3', CURRENT_DATE + INTERVAL '0 DAY', 'PLANNED', 'Regular check-up', 'INV-2024-00123', 'REC-2024-04567'),
  ('11', '7', '4', CURRENT_DATE + INTERVAL '1 DAY', 'PLANNED', 'Follow-up', 'INV-2024-00124', 'REC-2024-04568'),
  ('12', '7', '3', CURRENT_DATE + INTERVAL '2 DAY', 'PLANNED', 'Regular check-up', 'INV-2024-00123', 'REC-2024-04569'),
  ('13', '8', '4', CURRENT_DATE + INTERVAL '3 DAY', 'PLANNED', 'Follow-up', 'INV-2024-00155', 'REC-2024-04570'),
  ('14', '8', '4', CURRENT_DATE + INTERVAL '5 MINUTE', 'PLANNED', 'Follow-up', 'INV-2024-00126', 'REC-2024-04580');


INSERT INTO reviews (id, text, rate, doctor_id, patient_id)
VALUES 
  ('12', 'Great doctor!', 5, '3', '5'),
  ('13', 'Very helpful.', 4, '4', '6');

INSERT INTO notifications (id, patient_id, model_id, created_at, model, action)
VALUES 
  ('14', '7', '10', '2024-04-01 09:30:00', 'APPOINTMENT', 'TODO'),
  ('15', '8', '11', '2024-04-02 10:30:00', 'APPOINTMENT', 'TODO');
