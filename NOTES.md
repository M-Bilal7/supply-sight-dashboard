Here are a few notes on the decisions I made while building this project, along with some trade-offs and things I’d improve if I had more time.

**Decisions**

Stack choice: I went with React (Vite) for speed and modern tooling, Tailwind CSS for quick and consistent styling, and Recharts to handle data visualization. These tools gave me a good balance between productivity and performance.

Data: Since this is a prototype, I used mock JSON data to simulate API responses. This kept things simple but still realistic.

Structure: I kept the code component-based so it’s easy to extend. For state, I just used React hooks instead of heavier state libraries, since the scope is small.

**Trade-offs**

Real APIs vs Mock Data: Mock data made development faster, but of course, it doesn’t show real integration.

Simplicity vs Scalability: I didn’t add Redux, caching, or pagination since the dataset is small. It’s simpler to read right now, but for a larger app those would be necessary.

Styling: Tailwind made iteration quick, but in a bigger project I’d probably bring in a design system or component library for more consistency.

**Improvements**

If I had more time, here’s what I’d focus on:

Testing: Add unit tests with Jest/RTL and maybe some integration tests with Cypress.

Scalability: Hook it up to a real backend, add proper state management (Redux/RTK or Zustand), and think about performance optimizations like code splitting.

UI/UX polish: More consistent design system, smoother animations (Framer Motion), and accessibility checks.

Security: With real APIs, I’d add validation, error handling, and secure data practices.

DevOps: Set up a CI/CD pipeline with GitHub Actions and possibly containerize the app with Docker for easy deployment.


** Repo ** : https://github.com/M-Bilal7/supply-sight-dashboard