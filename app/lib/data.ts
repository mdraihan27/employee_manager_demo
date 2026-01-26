export interface Employee {
  id: string;
  name: string;
  role: string;
  department: string;
  location: string;
  email: string;
  status: "Active" | "On Leave" | "Remote";
  // New details
  phone: string;
  joiningDate: string;
  salary: string;
  bloodGroup: string;
}

export const initialEmployees: Employee[] = [
  { 
    id: "EMP-1001", name: "Rahim Uddin", role: "Software Engineer", department: "IT", location: "Dhaka", email: "rahim.u@example.com", status: "Active",
    phone: "01711223344", joiningDate: "2022-03-15", salary: "85,000 BDT", bloodGroup: "A+"
  },
  { 
    id: "EMP-1002", name: "Fatema Begum", role: "HR Manager", department: "HR", location: "Chittagong", email: "fatema.b@example.com", status: "Active",
    phone: "01822334455", joiningDate: "2021-06-01", salary: "95,000 BDT", bloodGroup: "B+"
  },
  { 
    id: "EMP-1003", name: "Tanvir Ahmed", role: "Product Designer", department: "Design", location: "Dhaka", email: "tanvir.a@example.com", status: "Remote",
    phone: "01933445566", joiningDate: "2023-01-10", salary: "70,000 BDT", bloodGroup: "O+"
  },
  { 
    id: "EMP-1004", name: "Nusrat Jahan", role: "Marketing Lead", department: "Marketing", location: "Sylhet", email: "nusrat.j@example.com", status: "On Leave",
    phone: "01644556677", joiningDate: "2020-11-20", salary: "105,000 BDT", bloodGroup: "AB+"
  },
  { 
    id: "EMP-1005", name: "Karim Sheikh", role: "Backend Developer", department: "IT", location: "Dhaka", email: "karim.s@example.com", status: "Active",
    phone: "01555667788", joiningDate: "2022-08-05", salary: "90,000 BDT", bloodGroup: "A-"
  },
  { 
    id: "EMP-1006", name: "Ayesha Siddiqua", role: "Data Analyst", department: "Data", location: "Rajshahi", email: "ayesha.s@example.com", status: "Active",
    phone: "01766778899", joiningDate: "2023-02-28", salary: "75,000 BDT", bloodGroup: "B-"
  },
  { 
    id: "EMP-1007", name: "Rafiqul Islam", role: "DevOps Engineer", department: "IT", location: "Dhaka", email: "rafiqul.i@example.com", status: "Remote",
    phone: "01877889900", joiningDate: "2021-12-12", salary: "110,000 BDT", bloodGroup: "O-"
  },
  { 
    id: "EMP-1008", name: "Sadia Rahman", role: "Content Writer", department: "Marketing", location: "Khulna", email: "sadia.r@example.com", status: "Active",
    phone: "01988990011", joiningDate: "2023-05-15", salary: "45,000 BDT", bloodGroup: "AB-"
  },
  { 
    id: "EMP-1009", name: "Mahmudul Hasan", role: "Frontend Developer", department: "IT", location: "Dhaka", email: "mahmudul.h@example.com", status: "Active",
    phone: "01699001122", joiningDate: "2022-10-01", salary: "80,000 BDT", bloodGroup: "A+"
  },
  { 
    id: "EMP-1010", name: "Farhana Akter", role: "UX Researcher", department: "Design", location: "Chittagong", email: "farhana.a@example.com", status: "On Leave",
    phone: "01511223344", joiningDate: "2021-04-20", salary: "85,000 BDT", bloodGroup: "B+"
  },
  { 
    id: "EMP-1011", name: "Kamal Hossain", role: "Sales Executive", department: "Sales", location: "Barisal", email: "kamal.h@example.com", status: "Active",
    phone: "01722334455", joiningDate: "2023-03-10", salary: "55,000 BDT", bloodGroup: "O+"
  },
  { 
    id: "EMP-1012", name: "Sharmin Sultana", role: "Accountant", department: "Finance", location: "Dhaka", email: "sharmin.s@example.com", status: "Active",
    phone: "01833445566", joiningDate: "2020-09-01", salary: "65,000 BDT", bloodGroup: "A+"
  },
  { 
    id: "EMP-1013", name: "Imran Khan", role: "Project Manager", department: "Management", location: "Dhaka", email: "imran.k@example.com", status: "Remote",
    phone: "01944556677", joiningDate: "2019-07-15", salary: "130,000 BDT", bloodGroup: "B+"
  },
  { 
    id: "EMP-1014", name: "Tasnim Fariha", role: "QA Engineer", department: "IT", location: "Sylhet", email: "tasnim.f@example.com", status: "Active",
    phone: "01655667788", joiningDate: "2022-11-30", salary: "70,000 BDT", bloodGroup: "AB+"
  },
  { 
    id: "EMP-1015", name: "Abdullah Al Mamun", role: "System Admin", department: "IT", location: "Dhaka", email: "abdullah.m@example.com", status: "Active",
    phone: "01566778899", joiningDate: "2021-02-14", salary: "60,000 BDT", bloodGroup: "O-"
  },
  { 
    id: "EMP-1016", name: "Meherun Nesa", role: "Legal Advisor", department: "Legal", location: "Dhaka", email: "meherun.n@example.com", status: "On Leave",
    phone: "01777889900", joiningDate: "2020-05-25", salary: "115,000 BDT", bloodGroup: "A-"
  },
  { 
    id: "EMP-1017", name: "Ziaur Rahman", role: "Business Analyst", department: "Business", location: "Chittagong", email: "ziaur.r@example.com", status: "Active",
    phone: "01888990011", joiningDate: "2022-01-10", salary: "95,000 BDT", bloodGroup: "B-"
  },
  { 
    id: "EMP-1018", name: "Rubina Yasmin", role: "Customer Support", department: "Support", location: "Dhaka", email: "rubina.y@example.com", status: "Active",
    phone: "01999001122", joiningDate: "2023-06-01", salary: "40,000 BDT", bloodGroup: "O+"
  },
  { 
    id: "EMP-1019", name: "Fahim Faisal", role: "Mobile Developer", department: "IT", location: "Rajshahi", email: "fahim.f@example.com", status: "Remote",
    phone: "01611223344", joiningDate: "2022-09-15", salary: "88,000 BDT", bloodGroup: "AB-"
  },
  { 
    id: "EMP-1020", name: "Salma Khatun", role: "Office Manager", department: "Admin", location: "Dhaka", email: "salma.k@example.com", status: "Active",
    phone: "01522334455", joiningDate: "2021-08-20", salary: "50,000 BDT", bloodGroup: "A+"
  },
];
