import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, Truck, Leaf, ArrowRight, Star, CheckCircle } from "lucide-react";
import heroImage from "../assets/hero-food-sharing.jpg";
import donationImage from "../assets/donation-hands.jpg";
import deliveryImage from "../assets/fresh-delivery.jpg";

const LandingPage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: Heart,
      title: "Share with Care",
      description: "Connect your surplus food with families who need it most"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Our volunteer network ensures quick and safe food delivery"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Join thousands of volunteers making a difference together"
    },
    {
      icon: Leaf,
      title: "Zero Waste",
      description: "Turn food waste into hope while protecting our environment"
    }
  ];

  const stats = [
    { number: "50K+", label: "Meals Donated" },
    { number: "2.5K+", label: "Volunteers" },
    { number: "150+", label: "NGO Partners" },
    { number: "25+", label: "Cities Served" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Restaurant Owner",
      content: "This platform helped us donate over 500 meals last month instead of throwing them away.",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Volunteer Driver",
      content: "Being part of this community gives me purpose. Every delivery makes someone's day better.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 w-full bg-card/80 backdrop-blur-md z-50 border-b border-border/50"
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-2xl font-bold text-gradient">No Food Waste</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">How it Works</a>
            <a href="#impact" className="text-foreground hover:text-primary transition-colors">Our Impact</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Stories</a>
          </div>

          <div className="flex items-center space-x-4">
            <motion.a 
              href="/login"
              className="text-foreground hover:text-primary transition-colors font-medium"
              whileHover={{ scale: 1.05 }}
            >
              Login
            </motion.a>
            <motion.a 
              href="/register"
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join Now
            </motion.a>
          </div>
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(34, 139, 34, 0.9), rgba(255, 140, 0, 0.8)), url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Turn Food Waste Into
              <span className="block text-accent"> Community Hope</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto"
            >
              Connect surplus food with families in need. Join our community of changemakers 
              reducing waste while fighting hunger, one meal at a time.
            </motion.p>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a 
                href="/donorform"
                className="btn-secondary text-lg px-8 py-4 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Donate Food Now
                <ArrowRight className="w-5 h-5" />
              </motion.a>
              
              <motion.a 
                href="/register"
                className="btn-primary text-lg px-8 py-4 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Volunteer with Us
                <Users className="w-5 h-5" />
              </motion.a>
            </motion.div>
            <div className="mt-4 flex justify-center">
  <motion.a 
    href="https://wa.me/15551810618"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-500 hover:bg-green-600 text-white text-lg px-6 py-3 rounded-full flex items-center gap-2 shadow-lg transition-all duration-300"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    OR message this WhatsApp bot to Donate Food Now
    <ArrowRight className="w-5 h-5" />
  </motion.a>
</div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 right-10 w-20 h-20 bg-accent/20 rounded-full"
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-16 h-16 bg-primary/20 rounded-full"
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </section>


      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              How We Make Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform connects the dots between food surplus and food insecurity, 
              creating a sustainable cycle of giving and receiving.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="card-hover p-8 text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image showcase */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                From Surplus to Sustenance
              </h3>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Every day, perfectly good food goes to waste while families struggle with hunger. 
                We bridge this gap through technology and community spirit, ensuring that excess 
                food finds its way to those who need it most.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time food donation tracking",
                  "Verified volunteer network",
                  "Direct community impact"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src={donationImage} 
                alt="Food donation" 
                className="rounded-2xl shadow-warm w-full h-auto"
              />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-accent rounded-full opacity-20 floating-animation" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Stories of Impact
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real stories from our community members who are making a difference
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="card-hover p-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 hero-gradient opacity-90"
        />
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join our growing community of food heroes. Whether you have food to donate 
              or want to volunteer, every action creates ripples of positive change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.a 
                href="/donorform"
                className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Donating
                <Heart className="w-5 h-5" />
              </motion.a>
              
              <motion.a 
                href="/register"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-primary transition-all duration-300 hover:scale-105 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Become a Volunteer
                <Users className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold text-gradient">No Food Waste</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Connecting communities to eliminate food waste and fight hunger through 
                technology and volunteer networks.
              </p>
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} No Food Waste. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <div className="space-y-2">
                <a href="/about" className="block text-muted-foreground hover:text-primary transition-colors">About Us</a>
                <a href="/how-it-works" className="block text-muted-foreground hover:text-primary transition-colors">How It Works</a>
                <a href="/contact" className="block text-muted-foreground hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Get Involved</h4>
              <div className="space-y-2">
                <a href="/volunteer" className="block text-muted-foreground hover:text-primary transition-colors">Volunteer</a>
                <a href="/donate" className="block text-muted-foreground hover:text-primary transition-colors">Donate Food</a>
                <a href="/partner" className="block text-muted-foreground hover:text-primary transition-colors">Partner with Us</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;