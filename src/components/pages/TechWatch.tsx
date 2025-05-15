import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Calendar, Clock, Tag, ChevronRight } from 'lucide-react';
import Section from '../common/Section';
import Card from '../common/Card';
import Button from '../common/Button';
import SectionDivider from '../common/SectionDivider';

interface Post {
  id: number;
  title: string;
  summary: string;
  image: string;
  category: string[];
  date: string;
  readTime: string;
  content?: string;
}

const TechWatch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  
  const posts: Post[] = [
    {
      id: 1,
      title: 'The Future of Zero Trust Security Architecture',
      summary: 'Exploring the evolution of Zero Trust security models and their critical importance in modern network infrastructure.',
      image: 'https://images.pexels.com/photos/2882566/pexels-photo-2882566.jpeg',
      category: ['security', 'architecture'],
      date: 'June 15, 2023',
      readTime: '8 min read',
      content: `
        <h2>Zero Trust: Beyond the Buzzword</h2>
        <p>Zero Trust security has evolved from a buzzword to an essential approach for modern organizations. This architecture assumes no user or system should be inherently trusted, regardless of their location or network connection.</p>
        
        <p>The core principles of Zero Trust include:</p>
        <ul>
          <li>Verify explicitly: Always authenticate and authorize based on all available data points</li>
          <li>Use least privilege access: Limit user access with Just-In-Time and Just-Enough-Access</li>
          <li>Assume breach: Minimize blast radius and segment access, verify end-to-end encryption</li>
        </ul>
        
        <h2>Implementing Zero Trust</h2>
        <p>Successful implementation requires a strategic approach:</p>
        <ol>
          <li>Identify your protect surface (data, assets, applications, services)</li>
          <li>Map transaction flows to understand how systems communicate</li>
          <li>Design a Zero Trust architecture with micro-perimeters</li>
          <li>Create granular policies based on the "who, what, when, where, why, and how" of resource access</li>
          <li>Monitor and maintain the environment continuously</li>
        </ol>
        
        <h2>Future Trends</h2>
        <p>As we look ahead, Zero Trust will continue evolving with AI-powered analytics for more intelligent access decisions, adaptive authentication frameworks, and deeper integration with cloud-native technologies.</p>
        
        <p>For system administrators, now is the time to begin planning your Zero Trust roadmap, starting with critical assets and expanding progressively across your infrastructure.</p>
      `
    },
    {
      id: 2,
      title: 'Containerization vs. Virtualization: Making the Right Choice',
      summary: 'Comparing traditional virtualization with containerization to help you decide the optimal approach for your infrastructure needs.',
      image: 'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
      category: ['virtualization', 'containers'],
      date: 'May 28, 2023',
      readTime: '6 min read',
      content: `
        <h2>Understanding the Fundamentals</h2>
        <p>Virtualization and containerization represent two different approaches to maximizing hardware utilization and application deployment.</p>
        
        <h3>Virtualization</h3>
        <p>Traditional virtualization uses a hypervisor to create multiple virtual machines (VMs), each with its own operating system, on a single physical server. This approach provides strong isolation but comes with overhead from running multiple OS instances.</p>
        
        <h3>Containerization</h3>
        <p>Containers share the host system's OS kernel but run as isolated processes with their own filesystem, CPU, memory, and process space. This results in lightweight, portable application environments that start almost instantly.</p>
        
        <h2>Key Considerations for System Administrators</h2>
        
        <h3>Choose Virtualization When:</h3>
        <ul>
          <li>You need to run different operating systems</li>
          <li>Strong isolation is a top priority</li>
          <li>Your applications require the full OS environment</li>
          <li>Hardware-level operations are necessary</li>
        </ul>
        
        <h3>Choose Containerization When:</h3>
        <ul>
          <li>You need rapid deployment and scaling</li>
          <li>Application portability is essential</li>
          <li>Development and operational efficiency are priorities</li>
          <li>Resource efficiency matters (containers typically use fewer resources)</li>
        </ul>
        
        <h2>Hybrid Approaches</h2>
        <p>Many organizations are finding value in hybrid approaches, running containers within VMs to combine the security benefits of VMs with the agility of containers. This approach works particularly well in regulated environments that require strict isolation.</p>
        
        <p>The future likely belongs to a balanced approach that leverages both technologies according to specific workload requirements.</p>
      `
    },
    {
      id: 3,
      title: 'Automating Infrastructure with Ansible: Practical Examples',
      summary: 'A hands-on guide to automating common system administration tasks using Ansible, with practical examples and best practices.',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg',
      category: ['automation', 'devops'],
      date: 'April 12, 2023',
      readTime: '10 min read'
    },
    {
      id: 4,
      title: 'Cloud Cost Optimization Strategies for 2023',
      summary: 'Essential strategies for managing and optimizing your cloud infrastructure costs without compromising performance or security.',
      image: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg',
      category: ['cloud', 'optimization'],
      date: 'March 5, 2023',
      readTime: '7 min read'
    },
    {
      id: 5,
      title: 'Network Segmentation for Enhanced Security',
      summary: 'How to implement effective network segmentation to reduce attack surfaces and minimize the impact of potential security breaches.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
      category: ['networking', 'security'],
      date: 'February 18, 2023',
      readTime: '9 min read'
    },
    {
      id: 6,
      title: 'The Rise of Multi-Cloud Strategies',
      summary: 'Examining the benefits and challenges of adopting a multi-cloud approach for enterprise IT infrastructure.',
      image: 'https://images.pexels.com/photos/921294/pexels-photo-921294.png',
      category: ['cloud', 'strategy'],
      date: 'January 22, 2023',
      readTime: '8 min read'
    }
  ];
  
  const categories = [
    { id: 'security', name: 'Security' },
    { id: 'networking', name: 'Networking' },
    { id: 'cloud', name: 'Cloud' },
    { id: 'virtualization', name: 'Virtualization' },
    { id: 'containers', name: 'Containers' },
    { id: 'automation', name: 'Automation' },
    { id: 'devops', name: 'DevOps' },
    { id: 'architecture', name: 'Architecture' },
    { id: 'optimization', name: 'Optimization' },
    { id: 'strategy', name: 'Strategy' }
  ];
  
  const filteredPosts = posts.filter(post => {
    const matchesQuery = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === null || 
      post.category.includes(selectedCategory);
    
    return matchesQuery && matchesCategory;
  });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
  };
  
  const handlePostSelect = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleBackToList = () => {
    setSelectedPost(null);
  };
  
  return (
    <>
      <Section
        title={selectedPost ? selectedPost.title : "Tech Watch"}
        subtitle={selectedPost ? 
          `${selectedPost.date} · ${selectedPost.readTime}` : 
          "Stay updated with the latest trends and insights in system and network administration"
        }
        className="pt-32 bg-slate-50 dark:bg-slate-900"
      >
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <motion.div
              key="post-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="outline"
                size="sm"
                className="mb-6"
                onClick={handleBackToList}
              >
                ← Back to all articles
              </Button>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
                <div 
                  className="h-80 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedPost.image})` }}
                ></div>
                
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedPost.category.map((cat) => (
                      <div 
                        key={cat}
                        className="flex items-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </div>
                    ))}
                  </div>
                  
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">{selectedPost.summary}</p>
                    
                    {selectedPost.content ? (
                      <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
                    ) : (
                      <p className="text-slate-600 dark:text-slate-300">Full article content is coming soon...</p>
                    )}
                  </div>
                </div>
              </div>
              
              <SectionDivider className="my-16" />
              
              <div>
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white mb-8">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts
                    .filter(post => 
                      post.id !== selectedPost.id && 
                      post.category.some(cat => selectedPost.category.includes(cat))
                    )
                    .slice(0, 3)
                    .map(post => (
                      <Card 
                        key={post.id} 
                        className="cursor-pointer"
                        onClick={() => handlePostSelect(post)}
                      >
                        <div 
                          className="h-40 bg-cover bg-center"
                          style={{ backgroundImage: `url(${post.image})` }}
                        ></div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-1" />
                              <span className="text-xs text-slate-500 dark:text-slate-400">{post.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-1" />
                              <span className="text-xs text-slate-500 dark:text-slate-400">{post.readTime}</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">{post.summary}</p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="w-full mt-2 justify-center"
                            icon={<ChevronRight className="w-4 h-4" />}
                          >
                            Read More
                          </Button>
                        </div>
                      </Card>
                    ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="post-list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col md:flex-row gap-8 mb-10">
                {/* Search Bar */}
                <div className="w-full md:w-2/3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="w-full px-4 py-3 pl-12 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                    />
                    <Search className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500 w-5 h-5" />
                  </div>
                </div>
                
                {/* Categories Dropdown (Mobile) */}
                <div className="w-full md:w-1/3 md:hidden">
                  <select
                    value={selectedCategory || ''}
                    onChange={(e) => handleCategorySelect(e.target.value || null)}
                    className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Categories (Desktop) */}
                <div className="hidden md:block md:w-1/4 lg:w-1/5">
                  <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 bg-blue-600 text-white font-semibold">
                      Categories
                    </div>
                    <div className="p-4">
                      <ul className="space-y-2">
                        <li>
                          <button
                            onClick={() => handleCategorySelect(null)}
                            className={`w-full text-left px-2 py-1.5 rounded ${
                              selectedCategory === null
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-medium'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                          >
                            All Categories
                          </button>
                        </li>
                        {categories.map(cat => (
                          <li key={cat.id}>
                            <button
                              onClick={() => handleCategorySelect(cat.id)}
                              className={`w-full text-left px-2 py-1.5 rounded ${
                                selectedCategory === cat.id
                                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 font-medium'
                                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                              }`}
                            >
                              {cat.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Posts Grid */}
                <div className="w-full md:w-3/4 lg:w-4/5">
                  {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {filteredPosts.map((post) => (
                        <motion.div
                          key={post.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.5 }}
                          layout
                        >
                          <Card 
                            className="cursor-pointer h-full flex flex-col"
                            onClick={() => handlePostSelect(post)}
                          >
                            <div 
                              className="h-40 bg-cover bg-center"
                              style={{ backgroundImage: `url(${post.image})` }}
                            ></div>
                            <div className="p-6 flex flex-col flex-grow">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                  <Calendar className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-1" />
                                  <span className="text-xs text-slate-500 dark:text-slate-400">{post.date}</span>
                                </div>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 text-slate-500 dark:text-slate-400 mr-1" />
                                  <span className="text-xs text-slate-500 dark:text-slate-400">{post.readTime}</span>
                                </div>
                              </div>
                              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2 line-clamp-2">{post.title}</h3>
                              <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-grow line-clamp-3">{post.summary}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                {post.category.slice(0, 2).map((cat) => (
                                  <div 
                                    key={`${post.id}-${cat}`}
                                    className="flex items-center text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full"
                                  >
                                    <Tag className="w-3 h-3 mr-1" />
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                  </div>
                                ))}
                                {post.category.length > 2 && (
                                  <div className="text-xs bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">
                                    +{post.category.length - 2} more
                                  </div>
                                )}
                              </div>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full mt-2 justify-center"
                                icon={<ChevronRight className="w-4 h-4" />}
                              >
                                Read More
                              </Button>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-lg shadow-md">
                      <h3 className="text-xl text-slate-600 dark:text-slate-300 mb-4">No articles found matching your criteria.</h3>
                      <Button 
                        variant="primary" 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory(null);
                        }}
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>
    </>
  );
};

export default TechWatch;