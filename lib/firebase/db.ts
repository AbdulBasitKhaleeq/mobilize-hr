import { db } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  increment,
  arrayUnion
} from 'firebase/firestore';

// User Types
export type UserRole = 'admin' | 'hr_manager' | 'interviewer';
export type UserStatus = 'active' | 'inactive';

export interface UserPermissions {
  canViewUsers: boolean;
  canEditUsers: boolean;
  canDeleteUsers: boolean;
  canCreateUsers: boolean;
  canViewDepartments: boolean;
  canEditDepartments: boolean;
  canDeleteDepartments: boolean;
  canCreateDepartments: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  status: UserStatus;
  createdAt: Date;
  lastActiveAt: Date;
  permissions: {
    canViewUsers: boolean;
    canEditUsers: boolean;
    canDeleteUsers: boolean;
    canCreateUsers: boolean;
    canViewDepartments: boolean;
    canEditDepartments: boolean;
    canDeleteDepartments: boolean;
    canCreateDepartments: boolean;
  };
}

// Job Types
export type JobStatus = 'draft' | 'published' | 'closed';
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'temporary';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'lead' | 'executive';

export interface Job {
  id: string;
  title: string;
  department: string;
  team?: string;
  type: JobType;
  experienceLevel: ExperienceLevel;
  location: string;
  isRemote: boolean;
  remoteRegions?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryVisible: boolean;
  benefits?: string;
  summary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  skills: string[];
  education: string;
  certifications: string;
  status: JobStatus;
  createdAt: Date;
  updatedAt: Date;
  postedAt?: Date;
  expiresAt?: Date;
  createdBy: string; // User ID
  interviewers: string[]; // User IDs
  hrManagers: string[]; // User IDs
  applicationsCount: number;
}

// Applicant Types
export type ApplicantStatus = 'new' | 'review' | 'interview' | 'offer' | 'rejected';
export type ApplicantStage = 'New Application' | 'Application Review' | 'Technical Interview' | 'Final Interview' | 'Offer Extended' | 'Rejected';

export interface Applicant {
  id: string;
  name: string;
  email: string;
  position: string;
  jobId: string;
  status: ApplicantStatus;
  stage: ApplicantStage;
  appliedDate: Date;
  matchScore: number;
  resume: boolean;
  coverLetter: boolean;
  portfolio: boolean;
  notes?: string;
  interviewers?: string[]; // User IDs
  hrManager?: string; // User ID
  feedback?: {
    interviewerId: string;
    rating: number;
    comments: string;
    date: Date;
  }[];
}

// Collections
const USERS_COLLECTION = 'users';
const DEPARTMENTS_COLLECTION = 'departments';
const JOBS_COLLECTION = 'jobs';
const APPLICANTS_COLLECTION = 'applicants';

