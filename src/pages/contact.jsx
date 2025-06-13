import { ScaleIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="relative bg-indigo-700">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Contact Us
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
              We're here to help with your legal technology needs
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="max-w-lg mx-auto lg:max-w-none">
              <form action="#" method="POST" className="grid grid-cols-1 gap-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">Full name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    autoComplete="name"
                    placeholder="Full name"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    placeholder="Phone"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="sr-only">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option>Select a subject</option>
                    <option>General Inquiry</option>
                    <option>Technical Support</option>
                    <option>Billing Question</option>
                    <option>Feature Request</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Your message"
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit Message
                  </button>
                </div>
              </form>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium text-gray-900">Contact Information</h3>
                <div className="mt-6 space-y-6">
                  <div className="flex">
                    <MapPinIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                    <div className="ml-3 text-base text-gray-500">
                      <p>123 Legal Avenue</p>
                      <p className="mt-1">San Francisco, CA 94103</p>
                    </div>
                  </div>
                  <div className="flex">
                    <PhoneIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                    <div className="ml-3 text-base text-gray-500">
                      <p>+1 (555) 123-4567</p>
                      <p className="mt-1">Mon-Fri 9am-6pm PST</p>
                    </div>
                  </div>
                  <div className="flex">
                    <EnvelopeIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" />
                    <div className="ml-3 text-base text-gray-500">
                      <p>support@lawpal.example</p>
                      <p className="mt-1">Typically responds within 24 hours</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900">Follow Us</h3>
                  <div className="flex space-x-6 mt-4">
                    {socialLinks.map((item) => (
                      <a key={item.name} href={item.href} className="text-gray-400 hover:text-indigo-600">
                        <span className="sr-only">{item.name}</span>
                        <item.icon className="h-6 w-6" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-200">
        <div className="max-w-7xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.538443784894!2d-122.4199066846823!3d37.77492997975938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1623456789012!5m2!1sen!2sus"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

const socialLinks = [
  {
    name: 'Twitter',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: '#',
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
      </svg>
    ),
  },
];