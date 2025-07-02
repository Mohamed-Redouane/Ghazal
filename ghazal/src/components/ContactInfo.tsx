import Image from "next/image";
import { MapPin, Phone, Mail, Clock, LucideIcon } from "lucide-react";

interface ContactInfoItem {
  icon?: LucideIcon;
  label: string;
  value: string;
  gradient: string;
  isUberEats?: boolean;
  link?: string;
}

const ContactInfo = () => {
  const contactInfo: ContactInfoItem[] = [
    {
      icon: MapPin,
      label: "Adresse",
      value: "3766 St Laurent Blvd, Montreal",
      gradient: "from-teal-500 to-emerald-500",
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "(514) 379-5003",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Mail,
      label: "Email",
      value: "contact@ghazal-restaurant.ca",
      gradient: "from-emerald-500 to-teal-500",
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
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
      {contactInfo.map((info, index) => {
        const CardContent = (
          <div className="text-center">
            <div
              className={`w-20 h-20 mx-auto mb-4 rounded-xl ${
                info.isUberEats
                  ? "bg-white/10 p-1"
                  : `bg-gradient-to-r ${info.gradient} p-3`
              } group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}
            >
              {info.isUberEats ? (
                <Image
                  src="/1c373a1c-a493-4222-970e-371a32d50274.png"
                  alt="Uber Eats"
                  width={72}
                  height={72}
                  className="w-18 h-18 object-cover rounded-lg"
                />
              ) : (
                info.icon && <info.icon className="w-8 h-8 text-white stroke-[1.5]" />
              )}
            </div>
            <h3 className="text-white/90 font-medium text-lg mb-2">{info.label}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{info.value}</p>
          </div>
        );

        if (info.link) {
          return (
            <a
              key={index}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              {CardContent}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
              ></div>
            </a>
          );
        }

        return (
          <div
            key={index}
            className="group relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
          >
            {CardContent}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactInfo;
