import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/homePage";
import AboutPage from "../pages/detailPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage/>
    },
    {
        path: '/about/:id',
        element: <AboutPage/>
    }
])

export default router
