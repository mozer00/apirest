import { Button } from "../components/common/Button";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import BoxUser from "../components/layout/BoxUser";
import Loader from "../components/common/Loader";
import api from "../services/api";
import "./Home.css";

function Home() {  
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    loadUsers();
  }, [currentPage]);

  const getPageNumbers = () => {
    const range = 1;
    const pages = [];

    pages.push(1);

    const start = Math.max(2, currentPage - range);
    const end = Math.min(totalPages - 1, currentPage + range);

    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const loadUsers = async () => {
    setIsLoading(true);

    await api
      .get("/users", {
        params: {
          page: currentPage,          
        },
      })
      .then((response) => {
        const meta = response.data.meta ?? {};
        setUsers(response.data.data);
        setTotalUsers(meta.total ?? 0);
        setTotalPages(meta.last_page ?? 1);
        setPerPage(meta.per_page ?? 10);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };



  return (
    <div>
      <Navbar />

      <div className="main_feed">
        <div className="feed_form">
          <h1>Listagem dos usuários</h1>
          <p>Listagem de todos usuários cadastrados.</p>

          {users.length <= 0 ? (
            <>
              {isLoading ? (
                <Loader />
              ) : (
                <p>Ops! Nenhum usuário cadastrado até o momento!</p>
              )}
            </>
          ) : (
            <>
              <span>
                Exibindo {users.length} de {totalUsers} - página {currentPage} de {totalPages}
              </span>

              {users.map((user, index) => {
                return (
                  <BoxUser
                    key={index}
                    user={user}
                    users={users}
                    setUsers={setUsers}
                    totalUsers={totalUsers}
                    setTotalUsers={setTotalUsers}
                  />
                );
              })}

              <div className="pagination_controls">
                <Button
                  className="btn_page"
                  onClick={() => setCurrentPage((p) => p - 1)}
                  disabled={currentPage === 1}
                >
                  &lt;
                </Button>

                <div className="pagination_numbers">
                  {getPageNumbers().map((page, index) =>
                    page === '...'
                      ? <span key={index} className="pagination_ellipsis">...</span>
                      : <button
                          key={index}
                          className={`btn_page_num ${page === currentPage ? 'active' : ''}`}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </button>
                  )}
                </div>

                <Button
                  className="btn_page"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage === totalPages}
                >
                  &gt;
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
