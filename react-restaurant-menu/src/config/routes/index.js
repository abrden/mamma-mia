import {
    SignUp, Login, Register, Home, App, HomeUser, Categories, PaymentsHome, Courses, FeedbackHome, Menu, HomeAdmin, CoursesUser, AppUser
  } from "../../components/app/pages/index.js";
    
  export const routes = [
    {
        path: "/",
        component: HomeUser,
        exact: true,
        redirectTo: '/menu-maker'
    },

    {
      path: "/menu-maker",
      component: App,
      exact: true,
      redirectTo: '/'
    },

    {
      path: "/menu-maker-user",
      component: AppUser,
      exact: true,
      redirectTo: '/'
    },

    {
      path: "/course-maker",
      component: Courses,
      exact: true,
      redirectTo: '/'
    },

    {
      path: "/course-maker-user",
      component: CoursesUser,
      exact: true,
      redirectTo: '/'
    },

    {
      path: "/payments",
      component: PaymentsHome,
      exact: true,
      redirectTo: '/'
    },

    {
      path: "/feedback",
      component: FeedbackHome,
      exact: true,
      redirectTo: '/'
    },

    {
      path: "/sign_up",
      component: SignUp,
      exact: true,
      onlyUnauthenticated: true,
      redirectTo: '/register'
    },
  
    {
      path: "/register",
      component: Register,
      exact: true,
      onlyUnauthenticated: true,
      redirectTo: '/'
    },
  
    {
      path: "/login",
      component: Login,
      exact: true,
      onlyUnauthenticated: true,
      redirectTo: '/'
    },
    {
      path: "/homeAdmin",
      component: HomeAdmin,
      exact: true,
      onlyUnauthenticated: true,
      redirectTo: '/'
    },
  
    {
      path: "/menu-maker",
      component: Home,
      exact: true,
      onlyUnauthenticated: true,
      redirectTo: '/'
    },

    {
      path: "/categories-maker",
      component: Categories,
      exact: true,
      redirectTo: '/'
    },

    {
      path: "/courses-maker",
      component: Courses,
      exact: true,
      redirectTo: '/'
    },

    {
      path: "/show-menu",
      component: Menu,
      exact: true,
      redirectTo: '/'
    }
  ];