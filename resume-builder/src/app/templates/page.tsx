'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Download, 
  ArrowLeft, 
  Eye, 
  Star, 
  CheckCircle2, 
  Moon, 
  Sun,
  Palette,
  Zap,
  Award
} from 'lucide-react'
import { useAppStore, RESUME_TEMPLATES } from '@/lib/store'

// Mock resume data for preview
const MOCK_RESUME_DATA = {
  personalInfo: {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: 'San Francisco, CA',
    linkedinUrl: 'https://linkedin.com/in/sarahjohnson',
    summary: 'Experienced software engineer with 5+ years of experience building scalable web applications and leading cross-functional teams. Passionate about creating user-centered solutions and driving technical innovation.'
  },
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      position: 'Senior Software Engineer',
      startDate: '2021-03',
      endDate: '2024-12',
      isCurrentRole: true,
      description: '• Led development of microservices architecture serving 1M+ users\n• Mentored 3 junior engineers and improved team productivity by 40%\n• Implemented CI/CD pipeline reducing deployment time by 60%'
    },
    {
      id: '2',
      company: 'StartupXYZ',
      position: 'Full Stack Developer',
      startDate: '2019-06',
      endDate: '2021-02',
      isCurrentRole: false,
      description: '• Built responsive web applications using React and Node.js\n• Collaborated with design team to implement pixel-perfect UIs\n• Optimized database queries improving application performance by 50%'
    }
  ],
  education: [
    {
      id: '1',
      institution: 'University of California, Berkeley',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      startDate: '2015-09',
      endDate: '2019-05'
    }
  ],
  skills: [
    { id: '1', name: 'JavaScript', level: 'Expert' as const },
    { id: '2', name: 'React', level: 'Expert' as const },
    { id: '3', name: 'Node.js', level: 'Advanced' as const },
    { id: '4', name: 'Python', level: 'Advanced' as const },
    { id: '5', name: 'AWS', level: 'Intermediate' as const }
  ]
}

