import { ScaleIcon, ShieldCheckIcon, UsersIcon, ChartBarIcon } from '@heroicons/react/24/outline';

export default function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-indigo-700">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              About LawPal
            </h1>
            <p className="mt-6 text-xl text-indigo-100 max-w-3xl mx-auto">
              Revolutionizing legal practice management with cutting-edge technology
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Empowering legal professionals
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We provide intuitive tools that streamline case management, client communication, and document handling for modern law practices.
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8 h-full">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-md shadow-lg">
                          <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                      <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Our Team</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Meet the legal tech experts
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <div key={person.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8 h-full shadow-sm hover:shadow-md transition-shadow">
                  <div className="-mt-6 text-center">
                    <div className="flex justify-center">
                      <img
                        className="h-24 w-24 rounded-full object-cover"
                        src={person.imageUrl}
                        alt={person.name}
                      />
                    </div>
                    <h3 className="mt-6 text-lg font-medium text-gray-900">{person.name}</h3>
                    <p className="text-indigo-600">{person.role}</p>
                    <p className="mt-2 text-base text-gray-500">{person.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    name: 'Secure Document Handling',
    description: 'End-to-end encrypted document storage and sharing with advanced permission controls.',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Client Collaboration',
    description: 'Seamless portals for client communication and document sharing.',
    icon: UsersIcon,
  },
  {
    name: 'Case Analytics',
    description: 'Real-time insights into your practice performance and metrics.',
    icon: ChartBarIcon,
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'Founder & CEO',
    bio: 'Former corporate attorney with 15 years of legal experience and legal tech innovation.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    bio: 'Software architect specializing in secure legal technology solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Head of Legal Products',
    bio: 'Former public defender passionate about access to justice technology.',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80',
  },
];