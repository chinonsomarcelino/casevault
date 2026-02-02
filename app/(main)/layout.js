import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Provider from "@/components/Provider";

export default function MainLayout({ children }) {
  return (
    <Provider>

              <Navbar />
                {children}
                <Footer />
        
            </Provider>
  );
}