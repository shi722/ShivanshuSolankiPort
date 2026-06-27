/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Skill {
  name: string;
  category: "Programming" | "Machine Learning" | "Cloud & Tools";
  level: number; // percentage
  color: string; // Tailwind color or hex code
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string[];
  skills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  image: string; // placeholder or illustration
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // matches lucide icon names
  color: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

// Data sets
export const SKILLS_DATA: Skill[] = [
  // Programming
  { name: "Python", category: "Programming", level: 95, color: "from-blue-500 to-cyan-400" },
  { name: "Java", category: "Programming", level: 85, color: "from-red-500 to-orange-400" },
  { name: "JavaScript", category: "Programming", level: 90, color: "from-yellow-400 to-yellow-600" },
  { name: "C", category: "Programming", level: 80, color: "from-slate-400 to-slate-600" },
  { name: "SQL", category: "Programming", level: 88, color: "from-blue-600 to-indigo-500" },
  { name: "HTML/CSS", category: "Programming", level: 92, color: "from-orange-500 to-pink-500" },
  { name: "React", category: "Programming", level: 90, color: "from-cyan-400 to-blue-500" },
  { name: "Angular", category: "Programming", level: 75, color: "from-red-600 to-pink-600" },
  { name: "Node.js", category: "Programming", level: 85, color: "from-green-500 to-emerald-400" },

  // Machine Learning
  { name: "TensorFlow", category: "Machine Learning", level: 90, color: "from-orange-500 to-yellow-500" },
  { name: "Pandas", category: "Machine Learning", level: 92, color: "from-indigo-600 to-purple-500" },
  { name: "NumPy", category: "Machine Learning", level: 90, color: "from-blue-400 to-indigo-600" },
  { name: "Scikit-Learn", category: "Machine Learning", level: 88, color: "from-orange-400 to-blue-500" },

  // Cloud & Tools
  { name: "Google Cloud", category: "Cloud & Tools", level: 85, color: "from-blue-500 to-yellow-500" },
  { name: "Git & GitHub", category: "Cloud & Tools", level: 90, color: "from-neutral-700 to-neutral-900" },
  { name: "VS Code", category: "Cloud & Tools", level: 95, color: "from-blue-500 to-cyan-500" },
  { name: "Jupyter", category: "Cloud & Tools", level: 92, color: "from-orange-600 to-yellow-600" },
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: "exp1",
    role: "Artificial Intelligence Intern",
    company: "Infosys Springboard",
    period: "Jan 2024 - July 2024",
    description: [
      "Developing and fine-tuning Deep Learning models using TensorFlow and PyTorch for multi-modal applications.",
      "Accelerating training times by 40% using Google Cloud AI Platform GPU instances and distributed data loaders.",
      "Collaborating on neural architecture search for vision and language models."
    ],
    skills: ["TensorFlow", "Python", "Google Cloud", "Computer Vision"]
  },
  {
    id: "exp2",
    role: "Advanced Data Science Intern",
    company: "Job Oriented Course",
    period: "Aug 2024 - Feb 2025",
    description: [
      "Engineered automated pipelines for exploratory data analysis and feature engineering on massive IoT sensor datasets.",
      "Achieved 94% accuracy in predictive maintenance models using Random Forests and Gradient Boosted Trees.",
      "Designed and deployed web dashboards displaying interactive predictive analytics using React and D3.js."
    ],
    skills: ["Scikit-Learn", "Pandas", "NumPy", "Python", "D3.js"]
  },
  {
    id: "exp3",
    role: "Google Cloud Architecture & Career Program",
    company: "Google Cloud Skill Boost",
    period: "March 2025 - Dec 2025",
    description: [
      "Designed secure multi-tier virtual network environments, Cloud IAM roles, and scalable computing templates on Compute Engine.",
      "Configured analytics processing with BigQuery, cloud storage systems, and dynamic monitoring alerts via Google Cloud Operations Suite.",
      "Successfully modeled highly available, auto-scaling databases with high security posture."
    ],
    skills: ["Google Cloud", "BigQuery", "IAM Security", "Cloud Architectures"]
  },
  {
    id: "exp4",
    role: "Software Engineer",
    company: "Onixera Tech",
    period: "June 2026 - Present",
    description: [
      "Designing and developing scalable, secure, and high-performance software solutions with a strong focus on clean architecture, code quality, and user experience.",
      "As a Software Engineer, I specialize in transforming ideas into functional software products. I enjoy building modern web applications, optimizing system performance, and collaborating with teams to deliver innovative and impactful solutions.",
      "Building scalable software, developing modern web applications, and delivering efficient digital solutions through clean code, problem-solving, and continuous innovation."
    ],
    skills: ["Data Structures & Algorithms", "Object-Oriented Programming (OOP)", "Software Testing"]
  },
  
];

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "cert1",
    title: "Google Cloud Certified Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "Dec 2025",
    credentialId: "GCP-PCA-982341",
    image: "gcp_architect",
    skills: ["Google Cloud", "IAM", "VPC", "Cloud Run", "Kubernetes"]
  },
  {
    id: "cert2",
    title: "IBM Data Science Professional Certificate",
    issuer: "IBM",
    date: "Sep 2024",
    credentialId: "IBM-DS-500293",
    image: "ibm_ds",
    skills: ["Python", "Machine Learning", "Data Science", "SQL", "Data Analysis"]
  },
  {
    id: "cert3",
    title: "Infosys Springboard Certified Java Specialist",
    issuer: "Infosys",
    date: "Jun 2025",
    credentialId: "INF-SB-90182",
    image: "infosys_java",
    skills: ["Java", "Spring Boot", "SQL", "Object Oriented Design"]
  },
  {
    id: "cert4",
    title: "TensorFlow Developer Certificate",
    issuer: "TensorFlow / Google",
    date: "Mar 2025",
    credentialId: "TF-DEV-889302",
    image: "tensorflow_cert",
    skills: ["TensorFlow", "Deep Learning", "Neural Networks", "Computer Vision"]
  },
  {
    id: "cert5",
    title: "Advanced Machine Learning with Python",
    issuer: "Stanford Online / Coursera",
    date: "Nov 2024",
    credentialId: "COUR-AML-37721",
    image: "stanford_ml",
    skills: ["Python", "Scikit-Learn", "Neural Networks", "Dimensionality Reduction"]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj1",
    title: "Neural Vision: Self-Driving Car Agent",
    description: "An advanced computer vision agent designed to autonomously navigate complex environments. Leverages a convolutional neural network (CNN) trained with behavioral cloning and real-time semantic segmentation to follow road markings, read traffic signs, and avoid dynamic obstacles.",
    image: "project_vision",
    tech: ["Python", "TensorFlow", "OpenCV", "NumPy", "Jupyter"],
    githubUrl: "https://github.com/shivanshusolanki",
    liveUrl: "https://github.com/shivanshusolanki"
  },
  {
    id: "proj2",
    title: "GCP Cloud Native Data Lakehouse",
    description: "A highly resilient enterprise-grade big data ingestion pipeline on Google Cloud. Uses Cloud Pub/Sub, Cloud Dataflow for streaming ETL processing, BigQuery for warehouse analytics, and Google Cloud Storage as a structured data lake with real-time Looker Studio dashboards for live system telemetry.",
    image: "project_cloud",
    tech: ["Google Cloud", "BigQuery", "Dataflow", "Terraform", "Python"],
    githubUrl: "https://github.com/shivanshusolanki",
    liveUrl: "https://github.com/shivanshusolanki"
  },
  {
    id: "proj3",
    title: "Helix React: Futuristic 3D Audio Visualizer",
    description: "An ultra-premium interactive WebGL sound analyzer built to display real-time frequency distribution. Custom vertex shaders deform a 3D procedural sphere mapped to the audio's decibel levels, featuring smooth spring-physics camera interpolation and multi-layer neon particle rings.",
    image: "project_3d",
    tech: ["React", "Three.js", "Web Audio API", "Tailwind CSS", "Motion"],
    githubUrl: "https://github.com/shivanshusolanki",
    liveUrl: "https://github.com/shivanshusolanki"
  },
  {
    id: "proj4",
    title: "Cognitive Sentiment & Trend Engine",
    description: "An AI-powered natural language processing application tracking financial news and social sentiments across multiple indices. Synthesizes bidirectional LSTM neural networks with transformer models (BERT) to perform emotional classification, forecasting market volatility based on lexical density.",
    image: "project_nlp",
    tech: ["Python", "TensorFlow", "HuggingFace", "Pandas", "Scikit-Learn"],
    githubUrl: "https://github.com/shivanshusolanki",
    liveUrl: "https://github.com/shivanshusolanki"
  }
];

