'use client'

import { useState } from 'react'
import { Upload, FileVideo, Type, ImageIcon, Sparkles, Download, Play, Zap, Globe, Star, Info } from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('image-to-video')
  const [uploadedImage, setUploadedImage] = useState<File | null>(null)
  const [textInput, setTextInput] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [generatedVideo, setGeneratedVideo] = useState<string | null>(null)
  const [videoError, setVideoError] = useState<string | null>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedImage(file)
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
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '4s'}}></div>
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
            <span className="bg-green-500/20 text-green-300 border border-green-500/30 px-3 py-1 rounded-full text-sm">
              <Zap className="w-3 h-3 inline mr-1" />
              100% Gratis
            </span>
            <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full text-sm">
              <Globe className="w-3 h-3 inline mr-1" />
              Tanpa Batasan
            </span>
            <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 px-3 py-1 rounded-full text-sm">
              <Star className="w-3 h-3 inline mr-1" />
              Kualitas HD
            </span>
          </div>
        </header>

        {/* Main converter */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-2xl">
            <div className="p-6">
              <div className="text-center mb-8">
                <h2 className="text-2xl text-white mb-2">Pilih Jenis Konversi</h2>
                <p className="text-gray-300">
                  Upload gambar atau ketik teks untuk membuat video AI yang menakjubkan
                </p>
              </div>
              
              {/* Tabs */}
              <div className="flex space-x-2 mb-8 bg-white/10 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('image-to-video')}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    activeTab === 'image-to-video' 
                      ? 'bg-white/20 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-4 h-4 inline mr-2" />
                  Gambar ke Video
                </button>
                <button
                  onClick={() => setActiveTab('text-to-video')}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    activeTab === 'text-to-video' 
                      ? 'bg-white/20 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Type className="w-4 h-4 inline mr-2" />
                  Teks ke Video
                </button>
              </div>

              {/* Image to Video Tab */}
              {activeTab === 'image-to-video' && (
                <div className="space-y-6">
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
                          <label className="text-white text-sm block mb-1">Durasi Video</label>
                          <select className="w-full p-2 rounded bg-white/10 border border-white/20 text-white">
                            <option>5 detik</option>
                            <option>10 detik</option>
                            <option>15 detik</option>
                            <option>30 detik</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-white text-sm block mb-1">Gaya Animasi</label>
                          <select className="w-full p-2 rounded bg-white/10 border border-white/20 text-white">
                            <option>Smooth Motion</option>
                            <option>Cinematic</option>
                            <option>Dynamic</option>
                            <option>Slow Motion</option>
                          </select>
                        </div>
                      </div>
                      
                      <button
                        onClick={handleImageToVideo}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
                            Memproses...
                          </>
                        ) : (
                          <>
                            <FileVideo className="w-4 h-4 inline mr-2" />
                            Buat Video dari Gambar
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Text to Video Tab */}
              {activeTab === 'text-to-video' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-white text-sm block mb-1">Deskripsi Video</label>
                      <textarea
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                        placeholder="Deskripsikan video yang ingin Anda buat. Contoh: 'Sebuah matahari terbenam yang indah di pantai dengan ombak yang tenang dan awan oranye yang indah'"
                        className="w-full min-h-32 p-3 rounded bg-white/10 border border-white/20 text-white placeholder-gray-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white text-sm block mb-1">Durasi Video</label>
                        <select className="w-full p-2 rounded bg-white/10 border border-white/20 text-white">
                          <option>10 detik</option>
                          <option>15 detik</option>
                          <option>30 detik</option>
                          <option>60 detik</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-white text-sm block mb-1">Gaya Video</label>
                        <select className="w-full p-2 rounded bg-white/10 border border-white/20 text-white">
                          <option>Realistis</option>
                          <option>Animasi</option>
                          <option>Sinematik</option>
                          <option>Artisitik</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-white text-sm block mb-1">Aspect Ratio</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button className="p-2 bg-white/10 border border-white/20 text-white rounded hover:bg-white/20">
                          16:9
                        </button>
                        <button className="p-2 bg-white/10 border border-white/20 text-white rounded hover:bg-white/20">
                          9:16
                        </button>
                        <button className="p-2 bg-white/10 border border-white/20 text-white rounded hover:bg-white/20">
                          1:1
                        </button>
                      </div>
                    </div>
                    
                    <button
                      onClick={handleTextToVideo}
                      disabled={isProcessing || !textInput.trim()}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
                          Memproses...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 inline mr-2" />
                          Buat Video dari Teks
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Progress Bar */}
              {isProcessing && (
                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-sm text-gray-300">
                    <span>Memproses video Anda...</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
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
                        <button 
                          className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded hover:bg-white/20"
                          onClick={() => setGeneratedVideo(null)}
                        >
                          Buat Video Baru
                        </button>
                        <a 
                          href={generatedVideo} 
                          download
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded inline-flex items-center"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Unduh Video
                        </a>
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
                        Your browser does not support video tag.
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
                    <button 
                      className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded hover:bg-white/20"
                      onClick={() => {
                        setVideoError(null)
                        setProgress(0)
                      }}
                    >
                      Coba Lagi
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Super Cepat</h3>
              <p className="text-gray-300 text-sm">Video siap dalam hitungan detik dengan teknologi AI canggih</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">Kualitas Premium</h3>
              <p className="text-gray-300 text-sm">Video berkualitas tinggi hingga resolusi Full HD</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-2">100% Gratis</h3>
              <p className="text-gray-300 text-sm">Tanpa biaya tersembunyi, tanpa batasan penggunaan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
