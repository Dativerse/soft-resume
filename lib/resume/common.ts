// Content shared by every CV variant.
import type { EducationItem, PersonalInfo } from "./types";

export const personal: PersonalInfo = {
  name: "Nguyễn Văn Đạt",
  title: "Product Software Engineer",
  email: "dativerse@gmail.com",
  phone: "+84 775702201",
  location: "Ho Chi Minh, Vietnam",
  github: null,
  linkedin: "https://www.linkedin.com/in/envidat/",
  website: null,
};

export const commonEducation: EducationItem[] = [
  {
    institution: "University of Information Technology",
    degree: "Bachelor of Engineering, Software Engineering",
    location: "Ho Chi Minh City, Vietnam",
    graduationYear: "2023",
    startYear: "2019",
  },
];

export const commonCertifications = [
  "AWS Certified Developer - Associate (Dec 2024)",
  "AWS Certified Solutions Architect - Associate (Oct 2023)",
];
