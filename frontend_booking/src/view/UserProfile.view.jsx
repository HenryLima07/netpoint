import UserProfileComponent from "../component/UserProfile/UserProfile.component";
import Header from "../component/Header/Header";
import Footer from "../component/Footer/Footer";

const UserProfileView = () => {
  return (
    <main className="max-w-[1920px]">
      <Header />
      <div className="h-14 md:h-28"></div>
      <div className="w-full flex flex-col items-center">
        <UserProfileComponent />
      </div>
      <br />
      <Footer />
    </main>
  );
};

export default UserProfileView;
