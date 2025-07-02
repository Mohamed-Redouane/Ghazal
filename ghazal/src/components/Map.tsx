import React from 'react';

const Map = () => {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl h-80 overflow-hidden border border-emerald-200/50 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-105">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2657.41756370502!2d-73.57819342372318!3d45.51513337107478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91b13f67b25a3%3A0xc31856c14ccc35b4!2sGhazal%20Restaurant!5e1!3m2!1sen!2sca!4v1750694691423!5m2!1sen!2sca"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ghazal Restaurant Location"
      />
    </div>
  );
};

export default Map;