export const SERVICES_DATA: Service[] = [
  {
    id: "srv1",
    title: "AI Solutions",
    description: "Deploy custom generative AI integrations, transformer-based agents, and automated LLM fine-tuning to power intelligent software interfaces.",
    iconName: "Cpu",
    color: "from-blue-500 to-indigo-600"
  },
  {
    id: "srv2",
    title: "Machine Learning",
    description: "Build robust, highly optimized predictive analytics pipelines, deep neural architectures, and computer vision classification systems.",
    iconName: "BrainCircuit",
    color: "from-cyan-400 to-blue-500"
  },
  {
    id: "srv3",
    title: "Cloud Computing",
    description: "Design fault-tolerant, auto-scaling cloud infrastructure, automated CI/CD deployment pipelines, and secure IAM strategies on Google Cloud.",
    iconName: "CloudLightning",
    color: "from-yellow-400 to-orange-500"
  },
  {
    id: "srv4",
    title: "Full Stack Development",
    description: "Develop blazing-fast modern client architectures styled with premium Tailwind styling, backed by secure, typed Express/Spring APIs.",
    iconName: "Code2",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "srv5",
    title: "Backend Development",
    description: "Architect responsive RESTful microservices, secure authentication systems, and highly efficient PostgreSQL / MongoDB database structures.",
    iconName: "Database",
    color: "from-emerald-400 to-teal-500"
  },
  {
    id: "srv6",
    title: "Frontend Development",
    description: "Deliver immersive, interactive, pixel-perfect user experiences featuring high-fidelity fluid motion animations, WebGL, and optimized layout trees.",
    iconName: "Layers",
    color: "from-pink-500 to-rose-500"
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Ananya Sharma",
    role: "AI Research Director",
    company: "EduTech AI Labs",
    content: "Shivanshu is an exceptional engineer who demonstrates an intuitive grasp of deep learning principles. During his AI internship, he improved our models' training latency significantly while maintaining state-of-the-art accuracy. A top-tier talent.",
    avatar: "AS"
  },
  {
    id: "t2",
    name: "Rajesh Nair",
    role: "Senior Engineering Manager",
    company: "NeuralAnalytics Corp",
    content: "The level of rigor Shivanshu brings to data modeling and software architecture is incredible. He built a full-stack predictive dashboard for our clients that received overwhelming praise for both its performance and highly polished visual UX.",
    avatar: "RN"
  },
  {
    id: "t3",
    name: "Amit Patel",
    role: "Technical Specialist Lead",
    company: "Infosys Springboard",
    content: "Shivanshu stood out as one of our brightest specialists. His Spring Boot microservices design was highly modular, resilient, and flawlessly integrated into GCP. His drive to master next-generation technologies is inspiring.",
    avatar: "AP"
  }
];

