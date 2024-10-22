import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/common/Sidebar";
import OverviewPage from "./pages/OverviewPage";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import AddInstructor from "./pages/AddInstructor";
import Courses from "./pages/Courses";

import AddCourse from "./pages/AddCourse";
import CourseCateg from "./pages/CourseCateg";

import Blog from "./components/Blog/Blog";

import AddBlog from "./pages/AddBlog";
import AddBlogCate from "./pages/AddBlogCate";
import AddBlogPost from "./pages/AddBlogPost";

import AddFlyers from "./pages/AddFlyers";

import AddSpcategories from "./components/SP-C Categories/AddSpcategories";
import AddCategory from "./pages/AddCate";

import Mainspc from "./components/SP-CBlogPost/Mainspc";
import MainspcCate from "./components/SP-C Categories/MainspcCate";
import MainEflyer from "./components/Eflyer/MainEflyer";
import MainFaqs from "./components/Faqs/MainFaqs";
import AddSpecialbp from "./components/SP-CBlogPost/AddSpecialbp";
import Mainblog from "./components/Blog/Mainblog";
import Mainblogcat from "./components/Blog/Mainblogcat";
import EditCourse from "./components/courses/EditCourse";
import EditInstructor from "./components/users/EditInstructor";
import EditBlog from "./components/Blog/EditBlog";
import EditBlogcat from "./components/Blog/EditBlogcat";


function App() {
	
	return (
		<div className='flex h-screen bg-gray-900 text-gray-100 overflow-hidden'>
			{/* Background */}
			{/* <div className='fixed inset-0 z-0'>
				<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
				<div className='absolute inset-0 backdrop-blur-sm' />
			</div> */}

			<Sidebar />
			<Routes>
				<Route path='/' element={<OverviewPage />} />
					<Route path='/users' element={<UsersPage />}>
					{/* Nested route for adding a new instructor */}
					<Route path='adduser' element={<AddInstructor />} />
				</Route>
				<Route path='/users/:id' element={<EditInstructor/>} />
				<Route path='/faqs' element={<MainFaqs/>} />

				<Route path='/courses' element={<Courses />}></Route>
				<Route path='/addcourse' element={<AddCourse/>} />
				<Route path='/editcourse/:id' element={<EditCourse/>} />
				<Route path='/course-categories' element={<CourseCateg />}>
					<Route path='addcategory' element={<AddCategory/>} />
				</Route>

				<Route path='/blog' element={<Blog/>}></Route>
				<Route path='/addblog' element={<AddBlog/>}/>
				<Route path='/editblog/:id' element={<EditBlog/>} />
		
				<Route path='/blog-categories' element={<Mainblogcat/>}>
				</Route>
				<Route path='/editblogcat/:id' element={<EditBlogcat/>} />
				<Route path='/addblogcate' element={<AddBlogCate/>} />
                        
				<Route path='/blog-post' element={<Mainblog/>}>
					<Route path='addblogpost' element={<AddBlogPost/>} />
				</Route>

				<Route path='/eflayer' element={<MainEflyer/>}>
				
				</Route>
				<Route path='/addeflayer' element={<AddFlyers/>} />
				<Route path='/sp-c-categories' element={<MainspcCate/>}>
				
				</Route>
				<Route path='/addspc' element={<AddSpcategories/>} />
				<Route path='/specialbp' element={<AddSpecialbp/>} />
			     <Route path='/sp-c-blog-post' element={<Mainspc/>} />
				<Route path='/analytics' element={<AnalyticsPage />} />
				<Route path='/settings' element={<SettingsPage />} />
			</Routes>
		</div>
	);
}

export default App;
