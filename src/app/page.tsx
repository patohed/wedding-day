import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Navigation,
  Gift,
  Music,
  Camera
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        {/* Velo principal con gradiente complejo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60 z-10" />
        {/* Velo radial para spotlight effect */}
        <div className="absolute inset-0 z-15">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl h-[500px] bg-gradient-radial from-transparent via-black/10 to-black/40 rounded-full blur-2xl"></div>
        </div>
        {/* Efectos de luz adicionales */}
        <div className="absolute top-0 left-0 w-full h-full z-16">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="relative z-20 text-center text-white px-4 max-w-5xl mx-auto">
          {/* Contenedor con glassmorphism avanzado */}
          <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 backdrop-blur-md rounded-[2rem] p-8 sm:p-16 border border-white/20 shadow-2xl overflow-hidden">
            {/* Efectos de brillo interno */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-400/10 via-transparent to-rose-400/10 rounded-[2rem]"></div>
            <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="mb-8 animate-fade-in">
                <div className="relative">
                  <Heart className="w-20 h-20 mx-auto mb-6 text-pink-200 drop-shadow-2xl animate-pulse" />
                  <div className="absolute inset-0 w-20 h-20 mx-auto bg-pink-400/20 rounded-full blur-xl"></div>
                </div>
              </div>
              
              <div className="mb-6">
                <h1 className="text-6xl sm:text-7xl lg:text-9xl font-light mb-4 tracking-widest animate-slide-up hero-title-enhanced">
                  Maria & Juan
                </h1>
                <div className="w-32 h-px bg-gradient-to-r from-transparent via-pink-300/60 to-transparent mx-auto mb-6"></div>
              </div>
              
              <p className="text-xl md:text-3xl font-light tracking-[0.2em] mb-6 animate-slide-up delay-100 drop-shadow-xl text-pink-50">
                ¡Nos casamos! 
              </p>
              
              <div className="flex flex-col items-center space-y-3 mb-12 animate-slide-up delay-200">
                <p className="text-3xl md:text-4xl font-light drop-shadow-xl bg-gradient-to-r from-white via-pink-100 to-white bg-clip-text text-transparent">15 de Junio, 2025</p>
                <p className="text-xl md:text-2xl drop-shadow-lg text-pink-100 tracking-wider">18:00 hs</p>
              </div>
              
              <div className="animate-slide-up delay-300">
                <Link href="/rsvp">
                  <Button size="lg" className="relative bg-gradient-to-r from-white via-pink-50 to-white text-gray-900 hover:from-pink-50 hover:to-pink-50 px-16 py-8 text-xl font-medium rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 border border-pink-200/50 overflow-hidden group">
                    <span className="absolute inset-0 bg-gradient-to-r from-pink-400/0 via-pink-400/10 to-pink-400/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></span>
                    <span className="relative flex items-center gap-3">
                      <Heart className="w-5 h-5" />
                      Confirmar Asistencia
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-light text-gray-700 italic">
            &ldquo;El amor es paciente, el amor es bondadoso...&rdquo;
          </p>
        </div>
      </section>

      {/* Event Details Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              Detalles del Evento
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Te esperamos para celebrar junto a nosotros este día tan especial
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Ceremony */}
            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="relative h-64">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1606216794074-735e91aa2c92?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-3xl font-light mb-2">Ceremonia</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">15 de Junio, 2025</p>
                      <p className="text-sm text-gray-600">Sábado</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">18:00 hs</p>
                      <p className="text-sm text-gray-600">Puntualidad apreciada</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Salón Real Palace</p>
                      <p className="text-sm text-gray-600">Av. Libertador 1234, Buenos Aires</p>
                      <a 
                        href="https://maps.google.com/?q=Salon+Real+Palace+Buenos+Aires" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-rose-500 hover:text-rose-600 inline-flex items-center mt-2"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Ver en el mapa
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reception */}
            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="relative h-64">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-3xl font-light mb-2">Recepción</h3>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Calendar className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">15 de Junio, 2025</p>
                      <p className="text-sm text-gray-600">Mismo día</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <Clock className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">20:00 hs</p>
                      <p className="text-sm text-gray-600">Después de la ceremonia</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-rose-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Salón Real Palace</p>
                      <p className="text-sm text-gray-600">Av. Libertador 1234, Buenos Aires</p>
                      <a 
                        href="https://maps.google.com/?q=Salon+Real+Palace+Buenos+Aires" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-rose-500 hover:text-rose-600 inline-flex items-center mt-2"
                      >
                        <Navigation className="w-4 h-4 mr-1" />
                        Ver en el mapa
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Important Info Cards */}
      <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="mb-4">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                  <Gift className="w-8 h-8 text-rose-500" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-800">Dress Code</h3>
              <p className="text-gray-600 mb-2">Formal / Cocktail</p>
              <p className="text-sm text-gray-500">
                Nos encantaría verte elegante en nuestro día especial
              </p>
            </Card>
            
            <Card className="text-center p-8 border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="mb-4">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-8 h-8 text-rose-500" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-800">Confirmar hasta</h3>
              <p className="text-gray-600 mb-2">15 de Mayo, 2025</p>
              <p className="text-sm text-gray-500">
                Por favor confirma tu asistencia antes de esta fecha
              </p>
            </Card>
            
            <Card className="text-center p-8 border-0 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="mb-4">
                <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-rose-500" />
                </div>
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-800">Regalos</h3>
              <p className="text-gray-600 mb-2">Tu presencia es nuestro regalo</p>
              <p className="text-sm text-gray-500">
                Si deseas obsequiarnos algo, lluvia de sobres será apreciada
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              Cronograma del Día
            </h2>
            <p className="text-lg text-gray-600">
              Todo lo que sucederá en nuestro gran día
            </p>
          </div>

          <div className="space-y-8">
            {/* Timeline Item 1 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 text-right">
                <p className="text-2xl font-light text-rose-500">18:00</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-rose-500 mt-2"></div>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-8 ml-2">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Ceremonia</h3>
                <p className="text-gray-600">
                  Comienza la ceremonia religiosa. Por favor llegar con 15 minutos de anticipación.
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 text-right">
                <p className="text-2xl font-light text-rose-500">19:30</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-rose-500 mt-2"></div>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-8 ml-2">
                <h3 className="text-xl font-medium text-gray-800 mb-2 flex items-center">
                  <Camera className="w-5 h-5 mr-2" />
                  Sesión de Fotos
                </h3>
                <p className="text-gray-600">
                  Momento para las fotografías con familia y amigos.
                </p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 text-right">
                <p className="text-2xl font-light text-rose-500">20:00</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-rose-500 mt-2"></div>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-8 ml-2">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Cóctel de Bienvenida</h3>
                <p className="text-gray-600">
                  Recibimiento con bebidas y canapés mientras esperamos a los novios.
                </p>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 text-right">
                <p className="text-2xl font-light text-rose-500">21:00</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-rose-500 mt-2"></div>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-8 ml-2">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Entrada de los Novios</h3>
                <p className="text-gray-600">
                  Ingreso de los novios al salón y primer baile.
                </p>
              </div>
            </div>

            {/* Timeline Item 5 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 text-right">
                <p className="text-2xl font-light text-rose-500">21:30</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-rose-500 mt-2"></div>
              </div>
              <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-8 ml-2">
                <h3 className="text-xl font-medium text-gray-800 mb-2">Cena</h3>
                <p className="text-gray-600">
                  Servicio de cena con los menús seleccionados.
                </p>
              </div>
            </div>

            {/* Timeline Item 6 */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-20 text-right">
                <p className="text-2xl font-light text-rose-500">23:00</p>
              </div>
              <div className="flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-rose-500 mt-2"></div>
              </div>
              <div className="flex-1 pl-8 ml-2">
                <h3 className="text-xl font-medium text-gray-800 mb-2 flex items-center">
                  <Music className="w-5 h-5 mr-2" />
                  ¡Fiesta!
                </h3>
                <p className="text-gray-600">
                  Hora de bailar y celebrar hasta el amanecer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-rose-50 to-pink-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
              ¿Dudas o Consultas?
            </h2>
            <p className="text-lg text-gray-600">
              Estamos aquí para ayudarte
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Teléfono</p>
                      <a href="tel:+541112345678" className="text-lg text-gray-800 hover:text-rose-500">
                        +54 11 1234-5678
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-rose-500" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a href="mailto:novios@wedding2025.com" className="text-lg text-gray-800 hover:text-rose-500">
                        novios@wedding2025.com
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-gray-600">
                    Si tienes alguna pregunta sobre el evento, el lugar, el transporte o cualquier otro detalle, 
                    no dudes en contactarnos. Estaremos encantados de ayudarte.
                  </p>
                  <p className="text-sm text-gray-500">
                    Horario de atención: Lunes a Viernes, 10:00 - 18:00 hs
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-light mb-6">
            ¿Nos acompañas?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Tu presencia haría de este día aún más especial. Por favor, confirma tu asistencia 
            y ayúdanos a planificar mejor este momento único.
          </p>
          <Link href="/rsvp">
            <Button size="lg" className="bg-white text-rose-500 hover:bg-gray-100 px-12 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
              Confirmar mi Asistencia
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <Heart className="w-8 h-8 mx-auto mb-4 text-pink-300" />
          <p className="text-xl font-light mb-2">Ana & Carlos</p>
          <p className="text-gray-400 mb-4">15 de Junio, 2025</p>
          <Separator className="my-6 bg-gray-700" />
          <p className="text-sm text-gray-500">
            Hecho con amor para nuestro día especial 💕
          </p>
        </div>
      </footer>
    </div>
  );
}
