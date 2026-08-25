import { createContext, useContext, useState, useEffect} from "react";
import type {ReactNode} from "react";

import type { Student } from "../App";


interface StudentContextType {
  students: Student[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: "default" | "name" | "gpa";
  setSortBy: (sort: "default" | "name" | "gpa") => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  addStudent: (student: Student) => void;
  removeStudent: (id: string) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

const initialStudents: Student[] = [
  {id: "123", name: "Taneem", major: "Software Engineering", gpa: 3.96, credits: 145, avatar: getAvatar(3), courses: ["Advance Web Technologies", "Advance .Net", "SQT"], courseColors: ["#3498db","#2ecc71", "#e74c3c"]},
    {id: "154", name: "Sifat", major: "Network Engineering", gpa: 3.30, credits: 120, avatar: getAvatar(3), courses: ["CCNA", "Computer Networks", "Network Security"], courseColors: ["#3498db","#2ecc71", "#e74c3c"]},
    {id: "421", name: "Progga", major: "Data Science", gpa: 2.96, credits: 100, avatar: getAvatar(3), courses: ["Introduction to Data Science", "Data Mining", "Machine Learning"], courseColors: ["#3498db","#2ecc71", "#e74c3c"]},
    {id: "321", name: "Pritha", major: "Marketing", gpa: 3.20, credits: 100, avatar: getAvatar(3), courses: ["Finance", "MIS", "HRM"], courseColors: ["#3498db","#2ecc71", "#e74c3c"]},
    {id: "563", name: "Ryan", major: "Information System", gpa: 3.81, credits: 142, avatar: getAvatar(3), courses: ["Machine Learning", "BGT", "NLP"], courseColors: ["#3498db","#2ecc71", "#e74c3c"]},
];


function loadStudents(): Student[] {
  const stored = localStorage.getItem("students");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback
    }
  }
  return initialStudents;
}

export function StudentProvider({ children }: { children: ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"default" | "name" | "gpa">("default");
  const [favorites, setFavorites] = useState<string[]>([]);

  
  useEffect(() => {
    const savedStudents = loadStudents();
    setStudents(savedStudents);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("students", JSON.stringify(students));
    }
  }, [students, loading]);


  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

 
  const addStudent = (newStudent: Student) => {
    setStudents((prev) => [...prev, newStudent]);
  };


  const removeStudent = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    // Also remove from favorites if needed
    setFavorites((prev) => prev.filter((fav) => fav !== id));
  };


  const filteredStudents = students.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.name.toLowerCase().includes(query) ||
      student.major.toLowerCase().includes(query)
    );
  });

  let sortedStudents = [...filteredStudents];
  if (sortBy === "name") {
    sortedStudents.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "gpa") {
    sortedStudents.sort((a, b) => b.gpa - a.gpa);
  }

  return (
    <StudentContext.Provider
      value={{
        students: sortedStudents, 
        loading,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        favorites,
        toggleFavorite,
        addStudent,
        removeStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("useStudents must be used within a StudentProvider");
  }
  return context;
}