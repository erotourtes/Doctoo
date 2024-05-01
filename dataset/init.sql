-- Insert data into Users
INSERT INTO users (id, first_name, last_name, phone, email, email_verified, secret_code, password, google_id, avatar_key, role)
VALUES 
('uuid-user2', 'John', 'Doe', '1234567890', 'john.doe@example.com', true, '12345', '$2b$10$gs9ffR.1rS2qVF.2fGXVG.38kGGz1/C.tlrljAcGeMVAJzWiH7tci', null, 'avatar123', 'DOCTOR'),
('uuid-user1', 'Jane', 'Smith', '0987654321', 'jane.smith@example.com', false, null, '$2b$10$gs9ffR.1rS2qVF.2fGXVG.38kGGz1/C.tlrljAcGeMVAJzWiH7tci', 'google-id-123', 'avatar456', 'PATIENT');

-- Insert data into Doctors
INSERT INTO doctors (id, user_id, payrate, about, rating)
VALUES 
('uuid-doctor1', 'uuid-user2', 500, 'Specialist in dermatology.', 4.7);

-- Insert data into Patients
INSERT INTO patients (id, user_id, weight, height, age, blood_type, gender, identity_card_key, country, state, city, street, apartment, zip_code, email_notification_toggle, request_bill_payment_approval, two_factor_auth_toggle)
VALUES 
('uuid-patient1', 'uuid-user1', 70, 180, 28, 'O_PLUS', 'MALE', 'id1234567', 'USA', 'CA', 'Los Angeles', '123 Elm St', 'Apt 5', 90001, true, false, true);

-- Insert data into Hospitals
INSERT INTO hospitals (id, name, country, state, city, street, zip_code)
VALUES 
('uuid-hospital1', 'General Hospital', 'USA', 'CA', 'Los Angeles', '321 Cedar St', 90002);

-- Insert data into HospitalDoctors
INSERT INTO hospital_doctors (id, hospital_id, doctor_id)
VALUES 
('uuid-hospitaldoctor1', 'uuid-hospital1', 'uuid-doctor1');

-- Insert data into Appointments
INSERT INTO appointments (id, patient_id, doctor_id, created_at, status, notes, started_at)
VALUES 
('uuid-appointment1', 'uuid-patient1', 'uuid-doctor1', '2024-05-01 14:00:00+00', 'PLANNED', 'Initial consultation for skin checkup.','2024-05-01 14:00:00+00');

-- Insert data into Reviews
INSERT INTO reviews (id, text, rate, doctor_id, patient_id, created_at, updated_at)
VALUES 
('uuid-review1', 'Very professional and friendly.', 5, 'uuid-doctor1', 'uuid-patient1', '2024-05-01 16:30:00+00', '2024-05-01 16:30:00+00');

INSERT INTO specializations (id, name)
VALUES 
('uuid-spec1', 'Pediatrics'),
('uuid-spec2', 'Developmental Disorders');

-- Insert data into DoctorSpecializations (associating doctors with specializations)
INSERT INTO doctor_specializations (id, doctor_id, specialization_id)
VALUES 
('uuid-docspec1', 'uuid-doctor1', 'uuid-spec1'),
('uuid-docspec2', 'uuid-doctor1', 'uuid-spec2');


INSERT INTO declarations (id, patient_id, doctor_id)
VALUES 
('676767', 'uuid-patient1', 'uuid-doctor1');