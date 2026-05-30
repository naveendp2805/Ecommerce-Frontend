import Navbar from "../components/common/Navbar";

function MainLayout({ children }) {
    return (
        <div>
            <Navbar />

            <hr />

            {children}
        </div>
    );
}

export default MainLayout;