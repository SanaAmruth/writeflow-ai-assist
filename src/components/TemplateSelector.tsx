
import React from 'react';
import { FileText, List, MessageCircle, Star, Lightbulb, TrendingUp } from 'lucide-react';

interface TemplateSelectorProps {
  onSelectTemplate: (template: string) => void;
}

const TemplateSelector = ({ onSelectTemplate }: TemplateSelectorProps) => {
  const templates = [
    {
      id: 'how-to',
      title: 'How-To Guide',
      icon: Lightbulb,
      description: 'Step-by-step tutorial format',
      content: `<h1>How to [Your Topic Here]</h1>

<p>In this comprehensive guide, you'll learn everything you need to know about [topic]. Whether you're a beginner or looking to improve your skills, this tutorial will walk you through each step.</p>

<h2>What You'll Need</h2>
<ul>
<li>Required tool or resource 1</li>
<li>Required tool or resource 2</li>
<li>Required tool or resource 3</li>
</ul>

<h2>Step 1: Getting Started</h2>
<p>First, let's begin with the basics...</p>

<h2>Step 2: [Next Step]</h2>
<p>Now that you've completed step 1, we'll move on to...</p>

<h2>Step 3: [Final Step]</h2>
<p>Finally, we'll wrap up by...</p>

<h2>Conclusion</h2>
<p>You've successfully learned how to [topic]. With practice, you'll become more confident and efficient at this skill.</p>`
    },
    {
      id: 'listicle',
      title: 'Listicle',
      icon: List,
      description: 'Numbered or bulleted list article',
      content: `<h1>10 Essential [Items/Tips/Strategies] for [Your Topic]</h1>

<p>Discover the top 10 [items/tips/strategies] that will help you [achieve goal]. Each item on this list has been carefully selected based on effectiveness and practicality.</p>

<h2>1. [First Item]</h2>
<p>Explanation of why this is important and how to implement it...</p>

<h2>2. [Second Item]</h2>
<p>Detailed description and benefits...</p>

<h2>3. [Third Item]</h2>
<p>Practical advice and examples...</p>

<h2>4. [Fourth Item]</h2>
<p>Continue with your remaining points...</p>

<h2>Conclusion</h2>
<p>These 10 [items/tips/strategies] will set you on the path to success. Start implementing them today and watch your [results/skills/knowledge] improve.</p>`
    },
    {
      id: 'review',
      title: 'Product Review',
      icon: Star,
      description: 'Detailed product or service review',
      content: `<h1>[Product Name] Review: Is It Worth Your Money?</h1>

<p>After extensively testing [Product Name] for [time period], here's my honest review covering everything you need to know before making a purchase.</p>

<h2>What Is [Product Name]?</h2>
<p>Brief overview of the product and its main purpose...</p>

<h2>Key Features</h2>
<ul>
<li>Feature 1: Description and benefit</li>
<li>Feature 2: Description and benefit</li>
<li>Feature 3: Description and benefit</li>
</ul>

<h2>Pros</h2>
<ul>
<li>Positive aspect 1</li>
<li>Positive aspect 2</li>
<li>Positive aspect 3</li>
</ul>

<h2>Cons</h2>
<ul>
<li>Negative aspect 1</li>
<li>Negative aspect 2</li>
</ul>

<h2>Final Verdict</h2>
<p>Overall rating and recommendation with reasoning...</p>`
    },
    {
      id: 'opinion',
      title: 'Opinion Piece',
      icon: MessageCircle,
      description: 'Personal perspective or argumentative post',
      content: `<h1>Why I Believe [Your Opinion/Position]</h1>

<p>In today's discussion about [topic], there are many different viewpoints. After careful consideration and research, here's why I believe [your position] is the right approach.</p>

<h2>The Current Situation</h2>
<p>Context and background information about the topic...</p>

<h2>My Perspective</h2>
<p>Detailed explanation of your viewpoint with supporting arguments...</p>

<h2>Why This Matters</h2>
<p>The broader implications and why readers should care...</p>

<h2>What Others Say</h2>
<p>Acknowledging different viewpoints while reinforcing your position...</p>

<h2>Conclusion</h2>
<p>Summarizing your main points and call to action for readers...</p>`
    },
    {
      id: 'trending',
      title: 'Industry Trends',
      icon: TrendingUp,
      description: 'Analysis of current market trends',
      content: `<h1>The Top [Number] Trends Shaping [Industry] in [Year]</h1>

<p>The [industry] landscape is evolving rapidly. Here are the key trends that are driving change and what they mean for businesses and consumers.</p>

<h2>Trend 1: [Trend Name]</h2>
<p>Description of the trend and its impact...</p>

<h2>Trend 2: [Trend Name]</h2>
<p>Analysis of this development and future implications...</p>

<h2>Trend 3: [Trend Name]</h2>
<p>How this trend is changing the industry...</p>

<h2>What This Means for You</h2>
<p>Practical advice on how readers can adapt to these changes...</p>

<h2>Looking Ahead</h2>
<p>Predictions for the future and how these trends might evolve...</p>`
    },
    {
      id: 'guide',
      title: 'Ultimate Guide',
      icon: FileText,
      description: 'Comprehensive resource guide',
      content: `<h1>The Ultimate Guide to [Your Topic]</h1>

<p>This comprehensive guide covers everything you need to know about [topic]. Whether you're just starting out or looking to deepen your knowledge, you'll find valuable insights here.</p>

<h2>Table of Contents</h2>
<ul>
<li>Understanding the Basics</li>
<li>Getting Started</li>
<li>Advanced Techniques</li>
<li>Common Mistakes to Avoid</li>
<li>Resources and Tools</li>
</ul>

<h2>Understanding the Basics</h2>
<p>Let's start with the fundamentals...</p>

<h2>Getting Started</h2>
<p>Now that you understand the basics, here's how to begin...</p>

<h2>Advanced Techniques</h2>
<p>Once you've mastered the fundamentals, try these advanced strategies...</p>

<h2>Common Mistakes to Avoid</h2>
<p>Learn from others' experiences and avoid these pitfalls...</p>

<h2>Resources and Tools</h2>
<p>Helpful resources to continue your learning journey...</p>`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => {
        const IconComponent = template.icon;
        return (
          <button
            key={template.id}
            onClick={() => onSelectTemplate(template.content)}
            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all text-left group"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-purple-100 group-hover:bg-purple-200 p-2 rounded-lg transition-colors">
                <IconComponent className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900">{template.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{template.description}</p>
          </button>
        );
      })}
    </div>
  );
};

export default TemplateSelector;
