import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Types for resume data
export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  address: string
  linkedinUrl?: string
  summary: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  fieldOfStudy: string
  startDate: string
  endDate: string
  description?: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
  isCurrentRole: boolean
}

export interface Skill {
  id: string
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
}

export interface User {
  id: string
  email: string
  name: string
}

export interface ResumeTemplate {
  id: string
  name: string
  description: string
  preview: string
  isATS: boolean
}

// Store interface
interface AppState {
  // Auth state
  user: User | null
  isAuthenticated: boolean
  
  // Resume data
  resumeData: ResumeData
  selectedTemplate: ResumeTemplate | null
  inputMethod: 'upload' | 'manual' | 'linkedin' | null
  
  // UI state
  isDarkMode: boolean
  currentStep: number
  
  // Actions
  setUser: (user: User | null) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void
  addEducation: (education: Omit<Education, 'id'>) => void
  updateEducation: (id: string, education: Partial<Education>) => void
  removeEducation: (id: string) => void
  addExperience: (experience: Omit<Experience, 'id'>) => void
  updateExperience: (id: string, experience: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addSkill: (skill: Omit<Skill, 'id'>) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  removeSkill: (id: string) => void
  setSelectedTemplate: (template: ResumeTemplate) => void
  setInputMethod: (method: 'upload' | 'manual' | 'linkedin') => void
  toggleDarkMode: () => void
  setCurrentStep: (step: number) => void
  resetResumeData: () => void
}

// Initial resume data
const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    linkedinUrl: '',
    summary: ''
  },
  education: [],
  experience: [],
  skills: []
}

// Available templates
export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'ats-minimal',
    name: 'ATS-Friendly Minimal',
    description: 'Clean, simple format optimized for Applicant Tracking Systems',
    preview: '/templates/ats-minimal.png',
    isATS: true
  },
  {
    id: 'modern-professional',
    name: 'Modern Professional',
    description: 'Contemporary design with subtle colors and clean typography',
    preview: '/templates/modern-professional.png',
    isATS: false
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    description: 'Bold layout perfect for creative professionals and designers',
    preview: '/templates/creative-designer.png',
    isATS: false
  }
]

// Create the store
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      resumeData: initialResumeData,
      selectedTemplate: RESUME_TEMPLATES[0], // Default to ATS template
      inputMethod: null,
      isDarkMode: false,
      currentStep: 0,
      
      // Auth actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      
      login: async (email, password) => {
        // Mock authentication - replace with real auth
        if (email === 'demo@example.com' && password === 'password') {
          const user = { id: '1', email, name: 'Demo User' }
          set({ user, isAuthenticated: true })
          return true
        }
        return false
      },
      
      logout: () => set({ user: null, isAuthenticated: false }),
      
      // Resume data actions
      updatePersonalInfo: (info) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          personalInfo: { ...state.resumeData.personalInfo, ...info }
        }
      })),
      
      addEducation: (education) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: [...state.resumeData.education, { ...education, id: Date.now().toString() }]
        }
      })),
      
      updateEducation: (id, education) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.map(edu => 
            edu.id === id ? { ...edu, ...education } : edu
          )
        }
      })),
      
      removeEducation: (id) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          education: state.resumeData.education.filter(edu => edu.id !== id)
        }
      })),
      
      addExperience: (experience) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          experience: [...state.resumeData.experience, { ...experience, id: Date.now().toString() }]
        }
      })),
      
      updateExperience: (id, experience) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.map(exp => 
            exp.id === id ? { ...exp, ...experience } : exp
          )
        }
      })),
      
      removeExperience: (id) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          experience: state.resumeData.experience.filter(exp => exp.id !== id)
        }
      })),
      
      addSkill: (skill) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          skills: [...state.resumeData.skills, { ...skill, id: Date.now().toString() }]
        }
      })),
      
      updateSkill: (id, skill) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          skills: state.resumeData.skills.map(s => 
            s.id === id ? { ...s, ...skill } : s
          )
        }
      })),
      
      removeSkill: (id) => set((state) => ({
        resumeData: {
          ...state.resumeData,
          skills: state.resumeData.skills.filter(s => s.id !== id)
        }
      })),
      
      // UI actions
      setSelectedTemplate: (template) => set({ selectedTemplate: template }),
      setInputMethod: (method) => set({ inputMethod: method }),
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setCurrentStep: (step) => set({ currentStep: step }),
      resetResumeData: () => set({ resumeData: initialResumeData })
    }),
    {
      name: 'resume-builder-store',
      partialize: (state) => ({
        resumeData: state.resumeData,
        selectedTemplate: state.selectedTemplate,
        isDarkMode: state.isDarkMode,
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)