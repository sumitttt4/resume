'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { FileText, ArrowLeft, Save, Plus, Trash2 } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Form validation schema
const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().min(1, 'Phone number is required'),
    address: z.string().min(1, 'Address is required'),
    linkedinUrl: z.string().url('Valid URL required').optional().or(z.literal('')),
    summary: z.string().min(10, 'Summary must be at least 10 characters')
  }),
  experience: z.array(z.object({
    company: z.string().min(1, 'Company name is required'),
    position: z.string().min(1, 'Position is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    isCurrentRole: z.boolean()
  })),
  education: z.array(z.object({
    institution: z.string().min(1, 'Institution is required'),
    degree: z.string().min(1, 'Degree is required'),
    fieldOfStudy: z.string().min(1, 'Field of study is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required')
  })),
  skills: z.array(z.object({
    name: z.string().min(1, 'Skill name is required'),
    level: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert'])
  }))
})

type ResumeFormData = z.infer<typeof resumeSchema>

export default function EditPage() {
  const router = useRouter()
  const { resumeData, updatePersonalInfo, addExperience, addEducation, addSkill } = useAppStore()
  const [activeSection, setActiveSection] = useState<'personal' | 'experience' | 'education' | 'skills'>('personal')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),
    defaultValues: {
      personalInfo: resumeData.personalInfo,
      experience: resumeData.experience.length > 0 ? resumeData.experience : [
        { company: '', position: '', startDate: '', endDate: '', description: '', isCurrentRole: false }
      ],
      education: resumeData.education.length > 0 ? resumeData.education : [
        { institution: '', degree: '', fieldOfStudy: '', startDate: '', endDate: '' }
      ],
      skills: resumeData.skills.length > 0 ? resumeData.skills : [
        { name: '', level: 'Intermediate' as const }
      ]
    }
  })

  const { fields: experienceFields, append: addExperienceField, remove: removeExperienceField } = useFieldArray({
    control,
    name: 'experience'
  })

  const { fields: educationFields, append: addEducationField, remove: removeEducationField } = useFieldArray({
    control,
    name: 'education'
  })

  const { fields: skillFields, append: addSkillField, remove: removeSkillField } = useFieldArray({
    control,
    name: 'skills'
  })

  const onSubmit = (data: ResumeFormData) => {
    // Update store with form data
    updatePersonalInfo(data.personalInfo)
    
    // Add experience, education, and skills
    data.experience.forEach(exp => {
      if (exp.company && exp.position) {
        addExperience(exp)
      }
    })
    
    data.education.forEach(edu => {
      if (edu.institution && edu.degree) {
        addEducation(edu)
      }
    })
    
    data.skills.forEach(skill => {
      if (skill.name) {
        addSkill(skill)
      }
    })
    
    // Navigate to templates
    router.push('/templates')
  }

  const handleBack = () => {
    router.push('/templates')
  }

  const sectionTabs = [
    { id: 'personal', label: 'Personal Info', icon: FileText },
    { id: 'experience', label: 'Experience', icon: FileText },
    { id: 'education', label: 'Education', icon: FileText },
    { id: 'skills', label: 'Skills', icon: FileText }
  ] as const

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="w-full py-6 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Edit Resume</h1>
          </div>
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Templates
          </Button>
        </div>
      </header>

      <main className="w-full max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Section Tabs */}
          <div className="flex flex-wrap justify-center border-b border-gray-200">
            {sectionTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id)}
                className={`px-6 py-3 font-medium text-sm transition-colors border-b-2 ${
                  activeSection === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Personal Information */}
          {activeSection === 'personal' && (
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...register('personalInfo.fullName')}
                      className={errors.personalInfo?.fullName ? 'border-red-500' : ''}
                    />
                    {errors.personalInfo?.fullName && (
                      <p className="text-sm text-red-600">{errors.personalInfo.fullName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register('personalInfo.email')}
                      className={errors.personalInfo?.email ? 'border-red-500' : ''}
                    />
                    {errors.personalInfo?.email && (
                      <p className="text-sm text-red-600">{errors.personalInfo.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      {...register('personalInfo.phone')}
                      className={errors.personalInfo?.phone ? 'border-red-500' : ''}
                    />
                    {errors.personalInfo?.phone && (
                      <p className="text-sm text-red-600">{errors.personalInfo.phone.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="address">Address *</Label>
                    <Input
                      id="address"
                      {...register('personalInfo.address')}
                      className={errors.personalInfo?.address ? 'border-red-500' : ''}
                    />
                    {errors.personalInfo?.address && (
                      <p className="text-sm text-red-600">{errors.personalInfo.address.message}</p>
                    )}
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      {...register('personalInfo.linkedinUrl')}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="summary">Professional Summary *</Label>
                  <Textarea
                    id="summary"
                    rows={4}
                    {...register('personalInfo.summary')}
                    className={errors.personalInfo?.summary ? 'border-red-500' : ''}
                    placeholder="Write a brief summary of your professional background and key achievements..."
                  />
                  {errors.personalInfo?.summary && (
                    <p className="text-sm text-red-600">{errors.personalInfo.summary.message}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Experience Section */}
          {activeSection === 'experience' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Work Experience</CardTitle>
                <Button
                  type="button"
                  onClick={() => addExperienceField({
                    company: '',
                    position: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                    isCurrentRole: false
                  })}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Experience
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {experienceFields.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Experience {index + 1}</h3>
                      {experienceFields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeExperienceField(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Company *</Label>
                        <Input {...register(`experience.${index}.company`)} />
                      </div>
                      <div>
                        <Label>Position *</Label>
                        <Input {...register(`experience.${index}.position`)} />
                      </div>
                      <div>
                        <Label>Start Date *</Label>
                        <Input type="month" {...register(`experience.${index}.startDate`)} />
                      </div>
                      <div>
                        <Label>End Date *</Label>
                        <Input type="month" {...register(`experience.${index}.endDate`)} />
                      </div>
                    </div>
                    <div>
                      <Label>Description *</Label>
                      <Textarea
                        rows={3}
                        {...register(`experience.${index}.description`)}
                        placeholder="• Led development of microservices architecture serving 1M+ users&#10;• Mentored 3 junior engineers and improved team productivity by 40%"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        {...register(`experience.${index}.isCurrentRole`)}
                        className="rounded"
                      />
                      <Label>This is my current role</Label>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Education Section */}
          {activeSection === 'education' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Education</CardTitle>
                <Button
                  type="button"
                  onClick={() => addEducationField({
                    institution: '',
                    degree: '',
                    fieldOfStudy: '',
                    startDate: '',
                    endDate: ''
                  })}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Education
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {educationFields.map((field, index) => (
                  <div key={field.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">Education {index + 1}</h3>
                      {educationFields.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeEducationField(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Institution *</Label>
                        <Input {...register(`education.${index}.institution`)} />
                      </div>
                      <div>
                        <Label>Degree *</Label>
                        <Input {...register(`education.${index}.degree`)} />
                      </div>
                      <div>
                        <Label>Field of Study *</Label>
                        <Input {...register(`education.${index}.fieldOfStudy`)} />
                      </div>
                      <div>
                        <Label>Start Date *</Label>
                        <Input type="month" {...register(`education.${index}.startDate`)} />
                      </div>
                      <div>
                        <Label>End Date *</Label>
                        <Input type="month" {...register(`education.${index}.endDate`)} />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Skills</CardTitle>
                <Button
                  type="button"
                  onClick={() => addSkillField({ name: '', level: 'Intermediate' })}
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Skill
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillFields.map((field, index) => (
                  <div key={field.id} className="flex items-center space-x-4">
                    <div className="flex-1">
                      <Input
                        {...register(`skills.${index}.name`)}
                        placeholder="e.g., JavaScript, Project Management"
                      />
                    </div>
                    <div className="w-32">
                      <select
                        {...register(`skills.${index}.level`)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                    {skillFields.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSkillField(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Save Button */}
          <div className="flex justify-center">
            <Button type="submit" size="lg" className="px-8 py-3 text-lg font-semibold">
              <Save className="mr-2 h-5 w-5" />
              Save & Continue to Templates
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}