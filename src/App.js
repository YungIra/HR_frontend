import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink, redirect } from "react-router-dom";
import Vacansies from "./pages/Vacansies";
import MyRequest from "./pages/MyRequest"
import "./Styles/app.css"
import AddResumeContainer from "./components/ResumesList/AddResumeContainer";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ProfileContainer from './components/Profile/ProfileContainer';
import VacansiesListAllContainer from './components/VacansiesList/ContainerComponents/VacansiesListAllContainer';
import VacansiesListMyContainer from './components/VacansiesList/ContainerComponents/VacansiesListMyContainer';
import RegisterPage from './pages/RegisterPage';
import ActiveResumeContainer from './components/ResumesList/ActiveResumeContainer';
import EditResumeContainer from './components/ResumesList/EditResumeContainer';
import EditProfileContainer from './components/Profile/EditProfileContainer';
import PrivateRoute from './private/PrivateRoute'
import AuthPage from './pages/AuthPage';
import NotFound from './pages/NotFound';
import Resumes from './pages/Resumes';
import ActiveVacansie from './components/VacansiesList/PresentationComponents/ActiveVacansie';
import AddVacansieContainer from './components/VacansiesList/ContainerComponents/AddVacansieContainer';
import EditVacansieContainer from './components/VacansiesList/ContainerComponents/EditVacansieContainer';
import ActiveVacansieContainer from './components/VacansiesList/ContainerComponents/ActiveVacansieContainer';
import HeaderContainer from './components/HeaderContainer';
import SidebarContainer from './components/SidebarContainer';
import Activate from './pages/Activate';
import New_register from './pages/New_register';

const App = () => {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <HeaderContainer />
          <div className='app_container'>
            <SidebarContainer />
            <div>
              <Routes>
                <Route path='' exact element={<AuthPage />} />
                <Route path='/activate/:uid/:token' element={<Activate />} />
                <Route path='/reset_password/:uid/:token' element={<New_register />} />
                <Route element={<PrivateRoute />} >
                  <Route path="/vacansies" element={<Vacansies />} />
                  <Route path="/vacansies/all" element={<VacansiesListAllContainer />} />
                  <Route path="/vacansies/my" element={<VacansiesListMyContainer />} />
                  <Route path="/resumes" element={<Resumes />} />
                  <Route path="/request" element={<MyRequest />} />
                  <Route path="/vacansies/create_vacansie" element={<AddVacansieContainer />} />
                  <Route path="/vacansie/edit/:id" element={<EditVacansieContainer />} />
                  <Route path="/vacansie/:id" element={<ActiveVacansieContainer />} />
                  <Route path="/resume/:id" element={<ActiveResumeContainer />} />
                  <Route path="/resume/edit/:id" element={<EditResumeContainer />} />
                  <Route path="/resumes/create_resume" element={<AddResumeContainer />} />
                  <Route path="/profile" element={<ProfileContainer />} />
                  <Route path="/profile/edit" element={<EditProfileContainer />} />

                </Route>

              </Routes>
            </div>
          </div>
        </AuthProvider>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Router>
    </div>
  )
}

export default App;