export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          AI Video Generator
        </h1>
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-6">
          <div className="text-center">
            <h2 className="text-2xl text-white mb-4">Coming Soon!</h2>
            <p className="text-gray-300 mb-6">
              Website AI Video Generator sedang dalam tahap pengembangan.
            </p>
            <div className="bg-white/20 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Features yang Akan Datang:</h3>
              <ul className="text-gray-300 space-y-2">
                <li>🖼️ Image to Video Conversion</li>
                <li>📝 Text to Video Generation</li>
                <li>🎨 Multiple Video Styles</li>
                <li>⚡ Fast Processing</li>
                <li>📱 Mobile Friendly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