export const BLOG_DATA: BlogPost[] = [
  {
    id: "blog1",
    title: "Finetuning Large Vision Models on Google Cloud Vertex AI",
    summary: "A comprehensive developer guide to configuring multi-GPU pipelines, utilizing low-rank adaptation (LoRA) for massive parameter efficiency, and streaming datasets from GCP Buckets.",
    category: "AI & Cloud",
    date: "Jun 12, 2026",
    readTime: "6 min read",
    image: "blog_vertex"
  },
  {
    id: "blog2",
    title: "Optimizing 3D Canvas Performance in React Environments",
    summary: "Uncover expert secrets to maintaining 60fps in WebGL. We analyze requestAnimationFrame scheduling, GPU-bound instanced mesh drawing, and efficient buffer allocation in modern React.",
    category: "Web Development",
    date: "May 28, 2026",
    readTime: "8 min read",
    image: "blog_perf"
  },
  {
    id: "blog3",
    title: "Statistical Feature Engineering for Predictive IoT Analytics",
    summary: "How to handle noisy multi-modal sensor streams. We explore dynamic rolling window statistics, Fourier transforms for frequency-domain analysis, and automated outlier isolation.",
    category: "Data Science",
    date: "Apr 15, 2026",
    readTime: "10 min read",
    image: "blog_iot"
  }
];
