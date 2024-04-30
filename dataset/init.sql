-- Adminer 4.8.1 PostgreSQL 14.5 (Debian 14.5-2.pgdg110+2) dump

INSERT INTO "appointments" ("id", "patient_id", "doctor_id", "status", "notes", "assigned_at", "payment_invoice_key", "payment_receipt_key", "video_record_key", "ended_at", "started_at") VALUES
('10',	'8bf9fc50-4f4a-4540-b166-5bb7df5b0a60',	'3',	'PLANNED',	'Regular check-up',	'2024-04-30 00:00:00',	'INV-2024-00123',	'REC-2024-04567',	NULL,	NULL,	NULL),
('14',	'8bf9fc50-4f4a-4540-b166-5bb7df5b0a60',	'4',	'PLANNED',	'Follow-up',	'2024-04-30 00:05:00',	'INV-2024-00126',	'REC-2024-04580',	NULL,	NULL,	NULL),
('13',	'8bf9fc50-4f4a-4540-b166-5bb7df5b0a60',	'4',	'PLANNED',	'Follow-up',	'2024-05-03 00:00:00',	'INV-2024-00155',	'REC-2024-04570',	NULL,	NULL,	NULL),
('11',	'8bf9fc50-4f4a-4540-b166-5bb7df5b0a60',	'4',	'PLANNED',	'Follow-up',	'2024-05-01 00:00:00',	'INV-2024-00124',	'REC-2024-04568',	NULL,	NULL,	NULL),
('12',	'8bf9fc50-4f4a-4540-b166-5bb7df5b0a60',	'3',	'PLANNED',	'Regular check-up',	'2024-05-02 00:00:00',	'INV-2024-00123',	'REC-2024-04569',	NULL,	NULL,	NULL);

INSERT INTO "doctors" ("id", "user_id", "payrate", "about", "rating") VALUES
('3',	'1',	150,	'Experienced physician',	0),
('4',	'2',	180,	'Specialized in cardiology',	0);

INSERT INTO "hospital_doctors" ("id", "hospital_id", "doctor_id") VALUES
('8',	'7',	'3'),
('9',	'7',	'4');

INSERT INTO "hospitals" ("id", "name", "city", "country", "state", "street", "zip_code") VALUES
('7',	'General Hospital',	'Los Angeles',	'USA',	NULL,	'Sunset Boulevard',	NULL);

INSERT INTO "notifications" ("id", "patient_id", "model_id", "created_at", "model", "action") VALUES
('14',	'7',	'10',	'2024-04-01 09:30:00',	'APPOINTMENT',	'TODO'),
('15',	'8',	'11',	'2024-04-02 10:30:00',	'APPOINTMENT',	'TODO');

INSERT INTO "patients" ("id", "user_id", "weight", "height", "age", "blood_type", "gender", "identity_card_key", "apartment", "city", "country", "state", "street", "zip_code", "email_notification_toggle", "request_bill_payment_approval", "two_factor_auth_toggle") VALUES
('7',	'3',	60,	165,	28,	'A_PLUS',	'FEMALE',	NULL,	NULL,	'Los Angeles',	'USA',	NULL,	'Broadway Street',	NULL,	'f',	'f',	'f'),
('8',	'4',	60,	165,	28,	'A_PLUS',	'FEMALE',	NULL,	NULL,	'Los Angeles',	'USA',	NULL,	'Broadway Street',	NULL,	'f',	'f',	'f'),
('8bf9fc50-4f4a-4540-b166-5bb7df5b0a60',	'afa267c8-6d45-4489-b881-f09ae29470b2',	1,	5,	1,	'O_PLUS',	'MALE',	NULL,	NULL,	'd',	'sd',	NULL,	'd',	NULL,	'f',	'f',	'f');

INSERT INTO "users" ("id", "first_name", "last_name", "phone", "email", "email_verified", "password", "avatar_key", "googleId", "secret_code", "role") VALUES
('1',	'John',	'Doe',	'0966984497',	'john.doe@example.com',	'f',	NULL,	'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_18.png',	NULL,	NULL,	NULL),
('4',	'Sara',	'Connor',	'0966984497',	'sara.connor@example.com',	'f',	NULL,	'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_17.png',	NULL,	NULL,	NULL),
('3',	'Lara',	'Smith',	'0966984496',	'lara.smith@example.com',	'f',	NULL,	'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_16.png',	NULL,	NULL,	NULL),
('2',	'Jane',	'Smith',	'0966984495',	'jane.smith@example.com',	'f',	NULL,	'https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_15.png',	NULL,	NULL,	NULL),
('afa267c8-6d45-4489-b881-f09ae29470b2',	'Test',	'Test',	'+380995698142',	'test2@gmail.com',	't',	'$2b$10$F8hBajlFqr3/pDvAdfLYvOlR3GD.yU4q0pcp4bxO3Fpbde605Xlhq',	'',	NULL,	NULL,	NULL);

-- 2024-04-30 14:38:25.003805+00