// User Operations
export const userService = {
  // Get all users with optional filters
  async getUsers(filters?: {
    role?: UserRole;
    status?: UserStatus;
    department?: string;
  }) {
    let q = query(collection(db, USERS_COLLECTION), orderBy('name'));
    
    if (filters?.role) {
      q = query(q, where('role', '==', filters.role));
    }
    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters?.department) {
      q = query(q, where('department', '==', filters.department));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      lastActive: doc.data().lastActive?.toDate(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as User[];
  },

  // Get a single user by ID
  async getUserById(id: string): Promise<User | null> {
    const docRef = doc(db, USERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
      lastActive: docSnap.data().lastActive?.toDate(),
      createdAt: docSnap.data().createdAt?.toDate(),
      updatedAt: docSnap.data().updatedAt?.toDate(),
    } as User;
  },

  // Create a new user
  async createUser(userData: Omit<User, 'createdAt' | 'updatedAt'>): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, userData.id);
    const newUser = {
      ...userData,
      permissions: {
        canViewUsers: userData.role === 'admin' || userData.role === 'hr_manager',
        canEditUsers: userData.role === 'admin' || userData.role === 'hr_manager',
        canDeleteUsers: userData.role === 'admin',
        canCreateUsers: userData.role === 'admin' || userData.role === 'hr_manager',
        canViewDepartments: userData.role === 'admin' || userData.role === 'hr_manager',
        canEditDepartments: userData.role === 'admin',
        canDeleteDepartments: userData.role === 'admin',
        canCreateDepartments: userData.role === 'admin',
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(docRef, newUser);
  },

  // Update a user
  async updateUser(id: string, userData: Partial<User>): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, id);
    const updateData = {
      ...userData,
      updatedAt: serverTimestamp(),
    };
    
    if (userData.role) {
      // Update permissions based on role
      updateData.permissions = {
        canViewUsers: userData.role === 'admin' || userData.role === 'hr_manager',
        canEditUsers: userData.role === 'admin' || userData.role === 'hr_manager',
        canDeleteUsers: userData.role === 'admin',
        canCreateUsers: userData.role === 'admin' || userData.role === 'hr_manager',
        canViewDepartments: userData.role === 'admin' || userData.role === 'hr_manager',
        canEditDepartments: userData.role === 'admin',
        canDeleteDepartments: userData.role === 'admin',
        canCreateDepartments: userData.role === 'admin',
      };
    }
    
    await updateDoc(docRef, updateData);
  },

  // Delete a user
  async deleteUser(id: string): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, id);
    await deleteDoc(docRef);
  },

  // Update user status
  async updateUserStatus(id: string, status: UserStatus): Promise<void> {
    const docRef = doc(db, USERS_COLLECTION, id);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp(),
    });
  },

  // Search users
  async searchUsers(searchTerm: string): Promise<User[]> {
    const users = await this.getUsers();
    return users.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
};

