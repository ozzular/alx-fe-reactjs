# GitHub User Search Project - Task Brief

## Learning Objectives
1. Set Up a React Project for API Integration:
   - Create and configure a new React application for integrating with external APIs, specifically GitHub API.

2. Develop Basic and Advanced Search Features Using GitHub API:
   - Implement basic search functionality to fetch and display GitHub user data.
   - Enhance search functionality with advanced filtering (location, repository count).

3. Improve User Interface and Experience:
   - Use Tailwind CSS to style the application and make it responsive.

4. Deploy the Application:
   - Deploy the app to Vercel, ensuring it works under real-world conditions.

---

## Tasks

### Task 0: Setting Up React Project
- Create new React app: `npm create vite@latest github-user-search -- --template react`
- Install Axios: `npm install axios`
- Structure:
  - `components/` - React components
  - `services/` - API calls
  - `App.jsx` - main layout & routing
- Setup environment variables in `.env` for GitHub API key if needed.
- Run: `npm run dev` to verify setup.

---

### Task 1: Basic Search
- Create `Search.jsx` component:
  - Input field for GitHub username
  - State handling and form submission
- Create `services/githubService.js`:
  - `fetchUserData(username)` fetches `https://api.github.com/users/{username}`
- Display results:
  - Avatar, name, link to profile
  - Loading and error states

---

### Task 2: Advanced Search + UI
- Enhance Search component:
  - Additional inputs: location, min repositories
  - Style form with Tailwind CSS
- Extend GitHub API calls:
  - `https://api.github.com/search/users?q={query}` with filters
- Display results with more details (location, repos count)
- Pagination or “load more” if needed

---

### Task 3: Deployment to Vercel
- Prepare code:
  - Remove console logs, optimize images, handle errors
- Vercel setup:
  - Import GitHub repo
  - Configure environment variables
- Deploy and test live application

Instruction to Augment
Do not commit TASK_BRIEF.md to GitHub.
Your Objective: Complete the GitHub User Search project *sequentially*, working on each task one at a time (Task 0 → Task 1 → Task 2 → Task 3). After completing a task, push changes to the GitHub repository automatically.

Rules:
Always create or modify files only as needed for the task.
Follow the instructions in this TASK_BRIEF.md for each task.
Use best practices and standard for modern for React, Axios, Tailwind, and Vercel deployment.
Keep commits clean, one per task, with descriptive messages like "Task 0: Project setup", "Task 1: Basic search implementation", etc.
Do not commit TASK_BRIEF.md or any temporary instruction files.
For each task:
- Ensure the code runs without errors.
- Test API integration and UI functionality locally.
- Push changes to GitHub after the task is complete.
After finishing all tasks, confirm that the application runs locally and is ready for Vercel deployment.

By the end of this project, you will be able to:

Set Up a React Project for API Integration:

Create and configure a new React application for integrating with external APIs, specifically the GitHub API.
Develop Basic and Advanced Search Features Using GitHub API:

Implement basic search functionality to fetch and display GitHub user data.
Enhance the search functionality to include advanced filtering criteria, such as location and repository count.
Improve User Interface and Experience:

Utilize Tailwind CSS to style your application, ensuring a responsive and visually appealing design.
Deploy the Application to a Web Hosting Platform:

Deploy your application to Vercel, making it publicly accessible and ensuring it performs well under real-world conditions.
Tasks
0. Setting Up a React Project for GitHub User Search Application
mandatory
Objective: Begin building a GitHub User Search Application using React. This task focuses on setting up the project foundation, including creating the React app, installing necessary packages, and preparing the environment for further development.

Project Overview:
The GitHub User Search Application will allow users to search for GitHub profiles using the GitHub API. It will feature a search input, display results including basic user information, and link to their GitHub profiles.

Task Description:
Start by setting up a new React project and preparing it for integration with the GitHub API. This involves setting up the basic project structure and ensuring that all necessary tools and packages are installed.

Step 1: Create a New React Project
React Project Setup:

Open your terminal and set up a new React application using Create React App:
npm create vite@latest github-user-search -- --template react
cd github-user-search
Step 2: Install Necessary Packages
Dependencies Installation:

Install Axios for making HTTP requests, which will be used to interact with the GitHub API:
npm install axios
Step 3: Prepare the Application Structure
Basic Application Structure:
Create a simple structure for your application:
components/: Directory to hold all React components.
services/: Directory for services such as API calls.
App.jsx: Modify this file to include basic routing and a simple layout.
Step 4: Configure Environment for API Calls
Environment Setup:
Set up environment variables to store sensitive information such as API keys (if necessary for GitHub API):
Create a .env file in the root directory.
Add environment variables like VITE_APP_GITHUB_API_KEY if needed.
Use import.meta.env.VITE_APP_GITHUB_API_KEY in your API service files.
Step 5: Initial Test Run
Run the Application:

Ensure that your setup works by running the application:
npm run dev
The application should load without errors, displaying a basic setup ready for further development.
Name of the github repo: github-user-search

Repo:

GitHub repository: alx-fe-reactjs
Directory: github-user-search
 
1. Integrating the GitHub API and Creating a Basic Search Feature
mandatory
Objective: Develop a basic search functionality in the GitHub User Search Application using React and the GitHub API. This task focuses on integrating the API, creating a search input, and displaying search results.

Task Description:
Build the core feature of the application—the ability to search for GitHub users. You’ll create a component that allows users to input a search term and fetch user data from the GitHub API based on that input. The results will be displayed in a simple and readable format.

Step 1: Create the Search Component
Search Input Setup:
Develop a Search component that includes a form with an input field for entering GitHub usernames.
Implement state handling to capture the input value and manage the form submission.
Step 2: Handle API Requests
API Integration:
Create a githubService.js file in the services directory to manage API calls using Axios.
Set up a function to fetch user data from the GitHub API using the search term provided by the user, the name of the function is fetchUserData
GitHub API endpoint for user search: https://api.github.com/users/{username}
Step 3: Display Search Results
Results Display:
Modify the Search component to display user information after a successful API call. Include basic details such as the user’s avatar, name, and a link to their GitHub profile.
Implement conditional rendering based on the state of the API call, if the state is loading display a message indicating Loading..., if encountered an error display the message Looks like we cant find the user, and display the basic info if the api call is successful.
Repo:

GitHub repository: alx-fe-reactjs
Directory: github-user-search
 
2. Enhancing User Interface and Adding Advanced Search Features
mandatory
Objective: Improve the user interface of the GitHub User Search Application and introduce advanced search capabilities that allow filtering based on more detailed criteria, such as location and repositories count.

Task Description:
This task focuses on refining the user interface for a better user experience and adding functionality to search GitHub users by additional criteria beyond just the username. Implement a more sophisticated search form that can handle multiple parameters and display a richer set of results.

Step 1: Update the Search Component Interface
UI Enhancement:
Redesign the Search component to include additional input fields for advanced search criteria such as location and minimum repositories.
Use Tailwind CSS to style the form and ensure it is responsive and accessible.
Step 2: Extend the GitHub API Integration
Advanced Search Functionality:
Modify the githubService.js to handle additional query parameters for advanced search features.
Construct API requests that can filter users based on the specified criteria. Utilize GitHub’s Search API to achieve this.
Example API endpoint for advanced search: https://api.github.com/search/users?q={query} where {query} might include parameters like location and repo count.
Step 3: Display Advanced Search Results
Results Display Enhancement:
Upgrade the results display section in the Search component to show a list of users that match the advanced search criteria.
Include more detailed information in the results, such as the user’s location, number of repositories, and a link to their full profile.
Implement pagination or “load more” functionality if the API response includes multiple pages of results.
Repo:

GitHub repository: alx-fe-reactjs
Directory: github-user-search
 
3. Deploying the GitHub User Search Application to Vercel
mandatory
Objective: Deploy the completed GitHub User Search Application to Vercel, ensuring it is publicly accessible and performs well under real-world conditions.

Task Description:
This final task involves taking your fully developed GitHub User Search Application and deploying it to Vercel. This step is crucial as it moves your application from a development setting to a production environment, allowing real users to interact with it.

Step 1: Prepare the Application for Deployment
Optimization:
Review your application code to ensure that it is optimized for performance. This includes checking for and removing any console logs, ensuring images are optimized, and that the application handles errors gracefully.
Test the application thoroughly to make sure all features work as expected without any bugs.
Add your .env file in the .gitignore file
Step 2: Create a Vercel Account and Set Up a New Project
Vercel Setup:
If you don’t already have a Vercel account, create one at Vercel’s website.
Once logged in, set up a new project by importing your project repository from GitHub, GitLab, or Bitbucket. Follow Vercel’s guide to connect your repository.
Step 3: Configure Environment Variables in Vercel
Environment Variables:
If your application uses any environment variables (such as an API key for the GitHub API), add these to your Vercel project settings under the “Environment Variables” section.
Ensure these variables are included securely and correspond to the production environment.
Step 4: Deploy Your Application
Deployment:
Trigger a deployment by pushing your latest changes to your connected repository or manually deploying through Vercel’s dashboard.
Vercel will automatically build and deploy your application based on the settings and configurations you’ve provided.
Monitor the deployment process in the Vercel dashboard to ensure there are no build errors.
Step 5: Verify the Live Application
Post-Deployment Checks:
Once the deployment is successful, visit the deployed application’s URL provided by Vercel.
Test all functionalities to ensure that the application behaves as expected in the live environment.
Check responsiveness, API interactions, and overall performance on various devices and networks.
Repo:

GitHub repository: alx-fe-reactjs
Directory: github-user-search
