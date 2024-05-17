import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Details from "./components/Details";
import Create from "./components/Create";
import Edit from "./components/Edit";

const App = () => {
    const { search, pathname } = useLocation();
    return (
        <div className="h-screen w-screen flex">
            {(pathname != "/" || search.length > 0) && (
                <Link
                    className="text-red-300 absolute top-[2%] left-[17%] border border-red-200 px-5 py-3"
                    to={`/`}
                >
                    Home
                </Link>
            )}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Routes>
        </div>
    );
};

export default App;
