"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message envoyé avec succès ! Nous vous recontacterons bientôt.");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-2xl mx-auto mb-16">
      <div className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
            <Send className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-display text-white">Message rapide</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Input
              type="text"
              name="name"
              placeholder="Nom"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-emerald-400 h-12 rounded-xl"
            />
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-emerald-400 h-12 rounded-xl"
            />
          </div>
          
          <Textarea
            name="message"
            placeholder="Votre message..."
            value={formData.message}
            onChange={handleInputChange}
            required
            rows={4}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-emerald-400 rounded-xl resize-none"
          />
          
          <Button
            type="submit"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium py-6 h-14 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/25"
          >
            <Send className={`w-5 h-5 mr-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
            Envoyer le message
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
