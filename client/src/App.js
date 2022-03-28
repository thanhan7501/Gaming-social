import logo from './logo.svg';
import './App.css';

function App() {
  function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  }
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* User routing */}
          <Route element={<AutoLoginUser />}>
            <Route exact path="/" name="home page" element={<Home />} />
            
          </Route>

          {/* Admin routing */}
          <Route
            path="/admin/login"
            name="login page"
            element={<LoginAdmin />}
          />
          <Route element={<RequireAuthAdmin />}>
            <Route path="/admin" name="admin page" element={<Admin />} />
            <Route
              path="/admin/create"
              name="create game page"
            // element={<Create />}
            />
            <Route
              path="/admin/update/:id"
              name="update game page"
            // element={<Update />}
            />

            <Route
              path="/admin/register"
              name="register admin page"
            // element={<Register />}
            />
          </Route>

          {/* No match routing */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
