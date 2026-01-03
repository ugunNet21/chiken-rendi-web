"use client"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert("Password tidak cocok!")
      return
    }
    
    if (!formData.agreeTerms) {
      alert("Anda harus menyetujui syarat dan ketentuan")
      return
    }
    
    setIsLoading(true)
    
    // Simulate register process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    console.log("Register attempt:", formData)
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating Chickens Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <span className="absolute top-[10%] left-[5%] text-6xl opacity-20 animate-bounce" style={{ animationDuration: "3s" }}>🐔</span>
        <span className="absolute top-[20%] right-[10%] text-4xl opacity-15 animate-bounce" style={{ animationDuration: "4s" }}>🥚</span>
        <span className="absolute bottom-[30%] left-[8%] text-5xl opacity-20 animate-bounce" style={{ animationDuration: "3.5s" }}>🐣</span>
        <span className="absolute bottom-[15%] right-[5%] text-6xl opacity-15 animate-bounce" style={{ animationDuration: "4.5s" }}>🐔</span>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Logo & Brand */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <span className="text-3xl">🐔</span>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold text-foreground">Ternak Ayam Rendi</h1>
                <p className="text-sm text-muted-foreground">Premium Farm</p>
              </div>
            </Link>
          </div>

          {/* Register Card */}
          <div className="backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 rounded-3xl shadow-2xl border border-white/20 dark:border-zinc-800/50 p-8 transition-all duration-300 hover:shadow-3xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Buat Akun Baru 🎉</h2>
              <p className="text-muted-foreground">Daftar untuk menikmati layanan kami</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Field */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="pl-10 h-12 bg-white/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-12 bg-white/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Nomor Telepon
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="08xxxxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="pl-10 h-12 bg-white/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-foreground">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 karakter"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 h-12 bg-white/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
                  Konfirmasi Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Ulangi password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-10 pr-10 h-12 bg-white/50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, agreeTerms: checked as boolean })
                  }
                  className="mt-1 border-zinc-300 dark:border-zinc-600 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
                />
                <Label
                  htmlFor="agreeTerms"
                  className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                >
                  Saya menyetujui{" "}
                  <Link href="/terms" className="text-amber-600 hover:text-amber-700 dark:text-amber-500">
                    Syarat & Ketentuan
                  </Link>{" "}
                  dan{" "}
                  <Link href="/privacy" className="text-amber-600 hover:text-amber-700 dark:text-amber-500">
                    Kebijakan Privasi
                  </Link>
                </Label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Mendaftarkan...
                  </>
                ) : (
                  <>
                    Daftar Sekarang
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-200 dark:border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white/70 dark:bg-zinc-900/70 text-muted-foreground">
                  atau daftar dengan
                </span>
              </div>
            </div>

            {/* Social Register */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-xl border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-12 rounded-xl border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </Button>
            </div>

            {/* Login Link */}
            <p className="text-center mt-6 text-muted-foreground">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-amber-600 hover:text-amber-700 dark:text-amber-500 dark:hover:text-amber-400 font-semibold transition-colors"
              >
                Masuk di sini
              </Link>
            </p>
          </div>

          {/* Footer */}
          <p className="text-center mt-8 text-sm text-muted-foreground">
            © 2026 Ternak Ayam Rendi. Semua hak dilindungi.
          </p>
        </div>
      </div>
    </div>
  )
}
