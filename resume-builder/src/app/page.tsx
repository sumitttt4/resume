'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileText, Plus, ArrowRight, Users, Star, Clock } from 'lucide-react'
import { useAppStore } from '@/lib/store'

export default function HomePage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState<'add-details' | 'upload-resume' | null>(null)
  const { setCurrentStep } = useAppStore()

  const handleContinue = () => {
    setCurrentStep(1)
    if (selectedOption === 'add-details') {
      router.push('/input-method')
    } else if (selectedOption === 'upload-resume') {
      router.push('/input-method?method=upload')
    }
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

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> Resume</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create professional, ATS-friendly resumes in minutes. Choose from expert-designed templates 
            and let our platform guide you to career success.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="font-semibold">500K+</span>
              <span>users hired</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-semibold">4.9/5</span>
              <span>user rating</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="h-5 w-5 text-green-600" />
              <span className="font-semibold">5 min</span>
              <span>average time</span>
            </div>
          </div>
        </div>

        {/* Selection Options */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-8">
            How would you like to get started?
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Add Details Option */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedOption === 'add-details' 
                  ? 'ring-2 ring-blue-500 shadow-xl scale-105' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedOption('add-details')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center">
                  <Plus className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Start from Scratch
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Build your resume step-by-step with our guided form
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-left space-y-3 mb-6 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Personal information and contact details
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Education and certification history
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Work experience and achievements
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Skills and competencies
                  </li>
                </ul>
                <div className="text-sm text-gray-500">
                  ⏱️ Takes 10-15 minutes
                </div>
              </CardContent>
            </Card>

            {/* Upload Resume Option */}
            <Card 
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                selectedOption === 'upload-resume' 
                  ? 'ring-2 ring-indigo-500 shadow-xl scale-105' 
                  : 'hover:shadow-lg'
              }`}
              onClick={() => setSelectedOption('upload-resume')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-4 bg-indigo-100 rounded-full w-20 h-20 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Upload Existing Resume
                </CardTitle>
                <CardDescription className="text-gray-600 text-lg">
                  Import your current resume and enhance it
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <ul className="text-left space-y-3 mb-6 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    Upload PDF or DOCX files
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    Automatic text extraction and parsing
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    Apply professional templates
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mr-3"></div>
                    ATS optimization suggestions
                  </li>
                </ul>
                <div className="text-sm text-gray-500">
                  ⏱️ Takes 5-10 minutes
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Continue Button */}
          <div className="text-center">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg font-semibold"
              onClick={handleContinue}
              disabled={!selectedOption}
            >
              Continue
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-semibold text-gray-900">ResumeBuilder Pro</span>
          </div>
          <p className="text-gray-600 mb-4">
            Empowering professionals to showcase their best selves through expertly crafted resumes.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
          </div>
          <div className="mt-4 text-xs text-gray-400">
            © 2024 ResumeBuilder Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
