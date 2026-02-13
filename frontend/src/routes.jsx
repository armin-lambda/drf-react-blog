import PostList from "./pages/post-list/PostList";
import PostDetail from "./pages/post-detail/PostDetail";


const routes = [
    {
        path: "/",
        element: <PostList />,
    },
    {
        path: "/:slug",
        element: <PostDetail />,
    },
];

export default routes;
