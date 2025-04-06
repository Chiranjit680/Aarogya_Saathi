import React from 'react';
import * as FiIcons from 'react-icons/fi';
import DoctorSidebar from '../../components/doctor/DoctorSidebar'; // Adjust path as needed

const posts = [
  {
    id: 1,
    title: 'New treatment approach for chronic migraines',
    author: 'Dr. Jessica Lee',
    specialty: 'Neurology',
    time: '2 hours ago',
    content: "I've been experimenting with a combination therapy for patients with chronic migraines that includes...",
    tags: ['Neurology', 'Migraines', 'Treatment'],
  },
  {
    id: 2,
    title: 'Case study: Rare autoimmune disorder presentation',
    author: 'Dr. Mark Williams',
    specialty: 'Immunology',
    time: 'Yesterday',
    content: 'Recently encountered a patient with unusual symptoms that turned out to be a rare autoimmune disorder...',
    tags: ['Case Study', 'Autoimmune', 'Diagnosis'],
  },
];

const Community: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <DoctorSidebar />

      {/* Main Content */}
      <div className="flex-1 px-8 py-10 ml-64">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Medical Community</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Discussions & Questions</h2>
          <p className="text-gray-500 text-sm">Connect with other healthcare professionals</p>
          <div className="mt-4 flex gap-4 flex-wrap">
            {['Discussions', 'Questions', 'Saved', 'My Posts'].map((tab) => (
              <button
                key={tab}
                className="bg-white px-4 py-2 border rounded-md text-sm font-medium text-gray-600 hover:text-blue-600 transition"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {posts.map(({ id, title, author, specialty, time, content, tags }) => (
            <div key={id} className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
              <div className="text-sm text-gray-500 mb-2">
                {author} • {specialty} • {time}
              </div>
              <p className="text-gray-700 text-sm">{content}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 items-center mt-4 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <FiIcons.FiHeart /> {id === 1 ? 24 : 18}
                </div>
                <div className="flex items-center gap-1">
                  <FiIcons.FiMessageCircle /> {id === 1 ? 12 : 8}
                </div>
                <div className="flex items-center gap-1">
                  <FiIcons.FiBookmark />
                </div>
                <div className="flex items-center gap-1">
                  <FiIcons.FiShare2 />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-80 bg-white border-l px-6 py-8 space-y-10 hidden xl:block">
        {/* Topics */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Popular Topics</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              'COVID-19',
              'Telemedicine',
              'Mental Health',
              'Cardiology',
              'Pediatrics',
              'Research',
              'Technology',
              'Ethics',
            ].map((topic) => (
              <span
                key={topic}
                className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-100 transition cursor-pointer text-center"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* Members */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Active Members</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <div className="font-medium">Dr. Jessica Lee</div>
              <div className="text-gray-500">Neurology</div>
            </div>
            <div>
              <div className="font-medium">Dr. Mark Williams</div>
              <div className="text-gray-500">Immunology</div>
            </div>
            <div>
              <div className="font-medium">Dr. Sarah Johnson</div>
              <div className="text-gray-500">Pediatrics</div>
            </div>
          </div>
        </div>

        {/* Events */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Events</h3>
          <ul className="text-sm text-gray-700 list-disc pl-4">
            <li>April 15: Telemedicine Conference</li>
            <li>April 22: Pediatric Health Webinar</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Community;
