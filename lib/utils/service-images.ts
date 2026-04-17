import type { StaticImageData } from "next/image";
import fluVaccineImage from "@/public/services/flu-vaccine.jpeg";
import covidVaccineImage from "@/public/services/covid-vaccine.jpg";
import pressureCheckImage from "@/public/services/pressure-check.jpg";
import stopSmokingImage from "@/public/services/stop-smoking.jpg";
import emergencyContraceptionImage from "@/public/services/emergency-contraception.jpg";

const DEFAULT = fluVaccineImage;

/** Maps Firestore `services` document id → hero image (content stays in Firestore; visuals stay in code). */
export const SERVICE_IMAGE_BY_ID: Record<string, StaticImageData> = {
  flu_vaccination_nhs: fluVaccineImage,
  flu_vaccination_private: fluVaccineImage,
  covid_19_vaccination_nhs: covidVaccineImage,
  covid_19_vaccination_private: covidVaccineImage,
  blood_pressure_check: pressureCheckImage,
  stop_smoking_nhs: stopSmokingImage,
  stop_smoking_private: stopSmokingImage,
  emergency_contraception_nhs: emergencyContraceptionImage,
  emergency_contraception_private: emergencyContraceptionImage,
  nhs_pharmacy_contraception_service: emergencyContraceptionImage,
  inhaler_disposal: fluVaccineImage,
  medical_supplies_appliances: fluVaccineImage,
  medical_supplies_review_service: fluVaccineImage,
  needle_syringe_exchange: fluVaccineImage,
  new_medicine_service: fluVaccineImage,
  online_repeat_prescription_management: fluVaccineImage,
  prescription_delivery_service: fluVaccineImage,
  stoma_bag_support_service: fluVaccineImage,
  covid_19_lateral_flow_tests: covidVaccineImage,
  hepatitis_b: fluVaccineImage,
  meningitis_b: fluVaccineImage,
  travel_health: fluVaccineImage,
  weight_management_private: pressureCheckImage,
};

export function getServiceImage(serviceId: string): StaticImageData {
  return SERVICE_IMAGE_BY_ID[serviceId] ?? DEFAULT;
}
