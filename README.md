# Autism Support Toy and Parent Dashboard

<h1>Overview</h1>

<p>This project is a Next.js web application that includes a chatbot designed for children with autism. The chatbot uses emotion detection to provide personalized responses and engage the users with various activities. Additionally, the application features a dashboard for parents to monitor and control the interactions.</p>

<h1>Table of Contents</h1>

<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#installation">Installation</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#deployment-on-vercel">Deployment on Vercel</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
</ul>

<h1 id="features">Features</h1>

<ul>
    <li>Emotion detection for personalized chatbot interactions.</li>
    <li>Generative AI for creating engaging stories and activities.</li>
    <li>Parent dashboard for monitoring and controlling the chatbot.</li>
    <li>User-friendly interface designed for children with autism.</li>
</ul>

<h1 id="getting-started">Getting Started</h1>

<p>These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.</p>

<h2>Prerequisites</h2>

<p>Make sure you have the following installed on your system:</p>

<ul>
    <li>Node.js (>=14.x)</li>
    <li>npm or yarn</li>
</ul>

<h1 id="installation">Installation</h1>

<ol>
    <li>Clone the repository:
        <pre><code>git clone https://github.com/yourusername/yourproject.git
cd yourproject</code></pre>
    </li>
    <li>Install the dependencies:
        <pre><code>npm install</code></pre>
        or
        <pre><code>yarn install</code></pre>
    </li>
</ol>

<h1 id="configuration">Configuration</h1>

<p>Create a <code>.env.local</code> file in the root directory and add the necessary environment variables. For example:</p>

<pre><code>NEXT_PUBLIC_API_KEY=yourapikey
NEXT_PUBLIC_API_URL=yourapiurl</code></pre>

<h1 id="usage">Usage</h1>

<p>To start the development server:</p>

<pre><code>npm run dev</code></pre>
or
<pre><code>yarn dev</code></pre>

<p>Open <a href="http://localhost:3000">http://localhost:3000</a> to view it in the browser.</p>

<h1 id="folder-structure">Folder Structure</h1>

<pre><code>.
├── actions
│   └── ...
├── app
│   └── ...
├── components
│   └── ...
├── lib
│   └── ...
├── public
│   └── ...
├── .eslintrc.json
├── .gitignore
├── LICENSE
├── README.md
├── auth.config.ts
├── auth.ts
├── components.json
├── middleware.ts
├── next-env.d.ts
├── next.config.js
├── package.json
├── pnpm-lock.yaml
├── postcss.config.js
├── prettier.config.js
├── tailwind.config.ts
└── ...</code></pre>

<h1 id="deployment-on-vercel">Deployment on Vercel</h1>

<p>To deploy your Next.js application on Vercel, follow these steps:</p>

<ol>
    <li>Create a Vercel account if you don't have one already: <a href="https://vercel.com/signup">Vercel Signup</a></li>
    <li>Install the Vercel CLI:
        <pre><code>npm i -g vercel</code></pre>
        or
        <pre><code>yarn global add vercel</code></pre>
    </li>
    <li>Initialize your project with Vercel:
        <pre><code>vercel</code></pre>
    </li>
    <li>Follow the prompts to set up your project. Vercel will detect your Next.js application and provide default settings.</li>
    <li>Deploy your project:
        <pre><code>vercel --prod</code></pre>
    </li>
</ol>

<p>Your application should now be live on Vercel. You can manage your deployments and view your project at <a href="https://vercel.com/dashboard">Vercel Dashboard</a>.</p>

<h1 id="contributing">Contributing</h1>

<p>We welcome contributions to this project. To contribute, please follow these steps:</p>

<ol>
    <li>Fork the repository.</li>
    <li>Create a new branch (<code>git checkout -b feature/your-feature-name</code>).</li>
    <li>Make your changes.</li>
    <li>Commit your changes (<code>git commit -m 'Add some feature'</code>).</li>
    <li>Push to the branch (<code>git push origin feature/your-feature-name</code>).</li>
    <li>Open a Pull Request.</li>
</ol>

<h1 id="license">License</h1>

<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>
