import { MessageCircle, Send } from "lucide-react"
import Map from "./Map"
import ContactBackground from "./ContactBackground"
import ContactInfo from "./ContactInfo"
import ContactForm from "./ContactForm"

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 relative overflow-hidden"
    >
      {/* Background Effects */}
      <ContactBackground />

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 mb-8 p-4 bg-white/5 rounded-full backdrop-blur-xl border border-white/10">
            <MessageCircle className="w-8 h-8 text-emerald-400" />
            <h2 className="text-5xl font-display font-bold bg-gradient-to-r from-white via-emerald-200 to-gold bg-clip-text text-transparent">
              Contactez-nous
            </h2>
            <Send className="w-8 h-8 text-gold" />
          </div>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Contactez-nous pour toute question ou information</p>
        </div>

        {/* Content - Centered Layout */}
        <div className="max-w-4xl mx-auto">
          {/* Contact Cards */}
          <ContactInfo />

          {/* Contact Form - Centered */}
          <ContactForm />

          {/* Map Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-display text-white mb-4">Notre Emplacement</h3>
              <p className="text-white/70">Trouvez-nous au cœur de Montréal</p>
            </div>
            <Map />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
