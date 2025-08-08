'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText, Upload, Edit3, Linkedin, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '@/lib/store'
import { useDropzone } from 'react-dropzone'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// LinkedIn URL validation schema
const linkedinSchema = z.object({
  linkedinUrl: z
    .string()
    .min(1, 'LinkedIn URL is required')
    .url('Please enter a valid URL')
    .refine((url) => url.includes('linkedin.com/in/'), {
      message: 'Please enter a valid LinkedIn profile URL'
    })
})

type LinkedinFormData = z.infer<typeof linkedinSchema>

export default function InputMethodPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { setInputMethod, setCurrentStep } = useAppStore()
  
  const [selectedMethod, setSelectedMethod] = useState<'upload' | 'manual' | 'linkedin' | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [linkedinUrl, setLinkedinUrl] = useState('')

  // LinkedIn form handling
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch
  } = useForm<LinkedinFormData>({
    resolver: zodResolver(linkedinSchema),
    mode: 'onChange'
  })

  const watchedLinkedinUrl = watch('linkedinUrl')

  // Check if method was pre-selected from landing page
  useEffect(() => {
    const method = searchParams.get('method')
    if (method === 'upload') {
      setSelectedMethod('upload')
    }
  }, [searchParams])

  // File upload handling
  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      setSelectedMethod('upload')
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1
  })

  const handleContinue = () => {
    if (selectedMethod) {
      setInputMethod(selectedMethod)
      setCurrentStep(2)
      
      if (selectedMethod === 'upload' && uploadedFile) {
        // In a real app, you'd process the uploaded file here
        console.log('Processing uploaded file:', uploadedFile.name)
      } else if (selectedMethod === 'linkedin' && isValid) {
        // In a real app, you'd fetch LinkedIn data here
        console.log('Processing LinkedIn profile:', watchedLinkedinUrl)
      }
      
      router.push('/templates')
    }
  }

  const handleBack = () => {
    setCurrentStep(0)
    router.push('/')
  }

  const onLinkedinSubmit = (data: LinkedinFormData) => {
    setLinkedinUrl(data.linkedinUrl)
    setSelectedMethod('linkedin')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <header className="w-full py-6 px-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">ResumeBuilder Pro</h1>
          </div>
          <Button variant="outline" onClick={() => router.push('/auth')}>
            Sign In
          </Button>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              ✓
            </div>
            <span className="ml-2 text-sm text-gray-600">Choose Method</span>
          </div>
          <div className="w-12 h-0.5 bg-blue-600"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              2
            </div>
            <span className="ml-2 text-sm text-blue-600 font-semibold">Input Details</span>
          </div>
          <div className="w-12 h-0.5 bg-gray-300"></div>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-sm">
              3
            </div>
            <span className="ml-2 text-sm text-gray-500">Select Template</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Choose How You Want to Create Your Resume
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the method that works best for you. You can always edit and customize your resume later.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Upload Resume Card */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedMethod === 'upload' 
                ? 'ring-2 ring-blue-500 shadow-xl' 
                : 'hover:shadow-lg'
            }`}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Upload Resume
              </CardTitle>
              <CardDescription className="text-gray-600">
                Import your existing PDF or DOCX resume
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div 
                {...getRootProps()} 
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400'
                } ${selectedMethod === 'upload' ? 'border-blue-500 bg-blue-50' : ''}`}
              >
                <input {...getInputProps()} />
                {uploadedFile ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="h-8 w-8 text-green-600 mx-auto" />
                    <p className="text-sm font-semibold text-gray-900">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto" />
                    <p className="text-sm text-gray-600">
                      {isDragActive ? 'Drop your resume here' : 'Drag & drop or click to upload'}
                    </p>
                    <p className="text-xs text-gray-500">PDF or DOCX (max 10MB)</p>
                  </div>
                )}
              </div>
              {uploadedFile && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-sm text-green-600">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    File uploaded successfully
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setUploadedFile(null)}
                  >
                    Remove file
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Manual Entry Card */}
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-xl ${
              selectedMethod === 'manual' 
                ? 'ring-2 ring-indigo-500 shadow-xl' 
                : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedMethod('manual')}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Edit3 className="h-8 w-8 text-indigo-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Type Manually
              </CardTitle>
              <CardDescription className="text-gray-600">
                Fill out forms with your information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                  Step-by-step guided process
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                  Helpful tips and suggestions
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                  Complete control over content
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                  Professional writing guidance
                </div>
              </div>
              {selectedMethod === 'manual' && (
                <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                  <div className="flex items-center text-sm text-indigo-700">
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Ready to create your resume manually
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* LinkedIn Profile Card */}
          <Card 
            className={`transition-all duration-300 hover:shadow-xl ${
              selectedMethod === 'linkedin' 
                ? 'ring-2 ring-green-500 shadow-xl' 
                : 'hover:shadow-lg'
            }`}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full w-16 h-16 flex items-center justify-center">
                <Linkedin className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-900">
                Share LinkedIn Profile
              </CardTitle>
              <CardDescription className="text-gray-600">
                Import data from your LinkedIn profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onLinkedinSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                  <Input
                    id="linkedinUrl"
                    placeholder="https://linkedin.com/in/yourprofile"
                    {...register('linkedinUrl')}
                    className={errors.linkedinUrl ? 'border-red-500' : ''}
                  />
                  {errors.linkedinUrl && (
                    <p className="text-sm text-red-600">{errors.linkedinUrl.message}</p>
                  )}
                </div>
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Make sure your profile is public</p>
                  <p>• We'll import your work experience and education</p>
                  <p>• You can edit everything afterward</p>
                </div>
                {isValid && watchedLinkedinUrl && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center text-sm text-green-700">
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      LinkedIn URL validated successfully
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Buttons */}
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
            onClick={handleContinue}
            disabled={!selectedMethod || (selectedMethod === 'linkedin' && !isValid)}
          >
            Continue
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Selected Method Summary */}
        {selectedMethod && (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Selected Method:</h3>
            <div className="flex items-center">
              {selectedMethod === 'upload' && (
                <>
                  <Upload className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-gray-700">
                    Upload Resume {uploadedFile && `(${uploadedFile.name})`}
                  </span>
                </>
              )}
              {selectedMethod === 'manual' && (
                <>
                  <Edit3 className="h-5 w-5 text-indigo-600 mr-2" />
                  <span className="text-gray-700">Manual Entry</span>
                </>
              )}
              {selectedMethod === 'linkedin' && (
                <>
                  <Linkedin className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-gray-700">
                    LinkedIn Profile {watchedLinkedinUrl && `(${watchedLinkedinUrl})`}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}