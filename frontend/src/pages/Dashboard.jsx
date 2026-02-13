import { useEffect, useState } from 'react';
import api from '../services/api';
import CourseCard from '../components/CourseCard';
import Loader from '../components/Loader';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useUser();
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        // In a real app, we might have a dedicated endpoint for this
        // or populate it on the user profile.
        // For now, we rely on the user profile data but we might need to fetch full course details
        // if the user object only has IDs.
        
        // Let's re-fetch profile to be sure we have latest courses
        const { data } = await api.get('/auth/profile');
        
        // Assuming the backend populates purchasedCourses, or we fetch them manually
        // The current backend user controller returns purchasedCourses IDs.
        // We need to fetch the course details for these IDs.
        
        const coursePromises = data.purchasedCourses.map(id => api.get(`/courses/${id}`));
        const coursesResponses = await Promise.all(coursePromises);
        setPurchasedCourses(coursesResponses.map(res => res.data));

      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchPurchasedCourses();
    }
  }, [user]);

  if (loading) return <Loader />;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">My Learning</h1>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-xl font-bold mb-4">In Progress</h2>
        {purchasedCourses.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">You haven't enrolled in any courses yet.</p>
            <Link to="/" className="text-primary font-bold hover:underline">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {purchasedCourses.map((course) => (
              <div key={course._id} className="relative group">
                <CourseCard course={course} />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg pointer-events-none">
                    <Link to={`/learn/${course._id}`} className="bg-primary text-white px-6 py-2 rounded-full font-bold pointer-events-auto hover:bg-purple-700">
                        Start Learning
                    </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
