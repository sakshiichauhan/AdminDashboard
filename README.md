# Admin Dashboard

A comprehensive React-based admin dashboard built with modern web technologies for managing users, content, finances, and business operations.

## 🚀 Features

### User Management
- **Explorers**: Manage user profiles and activities
- **Coaches**: Handle coach accounts and certifications
- **Organisations**: Manage organizational accounts and partnerships

### Content Management System (CMS)
- **Insights**: Publish and manage insights articles
- **Video Library**: Organize and manage video content
- **In The News**: Track and manage news mentions
- **Testimonials**: Manage customer testimonials and reviews
- **Team Directory**: Maintain team member profiles
- **Libraries**: Manage resource libraries
- **Surveys**: Create and manage online surveys
- **Help Articles**: Maintain help documentation
- **FAQs**: Manage frequently asked questions

### Financial Management
- **Payments**: Track and manage payment transactions
- **Payouts**: Handle payout processing and tracking
- **Commissions**: Manage commission calculations and distributions

### Product Management
- **Assessments**: Manage assessment tools and results
- **Sessions**: Handle session scheduling and management
- **Session Pool**: Manage available session slots

### User Reports & Feedback
- **Reviews**: Monitor user reviews and ratings
- **Feedbacks**: Track user feedback and suggestions
- **Problems**: Handle reported issues and problems
- **Bugs**: Manage bug reports and tracking
- **Abuse Reports**: Handle abuse and violation reports

### Administrative Features
- **Approvals**: Manage approval workflows
- **Access Control**: Role-based access management
- **Notifications**: Multi-channel notification system

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI primitives
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **HTTP Client**: Axios
- **State Management**: React hooks
- **Code Quality**: ESLint, TypeScript

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd AdminDashboard/Dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── application-component/    # Dashboard-specific components
│   ├── CMS/                     # Content management components
│   ├── layouts/                 # Layout components (Sidebar, Navbar)
│   └── ui/                      # Reusable UI components
├── features/
│   └── auth/                    # Authentication components
├── pages/                       # Page components organized by feature
│   ├── Approvals/
│   ├── CMS/
│   ├── Finance/
│   ├── Products/
│   ├── UserReports/
│   └── Users/
├── routes/                      # Routing configuration
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
└── assets/                      # Static assets
```

## 🎨 UI Components

The dashboard uses a comprehensive set of UI components built with Radix UI primitives and styled with Tailwind CSS:

- **Navigation**: Sidebar with collapsible sections
- **Data Display**: Tables, cards, and data grids
- **Forms**: Inputs, checkboxes, date pickers
- **Feedback**: Tooltips, popovers, and notifications
- **Layout**: Responsive design with mobile support

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

The project is configured for deployment on Vercel with the included `vercel.json` configuration.

## 📱 Responsive Design

The dashboard is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices

## 🔐 Authentication

The dashboard includes authentication features with a sign-in page and protected routes.

## 📊 Key Features

- **Modern UI/UX**: Clean, intuitive interface with dark/light mode support
- **Real-time Updates**: Live data updates and notifications
- **Advanced Filtering**: Comprehensive search and filter capabilities
- **Export Functionality**: Data export in various formats
- **Role-based Access**: Granular permissions and access control
- **Mobile Responsive**: Optimized for all device sizes

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ using React, TypeScript, and Tailwind CSS**