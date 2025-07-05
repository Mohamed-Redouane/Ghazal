import { Heart, MapPin, ChefHat } from "lucide-react"
import Image from "next/image"

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-20 lg:py-32 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden"
      aria-label="About Ghazal Restaurant"
    >
      {/* Background Effects */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-teal-200/20 via-transparent to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Halal Stamp */}
      <div className="absolute top-10 right-10 z-30 animate-float-gentle">
        <div className="transform -rotate-12 hover:-rotate-6 hover:scale-110 transition-all duration-500">
          <Image
            src="/6a017bea-4db6-445d-9a2d-0ae6074d9db6.png"
            alt="Halal Certified"
            width={160}
            height={160}
            className="w-24 h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 lg:space-y-10 order-2 lg:order-1">
            <div className="text-center lg:text-left">
              <h2 className="text-5xl lg:text-6xl xl:text-7xl font-display font-bold bg-gradient-to-r from-emerald-700 via-teal-600 to-green-700 bg-clip-text text-transparent mb-6 leading-tight">
                GHAZAL
              </h2>
              <div
                className="w-32 lg:w-40 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-500 mb-8 mx-auto lg:mx-0 animate-shimmer-gold"
                aria-hidden="true"
              />
            </div>

            <div className="space-y-6 text-slate-700 font-light leading-relaxed text-center lg:text-left">
              <p className="text-lg lg:text-xl">
                Bienvenue au Ghazal, un restaurant chaleureux où chaque bouchée est une explosion de saveurs ! Notre
                spécialité ? Des sandwiches grillés préparés avec amour, utilisant un pain fait maison, croustillant à
                l&apos;extérieur et moelleux à l&apos;intérieur.
              </p>
              <p className="text-lg lg:text-xl">
                Choisissez parmi une variété de garnitures savoureuses, allant des viandes grillées aux légumes frais,
                le tout agrémenté de sauces maison qui rehausseront le goût de chaque sandwich.
              </p>
              <p className="text-lg lg:text-xl">
                Mais ce n&apos;est pas tout ! Notre menu propose également de délicieuses crêpes, que vous préfériez les
                classiques avec des fruits frais et du chocolat ou les croustillantes. Pour accompagner le tout, ne
                manquez pas nos milkshakes crémeux, préparés avec des ingrédients de qualité.
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8">
              <div className="flex items-center space-x-3 text-emerald-700">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-semibold text-lg">Pain fait maison</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-700">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <ChefHat className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-semibold text-lg">100% Halal</span>
              </div>
              <div className="flex items-center space-x-3 text-emerald-700">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-semibold text-lg">Saint-Laurent</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative order-1 lg:order-2">
            <div className="relative overflow-hidden rounded-3xl group shadow-2xl">
              <Image
                src="/784f679a-d9b9-4c38-bf02-c74f66562bc7.png"
                alt="Restaurant GHAZAL - Façade extérieure"
                width={800}
                height={1200}
                className="w-full h-[500px] lg:h-[700px] xl:h-[800px] object-cover transition-all duration-700 group-hover:scale-105"
                priority
                quality={90}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-teal-500/20"
                aria-hidden="true"
              />
              {/* Overlay text */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-white/50 shadow-2xl">
                  <h3 className="font-display text-2xl lg:text-3xl font-bold bg-gradient-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-3">
                    RESTO & CRÊPERIE
                  </h3>
                  <p className="text-slate-700 text-base lg:text-lg font-medium">
                    Une expérience culinaire unique au cœur de Montréal
                  </p>
                </div>
              </div>
            </div>

            {/* Floating decorative elements */}
            <div
              className="absolute -top-6 -right-6 w-20 lg:w-28 h-20 lg:h-28 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-float-gentle opacity-80"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-6 -left-6 w-16 lg:w-20 h-16 lg:h-20 bg-gradient-to-br from-teal-400 to-green-500 rounded-full animate-float-gentle opacity-70"
              style={{ animationDelay: "1s" }}
              aria-hidden="true"
            />
            <div
              className="absolute top-1/4 -left-3 w-10 h-10 bg-emerald-300/60 rounded-full animate-float-gentle"
              style={{ animationDelay: "2s" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