export default function TemplatesPage() {
  const router = useRouter()
  const { 
    selectedTemplate, 
    setSelectedTemplate, 
    resumeData, 
    isDarkMode, 
    toggleDarkMode,
    setCurrentStep 
  } = useAppStore()
  
  const [showPreview, setShowPreview] = useState(false)
  const [isATSMode, setIsATSMode] = useState(false)
  
  // Use mock data if no real data exists
  const displayData = resumeData.personalInfo.fullName ? resumeData : MOCK_RESUME_DATA

  const handleTemplateSelect = (template: typeof RESUME_TEMPLATES[0]) => {
    setSelectedTemplate(template)
    setShowPreview(true)
  }

  const handleDownloadPDF = () => {
    // In a real app, you would generate and download a PDF here
    console.log('Downloading PDF with template:', selectedTemplate?.id)
    alert('PDF download functionality would be implemented here using libraries like jsPDF or Puppeteer')
  }

  const handleBack = () => {
    setCurrentStep(1)
    router.push('/input-method')
  }

  const ATSResumeView = () => (
    <div className="bg-white p-8 text-black text-sm leading-relaxed max-w-[8.5in] mx-auto min-h-[11in]">
      {/* Personal Information */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold mb-2">{displayData.personalInfo.fullName}</h1>
        <div className="space-y-1">
          <p>{displayData.personalInfo.email} | {displayData.personalInfo.phone}</p>
          <p>{displayData.personalInfo.address}</p>
          {displayData.personalInfo.linkedinUrl && (
            <p>{displayData.personalInfo.linkedinUrl}</p>
          )}
        </div>
      </div>

      {/* Summary */}
      {displayData.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-gray-300 pb-1">PROFESSIONAL SUMMARY</h2>
          <p>{displayData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {displayData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-gray-300 pb-1">PROFESSIONAL EXPERIENCE</h2>
          {displayData.experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">{exp.position}</h3>
                <span className="text-sm">
                  {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="font-semibold mb-2">{exp.company}</p>
              <div className="whitespace-pre-line text-sm">{exp.description}</div>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {displayData.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-2 border-b border-gray-300 pb-1">EDUCATION</h2>
          {displayData.education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold">{edu.degree} in {edu.fieldOfStudy}</h3>
                  <p>{edu.institution}</p>
                </div>
                <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {displayData.skills.length > 0 && (
        <div>
          <h2 className="text-lg font-bold mb-2 border-b border-gray-300 pb-1">TECHNICAL SKILLS</h2>
          <p>{displayData.skills.map(skill => skill.name).join(', ')}</p>
        </div>
      )}
    </div>
  )

  const ModernResumeView = () => (
    <div className="bg-white p-8 text-gray-900 max-w-[8.5in] mx-auto min-h-[11in] border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 -m-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">{displayData.personalInfo.fullName}</h1>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p>{displayData.personalInfo.email}</p>
            <p>{displayData.personalInfo.phone}</p>
          </div>
          <div>
            <p>{displayData.personalInfo.address}</p>
            {displayData.personalInfo.linkedinUrl && (
              <p className="truncate">{displayData.personalInfo.linkedinUrl}</p>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {displayData.personalInfo.summary && (
        <div className="mb-6">
          <h2 className="text-xl font-bold text-blue-600 mb-3">Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{displayData.personalInfo.summary}</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-2">
          {/* Experience */}
          {displayData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-600 mb-3">Experience</h2>
              {displayData.experience.map((exp) => (
                <div key={exp.id} className="mb-4 border-l-2 border-blue-200 pl-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-lg">{exp.position}</h3>
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="font-semibold text-blue-600 mb-2">{exp.company}</p>
                  <div className="whitespace-pre-line text-sm text-gray-700">{exp.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div>
          {/* Education */}
          {displayData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-blue-600 mb-3">Education</h2>
              {displayData.education.map((edu) => (
                <div key={edu.id} className="mb-3 p-3 bg-gray-50 rounded">
                  <h3 className="font-bold text-sm">{edu.degree}</h3>
                  <p className="text-xs text-gray-600">{edu.fieldOfStudy}</p>
                  <p className="text-xs font-semibold">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {displayData.skills.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-blue-600 mb-3">Skills</h2>
              <div className="space-y-2">
                {displayData.skills.map((skill) => (
                  <div key={skill.id} className="bg-gray-50 p-2 rounded">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-gray-500">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-blue-600 h-1 rounded-full"
                        style={{ 
                          width: skill.level === 'Expert' ? '100%' : 
                                 skill.level === 'Advanced' ? '80%' : 
                                 skill.level === 'Intermediate' ? '60%' : '40%' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const CreativeResumeView = () => (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 text-gray-900 max-w-[8.5in] mx-auto min-h-[11in] border border-purple-200">
      {/* Creative Header */}
      <div className="text-center mb-8 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform rotate-1 rounded-lg"></div>
        <div className="relative bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            {displayData.personalInfo.fullName}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <span>{displayData.personalInfo.email}</span>
            <span>•</span>
            <span>{displayData.personalInfo.phone}</span>
            <span>•</span>
            <span>{displayData.personalInfo.address}</span>
          </div>
        </div>
      </div>

      {/* Summary with Creative Design */}
      {displayData.personalInfo.summary && (
        <div className="mb-6 bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-500">
          <h2 className="text-2xl font-bold text-purple-600 mb-3 flex items-center">
            <Star className="mr-2 h-6 w-6" />
            About Me
          </h2>
          <p className="text-gray-700 leading-relaxed italic">{displayData.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience with Creative Layout */}
      {displayData.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-purple-600 mb-4 flex items-center">
            <Award className="mr-2 h-6 w-6" />
            Experience
          </h2>
          <div className="space-y-4">
            {displayData.experience.map((exp, index) => (
              <div key={exp.id} className="bg-white rounded-lg p-6 shadow-md transform hover:scale-105 transition-transform">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                    <p className="text-lg font-semibold text-purple-600">{exp.company}</p>
                  </div>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm">
                    {exp.startDate} - {exp.isCurrentRole ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="whitespace-pre-line text-gray-700">{exp.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills and Education in a Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Education */}
        {displayData.education.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold text-purple-600 mb-3">Education</h2>
            {displayData.education.map((edu) => (
              <div key={edu.id} className="border-b border-gray-200 pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0">
                <h3 className="font-bold">{edu.degree}</h3>
                <p className="text-purple-600 font-semibold">{edu.fieldOfStudy}</p>
                <p className="text-gray-600">{edu.institution}</p>
                <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {displayData.skills.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold text-purple-600 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {displayData.skills.map((skill) => (
                <span 
                  key={skill.id} 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50'
    }`}>
      {/* Header */}
      <header className={`w-full py-6 px-4 backdrop-blur-sm border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-gray-800/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className={`h-8 w-8 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              ResumeBuilder Pro
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={toggleDarkMode}
              className="p-2"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="outline" onClick={() => router.push('/auth')}>
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              ✓
            </div>
            <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Choose Method
            </span>
          </div>
          <div className="w-12 h-0.5 bg-blue-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              ✓
            </div>
            <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Input Details
            </span>
          </div>
          <div className="w-12 h-0.5 bg-blue-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              3
            </div>
            <span className={`ml-2 text-sm text-blue-600 font-semibold`}>
              Select Template
            </span>
          </div>
        </div>
      </div>

      <main className="w-full max-w-7xl mx-auto px-4 py-8">
        {!showPreview ? (
          /* Template Selection */
          <div>
            <div className="text-center mb-12">
              <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Choose Your Resume Template
              </h2>
              <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Select a professional template that matches your style and industry. 
                All templates are optimized for both ATS systems and human reviewers.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {RESUME_TEMPLATES.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
                    selectedTemplate?.id === template.id 
                      ? 'ring-2 ring-blue-500 shadow-xl transform scale-105' 
                      : 'hover:shadow-lg hover:transform hover:scale-105'
                  } ${isDarkMode ? 'bg-gray-800 border-gray-700' : ''}`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={`mx-auto mb-4 p-4 rounded-full w-16 h-16 flex items-center justify-center ${
                      template.id === 'ats-minimal' ? 'bg-green-100' :
                      template.id === 'modern-professional' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      {template.id === 'ats-minimal' && <Zap className="h-8 w-8 text-green-600" />}
                      {template.id === 'modern-professional' && <Palette className="h-8 w-8 text-blue-600" />}
                      {template.id === 'creative-designer' && <Star className="h-8 w-8 text-purple-600" />}
                    </div>
                    <CardTitle className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {template.name}
                    </CardTitle>
                    <CardDescription className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {template.isATS && (
                        <div className="flex items-center text-sm text-green-600">
                          <CheckCircle2 className="h-4 w-4 mr-2" />
                          ATS-Optimized
                        </div>
                      )}
                      <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        PDF Export Ready
                      </div>
                      <div className={`flex items-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Professional Layout
                      </div>
                    </div>
                    <Button 
                      className="w-full"
                      variant={selectedTemplate?.id === template.id ? "default" : "outline"}
                    >
                      {selectedTemplate?.id === template.id ? 'Selected' : 'Select Template'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleBack}
                className="px-6 py-3"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
              
              <Button 
                size="lg" 
                className="px-8 py-3 text-lg font-semibold"
                onClick={() => selectedTemplate && setShowPreview(true)}
                disabled={!selectedTemplate}
              >
                Preview Resume
                <Eye className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          /* Resume Preview */
          <div>
            <div className="text-center mb-8">
              <h2 className={`text-4xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Resume Preview
              </h2>
              <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Review your resume and download as PDF when ready
              </p>
            </div>

            {/* Template Controls */}
            <div className="flex justify-center mb-6 space-x-4">
              <Button
                variant={isATSMode ? "outline" : "default"}
                onClick={() => setIsATSMode(false)}
              >
                Styled View
              </Button>
              <Button
                variant={isATSMode ? "default" : "outline"}
                onClick={() => setIsATSMode(true)}
              >
                ATS-Friendly View
              </Button>
            </div>

            {/* Resume Preview */}
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg mb-8 overflow-hidden">
              <div className="h-[800px] overflow-y-auto">
                {isATSMode ? (
                  <ATSResumeView />
                ) : selectedTemplate?.id === 'modern-professional' ? (
                  <ModernResumeView />
                ) : selectedTemplate?.id === 'creative-designer' ? (
                  <CreativeResumeView />
                ) : (
                  <ATSResumeView />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center max-w-4xl mx-auto">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => setShowPreview(false)}
                className="px-6 py-3"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Templates
              </Button>
              
              <div className="space-x-4">
                <Button 
                  variant="outline"
                  size="lg" 
                  className="px-6 py-3"
                  onClick={() => router.push('/edit')}
                >
                  Edit Resume
                </Button>
                <Button 
                  size="lg" 
                  className="px-8 py-3 text-lg font-semibold bg-green-600 hover:bg-green-700"
                  onClick={handleDownloadPDF}
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}