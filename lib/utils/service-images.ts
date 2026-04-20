import type { StaticImageData } from "next/image";
import fluVaccineImage from "@/public/services/flu-vaccine.jpeg";
import covidVaccineImage from "@/public/services/covid-vaccine.jpg";
import pressureCheckImage from "@/public/services/pressure-check.jpg";
import stopSmokingImage from "@/public/services/stop-smoking.jpg";
import emergencyContraceptionImage from "@/public/services/emergency-contraception.jpg";
import travelClinicImage from "@/public/services/travel-clinic.jpg";
import weightManagementImage from "@/public/services/weight-management.jpeg";
import contraceptionImage from "@/public/services/contraception.png";
import inhalerDisposalImage from "@/public/services/inhaler.png";
import medicalSuppliesAppliancesImage from "@/public/services/medical-appliances.jpg";
import medicalApplianceReviewImage from "@/public/services/medical-appliance-review.jpg";
import needleSyringeExchangeImage from "@/public/services/syringe-exchange.jpg";
import newMedicineServiceImage from "@/public/services/new-medicine.jpg";
import onlineRepeatPrescriptionManagementImage from "@/public/services/repeat-prescription.png";
import prescriptionDeliveryServiceImage from "@/public/services/prescription-delivery.png";
import stomaBagSupportServiceImage from "@/public/services/stoma-bag.jpg";
import covid19LateralFlowTestsImage from "@/public/services/covid-19-lateral-flow-tests.jpg";
import hepatitisBImage from "@/public/services/hepatitis-b-vaccine.jpg";
import meningitisBImage from "@/public/services/meningitis-b-vaccine.png";

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
  nhs_pharmacy_contraception_service: contraceptionImage,
  inhaler_disposal: inhalerDisposalImage,
  medical_supplies_appliances: medicalSuppliesAppliancesImage,
  medical_supplies_review_service: medicalApplianceReviewImage,
  needle_syringe_exchange: needleSyringeExchangeImage,
  new_medicine_service: newMedicineServiceImage,
  online_repeat_prescription_management:
    onlineRepeatPrescriptionManagementImage,
  prescription_delivery_service: prescriptionDeliveryServiceImage,
  stoma_bag_support_service: stomaBagSupportServiceImage,
  covid_19_lateral_flow_tests: covid19LateralFlowTestsImage,
  hepatitis_b: hepatitisBImage,
  meningitis_b: meningitisBImage,
  travel_health: travelClinicImage,
  weight_management_private: weightManagementImage,
};

export function getServiceImage(serviceId: string): StaticImageData {
  return SERVICE_IMAGE_BY_ID[serviceId] ?? DEFAULT;
}
