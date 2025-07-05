"use client"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, type LucideIcon, Copy, Check, ExternalLink } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ContactInfoItem {
  icon?: LucideIcon
  label: string
  value: string
  displayValue?: string
  gradient: string
  isUberEats?: boolean
  link?: string
  isPhone?: boolean
  isEmail?: boolean
  isAddress?: boolean
  copyValue?: string
}

const ContactInfo = () => {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({})

  const contactInfo: ContactInfoItem[] = [
    {
      icon: MapPin,
      label: "Adresse",
      value: "3766 St Laurent Blvd, Montreal",
      gradient: "from-teal-500 to-emerald-500",
      isAddress: true,
      link: "https://www.google.com/maps/place/Ghazal+Restaurant/@45.5151334,-73.5781934,17z/data=!3m1!4b1!4m6!3m5!1s0x4cc91b13f67b25a3:0xc31856c14ccc35b4!8m2!3d45.5151334!4d-73.5756185!16s%2Fg%2F11c5_7k8qh",
      copyValue: "3766 St Laurent Blvd, Montreal, QC",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "(514) 379-5003",
      gradient: "from-blue-500 to-cyan-500",
      isPhone: true,
      link: "tel:+15143795003",
      copyValue: "+1 (514) 379-5003",
    },
    {
      icon: Mail,
      label: "Email",
      value: "saint.laurent514@gmail.com",
      displayValue: "saint.laurent514@gmail.com",
      gradient: "from-emerald-500 to-teal-500",
      isEmail: true,
    },
    {
      icon: Clock,
      label: "Horaires",
      value: "Lun-Jeu: 11h-2h • Ven: 14h-4h",
      gradient: "from-orange-500 to-amber-500",
    },
    {
      isUberEats: true,
      label: "Livraison",
      value: "Commandez sur Uber Eats",
      gradient: "from-green-500 to-lime-500",
      link: "https://www.ubereats.com/store/ghazal-3766-boulevard-st-laurent/cAScKwXcSpuazAivs95jfA?diningMode=DELIVERY",
    },
  ]

  const handleCopy = async (value: string, key: string, type: string) => {
    try {
      await navigator.clipboard.writeText(value)
      setCopiedStates((prev) => ({ ...prev, [key]: true }))

      setTimeout(() => {
        setCopiedStates((prev) => ({ ...prev, [key]: false }))
      }, 2000)

      toast.success(`${type} copié!`, {
        description: `${type} a été copié dans le presse-papiers`,
        duration: 2000,
      })
    } catch (error) {
      console.error("Failed to copy:", error)
      toast.error("Erreur", {
        description: "Impossible de copier",
        duration: 2000,
      })
    }
  }

  const handleLinkClick = (url: string) => {
    if (url.startsWith("tel:")) {
      window.location.href = url
    } else {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mb-16">
      {contactInfo.map((info, index) => {
        const key = `${info.label}-${index}`
        const isCopied = copiedStates[key]

        // Email Card - Copy only
        if (info.isEmail) {
          return (
            <div key={index} className="group relative">
              <button
                onClick={() => handleCopy(info.value, key, "Email")}
                className="w-full h-full min-h-[180px] sm:min-h-[200px] p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col items-center justify-center text-center"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r ${info.gradient} p-2 sm:p-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
                >
                  <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-white stroke-[1.5]" />
                </div>
                <h3 className="text-white/90 font-medium text-base sm:text-lg mb-2">{info.label}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed break-all px-2 max-w-full overflow-hidden">
                  {info.displayValue || info.value}
                </p>
              </button>
              <div className="absolute top-2 right-2 w-6 h-6 bg-emerald-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {isCopied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white" />}
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`}
              ></div>
            </div>
          )
        }

        // Phone Card - Call primary, Copy secondary
        if (info.isPhone) {
          return (
            <div key={index} className="group relative">
              <button
                onClick={() => handleLinkClick(info.link!)}
                className="w-full h-full min-h-[180px] sm:min-h-[200px] p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col items-center justify-center text-center"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r ${info.gradient} p-2 sm:p-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
                >
                  <Phone className="w-6 h-6 sm:w-8 sm:h-8 text-white stroke-[1.5]" />
                </div>
                <h3 className="text-white/90 font-medium text-base sm:text-lg mb-2">{info.label}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{info.value}</p>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleCopy(info.copyValue || info.value, key, "Numéro")
                }}
                className="absolute top-2 right-2 w-6 h-6 bg-blue-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
                title="Copier le numéro"
              >
                {isCopied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white" />}
              </button>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`}
              ></div>
            </div>
          )
        }

        // Address Card - Maps primary, Copy secondary
        if (info.isAddress) {
          return (
            <div key={index} className="group relative">
              <button
                onClick={() => handleLinkClick(info.link!)}
                className="w-full h-full min-h-[180px] sm:min-h-[200px] p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col items-center justify-center text-center"
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r ${info.gradient} p-2 sm:p-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
                >
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-white stroke-[1.5]" />
                </div>
                <h3 className="text-white/90 font-medium text-base sm:text-lg mb-2">{info.label}</h3>
                <p className="text-white/70 text-xs sm:text-sm leading-relaxed break-words px-1">{info.value}</p>
              </button>
              <div className="absolute top-2 right-2 flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCopy(info.copyValue || info.value, key, "Adresse")
                  }}
                  className="w-6 h-6 bg-teal-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm z-10"
                  title="Copier l'adresse"
                >
                  {isCopied ? <Check className="w-3 h-3 text-white" /> : <Copy className="w-3 h-3 text-white" />}
                </button>
                <div className="w-6 h-6 bg-teal-600/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                  <ExternalLink className="w-3 h-3 text-white" />
                </div>
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`}
              ></div>
            </div>
          )
        }

        // External Link Card (Uber Eats)
        if (info.link) {
          return (
            <button
              key={index}
              onClick={() => handleLinkClick(info.link!)}
              className="group relative w-full h-full min-h-[180px] sm:min-h-[200px] p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col items-center justify-center text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-xl bg-white/10 p-1 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <Image
                  src="/1c373a1c-a493-4222-970e-371a32d50274.png"
                  alt="Uber Eats"
                  width={64}
                  height={64}
                  className="w-14 h-14 sm:w-18 sm:h-18 object-cover rounded-lg"
                />
              </div>
              <h3 className="text-white/90 font-medium text-base sm:text-lg mb-2">{info.label}</h3>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{info.value}</p>
              <div className="absolute top-2 right-2 w-6 h-6 bg-green-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ExternalLink className="w-3 h-3 text-white" />
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`}
              ></div>
            </button>
          )
        }

        // Default Card (Hours)
        return (
          <div
            key={index}
            className="group relative w-full h-full min-h-[180px] sm:min-h-[200px] p-4 sm:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] flex flex-col items-center justify-center text-center"
          >
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-r ${info.gradient} p-2 sm:p-3 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
            >
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-white stroke-[1.5]" />
            </div>
            <h3 className="text-white/90 font-medium text-base sm:text-lg mb-2">{info.label}</h3>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed break-words px-1">{info.value}</p>
            <div
              className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`}
            ></div>
          </div>
        )
      })}
    </div>
  )
}

export default ContactInfo
