"use client";

import { FaMobileAlt, FaUserShield, FaPalette } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      id: 1,
      icon: <FaMobileAlt className="text-green-500 text-4xl mb-4" />,
      title: "Responsive Design",
      description:
        "Our website is fully optimized for all devices, ensuring a seamless experience on mobile, tablet, and desktop.",
    },
    {
      id: 2,
      icon: <FaPalette className="text-green-500 text-4xl mb-4" />,
      title: "Modern UI",
      description:
        "Experience a clean, intuitive, and modern user interface that makes navigation effortless and enjoyable.",
    },
    {
      id: 3,
      icon: <FaUserShield className="text-green-500 text-4xl mb-4" />,
      title: "Multi-Role Authentication",
      description:
        "Manage access effortlessly with multi-role authentication, tailored for admins, merchants, and regular users.",
    },
  ];

  return (
    <section className="w-full bg-gray-100 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-500 mb-8">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-lg shadow-md p-6 text-center">
              {feature.icon}
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