// Department Operations
export const departmentService = {
  // Get all departments
  async getDepartments() {
    const snapshot = await getDocs(collection(db, DEPARTMENTS_COLLECTION));
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
};

// Job Operations
export const jobService = {
  // Get all jobs with optional filters
  async getJobs(filters?: {
    status?: JobStatus;
    department?: string;
    type?: JobType;
  }) {
    let q = query(collection(db, JOBS_COLLECTION), orderBy('createdAt', 'desc'));
    
    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters?.department) {
      q = query(q, where('department', '==', filters.department));
    }
    if (filters?.type) {
      q = query(q, where('type', '==', filters.type));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
      postedAt: doc.data().postedAt?.toDate(),
      expiresAt: doc.data().expiresAt?.toDate(),
    })) as Job[];
  },

  // Get a single job by ID
  async getJobById(id: string): Promise<Job | null> {
    const docRef = doc(db, JOBS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt?.toDate(),
      updatedAt: docSnap.data().updatedAt?.toDate(),
      postedAt: docSnap.data().postedAt?.toDate(),
      expiresAt: docSnap.data().expiresAt?.toDate(),
    } as Job;
  },

  // Create a new job
  async createJob(jobData: Omit<Job, 'id' | 'createdAt' | 'updatedAt' | 'applicationsCount'>): Promise<string> {
    const docRef = doc(collection(db, JOBS_COLLECTION));
    const newJob = {
      ...jobData,
      applicationsCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
    
    await setDoc(docRef, newJob);
    return docRef.id;
  },

  // Update a job
  async updateJob(id: string, jobData: Partial<Job>): Promise<void> {
    const docRef = doc(db, JOBS_COLLECTION, id);
    const updateData = {
      ...jobData,
      updatedAt: serverTimestamp(),
    };
    
    await updateDoc(docRef, updateData);
  },

  // Delete a job
  async deleteJob(id: string): Promise<void> {
    const docRef = doc(db, JOBS_COLLECTION, id);
    await deleteDoc(docRef);
  },

  // Update job status
  async updateJobStatus(id: string, status: JobStatus): Promise<void> {
    const docRef = doc(db, JOBS_COLLECTION, id);
    const updateData: Partial<Job> = {
      status,
      updatedAt: serverTimestamp(),
    };

    if (status === 'published') {
      updateData.postedAt = serverTimestamp();
    } else if (status === 'closed') {
      updateData.expiresAt = serverTimestamp();
    }
    
    await updateDoc(docRef, updateData);
  },

  // Increment applications count
  async incrementApplicationsCount(id: string): Promise<void> {
    const docRef = doc(db, JOBS_COLLECTION, id);
    await updateDoc(docRef, {
      applicationsCount: increment(1),
      updatedAt: serverTimestamp(),
    });
  },

  // Search jobs
  async searchJobs(searchTerm: string): Promise<Job[]> {
    const jobs = await this.getJobs();
    return jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
};

// Applicant Operations
export const applicantService = {
  // Get all applicants with optional filters
  async getApplicants(filters?: {
    status?: ApplicantStatus;
    jobId?: string;
    searchTerm?: string;
  }) {
    let q = query(collection(db, APPLICANTS_COLLECTION), orderBy('appliedDate', 'desc'));
    
    if (filters?.status) {
      q = query(q, where('status', '==', filters.status));
    }
    if (filters?.jobId) {
      q = query(q, where('jobId', '==', filters.jobId));
    }

    const snapshot = await getDocs(q);
    let applicants = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      appliedDate: doc.data().appliedDate?.toDate(),
      feedback: doc.data().feedback?.map((f: any) => ({
        ...f,
        date: f.date?.toDate(),
      })),
    })) as Applicant[];

    if (filters?.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      applicants = applicants.filter(applicant =>
        applicant.name.toLowerCase().includes(searchTerm) ||
        applicant.email.toLowerCase().includes(searchTerm) ||
        applicant.position.toLowerCase().includes(searchTerm)
      );
    }

    return applicants;
  },

  // Get a single applicant by ID
  async getApplicantById(id: string): Promise<Applicant | null> {
    const docRef = doc(db, APPLICANTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
      appliedDate: docSnap.data().appliedDate?.toDate(),
      feedback: docSnap.data().feedback?.map((f: any) => ({
        ...f,
        date: f.date?.toDate(),
      })),
    } as Applicant;
  },

  // Create a new applicant
  async createApplicant(applicantData: Omit<Applicant, 'id' | 'appliedDate'>): Promise<string> {
    const docRef = doc(collection(db, APPLICANTS_COLLECTION));
    const newApplicant = {
      ...applicantData,
      appliedDate: serverTimestamp(),
    };
    
    await setDoc(docRef, newApplicant);
    
    // Increment applications count for the job
    await jobService.incrementApplicationsCount(applicantData.jobId);
    
    return docRef.id;
  },

  // Update an applicant
  async updateApplicant(id: string, applicantData: Partial<Applicant>): Promise<void> {
    const docRef = doc(db, APPLICANTS_COLLECTION, id);
    await updateDoc(docRef, applicantData);
  },

  // Update applicant status
  async updateApplicantStatus(id: string, status: ApplicantStatus, stage: ApplicantStage): Promise<void> {
    const docRef = doc(db, APPLICANTS_COLLECTION, id);
    await updateDoc(docRef, {
      status,
      stage,
      updatedAt: serverTimestamp(),
    });
  },

  // Add interview feedback
  async addInterviewFeedback(
    applicantId: string,
    feedback: {
      interviewerId: string;
      rating: number;
      comments: string;
    }
  ): Promise<void> {
    const docRef = doc(db, APPLICANTS_COLLECTION, applicantId);
    await updateDoc(docRef, {
      feedback: arrayUnion({
        ...feedback,
        date: serverTimestamp(),
      }),
    });
  },

  // Delete an applicant
  async deleteApplicant(id: string): Promise<void> {
    const docRef = doc(db, APPLICANTS_COLLECTION, id);
    await deleteDoc(docRef);
  },
}; 