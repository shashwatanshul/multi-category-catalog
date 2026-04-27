# Assignment Submission: Dynamic Multi-Category Catalog

## Technologies Used
- **Next.js 14 (App Router)**: Picked for its superior performance via Static Site Generation (SSG) and robust routing.
- **Vanilla CSS Modules**: Used to create a custom, high-fidelity "Nebula" design system without the overhead of utility frameworks.
- **JavaScript**: Core logic for data parsing, slugification, and dynamic property rendering.

## Time Taken
Approximately **45-50 minutes** for project initialization, component architecture, design implementation, and verification.

## Approach & Idea
The core idea was to create a **"Premium Showcase"** rather than a simple list. 
1. **Design Strategy**: I implemented a "Nebula" dark theme utilizing glassmorphism (`backdrop-filter`) and smooth CSS transitions. This provides a high-end feel that makes categories (Cars, Phones, etc.) stand out.
2. **Dynamic Rendering Engine**: Instead of hardcoding product attributes, I built a dynamic mapper that iterates through the `itemprops` array. This ensures that if a new category (e.g., "Spacecraft") is added with unique properties like "Thrust Force," the UI will render it automatically without code changes.
3. **Performance Optimization**: Every product page is pre-rendered at build time using `generateStaticParams`. This results in zero-latency navigation between categories and items.
4. **Responsiveness**: Used CSS Grid and Flexbox with a mobile-first philosophy to ensure the catalog looks stunning on everything from a phone to a 4K monitor.
