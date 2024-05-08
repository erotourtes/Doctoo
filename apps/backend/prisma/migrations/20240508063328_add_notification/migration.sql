-- CreateEnum
CREATE TYPE "BloodType" AS ENUM ('O_PLUS', 'O_MINUS', 'A_PLUS', 'A_MINUS', 'B_PLUS', 'B_MINUS', 'AB_PLUS', 'AB_MINUS');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('PENDING_PAYMENT', 'PLANNED', 'COMPLETED', 'MISSED', 'CANCELED');

-- CreateEnum
CREATE TYPE "NotificationModel" AS ENUM ('APPOINTMENT', 'CHAT');

-- CreateEnum
CREATE TYPE "NotificationAction" AS ENUM ('NEW_APPOINTMENT', 'CONFIRMED_APPOINTMENT', 'UPCOMING_APPOINTMENT', 'COMPLETED_APPOINTMENT', 'MISSED_APPOINTMENT', 'CANCELED_APPOINTMENT', 'FILE_RECEIVED', 'NEW_MESSAGE', 'INVOICE_RECEIVED', 'PAYMENT_SUCCESSFUL');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('DOCTOR', 'PATIENT');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "secret_code" TEXT,
    "password" TEXT,
    "google_id" TEXT,
    "avatar_key" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "text" TEXT,
    "rate" INTEGER NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "doctor_id" TEXT,
    "model_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "model" "NotificationModel" NOT NULL,
    "action" "NotificationAction" NOT NULL,
    "message" TEXT NOT NULL,
    "file_key" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctors" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "payrate" INTEGER NOT NULL,
    "about" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_schedules" (
    "id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "starts_work_hour_utc" INTEGER NOT NULL,
    "ends_work_hour_utc" INTEGER NOT NULL,

    CONSTRAINT "doctor_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospital_doctors" (
    "id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,

    CONSTRAINT "hospital_doctors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hospitals" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "zip_code" INTEGER,

    CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "declarations" (
    "id" SERIAL NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "declarations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "doctor_specializations" (
    "id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "specialization_id" TEXT NOT NULL,

    CONSTRAINT "doctor_specializations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patients" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "blood_type" "BloodType" NOT NULL,
    "gender" "Gender" NOT NULL,
    "identity_card_type" TEXT,
    "identity_card_key" TEXT,
    "country" TEXT NOT NULL,
    "state" TEXT,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "apartment" TEXT,
    "zip_code" INTEGER,
    "email_notification_toggle" BOOLEAN NOT NULL DEFAULT false,
    "request_bill_payment_approval" BOOLEAN NOT NULL DEFAULT false,
    "two_factor_auth_toggle" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vaccinations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "vaccinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_vaccinations" (
    "id" TEXT NOT NULL,
    "vaccination_id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,

    CONSTRAINT "patient_vaccinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "allergies" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_allergies" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "allergy_id" TEXT NOT NULL,

    CONSTRAINT "patient_allergies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conditions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_conditions" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "condition_id" TEXT NOT NULL,

    CONSTRAINT "patient_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specialization_conditions" (
    "id" TEXT NOT NULL,
    "specialization_id" TEXT NOT NULL,
    "condition_id" TEXT NOT NULL,

    CONSTRAINT "specialization_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "specializations" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "specializations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AppointmentStatus" NOT NULL,
    "notes" TEXT,
    "video_record_key" TEXT,
    "payment_invoice_key" TEXT,
    "payment_receipt_key" TEXT,
    "appointment_price" INTEGER NOT NULL,
    "started_at" TIMESTAMPTZ NOT NULL,
    "ended_at" TIMESTAMPTZ,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chats" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "missedMessagesDoctor" INTEGER NOT NULL DEFAULT 0,
    "missedMessagesPatient" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "chats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chat_messages" (
    "id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    "sender" "Role" NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "text" TEXT NOT NULL,
    "edited_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message_attachments" (
    "id" TEXT NOT NULL,
    "message_id" TEXT NOT NULL,
    "attachment_key" TEXT NOT NULL,

    CONSTRAINT "message_attachments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_doctor_id_patient_id_key" ON "favorites"("doctor_id", "patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_user_id_key" ON "doctors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "doctor_schedules_doctor_id_key" ON "doctor_schedules"("doctor_id");

-- CreateIndex
CREATE UNIQUE INDEX "hospital_doctors_hospital_id_doctor_id_key" ON "hospital_doctors"("hospital_id", "doctor_id");

-- CreateIndex
CREATE UNIQUE INDEX "declarations_patient_id_key" ON "declarations"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "patients_user_id_key" ON "patients"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "chats_patient_id_doctor_id_key" ON "chats"("patient_id", "doctor_id");

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_model_id_fkey" FOREIGN KEY ("model_id") REFERENCES "appointments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctors" ADD CONSTRAINT "doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_schedules" ADD CONSTRAINT "doctor_schedules_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospital_doctors" ADD CONSTRAINT "hospital_doctors_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospital_doctors" ADD CONSTRAINT "hospital_doctors_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "declarations" ADD CONSTRAINT "declarations_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "declarations" ADD CONSTRAINT "declarations_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specializations" ADD CONSTRAINT "doctor_specializations_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "doctor_specializations" ADD CONSTRAINT "doctor_specializations_specialization_id_fkey" FOREIGN KEY ("specialization_id") REFERENCES "specializations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_vaccinations" ADD CONSTRAINT "patient_vaccinations_vaccination_id_fkey" FOREIGN KEY ("vaccination_id") REFERENCES "vaccinations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_vaccinations" ADD CONSTRAINT "patient_vaccinations_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_allergies" ADD CONSTRAINT "patient_allergies_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_allergies" ADD CONSTRAINT "patient_allergies_allergy_id_fkey" FOREIGN KEY ("allergy_id") REFERENCES "allergies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_conditions" ADD CONSTRAINT "patient_conditions_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_conditions" ADD CONSTRAINT "patient_conditions_condition_id_fkey" FOREIGN KEY ("condition_id") REFERENCES "conditions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialization_conditions" ADD CONSTRAINT "specialization_conditions_specialization_id_fkey" FOREIGN KEY ("specialization_id") REFERENCES "specializations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "specialization_conditions" ADD CONSTRAINT "specialization_conditions_condition_id_fkey" FOREIGN KEY ("condition_id") REFERENCES "conditions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chats" ADD CONSTRAINT "chats_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chat_messages" ADD CONSTRAINT "chat_messages_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message_attachments" ADD CONSTRAINT "message_attachments_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "chat_messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
