# Backend API - KA Web & App Developers

Express.js backend server with MongoDB for the business website.

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/kawebapp
JWT_SECRET=your-secret-key-change-in-production
ADMIN_EMAIL=admin@kawebapp.com
ADMIN_PASSWORD=admin123
```

## API Endpoints

### Public Endpoints

- `GET /api/projects` - Get all active projects
- `GET /api/projects/:id` - Get single project
- `GET /api/testimonials` - Get all active testimonials
- `GET /api/testimonials/:id` - Get single testimonial
- `GET /api/pricing` - Get all active pricing plans
- `GET /api/pricing/:id` - Get single pricing plan
- `POST /api/contact` - Submit contact form

### Admin Endpoints (Requires Authentication)

- `POST /api/auth/login` - Admin login
- `GET /api/auth/verify` - Verify admin token
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/testimonials` - Create testimonial
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial
- `POST /api/pricing` - Create pricing plan
- `PUT /api/pricing/:id` - Update pricing plan
- `DELETE /api/pricing/:id` - Delete pricing plan
- `GET /api/contact` - Get all contact messages

## Authentication

Admin endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## MongoDB Models

- **Admin** - Admin user accounts
- **Project** - Project portfolio items
- **Testimonial** - Client testimonials
- **Pricing** - Pricing plans
- **Contact** - Contact form submissions

