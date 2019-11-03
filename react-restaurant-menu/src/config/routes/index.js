import {
    SignUp, Login, Register, Home, App, HomeUser, Categories, PaymentsHome, SuggestionsHome, 
    FeedbackHome
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
      path: "/payments",
      component: PaymentsHome,
      exact: true,
      redirectTo: '/'
    },

    {
      path: "/suggestions",
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
      redirectTo: '/menu-maker'
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
  ];