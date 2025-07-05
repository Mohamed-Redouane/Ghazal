"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface FormData {
  name: string
  email: string
  message: string
  _subject: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    _subject: "New Contact Form Submission",
  })
  const [isHovered, setIsHovered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
    }
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "L'email n'est pas valide"
    }
    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Le message doit contenir au moins 10 caractères"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const showToast = (type: "success" | "error", title: string, description: string) => {
    if (!isClient) {
      console.log(`${type.toUpperCase()}: ${title} - ${description}`)
      return
    }

    // Add a small delay to ensure toast system is ready
    setTimeout(() => {
      try {
        if (type === "success") {
          toast.success(title, {
            description,
            duration: 5000,
          })
        } else {
          toast.error(title, {
            description,
            duration: 4000,
          })
        }
      } catch (error) {
        console.error("Toast error:", error)
        // Fallback to alert if toast fails
        alert(`${title}: ${description}`)
      }
    }, 50)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast("error", "Veuillez corriger les erreurs", "Tous les champs sont requis et doivent être valides.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xpwdjgzj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`)
      }

      showToast("success", "Message envoyé avec succès !", "Nous vous recontacterons dans les plus brefs délais.")

      setFormData({
        name: "",
        email: "",
        message: "",
        _subject: "New Contact Form Submission",
      })
      setErrors({})
    } catch (error) {
      console.error("Form submission error:", error)
      showToast("error", "Échec de l'envoi du message", "Une erreur s'est produite. Veuillez réessayer plus tard.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto mb-16">
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-display text-white">Message rapide</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <input type="hidden" name="_gotcha" style={{ display: "none" }} />

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Input
                type="text"
                name="name"
                placeholder="Nom complet"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-emerald-400 h-12 rounded-xl ${
                  errors.name ? "border-red-400 focus:border-red-400" : ""
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
            </div>

            <div>
              <Input
                type="email"
                name="email"
                placeholder="Adresse email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isSubmitting}
                className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-emerald-400 h-12 rounded-xl ${
                  errors.email ? "border-red-400 focus:border-red-400" : ""
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
            </div>
          </div>

          <div>
            <Textarea
              name="message"
              placeholder="Votre message (minimum 10 caractères)..."
              value={formData.message}
              onChange={handleInputChange}
              disabled={isSubmitting}
              rows={4}
              className={`bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-emerald-400 rounded-xl resize-none ${
                errors.message ? "border-red-400 focus:border-red-400" : ""
              }`}
            />
            {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message}</p>}
            <p className="mt-1 text-xs text-white/50">{formData.message.length}/500 caractères</p>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-6 h-14 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send
                  className={`w-5 h-5 mr-2 transition-transform duration-300 ${
                    isHovered && !isSubmitting ? "translate-x-1" : ""
                  }`}
                />
                Envoyer le message
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
