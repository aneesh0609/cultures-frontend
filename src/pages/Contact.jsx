import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, HelpCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-sm">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8">
        {/* Header */}
        <div className="text-center mb-10 mt-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-200 tracking-tight panchang mt-10">
            Let’s Connect
          </h1>
          <p className="text-gray-300 mt-3 text-base sm:text-lg normal">
            Have questions? We're here to help — anytime, anywhere.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10 ">
          {[
            { icon: <Mail className="text-blue-500 w-6 h-6" />, title: "Email", info: "support@yourstore.com", color: "blue" },
            { icon: <Phone className="text-green-500 w-6 h-6" />, title: "Phone", info: "+1 (555) 123-4567", color: "green" },
            { icon: <MapPin className="text-purple-500 w-6 h-6" />, title: "Location", info: "123 Commerce St, NY", color: "purple" },
            { icon: <Clock className="text-orange-500 w-6 h-6" />, title: "Hours", info: "Mon-Fri: 9AM-6PM", color: "orange" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-300 rounded-xl shadow-md p-5 flex flex-col items-start gap-3 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100">
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.info}</p>
            </div>
          ))}
        </div>

        {/* Contact Form and Support Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-gray-100 rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Send Message</h2>
            <p className="text-gray-500 text-sm mb-6">
              Fill out the form and we’ll respond within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Your Message"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
              />

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-transform transform hover:scale-[1.02]"
              >
                <Send className="inline-block w-4 h-4 mr-2" />
                Send Message
              </button>

              {submitted && (
                <div className="mt-3 bg-green-50 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-sm text-center font-medium">
                  ✓ Message sent successfully! We’ll reply soon.
                </div>
              )}
            </form>
          </div>

          {/* Right Side - Quick Info */}
          <div className="flex flex-col gap-6">
            {/* Hours Panel */}
            <div className="bg-gradient-to-br from-indigo-600 to-cyan-600 text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              {[
                { day: "Mon - Fri", time: "9:00 AM - 6:00 PM" },
                { day: "Saturday", time: "10:00 AM - 4:00 PM" },
                { day: "Sunday", time: "Closed" },
              ].map((hour, i) => (
                <div key={i} className="flex justify-between border-b border-white/20 py-2 text-sm">
                  <span>{hour.day}</span>
                  <span className="text-gray-200">{hour.time}</span>
                </div>
              ))}
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
}
