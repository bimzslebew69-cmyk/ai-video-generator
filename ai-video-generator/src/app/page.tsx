'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  Upload, 
  FileVideo, 
  Type, 
  Image as ImageIcon, 
  Sparkles, 
  Download,
  Play,
  Zap,
  Globe,
  Star,
  Info
} from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('image-to-video')
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [textInput, setTextInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [researchData, setResearchData] = useState<string>('')
  const [isLoadingResearch, setIsLoadingResearch] = useState(false)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [videoError, setVideoError] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
    }
  }

  const loadResearchData = async () => {
    setIsLoadingResearch(true)
    try {
      const response = await fetch('/.netlify/functions/research')
      const result = await response.json()
      if (result.success) {
        setResearchData(result.data)
      }
    } catch (error) {
      console.error('Error loading research data:', error)
    } finally {
      setIsLoadingResearch(false)
    }
  }

  const handleImageToVideo = async () => {
    if (!uploadedImage) return
    
    setIsProcessing(true)
    setProgress(0)
    
    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch('/.netlify/functions/image-to-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: uploadedImage.name,
          duration: '10',
          style: 'smooth'
        })
      })

      const result = await response.json()

      clearInterval(progressInterval)
      setProgress(100)

      if (result.success) {
        setGeneratedVideo(result.videoUrl)
        setVideoError(null)
      } else {
        setVideoError(result.error || 'Failed to generate video')
        setGeneratedVideo(null)
      }
    } catch (error) {
      console.error('Error generating video:', error)
      setVideoError('An unexpected error occurred')
      setGeneratedVideo(null)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleTextToVideo = async () => {
    if (!textInput.trim()) return
    
    setIsProcessing(true)
    setProgress(0)
    
    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 500)

      const response = await fetch('/.netlify/functions/text-to-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: textInput,
          duration: '10',
          style: 'realistic',
          aspectRatio: '16:9'
        })
      })

      const result = await response.json()

      clearInterval(progressInterval)
      setProgress(100)

      if (result.success) {
        setGeneratedVideo(result.videoUrl)
        setVideoError(null)
      } else {
        setVideoError(result.error || 'Failed to generate video')
        setGeneratedVideo(null)
      }
    } catch (error) {
      console.error('Error generating video:', error)
      setVideoError('An unexpected error occurred')
      setGeneratedVideo(null)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-60 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            AI Video Generator
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Ubah Gambar dan Teks Menjadi Video Menakjubkan dengan AI
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="secondary" className="bg-green-500/20 text-green-300 border-green-500/30">
              <Zap className="w-3 h-3 mr-1" />
              100% Gratis
            </Badge>
            <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Globe className="w-3 h-3 mr-1" />
              Tanpa Batasan
            </Badge>
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              <Star className="w-3 h-3 mr-1" />
              Kualitas HD
            </Badge>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  onClick={loadResearchData}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Info API Gratis
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-900 border-white/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold text-white">
                    🎯 API Video Generation Gratis
                  </DialogTitle>
                  <DialogDescription className="text-gray-300">
                    Informasi lengkap tentang API gratis yang bisa digunakan untuk video generation
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  {isLoadingResearch ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  ) : (
                    <div className="prose prose-invert max-w-none">
                      <pre className="whitespace-pre-wrap text-sm text-gray-300 font-mono bg-black/30 p-4 rounded-lg">
                        {researchData || 'Klik tombol untuk memuat informasi API...'}
                      </pre>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        {/* Main converter */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl text-white">Pilih Jenis Konversi</CardTitle>
              <CardDescription className="text-gray-300">
                Upload gambar atau ketik teks untuk membuat video AI yang menakjubkan
              </CardDescription>
            </CardHeader>
            
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8 bg-white/10 border-white/20">
                  <TabsTrigger 
                    value="image-to-video" 
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-300"
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Gambar ke Video
                  </TabsTrigger>
                  <TabsTrigger 
                    value="text-to-video" 
                    className="data-[state=active]:bg-white/20 data-[state=active]:text-white text-gray-300"
                  >
                    <Type className="w-4 h-4 mr-2" />
                    Teks ke Video
                  </TabsTrigger>
                </TabsList>

                {/* Image to Video Tab */}
                <TabsContent value="image-to-video" className="space-y-6">
                  <div className="text-center">
                    <div className="border-2 border-dashed border-white/30 rounded-lg p-8 hover:border-white/50 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="cursor-pointer flex flex-col items-center space-y-4"
                      >
                        {uploadedImage ? (
                          <div className="space-y-4">
                            <img
                              src={URL.createObjectURL(uploadedImage)}
                              alt="Uploaded"
                              className="max-w-full h-48 object-cover rounded-lg"
                            />
                            <p className="text-white font-medium">{uploadedImage.name}</p>
                          </div>
                        ) : (
                          <>
                            <Upload className="w-12 h-12 text-gray-400" />
                            <div>
                              <p className="text-white font-medium">Klik untuk upload gambar</p>
                              <p className="text-gray-400 text-sm">atau drag and drop</p>
                              <p className="text-gray-500 text-xs mt-2">PNG, JPG, JPEG hingga 10MB</p>
                            </div>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  {uploadedImage && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white text-sm">Durasi Video</Label>
                          <select className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 text-white">
                            <option>5 detik</option>
                            <option>10 detik</option>
                            <option>15 detik</option>
                            <option>30 detik</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-white text-sm">Gaya Animasi</Label>
                          <select className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 text-white">
                            <option>Smooth Motion</option>
                            <option>Cinematic</option>
                            <option>Dynamic</option>
                            <option>Slow Motion</option>
                          </select>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handleImageToVideo}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                            Memproses...
                          </>
                        ) : (
                          <>
                            <FileVideo className="w-4 h-4 mr-2" />
                            Buat Video dari Gambar
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </TabsContent>

                {/* Text to Video Tab */}
                <TabsContent value="text-to-video" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-white text-sm">Deskripsi Video</Label>
                      <Textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Deskripsikan video yang ingin Anda buat. Contoh: 'Sebuah matahari terbenam yang indah di pantai dengan ombak yang tenang dan awan oranye yang indah'"
                        className="mt-1 min-h-32 bg-white/10 border-white/20 text-white placeholder-gray-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white text-sm">Durasi Video</Label>
                        <select className="w-full mt-1 p-2 rounded bg-white/10 border border-white/20 text-white">
                          <option>10 detik</option>
                          <option>15 detik</option>
                          <option>30 detik</option>
                          <option>60 detik</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-white text-sm">Gaya Video</Label>
                        <select className="w-full mt-1 p-2 rounded bg-white/10 border-white/20 text-white">
                          <option>Realistis</option>
                          <option>Animasi</option>
                          <option>Sinematik</option>
                          <option>Artisitik</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-white text-sm">Aspect Ratio</Label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          16:9
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          9:16
                        </Button>
                        <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          1:1
                        </Button>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleTextToVideo}
                      disabled={isProcessing || !textInput.trim()}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Buat Video dari Teks
                        </>
                      )}
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Progress Bar */}
              {isProcessing && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Memproses video Anda...</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2 bg-white/20" />
                </div>
              )}

              {/* Result Section */}
              {generatedVideo && !isProcessing && (
                <div className="mt-6 p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <Play className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">Video Berhasil Dibuat!</p>
                          <p className="text-gray-300 text-sm">Preview video Anda di bawah ini</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                          onClick={() => setGeneratedVideo(null)}
                        >
                          Buat Video Baru
                        </Button>
                        <Button className="bg-green-600 hover:bg-green-700">
                          <Download className="w-4 h-4 mr-2" />
                          Unduh Video
                        </Button>
                      </div>
                    </div>
                    
                    {/* Video Preview */}
                    <div className="rounded-lg overflow-hidden bg-black/30">
                      <video
                        src={generatedVideo}
                        controls
                        className="w-full h-auto max-h-96"
                        preload="metadata"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    
                    {/* Video Info */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-400">Format</p>
                        <p className="text-white font-medium">MP4</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">Resolusi</p>
                        <p className="text-white font-medium">HD</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">Durasi</p>
                        <p className="text-white font-medium">10 detik</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-400">Ukuran</p>
                        <p className="text-white font-medium">~2MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Section */}
              {videoError && !isProcessing && (
                <div className="mt-6 p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                        <Play className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">Gagal Membuat Video</p>
                        <p className="text-gray-300 text-sm">{videoError}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      onClick={() => {
                        setVideoError(null)
                        setProgress(0)
                      }}
                    >
                      Coba Lagi
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Super Cepat</h3>
                <p className="text-gray-300 text-sm">Video siap dalam hitungan detik dengan teknologi AI canggih</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">Kualitas Premium</h3>
                <p className="text-gray-300 text-sm">Video berkualitas tinggi hingga resolusi Full HD</p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-2">100% Gratis</h3>
                <p className="text-gray-300 text-sm">Tanpa biaya tersembunyi, tanpa batasan penggunaan</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}