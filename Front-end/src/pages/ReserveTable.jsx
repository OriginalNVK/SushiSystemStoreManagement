import ReserveTableForm from "../components/ReserveTableForm";
import Header from "../components/Header";
import Footer from "../components/Footer";
import reserveTable from "../assets/content/homeClient/reserveTable.png";
const ReserveTable = () => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-yellow-500">Reserve Table</h1>
          <div className="mt-2 w-12 h-1 bg-yellow-500 mx-auto"></div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg max-w-5xl">
          {/* Image Section */}
          <div className="flex-1">
            <img
              src={reserveTable} // Thay bằng URL hình ảnh
              alt="Sushi"
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>

          {/* Form Section */}
          <div className="flex-1 p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Information</h2>
            <ReserveTableForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReserveTable;