"use client"
import Header from "@/components/header"
import Hero from "@/components/hero"
import Products from "@/components/products"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="w-full">
      <Header />
      <Hero />
      <Products />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  )
}
